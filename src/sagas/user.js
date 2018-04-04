import { takeEvery } from 'redux-saga/effects';

import {
    GET_USER,
    UPDATE_USER,
} from '../constants';

import { SubmissionError } from 'redux-form'

import { setCurrentUser, updateUser as updateUserAction, showLoginSpinner } from 'actions';

function* getUser({ googleUserData }) {

    window._UI_STORE_.dispatch(showLoginSpinner(true));

    window._UI_STORE_.dispatch(updateUserAction({
        permissions: { basic: true },
        ...googleUserData, // uid, displayName, email
    }));

    // hook up listener for changes to user until they log in again
    window._FIREBASE_DB_.ref('/users/' + googleUserData.uid)
    .on('value', (snapshot) => {
        const user = snapshot.val();

        debugger;

        window._UI_STORE_.dispatch(setCurrentUser(user))
    });

    yield;
}

function* updateUser({ userData }) {

    debugger;

    const updates = {};
    updates['users/' + userData.uid] = {
        ...userData
    };

    window._FIREBASE_DB_.ref()
        .update(updates);

    yield;
}

export default function* () {
    yield [
        takeEvery(GET_USER, getUser),
        takeEvery(UPDATE_USER, updateUser),
    ];
}

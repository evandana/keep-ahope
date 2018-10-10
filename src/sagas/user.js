import { takeEvery } from 'redux-saga/effects';

import {
    GET_USER,
    UPDATE_USER,
} from '../constants';

import { SubmissionError } from 'redux-form'

import { setCurrentUser, updateUser as updateUserAction, showLoginSpinner } from 'actions';

function* getUser({ googleUserData }) {

    window._UI_STORE_.dispatch(showLoginSpinner(true));
    window._UI_STORE_.dispatch(showLoginSpinner(false));

    yield;
}

function* updateUser({ userData }) {

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

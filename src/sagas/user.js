import { takeEvery } from 'redux-saga/effects';

import {
    GET_USER,
    UPDATE_USER,
} from '../constants';

import { SubmissionError } from 'redux-form'

import { setCurrentUser, updateUser as updateUserAction, showLoginSpinner } from 'actions';

function* getUser({ googleUserData }) {

    window._UI_STORE_.dispatch(showLoginSpinner(true));

    console.log('TODO: hook up to Parse to do the same fetches and changes to users table');
    // TODO: REMOVE THIS ONCE PARSE IS SET UP
    window._UI_STORE_.dispatch( setCurrentUser( {
        ...{ permissions: { basic: true } },
        ...googleUserData,
    } ) ); 

    // // add user into db, if not already
    // window._FIREBASE_DB_.ref('/users/')
    //     .once('value', (snapshot) => {
    //         const users = snapshot.val();

    //         if (!Object.keys(users).includes(googleUserData.uid)) {
    //             // add user into db
    //             window._UI_STORE_.dispatch(updateUserAction({
    //                 ...{ permissions: {basic: false} },
    //                 ...googleUserData, // uid, displayName, email
    //             }));
    //         }
    //     });


    // // hook up listener for changes to user until they log in again
    // window._FIREBASE_DB_.ref('/users/' + googleUserData.uid)
    // .on('value', (snapshot) => {
    //     const user = snapshot.val();

    //     if (!!user) {
    //         window._UI_STORE_.dispatch(setCurrentUser(user));
    //         window._UI_STORE_.dispatch(showLoginSpinner(false));
    //     }
    // });

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

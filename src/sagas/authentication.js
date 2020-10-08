import { takeEvery } from 'redux-saga/effects';
import { OFFLINE_MODE } from '../constants'

import {
    logoutRequest as googleLogoutRequest,
    loginRequest as googleLoginRequest,
} from '../utils/googleAuth';

import {
    tokenRequest as msTokenRequest,
    loginRequest as msLoginRequest,
    logoutRequest as msLogoutRequest,
} from '../utils/msAuth';

import {
    LOGIN_REQUEST,
    LOGOUT_USER_REQUEST,
} from '../constants';

import { setCurrentUser, showLoginSpinner, logoutUserRequest as logoutUserRequestAction } from 'actions';

import stubUserJson from '../endpointStubs/users.json';

function* stubLoginRequest() {
    window._UI_STORE_.dispatch(showLoginSpinner(false));
    window._UI_STORE_.dispatch(setCurrentUser({
        permissions: { basic: true, googleAuth: true },
        email: stubUserJson.email,
        name: stubUserJson.fullName,
        uid: 'aaaa236889aaa',
    }));
    yield;
}

function* loginRequest( ) {

    window._UI_STORE_.dispatch(showLoginSpinner(true));
    
    // googleLoginRequest();
    msLoginRequest();

    yield;
}

function* logoutUserRequest() {
    googleLogoutRequest();

    yield;
}

export default function* () {
    if (OFFLINE_MODE) {
        yield [
            takeEvery(LOGIN_REQUEST, stubLoginRequest),
            // same for both
            takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
        ];
    } else {
        yield [
            takeEvery(LOGIN_REQUEST, loginRequest),
            // same for both
            takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
        ];
    }
}

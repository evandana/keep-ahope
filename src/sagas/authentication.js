import { takeEvery } from 'redux-saga/effects';

import {
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
} from '../constants';

import { setCurrentUser, showLoginSpinner, fetchConfig, getUser } from 'actions';

function getGoogleUserObj (googleUser) {
    
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("Name: " + profile.getName());
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail()); 
    // // The ID token you need to pass to your backend:
    // var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);

    return {
        uid: profile.getId(),
        displayName: profile.getName(),
        email: profile.getEmail(),
    };
};

function setGoogleUser (googleAuthUser) {
                
    const googleUser = getGoogleUserObj(googleAuthUser);

    window._UI_STORE_.dispatch(showLoginSpinner(false));

    // user data from Google Auth
    if (googleUser && googleUser.uid) {
        const googleUserData = {
            uid: googleUser.uid, // Google UID
            displayName: googleUser.displayName,
            email: googleUser.email,
        };

        // fetch initial state
        window._UI_STORE_.dispatch(fetchConfig());
        window._UI_STORE_.dispatch(getUser(googleUserData));
    }

}

function* loginGoogleRequest( { signInOverride } ) {

    window._UI_STORE_.dispatch(showLoginSpinner(true));
    
    window.gapi.load('auth2', function() {
        window.gapi.auth2.init({
            client_id: "888227269181-14qpprrki7r8l9b6gaknd9fle8gkas9k.apps.googleusercontent.com",
            scope: "profile email"
        })
        .then(function(auth2) {
            window._GOOGLE_CLOUD_AUTH2_ = auth2;

            const isSignedIn = auth2.isSignedIn.get();
            console.log( "signed in: " + isSignedIn );
        
            if ( isSignedIn ) {

                window._UI_STORE_.dispatch(showLoginSpinner(false));

                setGoogleUser( auth2.currentUser.get() );

            } else if ( signInOverride === undefined || !!signInOverride ) {
                return auth2.signIn()
                    .then( setGoogleUser )
                    .catch( (error) => {
            
                        console.log('ERROR with Google Login', error);
            
                        window._UI_STORE_.dispatch( setCurrentUser({ permissions: {} }) );
                    });
            } else {
                window._UI_STORE_.dispatch(showLoginSpinner(false));
            }
        });
    });

    yield;
}

function* logoutUserRequest() {
    
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

    window._UI_STORE_.dispatch( setCurrentUser({
        displayName: null,
        email: null,
        permissions: {},
        uid: null
    }) );
    
    console.log('You have been logged out');

    window._UI_STORE_.dispatch(showLoginSpinner(false));
    
    yield;
}

export default function* () {
    yield [
        takeEvery(LOGIN_GOOGLE_REQUEST, loginGoogleRequest),
        takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
    ];
}

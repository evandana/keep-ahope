import { takeEvery } from 'redux-saga/effects';

import {
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
} from '../constants';

import { setCurrentUser, showLoginSpinner } from 'actions';

function* loginGoogleRequest() {

    window._UI_STORE_.dispatch(showLoginSpinner(true));

    window.gapi.load('auth2', function() {
        window.gapi.auth2.init({
            client_id: "888227269181-14qpprrki7r8l9b6gaknd9fle8gkas9k.apps.googleusercontent.com",
            scope: "profile email" // this isn't required, I think?
        }).then(function(auth2) {
            window._GOOGLE_CLOUD_AUTH2_ = auth2;
            console.log( "signed in: " + auth2.isSignedIn.get());

            // check if user is logged in 
            // if user isn't, then log them in 
            if (window._Parse_.User.current()){
                const loggedInUser = window._Parse_.User.current();
                const Role = window._Parse_.Object.extend('_Role');
                const roleQuery = new window._Parse_.Query(Role).equalTo('users', loggedInUser);
                
                roleQuery.first().then(result => {
                    if(result) {
                        // TODO: we need to revisit this
                        // what I'm trying to do here is check the _Role class 'user' column to see if 
                        // the current logged in user is in it. If we get any results, it means that it 
                        // is. What I don't understand, is why we don't get any user info back from the 
                        // call. But functionally it is correct 
    
                        // A parse relation on the backend is just a FK relationship to another table
                        // but you use the parse object as the search parameter, not a foreign key field
                        
                        // for now we can equate Admin role with basic permissions
                        window._UI_STORE_.dispatch(setCurrentUser({
                            permissions: { basic: true },
                            email: loggedInUser.attributes.email,
                            name: loggedInUser.attributes.email,
                            uid: loggedInUser.id,
                        }));
                    } else {
                        window._UI_STORE_.dispatch(setCurrentUser({
                            permissions: { basic: false },
                            email: loggedInUser.attributes.email,
                            name: loggedInUser.attributes.email,
                            uid: loggedInUser.id,
                        }));
                    }
                }).catch(e => {
                    console.log('Sign in error: ', e)
                }).finally(() => {
                    window._UI_STORE_.dispatch(showLoginSpinner(false));
                })
            } else {
                window._GOOGLE_CLOUD_AUTH2_.signIn().then(googleUser => {
                    const profile = googleUser.getBasicProfile();
            
                    // The ID token you need to pass to your backend:
                    const google_id = profile.getId();
            
                    const authResp = googleUser.getAuthResponse();
                    const user = new window._Parse_.User();
                    user.setEmail(profile.getEmail());
                    user._linkWith('google', { 
                        authData: {
                            'id': google_id, 
                            'id_token': authResp.id_token, 
                            'access_token': authResp.access_token 
                        }
                    });
            
                    user.givenName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.fullName = user.givenName.concat(' ', user.lastName);

                    window._UI_STORE_.dispatch({ type: LOGIN_GOOGLE_REQUEST })
                }).catch(() => {
                    alert('An error occured during login');
                    window._UI_STORE_.dispatch(showLoginSpinner(false));
                })
            }
        });
    });

    yield;
}

function* logoutUserRequest() {
    window._GOOGLE_CLOUD_AUTH2_.signOut.then(() => {
        window._Parse_.User.logout().then(
            window._UI_STORE_.dispatch( 
                setCurrentUser({
                    displayName: null,
                    email: null,
                    permissions: {},
                    uid: null        
                })
            )
        )
    })
    console.log('You have been logged out');
    yield;
}

export default function* () {
    yield [
        takeEvery(LOGIN_GOOGLE_REQUEST, loginGoogleRequest),
        takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
    ];
}

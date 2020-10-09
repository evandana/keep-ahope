import { setCurrentUserAsHavingPermissions, setCurrentUserAsNotHavingPermissions } from './loginUtils';
import { setCurrentUser, showLoginSpinner, logoutUserRequest as logoutUserRequestAction } from 'actions';
import { LOGIN_REQUEST } from '../constants';

import { PublicClientApplication } from '@azure/msal-browser';
import { UserAgentApplication } from '@azure/msal';

const LogLevel = {
    Warn: 'warn',
    Error: 'error',
};

export const config = {
    auth: {
        // clientId: '249830c1-2833-4390-9b02-ee317eed17ef', // microsoft work accounts
        clientId: '5391541c-2ee4-4e33-b671-ab58f8a943dc', // microsoft personal accounts
        // redirectUri: "https://keep-ahope.appspot.com/", //defaults to application start page
        // postLogoutRedirectUri: "https://keep-ahope.appspot.com/"
        redirectUri: "http://localhost:3000/", //defaults to application start page
        postLogoutRedirectUri: "http://localhost:3000/logout",
        // authority sets the audience
        authority: 'https://login.microsoftonline.com/consumers',
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    console.info('Log Message: <<Redacted to protect PII>>');
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: false
        },
        windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        // loadFrameTimeout: 0
    }
}

var msUserInfo = {};
var msLoginInfo = {};

const myMsal = new PublicClientApplication(config);
const userAgentApplication = new UserAgentApplication(config);

const getAccessTokenRequest = () => ({
    scopes: ["user.read"],
    sid: msLoginInfo?.idTokenClaims?.sid,
});

const requestToken = () => {
    const accessTokenRequest = getAccessTokenRequest();
    console.log('---accessTokenRequest', accessTokenRequest)
    return userAgentApplication.acquireTokenSilent(accessTokenRequest)
        .then(function(accessTokenResponse) {
            // Acquire token silent success
            // Call API with token
            let accessToken = accessTokenResponse.accessToken;
            console.warn('--accessToken', accessToken)
        }).catch(function (error) {
            //Acquire token silent failure, and send an interactive request
            if (error.errorMessage.indexOf("interaction_required") !== -1) {
                userAgentApplication.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
                    // Acquire token interactive success
                    console.warn('---accessToken interactive SUCCESS', accessTokenResponse);
                }).catch(function(error) {
                    // Acquire token interactive failure
                    console.warn('---accessToken interactive ERROR', error);
                });
            }
            console.warn('---accessToken ERROR', error);
        });
}

const loginRequestObject = {
    scopes: ["User.Read"],
    // scopes: ["User.ReadWrite"]
};

export const loginRequest = () => {
    myMsal.loginPopup(loginRequestObject)
        .then(function (loginResponse) {
            //login success
            console.warn('---loginResponse', loginResponse);

            // In case multiple accounts exist, you can select
            const currentAccounts = myMsal.getAllAccounts();
        
            if (currentAccounts === null) {
                // no accounts detected
                console.warn('---MS LOGIN: no accounts detected');
            } else if (currentAccounts.length > 1) {
                // Add choose account code here
                console.warn('---MS LOGIN: choose account');
            } else if (currentAccounts.length === 1) {
                const {username: email, name, uniqueId: uid} = currentAccounts[0];
                console.warn('---MS LOGIN SUCCESS', email);
                msUserInfo = currentAccounts[0];
                msLoginInfo = loginResponse;
                setCurrentUserAsHavingPermissions({
                    email,
                    fullName: name,
                    uid,
                });
                requestToken();
            }
        
        }).catch(function (error) {
            //login failure
            console.warn('---', error);
        });
}

// you can select which account application should sign out
const logoutRequestObject = {
    account: myMsal.getAccountByUsername(msUserInfo.email)
}

export const logoutRequest = () => myMsal.logout(logoutRequestObject);
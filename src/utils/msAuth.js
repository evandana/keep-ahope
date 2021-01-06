import { setCurrentUserAsHavingPermissions, setCurrentUserAsNotHavingPermissions } from './loginUtils';
import { setCurrentUser, showLoginSpinner, logoutUserRequest as logoutUserRequestAction } from 'actions';
import { LOGIN_REQUEST } from '../constants';

import { PublicClientApplication } from '@azure/msal-browser';
import { UserAgentApplication } from '@azure/msal';

const LogLevel = {
    Warn: 'warn',
    Error: 'error',
};

// MICROSOFT PERSONAL ACCOUNTS
const clientId = "5391541c-2ee4-4e33-b671-ab58f8a943dc"; // Application (client) ID of your API's application registration
// ahope-dev (not personal accounts)
// const clientId = "249830c1-2833-4390-9b02-ee317eed17ef"; // Application (client) ID of your API's application registration
const b2cDomainHost = "ahopedevdomain.onmicrosoft.com";
const tenantId = "258ce1bd-9043-4c45-96a8-c2a9c6cce4e6"; // Alternatively, you can use your Directory (tenant) ID (a GUID)
// const tenantId = "2d9ca35b-66c3-4866-8c88-a4c56f53e020"; // b2c tenant // Alternatively, you can use your Directory (tenant) ID (a GUID)
// const tenantId = "9188040d-6c67-4c5b-b112-36a304b66dad"; // Alternatively, you can use your Directory (tenant) ID (a GUID)
// const policyName = "spot";

export const config = {
    auth: {
        clientId: clientId,
        // authority sets the audience
        // authority: `https://login.microsoftonline.com/${tenantId}`,
        authority: 'https://login.microsoftonline.com/consumers',

        // MICROSOFT WORK ACCOUNTS
        // clientId: '249830c1-2833-4390-9b02-ee317eed17ef',
        // jwks: 'kg2LYs2T0CTjIfj4rt6JIynen38',
        // LOCAL DEV
        redirectUri: "http://localhost:3000/", //defaults to application start page
        postLogoutRedirectUri: "http://localhost:3000/logout",
        // FOR PROD
        // redirectUri: "https://keep-ahope.appspot.com/", //defaults to application start page
        // postLogoutRedirectUri: "https://keep-ahope.appspot.com/"
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
                        // console.warn(message);
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
var accessToken = '';

const myMsal = new PublicClientApplication(config);
const userAgentApplication = new UserAgentApplication(config);

const getAccessTokenRequest = () => ({
    scopes: [`api://${clientId}/ahope_scope`],
    sid: msLoginInfo?.idTokenClaims?.sid,
});

export const testToken = (overrideToken) => {

    console.log(`testing with token: ${(overrideToken || accessToken).substr(0, 10)}...`)
    return fetch('http://localhost:7071/api/contact/aaaa000000aaa', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            //   'Content-Type': 'application/json'
              'Authorization': `Bearer ${overrideToken || accessToken}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
            // .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(`ERRAH: ${err}`));
};

const requestToken = () => {
    const accessTokenRequest = getAccessTokenRequest();
    console.log('---accessTokenRequest', accessTokenRequest)
    return userAgentApplication.acquireTokenSilent(accessTokenRequest)
        .then(function(accessTokenResponse) {
            // Acquire token silent success
            // Call API with token
            accessToken = accessTokenResponse.accessToken;
            console.warn('--accessToken SUCCESS', `${accessToken.substr(0,10)}...`);
            // testToken(accessToken);
        }).catch(function (error) {
            //Acquire token silent failure, and send an interactive request
            if (error.errorMessage.indexOf("interaction_required") !== -1) {
                userAgentApplication.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
                    // Acquire token interactive success
                    accessToken = accessTokenResponse.accessToken;
                    // console.warn('---accessToken interactive SUCCESS');
                }).catch(function(error) {
                    // Acquire token interactive failure
                    accessToken = '';
                    // console.warn('---accessToken interactive ERROR', error);
                });
            }
            accessToken = '';
            // console.warn('---accessToken ERROR', error);
        });
}

const loginRequestObject = {
    // identityMetadata: "https://" + b2cDomainHost + "/" + tenantId + "/" + policyName + "/v2.0/.well-known/openid-configuration/",
    identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration/`,
    clientId: clientId,
    // policyName: policyName,
    // isB2C: false,
    // clientSecret pairs with clientId 539..
    clientSecret: '5wJzijADc_d9Rw_vc-GP_Pc0lS73P~Kcc8',
    validateIssuer: false,
    loggingLevel: 'info',
    loggingNoPII: false,
    passReqToCallback: false,
    scopes: ["User.Read"],
}

// const loginRequestObject = {
//     scopes: ["User.Read"],
//     // scopes: ["User.ReadWrite"]
// };

export const loginRequest = () => {
    console.log('calling loginRequest ++++++++++++++++++++++++++++++++++++++')
    return myMsal.loginPopup(loginRequestObject)
        .then(function (loginResponse) {
            //login success
            console.warn('---loginResponse', loginResponse);

            const loginToken = loginResponse.accessToken;
            testToken(loginToken);

            // In case multiple accounts exist, you can select
            const currentAccounts = myMsal.getAllAccounts();
        
            if (currentAccounts === null) {
                // no accounts detected
                // console.warn('---MS LOGIN: no accounts detected');
            } else if (currentAccounts.length > 1) {
                // Add choose account code here
                // console.warn('---MS LOGIN: choose account');
            } else if (currentAccounts.length === 1) {
                const {username: email, name, uniqueId: uid} = currentAccounts[0];
                // console.warn('---MS LOGIN SUCCESS', email);
                msUserInfo = currentAccounts[0];
                msLoginInfo = loginResponse;
                setCurrentUserAsHavingPermissions({
                    email,
                    fullName: name,
                    uid,
                });
                requestToken(); // --- TURN THIS BACK ON!
            }
        
        }).catch(function (error) {
            //login failure
            // console.warn('---', error);
        });
}

// you can select which account application should sign out
const logoutRequestObject = {
    account: myMsal.getAccountByUsername(msUserInfo.email)
}

export const logoutRequest = () => myMsal.logout(logoutRequestObject);
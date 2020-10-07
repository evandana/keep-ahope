export const config = {
    auth: {
        clientId: '249830c1-2833-4390-9b02-ee317eed17ef',
        redirectUri: "https://keep-ahope.appspot.com/", //defaults to application start page
        postLogoutRedirectUri: "https://keep-ahope.appspot.com/"
    }
}

const loginRequest = {
    scopes: ["User.ReadWrite"]
}

const myMsal = new PublicClientApplication(config);
// const userAgentApplication = new UserAgentApplication(config);

const accessTokenRequest = {
    scopes: ["user.read"]
}

// const requestToken = userAgentApplication.acquireTokenSilent(accessTokenRequest)
const requestToken = myMsal.acquireTokenSilent(accessTokenRequest)
    .then(function(accessTokenResponse) {
        // Acquire token silent success
        // Call API with token
        let accessToken = accessTokenResponse.accessToken;
    }).catch(function (error) {
        //Acquire token silent failure, and send an interactive request
        if (error.errorMessage.indexOf("interaction_required") !== -1) {
            userAgentApplication.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
                // Acquire token interactive success
            }).catch(function(error) {
                // Acquire token interactive failure
                console.log(error);
            });
        }
        console.log(error);
    });

export const login = myMsal.loginPopup(loginRequest)
    .then(function (loginResponse) {
        //login success

        // In case multiple accounts exist, you can select
        const currentAccounts = myMsal.getAllAccounts();
    
        if (currentAccounts === null) {
            // no accounts detected
        } else if (currentAccounts.length > 1) {
            // Add choose account code here
        } else if (currentAccounts.length === 1) {
            username = currentAccounts[0].username;
        }
    
    }).catch(function (error) {
        //login failure
        console.log(error);
    });

// you can select which account application should sign out
const logoutRequest = {
    account: myMsal.getAccountByUsername(username)
}

export const logout = myMsal.logout(logoutRequest);
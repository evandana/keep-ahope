import React from 'react';
import { useMsal } from "@azure/msal-react";

function App() {
  const { instance, accounts, inProgress } = useMsal();

  if (accounts.length > 0) {
    return (
      <>
        <p>There are currently {accounts.length} users signed in!</p>
        <button onClick={() => instance.logout()}>Logout</button>
      </>
    )
  } else if (inProgress === "login") {
    return <p>Login is currently in progress!</p>
  } else {
    return (
      <>
        <p>There are currently no users signed in!</p>
        <button onClick={() => instance.loginPopup()}>Login</button>
      </>
    );
  }
}

export default App;

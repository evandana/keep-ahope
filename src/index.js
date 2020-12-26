import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const configuration = {
  auth: {
    clientId: '2280eb47-32ca-4d19-8850-121fa68f6ee0',
    authority: 'https://login.microsoftonline.com/554f3cfe-c7c2-4b8c-8766-970737835a38/'
  }
};

const pca = new PublicClientApplication(configuration);

const AppProvider = () => (
  <MsalProvider instance={pca}>
      <App />
  </MsalProvider>
);

ReactDOM.render(<AppProvider />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

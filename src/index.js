import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { EventType, PublicClientApplication } from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: "f1725b6f-7c59-4bf3-a416-27d5e10be1cd",
    authority:
      "https://login.microsoftonline.com/a5bdc0d4-1a34-4785-8554-8679e8b9c851",
    redirectUri: "/",
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: "/login",
    // knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        console.log(message);
      },
    },
  },
});

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    console.log({ event });
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={pca}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

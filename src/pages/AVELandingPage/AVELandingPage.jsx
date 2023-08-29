import React from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import "./AVELandingPage.css";

const AVELandingPage = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const onLogin = () => {
    instance
      .loginRedirect({
        scopes: ["user.read"],
      })
      .then((res) => {
        instance.handleRedirectPromise().catch((error) => {
          console.log(error);
        });
      });
  };

  const onLogout = () => {
    const activeAccount = instance.getActiveAccount();
    instance.logoutRedirect({ account: activeAccount });
  };

  return (
    <div className="ave-landing-page">
      <div className="ave-dashboard-content">
        <span className="ave-dashboard-title">AV ENGAGE</span>
        <div className="ave-dashboard-btn">
          <div className="ave-dashboard-btn-submit">
            {isAuthenticated ? (
              <div
                className="ave-dashboard-btn-submit-field"
                onClick={onLogout}
              >
                Log out
              </div>
            ) : (
              <div className="ave-dashboard-btn-submit-field" onClick={onLogin}>
                Log In
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVELandingPage;

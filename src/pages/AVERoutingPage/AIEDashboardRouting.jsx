import React, { useState } from "react";
import AVESidebar from "../AVESidebar/AVESidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import useAVEDashboard from "../../hooks/AVEDashboard/useAVEDashboard";

const AIEDashboardRouting = () => {
  useAVEDashboard();
  return (
    <div>
      <AVESidebar>
        <section>
          <main className="ave-body">
            <Outlet />
          </main>
        </section>
      </AVESidebar>
    </div>
  );
};

export default AIEDashboardRouting;

function RequireAuth({ children }) {
  let location = useLocation();
  return (
    <>
      {children}
      {/* <AuthenticatedTemplate></AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Navigate to="/login" state={{ from: location }} replace />;
      </UnauthenticatedTemplate> */}
    </>
  );
}

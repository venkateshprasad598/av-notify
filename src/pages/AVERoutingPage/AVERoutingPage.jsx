import React from "react";
import AVELandingPage from "../AVELandingPage/AVELandingPage";
import { Route, Routes } from "react-router-dom";
import { routeList } from "../../routes";
import AIEDashboardRouting from "../AVERoutingPage/AIEDashboardRouting";

const AVERoutingPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AVELandingPage />} />
        <Route path="/" element={<AIEDashboardRouting />}>
          {routeList.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default AVERoutingPage;

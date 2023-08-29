import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

import { BiLogOut, BiNotification } from "react-icons/bi";
import { MdOutlineEditNotifications } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { NavLink } from "react-router-dom";
import "./AVESidebar.css";
import { useMsal } from "@azure/msal-react";

const AVESidebar = ({ children }) => {
  const localStorageUser = localStorage.getItem("User");
  const UserObj = JSON.parse(localStorageUser);

  const User = {
    firstName: UserObj?.givenName ? UserObj?.givenName : "",
    lastName: UserObj?.surname ? UserObj?.surname : "",
  };

  const userName = `${User.firstName} ${User.lastName}`;
  const { instance } = useMsal();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/",
      name: "Send",
      icon: <BiNotification />,
    },
    {
      path: "/update-template",
      name: "Update Template",
      icon: <MdOutlineEditNotifications />,
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <GoReport />,
    },
  ];

  const onLogout = () => {
    const activeAccount = instance.getActiveAccount();
    instance.logoutRedirect({ account: activeAccount });
  };
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="AVESidebar">
        <div className="AVESidebar-container">
          <div className="top_section">
            <span
              style={{ display: isOpen ? "block" : "none" }}
              className="logo"
            >
              {userName && userName?.length > 10
                ? userName.substring(0, 10) + "..."
                : userName}
            </span>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="ava-sidebar-logout" onClick={onLogout}>
          {isOpen && <span className="ava-sidebar-logout-name">Log out</span>}
          <span className="ava-sidebar-logout-icon">{<BiLogOut />}</span>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AVESidebar;

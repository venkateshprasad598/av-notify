import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CategoryIcon from "@mui/icons-material/Category";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Avatar, Button, Tooltip } from "@mui/material";
import { useMsal } from "@azure/msal-react";

const drawerWidth = 280;

export default function ClippedDrawer({ children }) {
  const { instance } = useMsal();

  const [activeSidebar, setActiveSidebar] = useState("Send to users");
  const localStorageUser = localStorage.getItem("User");
  const UserObj = JSON.parse(localStorageUser);

  const User = {
    firstName: UserObj?.givenName ? UserObj?.givenName : "",
    lastName: UserObj?.surname ? UserObj?.surname : "",
  };
  const userName = `${User.firstName} ${User.lastName}`;
  const avatarName = `${User?.firstName?.[0] ? User?.firstName?.[0] : ""}${
    User?.lastName?.[0] ? User?.lastName?.[0] : ""
  }`;

  const onLogout = () => {
    const activeAccount = instance.getActiveAccount();
    instance.logoutRedirect({ account: activeAccount });
  };

  const onactiveBarChange = (name) => {
    setActiveSidebar(name);
  };
  const menuItem = [
    {
      path: "/",
      name: "Send to users",
      icon: <NotificationsActiveIcon />,
    },
    {
      path: "/coming-soon",
      name: "Send to category",
      icon: <CategoryIcon />,
    },
    {
      path: "/update-template",
      name: "Update Template",
      icon: <EditNoteIcon />,
    },
  ];

  const menuItemSecond = [
    {
      path: "/coming-soon",
      name: "Reports",
      icon: <FeedbackIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#215fff",
        }}
      >
        <Toolbar className="flex items-center justify-between">
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ fontWeight: "600" }}
          >
            AV ENGAGE
          </Typography>
          <Typography
            noWrap
            component="div"
            className="flex items-center gap-3"
          >
            <Tooltip title={userName} variant="soft">
              <Avatar
                style={{ height: "32px", width: "32px", fontSize: "12px" }}
              >
                {avatarName}
              </Avatar>
            </Tooltip>
            <span className="cursor-pointer" onClick={onLogout}>
              Logout
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                activeclassName="ave-sidebar-active"
                onClick={() => onactiveBarChange(item.name)}
              >
                <ListItem
                  key={item}
                  disablePadding
                  style={{
                    backgroundColor:
                      activeSidebar == item.name ? "rgba(0, 0, 0, 0.04)" : "",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon style={{ fontSize: "24px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {menuItemSecond.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                onClick={() => onactiveBarChange(item.name)}
              >
                <ListItem
                  key={item}
                  disablePadding
                  style={{
                    backgroundColor:
                      activeSidebar == item.name ? "rgba(0, 0, 0, 0.04)" : "",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon style={{ fontSize: "24px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

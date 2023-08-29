import AVESendToUsers from "../pages/AVESendNotifications/AVESendToUsers";

export const routeList = [
  // _BEGIN > DEVELOPER AREA 51 PAGES < SHB
  {
    id: "send",
    path: "/",
    name: "send",
    icon: "",
    element: <AVESendToUsers />,
    isVisible: true,
    isAuth: true,
    accessRoles: [],
  },

  {
    id: "updateTemplate",
    path: "/update-template",
    name: "send",
    icon: "",
    element: <AVESendToUsers />,
    isVisible: true,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: "reports",
    path: "/reports",
    name: "reports",
    icon: "",
    element: <AVESendToUsers />,
    isVisible: true,
    isAuth: true,
    accessRoles: [],
  },
];

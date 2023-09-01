import AVECreateTemplate from "../components/AVECreateTemplate/AVECreateTemplate";
import AVESendToUsers from "../pages/AVESendNotifications/AVESendToUsers";
import AVEAddTemplate from "../pages/AVEUpdateTemplate/AVEAddTemplate";
import AVEUpdateTemplate from "../pages/AVEUpdateTemplate/AVEUpdateTemplate";
import ComingSoon from "../pages/ComingSoon/ComingSoon";

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
    name: "update",
    icon: "",
    element: <AVEAddTemplate />,
    isVisible: true,
    isAuth: true,
    accessRoles: [],
  },

  {
    id: "addTemplate",
    path: "/add-template",
    name: "add",
    icon: "",
    element: <AVEAddTemplate />,
    isVisible: true,
    isAuth: true,
    accessRoles: [],
  },

  {
    id: "reports",
    path: "/coming-soon",
    name: "reports",
    icon: "",
    element: <ComingSoon />,
    isVisible: true,
    isAuth: true,
    accessRoles: [],
  },
];

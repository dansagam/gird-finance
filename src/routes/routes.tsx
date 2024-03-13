import homeRoutes from "@/modules/home/routes/homeRoutes";

import { RouteObject, Outlet } from "react-router-dom";

export const MODIFY_BATH_PATH = {
  HOME: "transations",
};
export const BASE_PATH = {
  HOME: "/" + MODIFY_BATH_PATH.HOME,
} as const;

export const mainRoutes: RouteObject[] = [
  {
    path: MODIFY_BATH_PATH.HOME,
    element: <Outlet />,
    children: homeRoutes,
  },
];

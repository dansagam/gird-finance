import React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { BASE_PATH, mainRoutes } from "./routes";
import NotFound from "@/components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={BASE_PATH.HOME} />,
  },
  {
    path: "/",
    element: (
      <React.Suspense
        fallback={<div className="w-screen h-screen flex justify-center items-center bg-white">Loading...</div>}
      >
        <Outlet />
      </React.Suspense>
    ),
    children: mainRoutes,
  },
  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { mainRoutes } from "./routes";
import NotFound from "@/components/NotFound";

const router = createBrowserRouter([
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

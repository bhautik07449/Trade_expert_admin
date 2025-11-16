import React from "react";
import { Navigate, useRoutes } from "react-router";
import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";

export const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("admin_store");
  return user ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("admin_store");
  return user ? <Navigate to="/" /> : children;
};

const routes = () => [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AdminPanelLayout />,
    children: [
      {
        element: <Dashboard />,
        path: "/",
        index: true,
      },
    ],
  },
];

export default function Routes(props) {
  // const { isLoggedIn } = props;
  // return useRoutes(routes(isLoggedIn));
  return useRoutes(routes());
}

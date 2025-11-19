import React from "react";
import { Navigate, useRoutes } from "react-router";
import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import AdminsManagement from "../pages/UserManagement/AdminsManagement/AdminsManagement";
import SuppliersManagement from "../pages/UserManagement/SuppliersManagement/SuppliersManagement";
import ProductManagement from "../pages/StockManagement/ProductManagement/ProductManagement";
import CategoryManagement from "../pages/StockManagement/CategoryManagement/CategoryManagement";
import DMRManagement from "../pages/StockManagement/DMRManagement/DMRManagement";

export const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("token");
  return user ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("token");
  return user ? <Navigate to="/" /> : children;
};

const routes = (isLoggedIn) => [
  {
    path: "/login",
    element: isLoggedIn ? <AdminPanelLayout /> : <Login />,
  },
  {
    path: "/",
    element: isLoggedIn ? <AdminPanelLayout /> : <Login />,
    children: [
      {
        element: <Dashboard />,
        path: "/",
        index: true,
      },
      {
        element: <AdminsManagement />,
        path: "/user-management/admins-management",
        index: true,
      },
      {
        element: <SuppliersManagement />,
        path: "/user-management/suppliers-management",
        index: true,
      },
      {
        element: <ProductManagement />,
        path: "/stock-management/product_management",
        index: true,
      },
      {
        element: <CategoryManagement />,
        path: "/stock-management/category-management",
        index: true,
      },
      {
        element: <DMRManagement />,
        path: "/stock-management/dmr-management",
        index: true,
      },
    ],
  },
];

export default function Routes(props) {
  const { isLoggedIn } = props;
  return useRoutes(routes(isLoggedIn));
}

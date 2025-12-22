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
import AddEditAdmin from "../pages/UserManagement/AdminsManagement/AddEditAdmin";
import AddEditSuppliers from "../pages/UserManagement/SuppliersManagement/AddEditSuppliers";
import AddProduct from "../pages/StockManagement/ProductManagement/addProduct";
import AddDMR from "../pages/StockManagement/DMRManagement/AddDMR";
import BuyerManagement from "../pages/BuyerInteraction/BuyerManagement/BuyerManagement";
import QuotationManagement from "../pages/BuyerInteraction/QuotationManagement/QuotationManagement";
import RequestSamplesManagement from "../pages/BuyerInteraction/RequestSamplesManagement/RequestSamplesManagement";
import InquiryManagement from "../pages/BuyerInteraction/InquiryManagement/InquiryManagement";
import ContactManagement from "../pages/BuyerInteraction/ContactManagement/ContactManagement";
import CreditAccountManagement from "../pages/BuyerInteraction/CreditAccountManagement/CreditAccountManagement";

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
        element: <AddEditAdmin />,
        path: "/user-management/admins-management/:type",
        index: true,
      },
      {
        element: <SuppliersManagement />,
        path: "/user-management/suppliers-management",
        index: true,
      },
      {
        element: <AddEditSuppliers />,
        path: "/user-management/suppliers-management/:type",
        index: true,
      },
      {
        element: <ProductManagement />,
        path: "/stock-management/product_management",
        index: true,
      },
      {
        element: <AddProduct />,
        path: "/stock-management/product_management/:type",
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
      {
        element: <AddDMR />,
        path: "/stock-management/dmr-management/:type",
        index: true,
      },
      {
        element: <BuyerManagement />,
        path: "/buyer-interaction/buyer-management",
        index: true,
      },{
        element: <QuotationManagement />,
        path: "/buyer-interaction/quotation-management",
        index: true,
      },{
        element: <RequestSamplesManagement />,
        path: "/buyer-interaction/request-samples-management",
        index: true,
      },{
        element: <InquiryManagement />,
        path: "/buyer-interaction/inquiry-management",
        index: true,
      },{
        element: <ContactManagement />,
        path: "/buyer-interaction/contact-management",
        index: true,
      },{
        element: <CreditAccountManagement />,
        path: "/buyer-interaction/credit-account-management",
        index: true,
      },
    ],
  },
];

export default function Routes(props) {
  const { isLoggedIn } = props;
  return useRoutes(routes(isLoggedIn));
}

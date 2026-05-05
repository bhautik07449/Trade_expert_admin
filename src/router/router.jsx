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
import GeneralSetting from "../pages/WebsiteManagement/Settings/GeneralSetting/GeneralSetting";
import SocialSetting from "../pages/WebsiteManagement/Settings/SocialSetting/SocialSetting";
import CurrencyManagement from "../pages/WebsiteManagement/ContentCMS/CurrencyManagement/CurrencyManagement";
import MeasurementManagement from "../pages/WebsiteManagement/ContentCMS/MeasurementManagement/MeasurementManagement";
import PageManagement from "../pages/WebsiteManagement/ContentCMS/PageManagement/PageManagement";
import NewsletterManagement from "../pages/WebsiteManagement/ContentCMS/NewsletterManagement/NewsletterManagement";
import BrandManagement from "../pages/WebsiteManagement/ContentCMS/BrandManagement/BrandManagement";
import BlogsManagement from "../pages/WebsiteManagement/ContentCMS/BlogsManagement/BlogsManagement";
import BlogCategories from "../pages/WebsiteManagement/ContentCMS/BlogCategories/BlogCategories";
import TeamManagement from "../pages/WebsiteManagement/ContentCMS/TeamManagement/TeamManagement";
import EmailTemplate from "../pages/WebsiteManagement/ContentCMS/EmailTemplate/EmailTemplate";
import ClientManagement from "../pages/WebsiteManagement/ContentCMS/ClientManagement/ClientManagement";
import TestimonialManagement from "../pages/WebsiteManagement/ContentCMS/TestimonialManagement/TestimonialManagement";
import OfferType from "../pages/WebsiteManagement/ContentCMS/OfferType/OfferType";
import TradeOffer from "../pages/WebsiteManagement/ContentCMS/TradeOffer/TradeOffer";
import OfferRequest from "../pages/WebsiteManagement/ContentCMS/OfferRequest/OfferRequest";
import HomeBanner from "../pages/WebsiteManagement/ContentCMS/HomeBanner/HomeBanner";
import CertificationSliderManagement from "../pages/WebsiteManagement/ContentCMS/CertificationSliderManagement/CertificationSliderManagement";
import Gallery from "../pages/WebsiteManagement/ContentCMS/Gallery/Gallery";
import FAQ from "../pages/WebsiteManagement/ContentCMS/FAQ/FAQ";
import QualityPolicies from "../pages/WebsiteManagement/ContentCMS/QualityPolicies/QualityPolicies";
import AddCurrency from "../pages/WebsiteManagement/ContentCMS/CurrencyManagement/AddCurrency";
import AddMeasurement from "../pages/WebsiteManagement/ContentCMS/MeasurementManagement/AddMeasurement";
import AddPageManagement from "../pages/WebsiteManagement/ContentCMS/PageManagement/AddPageManagement";
import AddQualityPolicies from "../pages/WebsiteManagement/ContentCMS/QualityPolicies/AddQualityPolicies";
import AddEmailTemplate from "../pages/WebsiteManagement/ContentCMS/EmailTemplate/AddEmailTemplate";
import AddBrandManagement from "../pages/WebsiteManagement/ContentCMS/BrandManagement/AddBrandManagement";
import AddBlogsManagement from "../pages/WebsiteManagement/ContentCMS/BlogsManagement/AddBlogsManagement";
import AddBlogCategories from "../pages/WebsiteManagement/ContentCMS/BlogCategories/AddBlogCategories";
import AddTeamManagement from "../pages/WebsiteManagement/ContentCMS/TeamManagement/AddTeamManagement";
import AddNewsletterManagement from "../pages/WebsiteManagement/ContentCMS/NewsletterManagement/AddNewsletterManagement";
import AddClientManagement from "../pages/WebsiteManagement/ContentCMS/ClientManagement/AddClientManagement";
import AddTestimonialManagement from "../pages/WebsiteManagement/ContentCMS/TestimonialManagement/AddTestimonialManagement";
import AddOfferType from "../pages/WebsiteManagement/ContentCMS/OfferType/AddOfferType";
import AddTradeOffer from "../pages/WebsiteManagement/ContentCMS/TradeOffer/AddTradeOffer";
import AddOfferRequest from "../pages/WebsiteManagement/ContentCMS/OfferRequest/AddOfferRequest";
import AddHomeBanner from "../pages/WebsiteManagement/ContentCMS/HomeBanner/AddHomeBanner";
import AddCertificationSliderManagement from "../pages/WebsiteManagement/ContentCMS/CertificationSliderManagement/AddCertificationSliderManagement";
import AddGallery from "../pages/WebsiteManagement/ContentCMS/Gallery/AddGallery";
import AddFAQ from "../pages/WebsiteManagement/ContentCMS/FAQ/AddFAQ";
import BillofSupply from "../pages/Document/DomesticInvoice/BillofSupply/BillofSupply";
import GSTInvoice from "../pages/Document/DomesticInvoice/GSTInvoice/GSTInvoice";
import NonGSTInvoice from "../pages/Document/DomesticInvoice/NonGSTInvoice/NonGSTInvoice";
import ExportInvoice from "../pages/Document/ExportInvoice/ExportInvoice";
import Inprogress from "../pages/Inprogress";
import DocumentRenderer from "../pages/Document/ExportInvoice/DocumentRenderer";
import AddCategory from "../pages/StockManagement/CategoryManagement/AddCategory";
import Abc from "../pages/WebsiteManagement/ContentCMS/Abc/Abc";
import AddAbc from "../pages/WebsiteManagement/ContentCMS/Abc/AddAbc";

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
        path: "/user-management/admins-management/:type/*",
        index: true,
      },
      {
        element: <SuppliersManagement />,
        path: "/user-management/suppliers-management",
        index: true,
      },
      {
        element: <AddEditSuppliers />,
        path: "/user-management/suppliers-management/add",
        index: true,
      },
      {
        element: <AddEditSuppliers />,
        path: "/user-management/suppliers-management/:id",
        index: true,
      },
      {
        element: <ProductManagement />,
        path: "/stock-management/product_management",
        index: true,
      },
      {
        element: <AddProduct />,
        path: "/stock-management/product_management/add",
        index: true,
      },
      {
        element: <AddProduct />,
        path: "/stock-management/product_management/:id",
        index: true,
      },
      {
        element: <CategoryManagement />,
        path: "/stock-management/category-management",
        index: true,
      },
      {
        element: <AddCategory />,
        path: "/stock-management/category-management/add",
        index: true,
      },
      {
        element: <AddCategory />,
        path: "/stock-management/category-management/:id",
        index: true,
      },
      {
        element: <DMRManagement />,
        path: "/stock-management/dmr-management",
        index: true,
      },
      {
        element: <AddDMR />,
        path: "/stock-management/dmr-management/add",
        index: true,
      },
      {
        element: <AddDMR />,
        path: "/stock-management/dmr-management/:id",
        index: true,
      },
      {
        element: <BuyerManagement />,
        path: "/buyer-interaction/buyer-management",
        index: true,
      },
      {
        element: <QuotationManagement />,
        path: "/buyer-interaction/quotation-management",
        index: true,
      },
      {
        element: <RequestSamplesManagement />,
        path: "/buyer-interaction/request-samples-management",
        index: true,
      },
      {
        element: <InquiryManagement />,
        path: "/buyer-interaction/inquiry-management",
        index: true,
      },
      {
        element: <ContactManagement />,
        path: "/buyer-interaction/contact-management",
        index: true,
      },
      {
        element: <CreditAccountManagement />,
        path: "/buyer-interaction/credit-account-management",
        index: true,
      },
      {
        element: <GeneralSetting />,
        path: "/website-management/settings/general-settings",
        index: true,
      },
      {
        element: <SocialSetting />,
        path: "/website-management/settings/social-settings",
        index: true,
      },
      {
        element: <CurrencyManagement />,
        path: "/website-management/content/currency",
        index: true,
      },
      {
        element: <AddCurrency />,
        path: "/website-management/content/currency/add",
        index: true,
      },
      {
        element: <AddCurrency />,
        path: "/website-management/content/currency/:id",
        index: true,
      },
      {
        element: <MeasurementManagement />,
        path: "/website-management/content/measurement",
        index: true,
      },
      {
        element: <AddMeasurement />,
        path: "/website-management/content/measurement/add",
        index: true,
      },
      {
        element: <AddMeasurement />,
        path: "/website-management/content/measurement/:id",
        index: true,
      },
      {
        element: <PageManagement />,
        path: "/website-management/content/pages",
        index: true,
      },
      {
        element: <AddPageManagement />,
        path: "/website-management/content/pages/add",
        index: true,
      },
      {
        element: <AddPageManagement />,
        path: "/website-management/content/pages/:id",
        index: true,
      },
      {
        element: <QualityPolicies />,
        path: "/website-management/content/quality-policies",
        index: true,
      },
      {
        element: <AddQualityPolicies />,
        path: "/website-management/content/quality-policies/add",
        index: true,
      },
      {
        element: <AddQualityPolicies />,
        path: "/website-management/content/quality-policies/:id",
        index: true,
      },
      {
        element: <EmailTemplate />,
        path: "/website-management/content/email-template",
        index: true,
      },
      {
        element: <AddEmailTemplate />,
        path: "/website-management/content/email-template/add",
        index: true,
      },
      {
        element: <AddEmailTemplate />,
        path: "/website-management/content/email-template/:id",
        index: true,
      },
      {
        element: <BrandManagement />,
        path: "/website-management/content/brands",
        index: true,
      },
      {
        element: <AddBrandManagement />,
        path: "/website-management/content/brands/add",
        index: true,
      },
      {
        element: <AddBrandManagement />,
        path: "/website-management/content/brands/:id",
        index: true,
      },
      {
        element: <BlogsManagement />,
        path: "/website-management/content/blogs",
        index: true,
      },
      {
        element: <AddBlogsManagement />,
        path: "/website-management/content/blogs/add",
        index: true,
      },
      {
        element: <AddBlogsManagement />,
        path: "/website-management/content/blogs/:id",
        index: true,
      },
      {
        element: <BlogCategories />,
        path: "/website-management/content/blog-categories",
        index: true,
      },
      {
        element: <AddBlogCategories />,
        path: "/website-management/content/blog-categories/add",
        index: true,
      },
      {
        element: <AddBlogCategories />,
        path: "/website-management/content/blog-categories/:id",
        index: true,
      },
      {
        element: <TeamManagement />,
        path: "/website-management/content/team",
        index: true,
      },
      {
        element: <AddTeamManagement />,
        path: "/website-management/content/team/add",
        index: true,
      },
      {
        element: <AddTeamManagement />,
        path: "/website-management/content/team/:id",
        index: true,
      },
      {
        element: <NewsletterManagement />,
        path: "/website-management/content/newsletters",
        index: true,
      },
      {
        element: <AddNewsletterManagement />,
        path: "/website-management/content/newsletters/:type",
        index: true,
      },
      {
        element: <ClientManagement />,
        path: "/website-management/content/client",
        index: true,
      },
      {
        element: <AddClientManagement />,
        path: "/website-management/content/client/add",
        index: true,
      },
      {
        element: <AddClientManagement />,
        path: "/website-management/content/client/:id",
        index: true,
      },
      {
        element: <TestimonialManagement />,
        path: "/website-management/content/testinomial",
        index: true,
      },
      {
        element: <AddTestimonialManagement />,
        path: "/website-management/content/testinomial/add",
        index: true,
      },
      {
        element: <AddTestimonialManagement />,
        path: "/website-management/content/testinomial/:id",
        index: true,
      },
      {
        element: <OfferType />,
        path: "/website-management/content/offer-type",
        index: true,
      },
      {
        element: <AddOfferType />,
        path: "/website-management/content/offer-type/add",
        index: true,
      },
      {
        element: <AddOfferType />,
        path: "/website-management/content/offer-type/:id",
        index: true,
      },
      {
        element: <TradeOffer />,
        path: "/website-management/content/trade-offer",
        index: true,
      },
      {
        element: <AddTradeOffer />,
        path: "/website-management/content/trade-offer/add",
        index: true,
      },
      {
        element: <AddTradeOffer />,
        path: "/website-management/content/trade-offer/:id",
        index: true,
      },
      {
        element: <OfferRequest />,
        path: "/website-management/content/offer_req",
        index: true,
      },
      {
        element: <AddOfferRequest />,
        path: "/website-management/content/offer_req/add",
        index: true,
      },
      {
        element: <AddOfferRequest />,
        path: "/website-management/content/offer_req/:id",
        index: true,
      },
      {
        element: <HomeBanner />,
        path: "/website-management/content/home-banner",
        index: true,
      },
      {
        element: <AddHomeBanner />,
        path: "/website-management/content/home-banner/add",
        index: true,
      },
      {
        element: <AddHomeBanner />,
        path: "/website-management/content/home-banner/:id",
        index: true,
      },
      {
        element: <CertificationSliderManagement />,
        path: "/website-management/content/certification-slider",
        index: true,
      },
      {
        element: <AddCertificationSliderManagement />,
        path: "/website-management/content/certification-slider/add",
        index: true,
      },
      {
        element: <AddCertificationSliderManagement />,
        path: "/website-management/content/certification-slider/:id",
        index: true,
      },
      {
        element: <Gallery />,
        path: "/website-management/content/gallery",
        index: true,
      },
      {
        element: <AddGallery />,
        path: "/website-management/content/gallery/add",
        index: true,
      },
      {
        element: <AddGallery />,
        path: "/website-management/content/gallery/:id",
        index: true,
      },
      {
        element: <Abc />,
        path: "/website-management/content/abc",
        index: true,
      },
      {
        element: <AddAbc />,
        path: "/website-management/content/abc/add",
        index: true,
      },
      {
        element: <AddAbc />,
        path: "/website-management/content/abc/:id",
        index: true,
      },
      {
        element: <FAQ />,
        path: "/website-management/content/faq",
        index: true,
      },
      {
        element: <AddFAQ />,
        path: "/website-management/content/faq/add",
        index: true,
      },
      {
        element: <AddFAQ />,
        path: "/website-management/content/faq/:id",
        index: true,
      },
      {
        element: <BillofSupply />,
        path: "/documents/domestic-invoice/bill-of-supply",
        index: true,
      },
      {
        element: <GSTInvoice />,
        path: "/documents/domestic-invoice/gst-invoice",
        index: true,
      },
      {
        element: <NonGSTInvoice />,
        path: "/documents/domestic-invoice/non-gst-invoice",
        index: true,
      },
      {
        element: <ExportInvoice />,
        path: "/documents/export-invoice",
        index: true,
      },
      {
        element: <DocumentRenderer />,
        path: "/documents/export-invoice/:formSlug",
        index: true,
      }
    ],
  },
  {
    element: <Inprogress />,
    path: "/*",
    index: true,
  }
];

export default function Routes(props) {
  const { isLoggedIn } = props;
  return useRoutes(routes(isLoggedIn));
}

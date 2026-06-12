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
import AbcType from "../pages/WebsiteManagement/ContentCMS/AbcType/AbcType";
import AddAbcType from "../pages/WebsiteManagement/ContentCMS/AbcType/AddAbcType";
import Events from "../pages/WebsiteManagement/Country/Events/Events";
import AddEvents from "../pages/WebsiteManagement/Country/Events/AddEvents";
import Presences from "../pages/WebsiteManagement/Country/Presences/Presences";
import AddPresences from "../pages/WebsiteManagement/Country/Presences/AddPresences";
import Analytical from "../pages/WebsiteManagement/Country/Analytical/Analytical";
import AddAnalytical from "../pages/WebsiteManagement/Country/Analytical/AddAnalytical";
import TradeHistory from "../pages/WebsiteManagement/Country/TradeHistory/TradeHistory";
import AddTradeHistory from "../pages/WebsiteManagement/Country/TradeHistory/AddTradeHistory";
import ProductName from "../pages/WebsiteManagement/Country/ProductName/ProductName";
import AddProductName from "../pages/WebsiteManagement/Country/ProductName/AddProductName";
import ProductList from "../pages/WebsiteManagement/Country/ProductList/ProductList";
import AddProductList from "../pages/WebsiteManagement/Country/ProductList/AddProductList";
import ContentOverview from "../pages/WebsiteManagement/Country/ContentOverview/ContentOverview";
import AddContentOverview from "../pages/WebsiteManagement/Country/ContentOverview/AddContentOverview";
import Career from "../pages/WebsiteManagement/ContentCMS/Career/Career";
import ViewCareer from "../pages/WebsiteManagement/ContentCMS/Career/ViewCareer";
import AddMarketDevelopment from "../pages/MarketDevelopment/MarketDevelopmentProcess/AddMarketDevelopment";
import MarketDevelopment from "../pages/MarketDevelopment/MarketDevelopmentProcess/MarketDevelopment";
import MarketData from "../pages/MarketDevelopment/MarketData/MarketData";
import DeliveryReach from "../pages/WebsiteManagement/ContentCMS/DeliveryReach/DeliveryReach";
import AddDeliveryReach from "../pages/WebsiteManagement/ContentCMS/DeliveryReach/AddDeliveryReach";
import Multilingual from "../pages/WebsiteManagement/ContentCMS/Multilingual/Multilingual";
import AddMultilingual from "../pages/WebsiteManagement/ContentCMS/Multilingual/AddMultilingual";
import PolicyPreamble from "../pages/WebsiteManagement/ContentCMS/PolicyPreamble/PolicyPreamble";
import AddPolicyPreamble from "../pages/WebsiteManagement/ContentCMS/PolicyPreamble/AddPolicyPreamble";
import Affiliation from "../pages/WebsiteManagement/Country/Affiliation/Affiliation";
import AddAffiliation from "../pages/WebsiteManagement/Country/Affiliation/AddAffiliation";
import Membership from "../pages/WebsiteManagement/Country/Membership/Membership";
import AddMembership from "../pages/WebsiteManagement/Country/Membership/AddMembership";
import Investorrelations from "../pages/BuyerInteraction/Investorrelations/Investorrelations";
import ESG from "../pages/WebsiteManagement/ContentCMS/ESG/ESG";
import AddESG from "../pages/WebsiteManagement/ContentCMS/ESG/AddESG";
import Project from "../pages/WebsiteManagement/ContentCMS/Project/Project";
import AddProject from "../pages/WebsiteManagement/ContentCMS/Project/AddProject";
import AddFinacialService from "../pages/WebsiteManagement/ContentCMS/FinacialService/AddFinacialService";
import FinacialService from "../pages/WebsiteManagement/ContentCMS/FinacialService/FinacialService";
import UpcomingCollaboration from "../pages/WebsiteManagement/ContentCMS/UpcomingCollaboration/UpcomingCollaboration";
import AddUpcomingCollaboration from "../pages/WebsiteManagement/ContentCMS/UpcomingCollaboration/AddUpcomingCollaboration";

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
        path: "/user-management/internal-users/admins-management",
        index: true,
      },
      {
        element: <AddEditAdmin />,
        path: "/user-management/internal-users/admins-management/:type/*",
        index: true,
      },
      {
        element: <SuppliersManagement />,
        path: "/user-management/scm/suppliers",
        index: true,
      },
      {
        element: <AddEditSuppliers />,
        path: "/user-management/scm/suppliers/add",
        index: true,
      },
      {
        element: <AddEditSuppliers />,
        path: "/user-management/scm/suppliers/:id",
        index: true,
      },
      {
        element: <ProductManagement />,
        path: "/stock-management/product-management",
        index: true,
      },
      {
        element: <AddProduct />,
        path: "/stock-management/product-management/add",
        index: true,
      },
      {
        element: <AddProduct />,
        path: "/stock-management/product-management/:id",
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
        path: "/user-management/crm/buyers",
        index: true,
      },
      {
        element: <QuotationManagement />,
        path: "/user-management/trade/request-quote",
        index: true,
      },
      {
        element: <RequestSamplesManagement />,
        path: "/user-management/trade/request-sample",
        index: true,
      },
      {
        element: <InquiryManagement />,
        path: "/user-management/trade/product-inquiries",
        index: true,
      },
      {
        element: <ContactManagement />,
        path: "/user-management/trade/get-in-touch",
        index: true,
      },
      {
        element: <CreditAccountManagement />,
        path: "/user-management/crm/credit-account",
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
        path: "/website-management/general-management/currency",
        index: true,
      },
      {
        element: <AddCurrency />,
        path: "/website-management/general-management/currency/add",
        index: true,
      },
      {
        element: <AddCurrency />,
        path: "/website-management/general-management/currency/:id",
        index: true,
      },
      {
        element: <MeasurementManagement />,
        path: "/website-management/general-management/measurement",
        index: true,
      },
      {
        element: <AddMeasurement />,
        path: "/website-management/general-management/measurement/add",
        index: true,
      },
      {
        element: <AddMeasurement />,
        path: "/website-management/general-management/measurement/:id",
        index: true,
      },
      {
        element: <PageManagement />,
        path: "/website-management/general-management/pages",
        index: true,
      },
      {
        element: <AddPageManagement />,
        path: "/website-management/general-management/pages/add",
        index: true,
      },
      {
        element: <AddPageManagement />,
        path: "/website-management/general-management/pages/:id",
        index: true,
      },
      {
        element: <QualityPolicies />,
        path: "/website-management/pages-management/quality-policies",
        index: true,
      },
      {
        element: <AddQualityPolicies />,
        path: "/website-management/pages-management/quality-policies/add",
        index: true,
      },
      {
        element: <AddQualityPolicies />,
        path: "/website-management/pages-management/quality-policies/:id",
        index: true,
      },
      {
        element: <EmailTemplate />,
        path: "/website-management/general-management/email-template",
        index: true,
      },
      {
        element: <AddEmailTemplate />,
        path: "/website-management/general-management/email-template/add",
        index: true,
      },
      {
        element: <AddEmailTemplate />,
        path: "/website-management/general-management/email-template/:id",
        index: true,
      },
      {
        element: <BrandManagement />,
        path: "/stock-management/brands-management",
        index: true,
      },
      {
        element: <AddBrandManagement />,
        path: "/stock-management/brands-management/add",
        index: true,
      },
      {
        element: <AddBrandManagement />,
        path: "/stock-management/brands-management/:id",
        index: true,
      },
      {
        element: <BlogsManagement />,
        path: "/website-management/pages-management/blogs",
        index: true,
      },
      {
        element: <AddBlogsManagement />,
        path: "/website-management/pages-management/blogs/add",
        index: true,
      },
      {
        element: <AddBlogsManagement />,
        path: "/website-management/pages-management/blogs/:id",
        index: true,
      },
      {
        element: <BlogCategories />,
        path: "/website-management/pages-management/blog-categories",
        index: true,
      },
      {
        element: <AddBlogCategories />,
        path: "/website-management/pages-management/blog-categories/add",
        index: true,
      },
      {
        element: <AddBlogCategories />,
        path: "/website-management/pages-management/blog-categories/:id",
        index: true,
      },
      {
        element: <TeamManagement />,
        path: "/website-management/section-management/team",
        index: true,
      },
      {
        element: <AddTeamManagement />,
        path: "/website-management/section-management/team/add",
        index: true,
      },
      {
        element: <AddTeamManagement />,
        path: "/website-management/section-management/team/:id",
        index: true,
      },
      {
        element: <NewsletterManagement />,
        path: "/website-management/section-management/newsletters",
        index: true,
      },
      {
        element: <AddNewsletterManagement />,
        path: "/website-management/section-management/newsletters/:type",
        index: true,
      },
      {
        element: <ClientManagement />,
        path: "/website-management/section-management/client",
        index: true,
      },
      {
        element: <AddClientManagement />,
        path: "/website-management/section-management/client/add",
        index: true,
      },
      {
        element: <AddClientManagement />,
        path: "/website-management/section-management/client/:id",
        index: true,
      },
      {
        element: <TestimonialManagement />,
        path: "/website-management/section-management/testinomial",
        index: true,
      },
      {
        element: <AddTestimonialManagement />,
        path: "/website-management/section-management/testinomial/add",
        index: true,
      },
      {
        element: <AddTestimonialManagement />,
        path: "/website-management/section-management/testinomial/:id",
        index: true,
      },
      {
        element: <OfferType />,
        path: "/stock-management/offer-type",
        index: true,
      },
      {
        element: <AddOfferType />,
        path: "/stock-management/offer-type/add",
        index: true,
      },
      {
        element: <AddOfferType />,
        path: "/stock-management/offer-type/:id",
        index: true,
      },
      {
        element: <TradeOffer />,
        path: "/stock-management/trade-offer",
        index: true,
      },
      {
        element: <AddTradeOffer />,
        path: "/stock-management/trade-offer/add",
        index: true,
      },
      {
        element: <AddTradeOffer />,
        path: "/stock-management/trade-offer/:id",
        index: true,
      },
      {
        element: <OfferRequest />,
        path: "/stock-management/offer_req",
        index: true,
      },
      {
        element: <AddOfferRequest />,
        path: "/stock-management/offer_req/add",
        index: true,
      },
      {
        element: <AddOfferRequest />,
        path: "/stock-management/offer_req/:id",
        index: true,
      },
      {
        element: <HomeBanner />,
        path: "/website-management/section-management/home-banner",
        index: true,
      },
      {
        element: <AddHomeBanner />,
        path: "/website-management/section-management/home-banner/add",
        index: true,
      },
      {
        element: <AddHomeBanner />,
        path: "/website-management/section-management/home-banner/:id",
        index: true,
      },
      {
        element: <CertificationSliderManagement />,
        path: "/website-management/section-management/certification-slider",
        index: true,
      },
      {
        element: <AddCertificationSliderManagement />,
        path: "/website-management/section-management/certification-slider/add",
        index: true,
      },
      {
        element: <AddCertificationSliderManagement />,
        path: "/website-management/section-management/certification-slider/:id",
        index: true,
      },
      {
        element: <Gallery />,
        path: "/website-management/pages-management/gallery",
        index: true,
      },
      {
        element: <AddGallery />,
        path: "/website-management/pages-management/gallery/add",
        index: true,
      },
      {
        element: <AddGallery />,
        path: "/website-management/pages-management/gallery/:id",
        index: true,
      },
      {
        element: <AbcType />,
        path: "/stock-management/trade-diversity-management/type",
        index: true,
      },
      {
        element: <AddAbcType />,
        path: "/stock-management/trade-diversity-management/type/add",
        index: true,
      },
      {
        element: <AddAbcType />,
        path: "/stock-management/trade-diversity-management/type/:id",
        index: true,
      },
      {
        element: <Abc />,
        path: "/stock-management/trade-diversity-management/name",
        index: true,
      },
      {
        element: <AddAbc />,
        path: "/stock-management/trade-diversity-management/name/add",
        index: true,
      },
      {
        element: <AddAbc />,
        path: "/stock-management/trade-diversity-management/name/:id",
        index: true,
      },
      {
        element: <FAQ />,
        path: "/website-management/pages-management/faq",
        index: true,
      },
      {
        element: <AddFAQ />,
        path: "/website-management/pages-management/faq/add",
        index: true,
      },
      {
        element: <AddFAQ />,
        path: "/website-management/pages-management/faq/:id",
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
      },
      {
        element: <Events />,
        path: "/website-management/section-management/events",
        index: true,
      },
      {
        element: <AddEvents />,
        path: "/website-management/section-management/events/add",
        index: true,
      },
      {
        element: <AddEvents />,
        path: "/website-management/section-management/events/:id",
        index: true,
      },
      {
        element: <Presences />,
        path: "/website-management/country/presences",
        index: true,
      },
      {
        element: <AddPresences />,
        path: "/website-management/country/presences/add",
        index: true,
      },
      {
        element: <AddPresences />,
        path: "/website-management/country/presences/:id",
        index: true,
      },
      {
        element: <Analytical />,
        path: "/website-management/section-management/analytical",
        index: true,
      },
      {
        element: <AddAnalytical />,
        path: "/website-management/section-management/analytical/add",
        index: true,
      },
      {
        element: <AddAnalytical />,
        path: "/website-management/section-management/analytical/:id",
        index: true,
      },
      {
        element: <TradeHistory />,
        path: "/website-management/section-management/trade-history",
        index: true,
      },
      {
        element: <AddTradeHistory />,
        path: "/website-management/section-management/trade-history/add",
        index: true,
      },
      {
        element: <AddTradeHistory />,
        path: "/website-management/section-management/trade-history/:id",
        index: true,
      },
      {
        element: <ProductName />,
        path: "/website-management/section-management/product-name",
        index: true,
      },
      {
        element: <AddProductName />,
        path: "/website-management/section-management/product-name/add",
        index: true,
      },
      {
        element: <AddProductName />,
        path: "/website-management/section-management/product-name/edit/:id",
        index: true,
      },
      {
        element: <ProductList />,
        path: "/website-management/section-management/product-list",
        index: true,
      },
      {
        element: <AddProductList />,
        path: "/website-management/section-management/product-list/add",
        index: true,
      },
      {
        element: <AddProductList />,
        path: "/website-management/section-management/product-list/edit/:id",
        index: true,
      },
      {
        element: <ContentOverview />,
        path: "/website-management/section-management/content-overview",
        index: true,
      },
      {
        element: <AddContentOverview />,
        path: "/website-management/section-management/content-overview/add",
        index: true,
      },
      {
        element: <AddContentOverview />,
        path: "/website-management/section-management/content-overview/edit/:id",
        index: true,
      },
      {
        element: <Career />,
        path: "/user-management/internal-users/service_personnel",
        index: true,
      },
      {
        element: <ViewCareer />,
        path: "/user-management/internal-users/service_personnel/view/:id",
        index: true,
      },
      {
        element: <AddMarketDevelopment />,
        path: "/website-management/section-management/process/add",
        index: true,
      },
      {
        element: <AddMarketDevelopment />,
        path: "/website-management/section-management/process/edit/:id",
        index: true,
      },
      {
        element: <MarketDevelopment />,
        path: "/website-management/section-management/process",
        index: true,
      },
      {
        element: <MarketData />,
        path: "/website-management/section-management/data",
        index: true,
      },
      {
        element: <DeliveryReach />,
        path: "/website-management/section-management/delivery_reach",
        index: true,
      },
      {
        element: <AddDeliveryReach />,
        path: "/website-management/section-management/delivery_reach/add",
        index: true,
      },
      {
        element: <AddDeliveryReach />,
        path: "/website-management/section-management/delivery_reach/edit/:id",
        index: true,
      },
      {
        element: <Multilingual />,
        path: "/website-management/section-management/multilingual",
        index: true,
      },
      {
        element: <AddMultilingual />,
        path: "/website-management/section-management/multilingual/add",
        index: true,
      },
      {
        element: <AddMultilingual />,
        path: "/website-management/section-management/multilingual/edit/:id",
        index: true,
      },
      {
        element: <PolicyPreamble />,
        path: "/website-management/section-management/policy_preamble",
        index: true,
      },
      {
        element: <AddPolicyPreamble />,
        path: "/website-management/section-management/policy_preamble/add",
        index: true,
      },
      {
        element: <AddPolicyPreamble />,
        path: "/website-management/section-management/policy_preamble/edit/:id",
        index: true,
      },
      {
        element: <Affiliation />,
        path: "/website-management/section-management/affiliation",
        index: true,
      },
      {
        element: <AddAffiliation />,
        path: "/website-management/section-management/affiliation/add",
        index: true,
      },
      {
        element: <AddAffiliation />,
        path: "/website-management/section-management/affiliation/edit/:id",
        index: true,
      },
      {
        element: <Membership />,
        path: "/website-management/section-management/membership",
        index: true,
      },
      {
        element: <AddMembership />,
        path: "/website-management/section-management/membership/add",
        index: true,
      },
      {
        element: <AddMembership />,
        path: "/website-management/section-management/membership/edit/:id",
        index: true,
      },
      {
        element: <Investorrelations />,
        path: "/user-management/stakeholder-interest/product",
        index: true,
      },
      {
        element: <ESG />,
        path: "/website-management/pages-management/esg",
        index: true,
      },
      {
        element: <AddESG />,
        path: "/website-management/pages-management/esg/add",
        index: true,
      },
      {
        element: <AddESG />,
        path: "/website-management/pages-management/esg/edit/:id",
        index: true,
      },
      {
        element: <Project />,
        path: "/website-management/section-management/ir_project",
        index: true,
      },
      {
        element: <AddProject />,
        path: "/website-management/section-management/ir_project/add",
        index: true,
      },
      {
        element: <AddProject />,
        path: "/website-management/section-management/ir_project/edit/:id",
        index: true,
      },
      {
        element: <FinacialService />,
        path: "/website-management/section-management/finacial_service",
        index: true,
      },
      {
        element: <AddFinacialService />,
        path: "/website-management/section-management/finacial_service/add",
        index: true,
      },
      {
        element: <AddFinacialService />,
        path: "/website-management/section-management/finacial_service/edit/:id",
        index: true,
      },
      {
        element: <UpcomingCollaboration />,
        path: "/website-management/section-management/upcoming_collaboration",
        index: true,
      },
      {
        element: <AddUpcomingCollaboration />,
        path: "/website-management/section-management/upcoming_collaboration/add",
        index: true,
      },
      {
        element: <AddUpcomingCollaboration />,
        path: "/website-management/section-management/upcoming_collaboration/edit/:id",
        index: true,
      },
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

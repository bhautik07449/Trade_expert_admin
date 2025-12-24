import { Boxes, CreditCard, FileEdit, FileSpreadsheet, FileText, Folder, Globe, Handshake, HelpCircle, LayoutDashboard, MessageSquare, Package, PackageSearch, Phone, Settings, ShieldCheck, Tags, Truck, User, Users } from "lucide-react";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: LayoutDashboard,
          submenus: [],
        },
        {
          href: "",
          label: "User Management",
          active: pathname.includes("/user-management"),
          icon: Users,
          submenus: [
            {
              href: "/user-management/admins-management",
              label: "Admins Management",
              active: pathname.includes("/user-management/admins-management"),
              icon: ShieldCheck,
            },
            {
              href: "/user-management/suppliers-management",
              label: "Suppliers Management",
              active: pathname.includes("/user-management/suppliers-management"),
              icon: Truck,
            }
          ],
        },
        {
          href: "",
          label: "Stock Management",
          active: pathname.includes("/stock-management"),
          icon: Boxes,
          submenus: [
            {
              href: "/stock-management/product_management",
              label: "Product Management",
              active: pathname.includes("/stock-management/product_management"),
              icon: Package,
            },
            {
              href: "/stock-management/category-management",
              label: "Category Management",
              active: pathname.includes("/stock-management/category-management"),
              icon: Tags,
            },
            {
              href: "/stock-management/dmr-management",
              label: "DMR Management",
              active: pathname.includes("/stock-management/dmr-management"),
              icon: FileText,
            }
          ],
        },
        {
          href: "/website-management",
          label: "Website Management",
          active: pathname.includes("/website-management"),
          icon: Globe,
          submenus: [
            {
              href: "/website-management/content",
              label: "Content CMS",
              active: pathname.includes("/website-management/content"),
              icon: FileEdit,
              submenus: [
                {
                  href: "/website-management/content/currency",
                  label: "Currency Management",
                  active: pathname.includes("/website-management/content/currency"),
                  icon: User,
                },
                {
                  href: "/website-management/content/measurement",
                  label: "Measurement Management",
                  active: pathname.includes("/website-management/content/measurement"),
                  icon: User,
                },
                {
                  href: "/website-management/content/Pages",
                  label: "Pages Management",
                  active: pathname.includes("/website-management/content/Pages"),
                  icon: User,
                },
                {
                  href: "/website-management/content/quality-policies",
                  label: "Quality Policies",
                  active: pathname.includes("/website-management/content/quality-policies"),
                  icon: User,
                },
                {
                  href: "/website-management/content/email-template",
                  label: "Email Template",
                  active: pathname.includes("/website-management/content/email-template"),
                  icon: User,
                },
                {
                  href: "/website-management/content/brands",
                  label: "Brands Management",
                  active: pathname.includes("/website-management/content/brands"),
                  icon: User,
                },
                {
                  href: "/website-management/content/blogs",
                  label: "Blog Management",
                  active: pathname.includes("/website-management/content/blogs"),
                  icon: User,
                },
                {
                  href: "/website-management/content/blog-categories",
                  label: "Blog Category Management",
                  active: pathname.includes("/website-management/content/blog-categories"),
                  icon: User,
                },
                {
                  href: "/website-management/content/team",
                  label: "Team Management",
                  active: pathname.includes("/website-management/content/team"),
                  icon: User,
                },
                {
                  href: "/website-management/content/newsletters",
                  label: "Subscribers",
                  active: pathname.includes("/website-management/content/newsletters"),
                  icon: User,
                },
                {
                  href: "/website-management/content/client",
                  label: "Client  Management",
                  active: pathname.includes("/website-management/content/client"),
                  icon: User,
                },
                {
                  href: "/website-management/content/testinomial",
                  label: "Testimonial Management",
                  active: pathname.includes("/website-management/content/testinomial"),
                  icon: User,
                },
                {
                  href: "/website-management/content/offer-type",
                  label: "Offer Type",
                  active: pathname.includes("/website-management/content/offer-type"),
                  icon: User,
                },
                {
                  href: "/website-management/content/trade-offer",
                  label: "Trade Offer",
                  active: pathname.includes("/website-management/content/trade-offer"),
                  icon: User,
                },
                {
                  href: "/website-management/content/offer_req",
                  label: "Offer Requests",
                  active: pathname.includes("/website-management/content/offer_req"),
                  icon: User,
                },
                {
                  href: "/website-management/content/home-banner",
                  label: "Home Banner Management",
                  active: pathname.includes("/website-management/content/home-banner"),
                  icon: User,
                },
                {
                  href: "/website-management/content/certification-slider",
                  label: "Certification Slider Management",
                  active: pathname.includes("/website-management/content/certification-slider"),
                  icon: User,
                },
                {
                  href: "/website-management/content/gallery",
                  label: "Gallery Management",
                  active: pathname.includes("/website-management/content/gallery"),
                  icon: User,
                },
                {
                  href: "/website-management/content/faq",
                  label: "FAQ Management",
                  active: pathname.includes("/website-management/content/faq"),
                  icon: User,
                },
              ]
            },
            {
              href: "/website-management/settings",
              label: "Settings",
              active: pathname.includes("/website-management/settings"),
              icon: Settings,
              submenus: [
                {
                  href: "/website-management/settings/general-settings",
                  label: "General Settings",
                  active: pathname.includes("/website-management/settings/general-settings"),
                  icon: User,
                },
                {
                  href: "/website-management/settings/social-settings",
                  label: "Social Settings",
                  active: pathname.includes("/website-management/settings/social-settings"),
                  icon: Handshake,
                }
              ]
            }
          ],
        },
        {
          href: "/",
          label: "Buyer Interaction",
          active: pathname.includes("/buyer-interaction"),
          icon: MessageSquare,
          submenus: [
            {
              href: "/buyer-interaction/buyer-management",
              label: "Buyer Management",
              active: pathname.includes("/buyer-interaction/buyer-management"),
              icon: User,
            },
            {
              href: "/buyer-interaction/quotation-management",
              label: "Quotation Management",
              active: pathname.includes("/buyer-interaction/quotation-management"),
              icon: FileSpreadsheet,
            },
            {
              href: "/buyer-interaction/request-samples-management",
              label: "Request Samples Management",
              active: pathname.includes("/buyer-interaction/request-samples-management"),
              icon: PackageSearch,
            },
            {
              href: "/buyer-interaction/inquiry-management",
              label: "Inquiry Management",
              active: pathname.includes("/buyer-interaction/inquiry-management"),
              icon: HelpCircle,
            },
            {
              href: "/buyer-interaction/contact-management",
              label: "Contact Management",
              active: pathname.includes("/buyer-interaction/contact-management"),
              icon: Phone,
            },
            {
              href: "/buyer-interaction/credit-account-management",
              label: "Credit Account Management",
              active: pathname.includes("/buyer-interaction/credit-account-management"),
              icon: CreditCard,
            },
          ],
        },
        {
          href: "/",
          label: "Documents",
          active: pathname === "/documents",
          icon: Folder,
          submenus: [],
        },
      ],
    },
  ];
}

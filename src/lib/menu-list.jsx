import { Award, BadgeCheck, BookOpen, Boxes, Briefcase, ClipboardList, CreditCard, DollarSign, FileEdit, FileSpreadsheet, FileText, Folder, FolderTree, Globe, Handshake, HelpCircle, Images, LayoutDashboard, Mail, Megaphone, MessageSquare, MessageSquareQuote, Package, PackageSearch, Percent, Phone, Ruler, Settings, ShieldCheck, Tag, Tags, Truck, User, Users } from "lucide-react";

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
                  icon: DollarSign,
                },
                {
                  href: "/website-management/content/measurement",
                  label: "Measurement Management",
                  active: pathname.includes("/website-management/content/measurement"),
                  icon: Ruler,
                },
                {
                  href: "/website-management/content/pages",
                  label: "Pages Management",
                  active: pathname.includes("/website-management/content/pages"),
                  icon: FileEdit,
                },
                {
                  href: "/website-management/content/quality-policies",
                  label: "Quality Policies",
                  active: pathname.includes("/website-management/content/quality-policies"),
                  icon: ShieldCheck,
                },
                {
                  href: "/website-management/content/email-template",
                  label: "Email Template",
                  active: pathname.includes("/website-management/content/email-template"),
                  icon: Mail,
                },
                {
                  href: "/website-management/content/brands",
                  label: "Brands Management",
                  active: pathname.includes("/website-management/content/brands"),
                  icon: Award,
                },
                {
                  href: "/website-management/content/blogs",
                  label: "Blog Management",
                  active: pathname.includes("/website-management/content/blogs"),
                  icon: BookOpen,
                },
                {
                  href: "/website-management/content/blog-categories",
                  label: "Blog Category Management",
                  active: pathname.includes("/website-management/content/blog-categories"),
                  icon: FolderTree,
                },
                {
                  href: "/website-management/content/team",
                  label: "Team Management",
                  active: pathname.includes("/website-management/content/team"),
                  icon: Users,
                },
                {
                  href: "/website-management/content/newsletters",
                  label: "Subscribers",
                  active: pathname.includes("/website-management/content/newsletters"),
                  icon: Megaphone,
                },
                {
                  href: "/website-management/content/client",
                  label: "Client  Management",
                  active: pathname.includes("/website-management/content/client"),
                  icon: Briefcase,
                },
                {
                  href: "/website-management/content/testinomial",
                  label: "Testimonial Management",
                  active: pathname.includes("/website-management/content/testinomial"),
                  icon: MessageSquareQuote,
                },
                {
                  href: "/website-management/content/offer-type",
                  label: "Offer Type",
                  active: pathname.includes("/website-management/content/offer-type"),
                  icon: Tag,
                },
                {
                  href: "/website-management/content/trade-offer",
                  label: "Trade Offer",
                  active: pathname.includes("/website-management/content/trade-offer"),
                  icon: Percent,
                },
                {
                  href: "/website-management/content/offer_req",
                  label: "Offer Requests",
                  active: pathname.includes("/website-management/content/offer_req"),
                  icon: ClipboardList,
                },
                {
                  href: "/website-management/content/home-banner",
                  label: "Home Banner Management",
                  active: pathname.includes("/website-management/content/home-banner"),
                  icon: Images,
                },
                {
                  href: "/website-management/content/certification-slider",
                  label: "Certification Slider Management",
                  active: pathname.includes("/website-management/content/certification-slider"),
                  icon: BadgeCheck,
                },
                {
                  href: "/website-management/content/gallery",
                  label: "Gallery Management",
                  active: pathname.includes("/website-management/content/gallery"),
                  icon: Images,
                },
                {
                  href: "/website-management/content/faq",
                  label: "FAQ Management",
                  active: pathname.includes("/website-management/content/faq"),
                  icon: HelpCircle,
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
          submenus: [
            {
              href: "/",
              label: "Domestic Invoice",
              active: pathname === "/documents/domestic-invoice",
              icon: Folder,
              submenus: [
                {
                  href: "/",
                  label: "Bill of Supply",
                  active: pathname === "/documents/domestic-invoice",
                  icon: Folder,
                },
                {
                  href: "/",
                  label: "GST Invoice",
                  active: pathname === "/documents/domestic-invoice",
                  icon: Folder,
                }, {
                  href: "/",
                  label: "Non GST Invoice",
                  active: pathname === "/documents/domestic-invoice",
                  icon: Folder,
                }
              ]
            },
            {
              href: "/",
              label: "Export Invoice",
              active: pathname === "/documents/export-invoice",
              icon: Folder,
            }
          ],
        },
      ],
    },
  ];
}

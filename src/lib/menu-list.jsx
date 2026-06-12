import { Award, BadgeCheck, BarChart3, BookOpen, Boxes, Briefcase, BriefcaseBusiness, CalendarDays, CircleHelp, ClipboardList, CreditCard, Crown, Database, DollarSign, FileBox, FileCheck2, FileEdit, FileSpreadsheet, FileText, FileX2, Flag, Folder, FolderTree, Globe, Handshake, HandshakeIcon, HelpCircle, Images, Landmark, Languages, LayoutDashboard, Leaf, List, Mail, MapPinned, Megaphone, MessageSquare, MessageSquareQuote, Package, PackageSearch, Percent, Phone, PieChart, Projector, ReceiptText, Ruler, ScrollText, Settings, ShieldCheck, TableOfContentsIcon, Tag, Tags, TrendingUp, Truck, User, Users, Workflow } from "lucide-react";

export function getMenuList(pathname) {

  const menus = [
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
          href: "/user-management/internal-users",
          label: "Internal Users",
          active: pathname.includes("/user-management/internal-users"),
          icon: ShieldCheck,
          submenus: [
            {
              href: "/user-management/internal-users/admins-management",
              label: "Admin",
              active: pathname.includes("/user-management/internal-users/admins-management"),
              icon: ShieldCheck,
            },
            {
              href: "/user-management/internal-users/service_personnel",
              label: "Service Personnel",
              active: pathname.includes("/user-management/internal-users/service_personnel"),
              icon: ShieldCheck,
            }
          ]
        },
        {
          href: "/user-management/scm",
          label: "SCM",
          active: pathname.includes("/user-management/scm"),
          icon: Truck,
          submenus: [
            {
              href: "/user-management/scm/suppliers",
              label: "Suppliers ",
              active: pathname.includes("/user-management/scm/suppliers"),
              icon: ShieldCheck,
            }
          ],
        },
        {
          href: "/user-management/crm",
          label: "CRM",
          active: pathname.includes("/user-management/crm"),
          icon: ShieldCheck,
          submenus: [
            {
              href: "/user-management/crm/buyers",
              label: "Buyers",
              active: pathname.includes("/user-management/crm/buyers"),
              icon: ShieldCheck,
            },
            {
              href: "/user-management/trade",
              label: "Trade",
              active: pathname.includes("/user-management/trade"),
              icon: ShieldCheck,
              submenus: [
                {
                  href: "/user-management/trade/product-inquiries",
                  label: "Product Inquiries",
                  active: pathname.includes("/user-management/trade/product-inquiries"),
                  icon: ShieldCheck,
                },
                {
                  href: "/user-management/trade/request-sample",
                  label: "Request Sample",
                  active: pathname.includes("/user-management/trade/request-sample"),
                  icon: ShieldCheck,
                },
                {
                  //pending
                  href: "/user-management/trade/trade-deal",
                  label: "Trade Deal",
                  active: pathname.includes("/user-management/trade/trade-deal"),
                  icon: ShieldCheck,
                },
                {
                  href: "/user-management/trade/request-quote",
                  label: "Request Quote",
                  active: pathname.includes("/user-management/trade/request-quote"),
                  icon: ShieldCheck,
                },
                {
                  href: "/user-management/trade/get-in-touch",
                  label: "Get in Touch",
                  active: pathname.includes("/user-management/trade/get-in-touch"),
                  icon: ShieldCheck,
                }
              ],
            },
            {
              href: "/user-management/stakeholder-interest",
              label: "Stakeholder Interest",
              active: pathname.includes("/user-management/stakeholder-interest"),
              icon: ShieldCheck,
              submenus: [
                {
                  href: "/user-management/stakeholder-interest/product",
                  label: "Product",
                  active: pathname.includes("/user-management/stakeholder-interest"),
                  icon: ShieldCheck,
                }
              ]
            },
            {
              href: "/user-management/crm/credit-account",
              label: "Credit Account Management",
              active: pathname.includes("/user-management/crm/credit-account"),
              icon: CreditCard,
            },
          ],
        },
      ],
    },
    {
      href: "/",
      label: "Stock Management",
      active: pathname === "/stock-management",
      icon: LayoutDashboard,
      submenus: [
        {
          href: "/stock-management/category-management",
          label: "Category Management",
          active: pathname.includes("/stock-management/category-management"),
          icon: ShieldCheck,
        },
        {
          href: "/stock-management/product-management",
          label: "Product Management",
          active: pathname.includes("/stock-management/product-management"),
          icon: ShieldCheck,
        },
        {
          href: "/stock-management/dmr-management",
          label: "DMR Management",
          active: pathname.includes("/stock-management/dmr-management"),
          icon: ShieldCheck,
        },
        {
          href: "/stock-management/brands-management",
          label: "Brands Management",
          active: pathname.includes("/stock-management/brands-management"),
          icon: ShieldCheck,
        },
        {
          href: "/stock-management/trade-diversity-management",
          label: "Trade Diversity Management",
          active: pathname.includes("/stock-management/trade-diversity-management"),
          icon: HelpCircle,
          submenus: [
            {
              href: "/stock-management/trade-diversity-management/type",
              label: "Trade Diversity Type",
              active: pathname.includes("/stock-management/trade-diversity-management/type"),
              icon: Tag,
            },
            {
              href: "/stock-management/trade-diversity-management/name",
              label: "Trade Diversity",
              active: pathname.includes("/stock-management/trade-diversity-management/name"),
              icon: Percent,
            }
          ]
        },
        {
          href: "/stock-management/trade-management",
          label: "Trade Management",
          active: pathname.includes("/stock-management/trade-management"),
          icon: FileEdit,
          submenus: [
            {
              href: "/stock-management/offer-type",
              label: "Offer Type",
              active: pathname.includes("/stock-management/offer-type"),
              icon: Tag,
            },
            {
              href: "/stock-management/trade-offer",
              label: "Trade Offer",
              active: pathname.includes("/stock-management/trade-offer"),
              icon: Percent,
            },
            {
              href: "/stock-management/offer_req",
              label: "Offer Requests",
              active: pathname.includes("/stock-management/offer_req"),
              icon: ClipboardList,
            }
          ]
        },
      ]
    },
    {
      href: "/",
      label: "Website Management",
      active: pathname === "/",
      icon: LayoutDashboard,
      submenus: [
        {
          href: "/website-management/pages-management",
          label: "Pages Management",
          active: pathname.includes("/user-management/admins-management"),
          icon: ShieldCheck,
          submenus: [
            {
              href: "/website-management/pages-management/quality-policies",
              label: "Quality Policies",
              active: pathname.includes("/website-management/pages-management/quality-policies"),
              icon: ShieldCheck,
            },
            {
              href: "/website-management/pages-management/blogs",
              label: "Blog Management",
              active: pathname.includes("/website-management/pages-management/blogs"),
              icon: BookOpen,
            },
            {
              href: "/website-management/pages-management/blog-categories",
              label: "Blog Category Management",
              active: pathname.includes("/website-management/pages-management/blog-categories"),
              icon: FolderTree,
            },
            {
              href: "/website-management/pages-management/gallery",
              label: "Gallery Management",
              active: pathname.includes("/website-management/pages-management/gallery"),
              icon: Images,
            },
            {
              href: "/website-management/pages-management/faq",
              label: "FAQ Management",
              active: pathname.includes("/website-management/pages-management/faq"),
              icon: CircleHelp,
            },
            {
              href: "/website-management/pages-management/esg",
              label: "ESG",
              active: pathname.includes("/website-management/pages-management/esg"),
              icon: Leaf,
            },
          ],
        },
        {
          href: "/website-management/section-management",
          label: "Section Management",
          active: pathname.includes("/website-management/section-management"),
          icon: ShieldCheck,
          submenus: [
            {
              href: "/website-management/section-management/team",
              label: "Team Management",
              active: pathname.includes("/website-management/section-management/team"),
              icon: Users,
            },
            {
              href: "/website-management/section-management/newsletters",
              label: "Subscribers",
              active: pathname.includes("/website-management/section-management/newsletters"),
              icon: Megaphone,
            },
            {
              href: "/website-management/section-management/client",
              label: "Client  Management",
              active: pathname.includes("/website-management/section-management/client"),
              icon: Briefcase,
            },
            {
              href: "/website-management/section-management/testinomial",
              label: "Testimonial Management",
              active: pathname.includes("/website-management/section-management/testinomial"),
              icon: MessageSquareQuote,
            },
            {
              href: "/website-management/section-management/home-banner",
              label: "Home Banner Management",
              active: pathname.includes("/website-management/section-management/home-banner"),
              icon: Images,
            },
            {
              href: "/website-management/section-management/certification-slider",
              label: "Certification Slider Management",
              active: pathname.includes("/website-management/section-management/certification-slider"),
              icon: BadgeCheck,
            },
            {
              href: "/website-management/section-management/delivery_reach",
              label: "Delivery Reach",
              active: pathname.includes("/website-management/section-management/delivery_reach"),
              icon: MapPinned,
            },
            {
              href: "/website-management/section-management/multilingual",
              label: "Multilingual",
              active: pathname.includes("/website-management/section-management/multilingual"),
              icon: Languages,
            },
            {
              href: "/website-management/section-management/policy_preamble",
              label: "Policy Preamble",
              active: pathname.includes("/website-management/section-management/policy_preamble"),
              icon: ScrollText,
            },
            {
              href: "/website-management/section-management/ir_project",
              label: "Project",
              active: pathname.includes("/website-management/section-management/ir_project"),
              icon: Projector,
            },
            {
              href: "/website-management/section-management/finacial_service",
              label: "Finacial Service",
              active: pathname.includes("/website-management/section-management/finacial_service"),
              icon: Projector,
            },
            {
              href: "/website-management/section-management/upcoming_collaboration",
              label: "Upcoming Collaboration",
              active: pathname.includes("/website-management/section-management/upcoming_collaboration"),
              icon: Projector,
            },
            {
              href: "/website-management/section-management/events",
              label: "Events",
              active: pathname.includes("/website-management/section-management/events"),
              icon: CalendarDays,
            },
            {
              href: "/website-management/section-management/analytical",
              label: "Analytical",
              active: pathname.includes("/website-management/section-management/analytical"),
              icon: BarChart3,
            },
            {
              href: "/website-management/section-management/trade-history",
              label: "Trade History",
              active: pathname.includes("/website-management/section-management/trade-history"),
              icon: TrendingUp,
            },
            {
              href: "/website-management/section-management/product",
              label: "Product",
              active: pathname.includes("/website-management/section-management/product"),
              icon: Package,
              submenus: [
                {
                  href: "/website-management/section-management/product-name",
                  label: "Product Name",
                  active: pathname.includes("/website-management/section-management/product-name"),
                  icon: List,
                },
                {
                  href: "/website-management/section-management/product-list",
                  label: "Product List",
                  active: pathname.includes("/website-management/section-management/product-list"),
                  icon: Tag,
                }
              ]
            },
            {
              href: "/website-management/section-management/content-overview",
              label: "Content Overview",
              active: pathname.includes("/website-management/section-management/content-overview"),
              icon: TableOfContentsIcon,
            },
            {
              href: "/website-management/section-management/affiliation",
              label: "Affiliation",
              active: pathname.includes("/website-management/section-management/affiliation"),
              icon: HandshakeIcon,
            },
            {
              href: "/website-management/section-management/membership",
              label: "Membership",
              active: pathname.includes("/website-management/section-management/membership"),
              icon: Crown,
            },
            {
              href: "/website-management/section-management/process",
              label: "Process",
              active: pathname.includes("/website-management/section-management/process"),
              icon: Workflow,
            },
            {
              href: "/website-management/section-management/data",
              label: "Data",
              active: pathname.includes("/website-management/section-management/data"),
              icon: Database,
            }
          ],
        },
        {
          href: "/website-management/general-management",
          label: "General Management",
          active: pathname.includes("/website-management/general-management"),
          icon: ShieldCheck,
          submenus: [
            {
              href: "/website-management/general-management/currency",
              label: "Currency Management",
              active: pathname.includes("/website-management/general-management/currency"),
              icon: DollarSign,
            },
            {
              href: "/website-management/general-management/measurement",
              label: "Measurement Management",
              active: pathname.includes("/website-management/general-management/measurement"),
              icon: Ruler,
            },
            {
              href: "/website-management/general-management/pages",
              label: "Pages Management",
              active: pathname.includes("/website-management/general-management/pages"),
              icon: FileEdit,
            },
            {
              href: "/website-management/general-management/email-template",
              label: "Email Template",
              active: pathname.includes("/website-management/general-management/email-template"),
              icon: Mail,
            },
          ],
        },
        {
          href: "/website-management",
          label: "Settings",
          active: pathname.includes("/website-management"),
          icon: ShieldCheck,
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
          ],
        }
      ]
    },
    {
      href: "",
      label: "Invoicing",
      active: pathname.includes("/documents"),
      icon: FileBox,
      submenus: [
        {
          href: "/documents/domestic-invoice",
          label: "Domestic",
          active: pathname.includes("/domestic-invoice"),
          icon: ReceiptText,
          submenus: [
            {
              href: "/documents/domestic-invoice/bill-of-supply",
              label: "Bill of Supply",
              active: pathname === "/documents/domestic-invoice/bill-of-supply",
              icon: FileCheck2,
            },
            {
              href: "/documents/domestic-invoice/gst-invoice",
              label: "GST Invoice",
              active: pathname === "/documents/domestic-invoice/gst-invoice",
              icon: ReceiptText,
            },
            {
              href: "/documents/domestic-invoice/non-gst-invoice",
              label: "Non GST Invoice",
              active: pathname === "/documents/domestic-invoice/non-gst-invoice",
              icon: FileX2,
            }
          ]
        },
        {
          href: "/documents/export-invoice",
          label: "International",
          active: pathname === "/documents/export-invoice",
          icon: Folder,
        }
      ],
    }
  ]

  const activeMenu = menus.find(menu => menu.active);

  return [
    {
      groupLabel: activeMenu ? activeMenu.label : "",
      menus: menus,
    },
  ];
}

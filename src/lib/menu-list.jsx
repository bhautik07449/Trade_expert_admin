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
              href: "/website-management/content/trade-management",
              label: "Trade Management",
              active: pathname.includes("/website-management/content/trade-management"),
              icon: FileEdit,
              submenus: [
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
                }
              ]
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
              href: "/website-management/content/abc-management",
              label: "ABC Management",
              active: pathname.includes("/website-management/content/abc-management"),
              icon: HelpCircle,
              submenus: [
                {
                  href: "/website-management/content/abc-type",
                  label: "ABC Type",
                  active: pathname.includes("/website-management/content/abc-type"),
                  icon: Tag,
                },
                {
                  href: "/website-management/content/abc",
                  label: "ABC",
                  active: pathname.includes("/website-management/content/abc"),
                  icon: Percent,
                }
              ]
            },
            {
              href: "/website-management/content/faq",
              label: "FAQ Management",
              active: pathname.includes("/website-management/content/faq"),
              icon: CircleHelp,
            },
            {
              href: "/website-management/content/career",
              label: "Career",
              active: pathname.includes("/website-management/content/career"),
              icon: BriefcaseBusiness,
            },
            {
              href: "/website-management/content/delivery_reach",
              label: "Delivery Reach",
              active: pathname.includes("/website-management/content/delivery_reach"),
              icon: MapPinned,
            },
            {
              href: "/website-management/content/multilingual",
              label: "Multilingual",
              active: pathname.includes("/website-management/content/multilingual"),
              icon: Languages,
            },
            {
              href: "/website-management/content/policy_preamble",
              label: "Policy Preamble",
              active: pathname.includes("/website-management/content/policy_preamble"),
              icon: ScrollText,
            },
            {
              href: "/website-management/content/esg",
              label: "ESG",
              active: pathname.includes("/website-management/content/esg"),
              icon: Leaf,
            },
            {
              href: "/website-management/content/ir_project",
              label: "Project",
              active: pathname.includes("/website-management/content/ir_project"),
              icon: Projector,
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
        },
        {
          href: "/website-management/country",
          label: "Country Management",
          active: pathname.includes("/website-management/country"),
          icon: Flag,
          submenus: [
            {
              href: "/website-management/country/events",
              label: "Events",
              active: pathname.includes("/website-management/country/events"),
              icon: CalendarDays,
            },
            // {
            //   href: "/website-management/country/presences",
            //   label: "Presences",
            //   active: pathname.includes("/website-management/country/presences"),
            //   icon: Handshake,
            // },
            {
              href: "/website-management/country/analytical",
              label: "Analytical",
              active: pathname.includes("/website-management/country/analytical"),
              icon: BarChart3,
            },
            {
              href: "/website-management/country/trade-history",
              label: "Trade History",
              active: pathname.includes("/website-management/country/trade-history"),
              icon: TrendingUp,
            },
            {
              href: "/website-management/country/product",
              label: "Product",
              active: pathname.includes("/website-management/country/product"),
              icon: Package,
              submenus: [
                {
                  href: "/website-management/country/product-name",
                  label: "Product Name",
                  active: pathname.includes("/website-management/country/product-name"),
                  icon: List,
                },
                {
                  href: "/website-management/country/product-list",
                  label: "Product List",
                  active: pathname.includes("/website-management/country/product-list"),
                  icon: Tag,
                }
              ]
            },
            {
              href: "/website-management/country/content-overview",
              label: "Content Overview",
              active: pathname.includes("/website-management/country/content-overview"),
              icon: TableOfContentsIcon,
            },
            {
              href: "/website-management/country/affiliation",
              label: "Affiliation",
              active: pathname.includes("/website-management/country/affiliation"),
              icon: HandshakeIcon,
            },
            {
              href: "/website-management/country/membership",
              label: "Membership",
              active: pathname.includes("/website-management/country/membership"),
              icon: Crown,
            },
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
        {
          href: "/buyer-interaction/investor_relations",
          label: "Investor Relations",
          active: pathname.includes("/buyer-interaction/investor_relations"),
          icon: Landmark,
        },
      ],
    },
    {
      href: "",
      label: "Documents",
      active: pathname.includes("/documents"),
      icon: FileBox,
      submenus: [
        {
          href: "/documents/domestic-invoice",
          label: "Domestic Invoice",
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
          label: "Export Invoice",
          active: pathname === "/documents/export-invoice",
          icon: Folder,
        }
      ],
    },
    {
      href: "",
      label: "Market Development",
      active: pathname.includes("/market-development"),
      icon: TrendingUp,
      submenus: [
        {
          href: "/market-development/process",
          label: "Process",
          active: pathname.includes("/market-development/process"),
          icon: Workflow,
        },
        {
          href: "/market-development/data",
          label: "Data",
          active: pathname.includes("/market-development/data"),
          icon: Database,
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

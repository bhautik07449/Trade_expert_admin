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
          href: "/",
          label: "Website Management",
          active: pathname === "/website-management",
          icon: Globe,
          submenus: [
            {
              href: "/",
              label: "Content CMS",
              active: pathname === "/website-management/content",
              icon: FileEdit,
            },
            {
              href: "/",
              label: "Settings",
              active: pathname === "/website-management/settings",
              icon: Settings,
              submenus: [
                {
                  href: "/",
                  label: "General Settings",
                  active: pathname === "/website-management/settings/general-settings",
                  icon: User,
                },
                {
                  href: "/",
                  label: "Social Settings",
                  active: pathname === "/website-management/settings/social-settings",
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

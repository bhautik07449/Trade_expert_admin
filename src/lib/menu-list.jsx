import { Box, Handshake, User } from "lucide-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: MdOutlineSpaceDashboard,
          submenus: [],
        },
        {
          href: "",
          label: "User Management",
          active: pathname.includes("/user-management"),
          icon: Box,
          submenus: [
            {
              href: "/user-management/admins-management",
              label: "Admins Management",
              active: pathname.includes("/user-management/admins-management"),
              icon: User,
            },
            {
              href: "/user-management/suppliers-management",
              label: "Suppliers Management",
              active: pathname.includes("/user-management/suppliers-management"),
              icon: Handshake,
            }
          ],
        },
        {
          href: "",
          label: "Stock Management",
          active: pathname.includes("/stock-management"),
          icon: Box,
          submenus: [
            {
              href: "/stock-management/product_management",
              label: "Product Management",
              active: pathname.includes("/stock-management/product_management"),
              icon: User,
            },
            {
              href: "/stock-management/category-management",
              label: "Category Management",
              active: pathname.includes("/stock-management/category-management"),
              icon: Handshake,
            },
            {
              href: "/stock-management/dmr-management",
              label: "DMR Management",
              active: pathname.includes("/stock-management/dmr-management"),
              icon: Handshake,
            }
          ],
        },
        {
          href: "/",
          label: "Website Management",
          active: pathname === "/website-management",
          icon: MdOutlineSpaceDashboard,
          submenus: [
            {
              href: "/",
              label: "Content CMS",
              active: pathname === "/content",
              icon: User,
            },
            {
              href: "/",
              label: "Settings",
              active: pathname === "/settings",
              icon: Handshake,
            }
          ],
        },
        {
          href: "/",
          label: "Buyer Interaction",
          active: pathname.includes("/buyer-interaction"),
          icon: MdOutlineSpaceDashboard,
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
              icon: User,
            },
            {
              href: "/buyer-interaction/request-samples-management",
              label: "Request Samples Management",
              active: pathname.includes("/buyer-interaction/request-samples-management"),
              icon: User,
            },
            {
              href: "/buyer-interaction/inquiry-management",
              label: "Inquiry Management",
              active: pathname.includes("/buyer-interaction/inquiry-management"),
              icon: User,
            },
            {
              href: "/buyer-interaction/contact-management",
              label: "Contact Management",
              active: pathname.includes("/buyer-interaction/contact-management"),
              icon: User,
            },
            {
              href: "/buyer-interaction/credit-account-management",
              label: "Credit Account Management",
              active: pathname.includes("/buyer-interaction/credit-account-management"),
              icon: User,
            },
          ],
        },
        {
          href: "/",
          label: "Documents",
          active: pathname === "/documents",
          icon: MdOutlineSpaceDashboard,
          submenus: [],
        },
      ],
    },
  ];
}

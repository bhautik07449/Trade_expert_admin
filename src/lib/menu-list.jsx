import { Box, Handshake,User } from "lucide-react";
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
              active: pathname === "/stock-management/product_management",
              icon: User,
            },
            {
              href: "/stock-management/category-management",
              label: "Category Management",
              active: pathname === "/stock-management/category-management",
              icon: Handshake,
            },
            {
              href: "/stock-management/dmr-management",
              label: "DMR Management",
              active: pathname === "/stock-management/dmr-management",
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
          active: pathname === "/Bbuyer-interaction",
          icon: MdOutlineSpaceDashboard,
          submenus: [],
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

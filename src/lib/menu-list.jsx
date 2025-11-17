import { Box, Handshake, LayoutList, User } from "lucide-react";
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
              active: pathname === "/user-management/admins-management",
              icon: User,
            },
            {
              href: "/user-management/suppliers-management",
              label: "Suppliers Management",
              active: pathname === "/user-management/suppliers-management",
              icon: Handshake,
            }
          ],
        },

      ],
    },
  ];
}

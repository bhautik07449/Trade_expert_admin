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
          active: pathname.includes("/master"),
          icon: Box,
          submenus: [
            {
              href: "/master/user",
              label: "Admins Management",
              active: pathname === "/master/user",
              icon: User,
            },
            {
              href: "/master/party",
              label: "Suppliers Management",
              active: pathname === "/master/party",
              icon: Handshake,
            }
          ],
        },

      ],
    },
  ];
}

import React, { useState, useEffect } from "react";
import { Ellipsis, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CollapseMenuButton } from "./collapse-menu-button";
import { getMenuList } from "../../lib/menu-list";
import { ScrollArea } from "../ui/scroll-area";
import { Link } from "react-router-dom";
import CommonButton from "../widgets/common_button";
import CommonText from "../widgets/common_text";

export function Menu({ isOpen }) {
  const pathname = window.location.pathname;
  const menuList = getMenuList(pathname);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const activeMenuKeys = {};

    menuList.forEach(({ menus }) => {
      menus.forEach((menu) => {
        if (menu.active && menu.submenus.length > 0) {
          const menuKey = menu.label;
          activeMenuKeys[menuKey] = true;

          menu.submenus.forEach((submenu) => {
            if (submenu.active && submenu.submenus?.length > 0) {
              activeMenuKeys[`${menuKey}-${submenu.label}`] = true;
            }
          });
        }
      });
    });

    setOpenMenus(activeMenuKeys);
  }, [pathname]);

  const handleLogout = async () => {
    console.log("Logout working");
  };

  const handleMenuToggle = (menuKey, parentKey = null) => {
    setOpenMenus((prev) => {
      const newState = { ...prev };

      if (parentKey) {
        Object.keys(newState).forEach((key) => {
          if (key.startsWith(`${parentKey}-`) && key !== menuKey) {
            delete newState[key];
          }
        });
      } else {
        Object.keys(newState).forEach((key) => {
          if (!key.includes('-') && key !== menuKey) {
            delete newState[key];
            Object.keys(newState).forEach((nestedKey) => {
              if (nestedKey.startsWith(`${key}-`)) {
                delete newState[nestedKey];
              }
            });
          }
        });
      }

      if (newState[menuKey]) {
        delete newState[menuKey];
        Object.keys(newState).forEach((key) => {
          if (key.startsWith(`${menuKey}-`)) {
            delete newState[key];
          }
        });
      } else {
        newState[menuKey] = true;
      }

      return newState;
    });
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block h-full">
      <nav className="mt-6 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-250px)] lg:min-h-[calc(100vh-170px)] items-start space-y-0.5 pb-32">
          {menuList.map(({ groupLabel, menus }, groupIndex) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={groupIndex}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center py-2">
                        <Ellipsis className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}

              {menus.map((menu, menuIndex) =>
                menu.submenus.length === 0 ? (
                  <div className="w-full px-3" key={menuIndex}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={menu.active ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start h-11 mb-0.5 transition-all duration-200",
                              menu.active && "bg-primary/10 text-primary font-medium shadow-sm"
                            )}
                            asChild
                          >
                            <Link to={menu.href}>
                              <span className={cn(isOpen === false ? "" : "mr-3")}>
                                <menu.icon size={19} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[230px] truncate transition-all duration-300",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {menu.label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right" className="font-medium">
                            {menu.label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full px-3" key={menuIndex}>
                    <CollapseMenuButton
                      icon={menu.icon}
                      label={menu.label}
                      active={menu.active}
                      submenus={menu.submenus}
                      isOpen={isOpen}
                      menuKey={menu.label}
                      openMenus={openMenus}
                      onToggle={handleMenuToggle}
                    />
                  </div>
                )
              )}
            </li>
          ))}
        </ul>

        <div className="w-full px-3 py-4 border-t fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CommonButton
            onClick={handleLogout}
            variant="outline"
            className={cn(
              "w-full h-11 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50",
              isOpen === false && "justify-center"
            )}
          >
            <div className="w-full flex items-center justify-center gap-3">
              <LogOut size={19} />
              <CommonText
                text="Logout"
                className={cn(
                  "font-medium transition-all duration-300",
                  isOpen === false ? "opacity-0 w-0 hidden" : "opacity-100"
                )}
              />
            </div>
          </CommonButton>
        </div>
      </nav>
    </ScrollArea>
  );
}
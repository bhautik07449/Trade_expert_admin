import React, { useState } from "react";
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
  const [openMenu, setOpenMenu] = useState({});

  const handleLogout = async () => {
    console.log("Logout working");

  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-250px)] lg:min-h-[calc(100vh-170px)] items-start space-y-1 ">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-primary px-7 py-3 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <></>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full px-4" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link to={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[230px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full px-4" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                        menuKey={`${groupLabel}-${label}`}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="w-full grow flex items-end px-4">
          <CommonButton
            onClick={() => handleLogout()}
            variant="outline"
            className="w-full"
          >
            <div className="w-full flex items-center justify-center ">
              <span className={cn(isOpen === false ? "" : "mr-4")}>
                <LogOut size={18} />
              </span>

              <CommonText
                text="logout"
                className={cn(
                  "whitespace-nowrap dark:text-white",
                  isOpen === false ? "opacity-0 hidden" : "opacity-100"
                )}
              />
            </div>
          </CommonButton>
        </div>
      </nav>
    </ScrollArea>
  );
}

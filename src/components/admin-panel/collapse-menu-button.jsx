import { ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "react-router-dom";

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus = [],
  isOpen,
  menuKey,
  openMenu,
  setOpenMenu,
  level = 0,
}) {
  const isCollapsed = openMenu[menuKey] === true;

  const handleToggle = (open) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuKey]: open,
    }));
  };

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={handleToggle}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className="w-full justify-start h-10"
          style={{ paddingLeft: `${16 + level * 16}px` }}
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0"
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map((submenus, index) =>
          submenus?.submenus && submenus?.submenus.length > 0 ? (
            <CollapseMenuButton
              key={index}
              icon={submenus?.icon}
              label={submenus?.label}
              active={submenus?.active}
              submenus={submenus?.submenus}
              isOpen={isOpen}
              menuKey={`${menuKey}-${submenus?.label}`}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              level={level + 1}
            />
          ) : (
            <Button
              key={index}
              variant={submenus?.active ? "secondary" : "ghost"}
              className="w-full justify-start h-10 mb-1"
              asChild
            >
              <Link to={submenus?.href}>
                <span className="mr-4 ml-2">
                  {submenus.icon && <submenus.icon size={18} />}
                </span>
                <p
                  className={cn(
                    "max-w-[170px] truncate",
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0"
                  )}
                >
                  {submenus.label}
                </p>
              </Link>
            </Button>
          )
        )}
      </CollapsibleContent >
    </Collapsible >
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <a className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
        {/* <FaChevronRight className="fill-border" /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

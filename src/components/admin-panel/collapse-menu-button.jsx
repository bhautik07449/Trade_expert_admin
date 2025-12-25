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
  parentKey = null,
  openMenus,
  onToggle,
  level = 0,
}) {
  const isCollapsed = openMenus[menuKey] === true;

  const handleToggle = (open) => {
    if (open) {
      onToggle(menuKey, parentKey);
    } else {
      onToggle(menuKey, parentKey);
    }
  };

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={handleToggle}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-0.5"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start h-11 transition-all duration-200",
            active && "bg-primary/10 text-primary font-medium shadow-sm"
          )}
          style={{ paddingLeft: `${12 + level * 12}px` }}
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center gap-3">
              <Icon size={19} />
              <p className={cn("max-w-[150px] truncate font-medium")}>
                {label}
              </p>
            </div>
            <ChevronDown
              size={18}
              className="transition-transform duration-300 ease-in-out"
            />
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="pl-2 border-l-2 border-border/50 ml-6 mt-1 space-y-0.5">
          {submenus.map((submenu, index) =>
            submenu?.submenus && submenu?.submenus.length > 0 ? (
              <CollapseMenuButton
                key={index}
                icon={submenu.icon}
                label={submenu.label}
                active={submenu.active}
                submenus={submenu.submenus}
                isOpen={isOpen}
                menuKey={`${menuKey}-${submenu.label}`}
                parentKey={menuKey}
                openMenus={openMenus}
                onToggle={onToggle}
                level={level + 1}
              />
            ) : (
              <Button
                key={index}
                variant={submenu.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 mb-0.5 transition-all duration-200",
                  submenu.active && "bg-primary/10 text-primary font-medium shadow-sm"
                )}
                asChild
              >
                <Link to={submenu.href}>
                  <span className="mr-3">
                    {submenu.icon && <submenu.icon size={17} />}
                  </span>
                  <p className="max-w-[170px] truncate text-sm">
                    {submenu.label}
                  </p>
                </Link>
              </Button>
            )
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 mb-0.5 transition-all duration-200",
                  active && "bg-primary/10 text-primary font-medium"
                )}
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <Icon size={19} />
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2} className="font-medium">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        side="right"
        sideOffset={25}
        align="start"
        className="w-64 max-h-[500px] overflow-y-auto"
      >
        <DropdownMenuLabel className="max-w-[190px] truncate font-semibold text-base">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {submenus.map((submenu, index) =>
          submenu?.submenus && submenu?.submenus.length > 0 ? (
            <div key={index} className="py-1">
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                {submenu.label}
              </DropdownMenuLabel>
              {submenu.submenus.map((nestedSubmenu, nestedIndex) => (
                <DropdownMenuItem key={nestedIndex} asChild>
                  <Link
                    className="cursor-pointer flex items-center gap-2 py-2"
                    to={nestedSubmenu.href}
                  >
                    {nestedSubmenu.icon && <nestedSubmenu.icon size={16} />}
                    <p className="max-w-[180px] truncate text-sm">{nestedSubmenu.label}</p>
                  </Link>
                </DropdownMenuItem>
              ))}
              {index < submenus.length - 1 && <DropdownMenuSeparator />}
            </div>
          ) : (
            <DropdownMenuItem key={index} asChild>
              <Link
                className="cursor-pointer flex items-center gap-2 py-2"
                to={submenu.href}
              >
                {submenu.icon && <submenu.icon size={16} />}
                <p className="max-w-[180px] truncate text-sm">{submenu.label}</p>
              </Link>
            </DropdownMenuItem>
          )
        )}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
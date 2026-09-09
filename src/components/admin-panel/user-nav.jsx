import React from "react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/auth";

export function UserNav({ profile }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    localStorage.clear();
    navigate("/login");
  };

  const currentRole = localStorage.getItem("role") || localStorage.getItem("admin_type") || "super_admin";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={profile?.photo} alt="" srcset="" className="w-8 h-8 rounded-full object-cover" />
            <div className="flex flex-col">
              <p className="capitalize font-sans text-slate-200 text-sm font-medium">{profile?.firstName}{" "}{profile?.lastName}</p>
              <span className="text-[10px] text-blue-200 uppercase font-semibold tracking-wider">
                {currentRole.replace('_', ' ')}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{profile?.firstName}{" "}{profile?.lastName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {profile?.email}
              </p>
              <p className="text-xs text-blue-500 font-semibold uppercase mt-1">
                Role: {currentRole.replace('_', ' ')}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="hover:cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => handleLogout()}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

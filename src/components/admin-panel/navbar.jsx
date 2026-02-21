import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { useEffect, useState } from "react";
import AuthService from "../../service/auth.service";
// import { ModeToggle } from "../mode-toggle";

export function Navbar({ title }) {
  const [profile, setProfile] = useState({firstName: "Bhautik", lastName: "Pokal", email: "bhautik@example.com"})

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await AuthService.getProfile();
  //       setProfile(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   }

  //   fetchProfile();
  // }, [])

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {/* <ModeToggle /> */}
          <UserNav profile={profile} />
        </div>
      </div>
    </header>
  );
}

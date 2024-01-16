"use client";
import { SignOutButton } from "./signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Session } from "next-auth";
import { NavBar } from "./navbar";

export const Header = ({ user }: { user: Session["user"] }) => {
  const userFirstInitialLastInitial = user?.name?.split(" ").map((n) => n[0]);

  return (
    <>
      <header className="flex justify-between items-center pb-6">
        <div className="flex gap-1 items-center">
          <NavBar />
          <h1 className="text-xl font-extrabold tracking-tight">
            Fit Forge Pro
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-4">
              <span className="text-sm font-semibold">
                {userFirstInitialLastInitial}
              </span>
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>Sign out</DropdownMenuLabel> */}
              <SignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

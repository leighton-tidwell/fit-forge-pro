"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Icons } from "./icons";

export const SignOutButton = () => (
  <DropdownMenuItem onClick={() => signOut()}>
    <Icons.close />
    Sign out
  </DropdownMenuItem>
);

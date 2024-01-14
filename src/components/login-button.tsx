"use client";

import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import { Button } from "./ui/button";

export const LoginButton = () => (
  <Button onClick={() => signIn("google")}>Login with Google</Button>
);

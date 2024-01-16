import { Metadata } from "next";
import { Icons } from "@/components/icons";
import { LoginButton } from "@/components/login-button";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to FitForgePro",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

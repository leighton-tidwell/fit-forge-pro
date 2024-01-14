import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { SignOutButton } from "@/components/signout-button";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  // Fetch other async data here

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {user?.name}
          </h1>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
}

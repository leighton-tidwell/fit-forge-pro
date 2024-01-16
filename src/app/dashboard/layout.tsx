import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="container p-6 w-full">
      <Header user={user} />
      <main className="flex flex-1 w-full">{children}</main>
    </div>
  );
}

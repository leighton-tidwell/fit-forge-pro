import { BackButton } from "@/components/back-button";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AddLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <main className="flex px-5 w-full">
      <div className="grid w-full gap-1">
        <BackButton />
        {children}
      </div>
    </main>
  );
}

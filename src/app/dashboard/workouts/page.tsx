import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { WorkoutsTable } from "@/components/tables/workouts-table/data-table";
import { columns } from "@/components/tables/workouts-table/columns";

export default async function WorkoutsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const userWorkouts = await db.workout.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="grid w-full gap-1">
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "ghost" }), "w-[fit-content]")}
      >
        <Icons.chevronLeft className="w-4" />
        Back
      </Link>
      My Workouts
      <WorkoutsTable columns={columns} data={userWorkouts} />
    </div>
  );
}

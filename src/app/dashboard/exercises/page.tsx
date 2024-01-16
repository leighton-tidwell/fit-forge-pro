import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ExercisesTable } from "@/components/tables/exercises-table/data-table";
import { columns } from "@/components/tables/exercises-table/columns";

export default async function WorkoutsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const userExercises = await db.exercise.findMany({
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
      My Exercises
      <ExercisesTable columns={columns} data={userExercises} />
    </div>
  );
}

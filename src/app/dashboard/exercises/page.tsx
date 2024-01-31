import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ExercisesTable } from "@/components/tables/exercises-table/data-table";
import { columns } from "@/components/tables/exercises-table/columns";
import { BackButton } from "@/components/back-button";

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
    <div className="grid w-full gap-4">
      <BackButton />
      <div className="flex items-center">
        <h1 className="font-extrabold tracking-tighter text-4xl flex-1">
          My Exercises
        </h1>
        <Link
          className={cn(buttonVariants(), "ml-4")}
          href={"/dashboard/add/exercise"}
        >
          Add Exercise
        </Link>
      </div>
      <ExercisesTable columns={columns} data={userExercises} />
    </div>
  );
}

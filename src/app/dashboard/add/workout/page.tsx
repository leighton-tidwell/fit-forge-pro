import { CreateWorkoutForm } from "@/components/create-workout-form";
import { Icons } from "@/components/icons";
import {
  columns,
  selectableColumns,
} from "@/components/tables/exercises-table/columns";
import { ExercisesTable } from "@/components/tables/exercises-table/data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AddWorkoutPage() {
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
    <div className="flex flex-col gap-2">
      <h1 className="font-extrabold tracking-tighter text-4xl flex-1">
        Create Workout
      </h1>
      <CreateWorkoutForm userExercises={userExercises} />
    </div>
  );
}

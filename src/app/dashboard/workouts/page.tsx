import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { WorkoutsTable } from "@/components/tables/workouts-table/data-table";
import { columns as workoutColumns } from "@/components/tables/workouts-table/columns";
import { columns as workoutSessionColumns } from "@/components/tables/workout-session-table/columns";
import {
  getWorkoutSessionsForCurrentUser,
  getWorkoutsForUser,
} from "@/app/actions";
import { WorkoutSessionsTable } from "@/components/tables/workout-session-table/data-table";
import { BackButton } from "@/components/back-button";

export default async function WorkoutsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const userWorkouts = await getWorkoutsForUser();

  const userWorkoutSessions = await getWorkoutSessionsForCurrentUser();

  return (
    <div className="grid w-full gap-4">
      <BackButton />
      <div className="flex items-center">
        <h1 className="font-extrabold tracking-tighter text-4xl flex-1">
          My Workouts
        </h1>
        <Link
          className={cn(buttonVariants(), "ml-4")}
          href={"/dashboard/add/workout"}
        >
          Add Workout
        </Link>
      </div>
      <WorkoutsTable columns={workoutColumns} data={userWorkouts.data ?? []} />

      <h1 className="text-4xl font-bold tracking-tight">Workout Sessions</h1>
      <WorkoutSessionsTable
        columns={workoutSessionColumns}
        data={userWorkoutSessions ?? []}
      />
    </div>
  );
}

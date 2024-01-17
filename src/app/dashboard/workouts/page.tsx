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
  getWorkoutsForCurrentUser,
} from "@/app/actions";
import { WorkoutSessionsTable } from "@/components/tables/workout-session-table/data-table";

export default async function WorkoutsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const userWorkouts = await getWorkoutsForCurrentUser();

  const userWorkoutSessions = await getWorkoutSessionsForCurrentUser();

  return (
    <div className="grid w-full gap-2">
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "ghost" }), "w-[fit-content]")}
      >
        <Icons.chevronLeft className="w-4" />
        Back
      </Link>
      <h1 className="text-4xl font-bold tracking-tight">Workouts</h1>
      <WorkoutsTable columns={workoutColumns} data={userWorkouts.data ?? []} />

      <h1 className="text-4xl font-bold tracking-tight">Workout Sessions</h1>
      <WorkoutSessionsTable
        columns={workoutSessionColumns}
        data={userWorkoutSessions ?? []}
      />
    </div>
  );
}

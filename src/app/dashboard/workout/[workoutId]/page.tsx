import { getWorkout } from "@/app/actions";
import { notFound } from "next/navigation";

export default async function WorkoutPage({
  params,
}: {
  params: {
    workoutId: string;
  };
}) {
  const workout = await getWorkout(params.workoutId);
  if (!workout) return notFound();

  return (
    <div>
      <h1>Workout: {workout.name}</h1>
    </div>
  );
}

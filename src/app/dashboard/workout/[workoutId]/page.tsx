import { getWorkout, getWorkoutSession } from "@/app/actions";
import { ExerciseAccordion } from "@/components/exercise-accordion";
import { WorkoutActionButton } from "@/components/workout-action-button";
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

  const workoutSession = await getWorkoutSession(params.workoutId);
  const exercises = workout.exercises;

  return (
    <>
      <h1 className="scroll-m-20 text-3xl tracking-tight mb-4">
        Workout: <span className="font-extrabold">{workout.name}</span>
      </h1>
      <h2 className="scroll-m-20 text-2xl tracking-tight mb-4">Overview:</h2>
      <ExerciseAccordion exercises={exercises} />
      <WorkoutActionButton workout={workout} workoutSession={workoutSession} />
    </>
  );
}

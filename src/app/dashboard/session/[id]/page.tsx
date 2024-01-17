import { getWorkout, getWorkoutSessionById } from "@/app/actions";
import { ExerciseAccordion } from "@/components/exercise-accordion";
import { WorkoutActionButton } from "@/components/workout-action-button";
import { notFound } from "next/navigation";

export default async function WorkoutPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const workoutSession = await getWorkoutSessionById(params.id);
  if (!workoutSession) return notFound();

  const workout = await getWorkout(workoutSession.workoutId);
  if (!workout) return notFound();

  const { exercises } = workout;

  return (
    <>
      <h1 className="scroll-m-20 text-3xl tracking-tight mb-4">
        Workout: <span className="font-extrabold">{workout.name}</span>
      </h1>
      <ExerciseAccordion exercises={exercises} />
      <WorkoutActionButton workoutSession={workoutSession} />
    </>
  );
}

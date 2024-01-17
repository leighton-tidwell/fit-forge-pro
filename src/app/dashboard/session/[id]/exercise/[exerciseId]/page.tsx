import {
  createExerciseWorkoutSession,
  getExerciseWorkoutSessionByExerciseIdAndWorkoutSessionId,
  getWorkout,
  getWorkoutSessionById,
} from "@/app/actions";
import { ExerciseControls } from "@/components/exercise-controls";
import { ExerciseHelper } from "@/components/exercise-helper";
import { notFound } from "next/navigation";

export default async function ExercisePage({
  params,
}: {
  params: {
    id: string; // workoutSessionId
    exerciseId: string;
  };
}) {
  const workoutSession = await getWorkoutSessionById(params.id);
  if (!workoutSession) return notFound();

  const workout = await getWorkout(workoutSession.workoutId);
  if (!workout) return notFound();

  const exercise = workout.exercises.find(
    (exercise) => exercise.id === params.exerciseId
  );
  if (!exercise) return notFound();

  const exerciseIndex = workout.exercises.findIndex(
    (exercise) => exercise.id === params.exerciseId
  );
  const totalExercises = workout.exercises.length;
  const nextExercise = workout.exercises[exerciseIndex + 1];
  const previousExercise = workout.exercises[exerciseIndex - 1];

  let exerciseWorkoutSession =
    await getExerciseWorkoutSessionByExerciseIdAndWorkoutSessionId(
      params.exerciseId,
      params.id
    );

  if (!exerciseWorkoutSession) {
    exerciseWorkoutSession = await createExerciseWorkoutSession(
      params.exerciseId,
      params.id
    );
  }

  // If we still haven't found an exerciseWorkoutSession, return 404
  if (!exerciseWorkoutSession) return notFound();

  return (
    <>
      <div className="flex flex-col gap-2 rounded-lg border-2 p-3 bg-gray-200">
        <span className="text-md font-semibold">
          Exercise {exerciseIndex + 1} of {totalExercises}
        </span>
        <h1 className="scroll-m-20 text-3xl tracking-tight">
          Workout: <span className="font-extrabold">{workout.name}</span>
        </h1>
        <span className="scroll-m-20 text-xl tracking-tight mb-4">
          Exercise: <span className="font-extrabold">{exercise.name}</span>
        </span>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="text-gray-500">{exercise.description}</p>
      </div>
      {exercise.videoUrl && (
        <div className="w-full">
          <h2 className="text-xl font-semibold">Video</h2>
          <video
            className="rounded-lg"
            controls
            autoPlay
            muted
            src={exercise.videoUrl}
          ></video>
        </div>
      )}

      <ExerciseHelper exercise={exercise} />

      <ExerciseControls
        exercise={exercise}
        exerciseWorkoutSession={exerciseWorkoutSession}
        index={exerciseIndex}
        nextExercise={nextExercise}
        previousExercise={previousExercise}
      />
    </>
  );
}

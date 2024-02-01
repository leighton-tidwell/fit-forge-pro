"use client";
import { Exercise, ExerciseWorkoutSession } from "@prisma/client";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useState } from "react";
import { endExerciseWorkoutSession } from "@/app/actions";
import { useRouter } from "next/navigation";

type ExerciseControlsProps = {
  exercise: Exercise | undefined;
  exerciseWorkoutSession: ExerciseWorkoutSession;
  index: number;
  nextExercise: Exercise | undefined;
  previousExercise: Exercise | undefined;
};

export const ExerciseControls = ({
  exercise,
  exerciseWorkoutSession,
  index = 0,
  nextExercise,
  previousExercise,
}: ExerciseControlsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const router = useRouter();

  const handleNextExcercise = async () => {
    setIsLoading(true);
    try {
      if (!exerciseWorkoutSession?.endedAt) {
        console.log("hello");
        await endExerciseWorkoutSession(exerciseWorkoutSession?.id);
      }
      router.push(
        `/dashboard/session/${exerciseWorkoutSession.workoutSessionId}/exercise/${nextExercise?.id}`
      );
      setIsRouteLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousExcercise = async () => {
    setIsRouteLoading(true);
    router.push(
      `/dashboard/session/${exerciseWorkoutSession.workoutSessionId}/exercise/${previousExercise?.id}`
    );
  };

  return (
    <div className="flex justify-between mt-4">
      {index !== 0 && (
        <Button
          disabled={isRouteLoading}
          onClick={handlePreviousExcercise}
          className="w-[fit-content]"
        >
          <Icons.chevronLeft className="w-4" /> Previous
        </Button>
      )}
      {nextExercise && (
        <Button
          onClick={handleNextExcercise}
          disabled={isRouteLoading || isLoading}
          className="w-[fit-content]"
        >
          {isRouteLoading || isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              Next <Icons.chevronRight className="w-4" />
            </>
          )}
        </Button>
      )}
      {!nextExercise && (
        <Button disabled={isRouteLoading} className="w-[fit-content]">
          Finish <Icons.chevronRight className="w-4" />
        </Button>
      )}
    </div>
  );
};

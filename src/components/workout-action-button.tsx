"use client";

import { useState } from "react";
import { Workout, WorkoutSession } from "@prisma/client";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { createWorkoutSession } from "@/app/actions";
import { useRouter } from "next/navigation";

type WorkoutActionButtonProps = {
  workout: Workout | null | undefined;
  workoutSession: WorkoutSession | null | undefined;
};

export const WorkoutActionButton = ({
  workout,
  workoutSession,
}: WorkoutActionButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartWorkout = async () => {
    setIsLoading(true);
    try {
      if (workout) {
        const workoutSession = await createWorkoutSession(workout?.id);

        if (workoutSession) {
          router.push(
            `/dashboard/session/${workoutSession.id}/exercise/${workout.exerciseIds[0]}`
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (workoutSession) {
    return (
      <Button className={"w-[fit-content] mt-4"}>
        Resume Workout <Icons.chevronRight className="w-4" />
      </Button>
    );
  }

  return (
    <Button
      disabled={isLoading}
      className={"w-[fit-content] mt-4"}
      onClick={handleStartWorkout}
    >
      {isLoading ? (
        <Icons.spinner className="animate-spin" />
      ) : (
        <>
          Start Workout <Icons.chevronRight className="w-4" />
        </>
      )}
    </Button>
  );
};

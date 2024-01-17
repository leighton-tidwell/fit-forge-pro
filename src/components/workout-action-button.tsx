"use client";

import { useState } from "react";
import { Workout, WorkoutSession } from "@prisma/client";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { createWorkoutSession, startWorkoutSession } from "@/app/actions";
import { useRouter } from "next/navigation";

type WorkoutActionButtonProps = {
  workoutSession: WorkoutSession | null | undefined;
};

export const WorkoutActionButton = ({
  workoutSession,
}: WorkoutActionButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const handleStartWorkout = async () => {
    setIsLoading(true);
    try {
      if (workoutSession) {
        const updatedWorkoutSession = await startWorkoutSession(
          workoutSession?.id
        );
        if (updatedWorkoutSession) {
          router.push(
            `/dashboard/session/${updatedWorkoutSession.id}/exercise/${updatedWorkoutSession.workout.exerciseIds[0]}`
          );
          setIsRouteLoading(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeWorkout = async () => {
    console.log("TBD");
  };

  if (workoutSession?.startedAt && !workoutSession?.endedAt) {
    return (
      <>
        <Button className={"w-[fit-content] mt-4"}>
          Resume Workout <Icons.chevronRight className="w-4" />
        </Button>
        <span className="text-sm text-gray-500">
          You started this workout on{" "}
          {new Date(workoutSession?.startedAt).toLocaleString()}
        </span>
      </>
    );
  }

  return (
    <Button
      disabled={isLoading}
      className={"w-[fit-content] mt-4"}
      onClick={handleStartWorkout}
    >
      {isLoading || isRouteLoading ? (
        <Icons.spinner className="animate-spin" />
      ) : (
        <>
          Start Workout <Icons.chevronRight className="w-4" />
        </>
      )}
    </Button>
  );
};

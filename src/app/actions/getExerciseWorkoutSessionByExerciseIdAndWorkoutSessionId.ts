"use server";
import { db } from "@/lib/db";

export async function getExerciseWorkoutSessionByExerciseIdAndWorkoutSessionId(
  exerciseId: string,
  workoutSessionId: string
) {
  try {
    const exerciseWorkoutSession = await db.exerciseWorkoutSession.findUnique({
      where: { workoutSessionId_exerciseId: { exerciseId, workoutSessionId } },
    });

    return exerciseWorkoutSession;
  } catch (error) {
    console.log("Error getting exercise workout session");
    console.log(error);
  }
}

"use server";
import { db } from "@/lib/db";

export async function createExerciseWorkoutSession(
  exerciseId: string,
  workoutSessionId: string
) {
  try {
    const exerciseWorkoutSession = await db.exerciseWorkoutSession.create({
      data: {
        exerciseId,
        workoutSessionId,
      },
    });

    return exerciseWorkoutSession;
  } catch (error) {
    console.log("Error creating exercise workout session");
    console.log(error);
  }
}

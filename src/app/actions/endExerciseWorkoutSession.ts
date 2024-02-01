"use server";
import { db } from "@/lib/db";

export async function endExerciseWorkoutSession(
  exerciseWorkoutSessionId: string
) {
  try {
    const exerciseWorkoutSession = await db.exerciseWorkoutSession.update({
      where: { id: exerciseWorkoutSessionId },
      data: {
        endedAt: new Date(),
      },
    });

    return exerciseWorkoutSession;
  } catch (error) {
    console.log("Error completing exercise workout session");
    console.log(error);
  }
}

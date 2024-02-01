"use server";
import { db } from "@/lib/db";

export async function getWorkout(workoutId: string) {
  try {
    const workout = await db.workout.findUnique({
      where: { id: workoutId },
      include: {
        exercises: true,
      },
    });

    return workout;
  } catch (error) {
    console.log("Error getting workout");
    console.log(error);
  }
}

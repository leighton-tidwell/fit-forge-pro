"use server";
import { db } from "@/lib/db";

export async function getExercisesForUser(userId: string) {
  try {
    const exercises = await db.exercise.findMany({
      where: { userId },
    });

    return exercises;
  } catch (error) {
    console.log("Error getting exercises");
    console.log(error);
  }
}

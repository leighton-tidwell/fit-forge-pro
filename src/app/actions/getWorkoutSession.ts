"use server";
import { db } from "@/lib/db";

// TODO: remove ById
export async function getWorkoutSessionById(id: string) {
  try {
    const workoutSession = await db.workoutSession.findUnique({
      where: { id },
    });

    return workoutSession;
  } catch (error) {
    console.log("Error getting workout session");
    console.log(error);
  }
}

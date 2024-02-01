"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteWorkout(id: string) {
  try {
    const workout = await db.workout.delete({
      where: { id },
    });

    revalidatePath("/dashboard/workouts");
    return workout;
  } catch (error) {
    console.log("Error deleting workout");
    console.log(error);
  }
}

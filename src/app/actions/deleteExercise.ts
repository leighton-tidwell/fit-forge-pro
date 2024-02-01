"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteExercise(id: string) {
  try {
    const exercise = await db.exercise.delete({
      where: { id: id },
    });

    revalidatePath("/dashboard/workouts");
    return exercise;
  } catch (error) {
    console.log("Error deleting exercise");
    console.log(error);
  }
}

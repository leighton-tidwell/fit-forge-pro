"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { CreateWorkoutFormFields } from "@/components/create-workout-form";

export async function createWorkout(formData: CreateWorkoutFormFields) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 403 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });

    if (!user) {
      console.log("User not found");
      return new Response("Unauthorized", { status: 403 });
    }

    const workout = await db.workout.create({
      data: {
        name: formData.name,
        userId: user.id,
        exerciseIds: formData.selectedExerciseIds,
        exercises: {
          connect: formData.selectedExerciseIds.map((id) => ({ id })),
        },
      },
      include: {
        exercises: true,
      },
    });

    revalidatePath("/dashboard/workouts");
    return workout;
  } catch (error) {
    console.log("Error creating workout");
    console.log(error);
  }
}

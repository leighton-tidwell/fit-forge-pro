"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { exerciseSchema } from "@/lib/form-validations/exercise";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function createExercise(formData: FormData) {
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

    const validatedFields = exerciseSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      video: formData.get("video"),
      sets: Number(formData.get("sets")),
      reps: Number(formData.get("reps")),
      weight: Number(formData.get("weight")),
      duration: Number(formData.get("duration")),
      cooldown: Number(formData.get("cooldown")),
    });

    if (!validatedFields.success) {
      console.log("Validation errors", validatedFields.error.flatten());
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    let videoUrl;
    if (validatedFields.data.video) {
      const blob = await put(
        validatedFields.data.video?.name,
        validatedFields.data.video,
        { access: "public" }
      );

      videoUrl = blob.url;
    }

    const exercise = await db.exercise.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        videoUrl,
        sets: validatedFields.data.sets,
        reps: validatedFields.data.reps,
        weight: validatedFields.data.weight,
        duration: validatedFields.data.duration,
        cooldown: validatedFields.data.cooldown,
        userId: user.id,
      },
    });

    console.log(exercise);

    revalidatePath("/dashboard/workouts");
    return exercise;
  } catch (error) {
    console.log("Error creating exercise");
    console.log(error);
  }
}

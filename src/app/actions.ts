"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { exerciseSchema } from "@/lib/form-validations/exercise";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { CreateWorkoutFormFields } from "@/components/create-workout-form";

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

export async function getWorkoutsForUser(userId: string) {
  try {
    const workouts = await db.workout.findMany({
      where: { userId },
    });

    return workouts;
  } catch (error) {
    console.log("Error getting workouts");
    console.log(error);
  }
}

export async function getWorkoutsForCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        data: null,
        errors: ["Unauthorized"],
      };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });

    if (!user) {
      console.log("User not found");
      return {
        data: null,
        errors: ["Unauthorized"],
      };
    }

    const workouts = await db.workout.findMany({
      where: { userId: user.id },
    });

    return {
      data: workouts,
      errors: null,
    };
  } catch (error) {
    console.log("Error getting workouts");
    console.log(error);
    return {
      data: null,
      errors: [error],
    };
  }
}

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

export async function createWorkoutSession(workoutId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const workoutSession = await db.workoutSession.create({
      data: {
        workoutId,
        userId: user.id,
      },
      include: {
        workout: true,
        user: true,
      },
    });

    return workoutSession;
  } catch (error) {
    console.log("Error creating workout session");
    console.log(error);
  }
}

export async function startWorkoutSession(workoutSessionId: string) {
  try {
    // check that the workout session belongs to the current user
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const workoutSession = await db.workoutSession.findUnique({
      where: { id: workoutSessionId, userId: user.id },
      include: {
        workout: true,
        user: true,
      },
    });

    if (!workoutSession) {
      console.log("Workout session not found");
      return null;
    }

    const updatedWorkoutSession = await db.workoutSession.update({
      where: { id: workoutSessionId },
      data: {
        startedAt: new Date(),
        status: "STARTED",
      },
      include: {
        workout: true,
      },
    });

    return updatedWorkoutSession;
  } catch (error) {
    console.log("Error starting workout session");
    console.log(error);
  }
}

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

export async function getWorkoutSessionsForCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const workoutSessions = await db.workoutSession.findMany({
      where: { userId: user.id },
      include: {
        workout: true,
      },
    });

    return workoutSessions;
  } catch (error) {
    console.log("Error getting workout sessions");
    console.log(error);
  }
}

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

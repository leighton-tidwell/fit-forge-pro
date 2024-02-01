"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

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

"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getWorkoutSessionsForUser(userId?: string) {
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
      where: { userId: userId ?? user.id },
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

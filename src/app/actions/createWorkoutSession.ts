"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

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

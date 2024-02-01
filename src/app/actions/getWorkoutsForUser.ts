"use server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getWorkoutsForUser(userId?: string) {
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
      where: { userId: userId ?? user.id },
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
      errors: ["Error getting workouts"],
    };
  }
}

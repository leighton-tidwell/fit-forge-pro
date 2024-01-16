/*
  Warnings:

  - You are about to drop the `WorkoutSessionExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutSessionExercise" DROP CONSTRAINT "WorkoutSessionExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSessionExercise" DROP CONSTRAINT "WorkoutSessionExercise_workoutSessionId_fkey";

-- DropTable
DROP TABLE "WorkoutSessionExercise";

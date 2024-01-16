/*
  Warnings:

  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_B_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "exerciseIds" TEXT[];

-- DropTable
DROP TABLE "_ExerciseToWorkout";

-- CreateTable
CREATE TABLE "_WorkoutToExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutToExercise_AB_unique" ON "_WorkoutToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutToExercise_B_index" ON "_WorkoutToExercise"("B");

-- AddForeignKey
ALTER TABLE "_WorkoutToExercise" ADD CONSTRAINT "_WorkoutToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToExercise" ADD CONSTRAINT "_WorkoutToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `ExerciseSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToExerciseSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseSet" DROP CONSTRAINT "_ExerciseToExerciseSet_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseSet" DROP CONSTRAINT "_ExerciseToExerciseSet_B_fkey";

-- DropTable
DROP TABLE "ExerciseSet";

-- DropTable
DROP TABLE "_ExerciseToExerciseSet";

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Workout_userId_id_key" ON "Workout"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkout_AB_unique" ON "_ExerciseToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

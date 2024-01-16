-- CreateTable
CREATE TABLE "ExerciseWorkoutSession" (
    "id" TEXT NOT NULL,
    "workoutSessionId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "ExerciseWorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseWorkoutSession_workoutSessionId_exerciseId_key" ON "ExerciseWorkoutSession"("workoutSessionId", "exerciseId");

-- AddForeignKey
ALTER TABLE "ExerciseWorkoutSession" ADD CONSTRAINT "ExerciseWorkoutSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseWorkoutSession" ADD CONSTRAINT "ExerciseWorkoutSession_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

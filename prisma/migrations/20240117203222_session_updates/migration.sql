-- AlterTable
ALTER TABLE "ExerciseWorkoutSession" ALTER COLUMN "status" SET DEFAULT 'IDLE',
ALTER COLUMN "startedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "WorkoutSession" ALTER COLUMN "status" SET DEFAULT 'IDLE',
ALTER COLUMN "startedAt" DROP DEFAULT;

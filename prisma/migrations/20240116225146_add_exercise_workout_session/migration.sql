-- AlterTable
ALTER TABLE "WorkoutSession" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS',
ALTER COLUMN "startedAt" DROP NOT NULL,
ALTER COLUMN "startedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endedAt" DROP NOT NULL;

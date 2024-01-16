-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "sets" INTEGER,
    "reps" INTEGER,
    "weight" INTEGER,
    "duration" INTEGER,
    "cooldown" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToExerciseSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_userId_id_key" ON "Exercise"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSet_userId_id_key" ON "ExerciseSet"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToExerciseSet_AB_unique" ON "_ExerciseToExerciseSet"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseSet_B_index" ON "_ExerciseToExerciseSet"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseSet" ADD CONSTRAINT "_ExerciseToExerciseSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseSet" ADD CONSTRAINT "_ExerciseToExerciseSet_B_fkey" FOREIGN KEY ("B") REFERENCES "ExerciseSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

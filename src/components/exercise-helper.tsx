"use client";
import { Exercise } from "@prisma/client";
import { Timer } from "./timer";
import { Icons } from "./icons";
import { useState } from "react";
import { Button } from "./ui/button";

type ExerciseHelperProps = {
  exercise: Exercise;
};

// First we need to check if this exercise is one that involves
// reps and sets, or duration and sets
// if it's duration and sets, we need to show a timer with a start, pause and reset and a 'next set' button
// the timer should automatically default to the duration of the exercise
// if it's reps and sets, we need to show a 'next set' button as it wont make sense to track each rep
// additionally, if a cooldown is defined, we need to show a timer for that too

export const ExerciseHelper = ({ exercise }: ExerciseHelperProps) => {
  const [currentSet, setCurrentSet] = useState(1);

  if (exercise.duration) {
    return (
      <div className="flex flex-col gap-2">
        <span className="flex gap-2 text-md font-semibold">
          <Icons.timer className="w-4" />
          Set Timer
        </span>
        <Timer duration={exercise.duration} />
        <div className="flex items-center gap-2">
          <p className="text-md font-semibold">Set: {currentSet}</p>
          <Button
            onClick={() => setCurrentSet((currentSet) => currentSet + 1)}
            className="w-[fit-content]"
            variant="secondary"
          >
            Next Set <Icons.chevronRight className="w-4" />
          </Button>
        </div>
        {exercise.cooldown !== 0 && exercise.cooldown && (
          <div>
            <p>Cooldown: {exercise.cooldown}</p>
            <Timer duration={exercise.cooldown} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <p>Reps: {exercise.reps}</p>
      <div className="flex items-center gap-2">
        <p className="text-md font-semibold">Set: {currentSet}</p>
        <Button
          onClick={() => setCurrentSet((currentSet) => currentSet + 1)}
          className="w-[fit-content]"
          variant="secondary"
        >
          Next Set <Icons.chevronRight className="w-4" />
        </Button>
      </div>
      {exercise.cooldown !== 0 && exercise.cooldown && (
        <div>
          <p>Cooldown: {exercise.cooldown}</p>
          <Timer duration={exercise.cooldown} />
        </div>
      )}
    </div>
  );
};

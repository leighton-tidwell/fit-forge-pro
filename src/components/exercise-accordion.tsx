"use client";

import { Exercise } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type ExerciseAccordionProps = {
  exercises: Exercise[];
};

export const ExerciseAccordion = ({ exercises }: ExerciseAccordionProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      {exercises.map((exercise, index) => (
        <AccordionItem value={exercise.id} key={exercise.id}>
          <AccordionTrigger className="text-xl">
            {index + 1}. {exercise.name}
          </AccordionTrigger>
          <AccordionContent>
            <p>{exercise.description}</p>
            <p>Weight: {exercise.weight}</p>
            <p>Reps: {exercise.reps}</p>
            <p>Sets: {exercise.sets}</p>
            <p>Duration: {exercise.duration}</p>
            <p>Cooldown: {exercise.cooldown}</p>
            {exercise.videoUrl && (
              <video controls className="w-full">
                <source src={exercise.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

import * as z from "zod";

export const workoutSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  selectedExerciseIds: z.array(z.string()).min(1, {
    message: "Please select at least one exercise",
  }),
});

import * as z from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  description: z.string().optional(),
  video: z.any().optional(),
  sets: z
    .number()
    .int()
    .min(0, { message: "Sets cannot be less than 0" })
    .optional(),
  reps: z
    .number()
    .int()
    .min(0, { message: "Reps cannot be less than 0" })
    .optional(),
  weight: z
    .number()
    .int()
    .min(0, { message: "Weight cannot be less than 0" })
    .optional(),
  duration: z
    .number()
    .int()
    .min(0, { message: "Duration cannot be less than 0" })
    .optional(),
  cooldown: z.coerce
    .number()
    .int()
    .min(0, { message: "Cooldown cannot be less than 0" })
    .optional(),
});

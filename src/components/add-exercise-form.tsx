"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { exerciseSchema } from "@/lib/form-validations/exercise";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createExercise } from "@/app/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";

export type AddExerciseFormFields = z.infer<typeof exerciseSchema> &
  [key: string, value: any];

export const AddExerciseForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<AddExerciseFormFields>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      sets: 0,
      reps: 0,
      weight: 0,
      duration: 0,
      cooldown: 0,
      video: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: AddExerciseFormFields) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined) formData.append(key, data[key]);
      }
      await createExercise(formData);
      form.reset();

      // Reset video input
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
        <div className="flex flex-col gap-2">
          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Goblet Squats" {...field} />
                </FormControl>
                {/* <FormDescription>The name of the exercise</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Using a dumbbell or kettlebell, hold the weight in front of your chest with both hands cupping the head of the weight. Your feet should be shoulder-width apart, toes pointed slightly out. Keeping your chest up and core braced, squat down until your thighs are parallel to the floor. Drive back up through your heels to return to the start."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SETS */}
          <FormField
            control={form.control}
            name="sets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sets</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* REPS */}
          <FormField
            control={form.control}
            name="reps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reps</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* WEIGHT */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (lbs)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DURATION */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* COOLDOWN */}
          <FormField
            control={form.control}
            name="cooldown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooldown (seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* VIDEO */}
          <FormField
            control={form.control}
            name="video"
            render={({ field: { ref, ...field } }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    ref={(e) => {
                      ref(e);
                      fileInputRef.current = e;
                    }}
                    accept="video/*"
                    value={field.value?.fileName}
                    onChange={(event) => {
                      if (event.target.files?.length)
                        field.onChange(event.target.files[0]);
                    }}
                    type="file"
                  />
                </FormControl>
                <FormDescription>A brief instructionary video</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              "Add workout"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

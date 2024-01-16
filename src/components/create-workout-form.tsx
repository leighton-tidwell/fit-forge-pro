"use client";

import { Exercise } from "@prisma/client";
import { selectableColumns } from "./tables/exercises-table/columns";
import { ExercisesTable } from "./tables/exercises-table/data-table";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Alert, AlertDescription } from "./ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema } from "@/lib/form-validations/workout";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import * as z from "zod";
import { createWorkout } from "@/app/actions";

type CreateWorkoutFormProps = {
  userExercises: Exercise[];
};

export type CreateWorkoutFormFields = z.infer<typeof workoutSchema>;

export const CreateWorkoutForm = ({
  userExercises,
}: CreateWorkoutFormProps) => {
  const form = useForm<CreateWorkoutFormFields>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      selectedExerciseIds: [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: CreateWorkoutFormFields) => {
    setIsLoading(true);
    try {
      await createWorkout(data);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowSelectionChange = useCallback(
    (selectedExerciseIds: string[]) => {
      form.setValue("selectedExerciseIds", selectedExerciseIds);
      form.clearErrors("selectedExerciseIds");
    },
    [form]
  );

  return (
    <>
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
                    <Input placeholder="Full Body Workout" {...field} />
                  </FormControl>
                  {/* <FormDescription>The name of the exercise</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert className="bg-gray-800 text-white">
              <AlertDescription>
                Select the exercises that you would like to add to this workout
              </AlertDescription>
            </Alert>
            <FormField
              control={form.control}
              name="selectedExerciseIds"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <ExercisesTable
                        columns={selectableColumns}
                        data={userExercises}
                        onRowSelectionChange={handleRowSelectionChange}
                      />
                      {!invalid && (
                        <span>{field.value.length} exercises selected</span>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="animate-spin" />
              ) : (
                "Create Workout"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

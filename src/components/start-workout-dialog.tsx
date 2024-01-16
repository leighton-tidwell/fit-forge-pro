"use client";

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getWorkoutsForCurrentUser } from "@/app/actions";
import { Workout } from "@prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const StartWorkoutDialog = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      const { data, errors } = await getWorkoutsForCurrentUser();

      if (data?.length) {
        setWorkouts(data);
      }

      if (errors) {
        console.error(errors);
      }

      setIsLoading(false);
    };

    fetchWorkouts();
  }, []);

  const handleStartWorkout = () => {
    setIsRouteLoading(true);
    router.push(`/dashboard/workout/${selectedWorkout?.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger disabled={isLoading}>
        <Card className="bg-green-500 text-white p-8 flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer">
          {isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <div className="bg-white text-green-500 px-4 py-2 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400">
              <Icons.arrowRight />
            </div>
          )}
          <h2 className="text-2xl font-bold">Start Workout</h2>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start workout</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Select
            defaultValue={selectedWorkout?.name}
            onValueChange={(value) => {
              const workout = workouts.find((workout) => workout.id === value);
              setSelectedWorkout(workout);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a workout" />
            </SelectTrigger>
            <SelectContent>
              {workouts.map((workout) => (
                <SelectItem key={workout.id} value={workout?.id}>
                  {workout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="default"
            onClick={handleStartWorkout}
            disabled={!selectedWorkout || isRouteLoading}
          >
            {isRouteLoading ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              "Start workout"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

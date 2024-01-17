"use client";

import { Workout } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { deleteWorkout } from "@/app/actions";
import { TableActions } from "@/components/table-actions";

export const columns: ColumnDef<Workout>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Exercises",
    accessorKey: "exerciseIds",
    cell: ({ row }) => {
      const workout = row.original;
      const exerciseIds = workout.exerciseIds;

      return (
        <span className="text-gray-500">
          {exerciseIds.length} exercise{exerciseIds.length !== 1 && "s"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workout = row.original;

      return (
        <TableActions item={workout} action={deleteWorkout} title="workout" />
      );
    },
  },
];

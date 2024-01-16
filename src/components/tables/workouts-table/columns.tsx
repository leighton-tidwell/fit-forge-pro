"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Workout } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { deleteWorkout } from "@/app/actions";
import { useState } from "react";
import { Icons } from "@/components/icons";
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

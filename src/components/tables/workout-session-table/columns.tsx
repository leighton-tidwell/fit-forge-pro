"use client";

import { WorkoutSession } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TableActions } from "@/components/table-actions";
import { buttonVariants } from "@/components/ui/button";

export const columns: ColumnDef<WorkoutSession>[] = [
  {
    header: "Name",
    accessorKey: "workout.name",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workoutSession = row.original;

      return (
        <TableActions
          item={workoutSession}
          href={`/dashboard/session/${workoutSession.id}`}
          title="workout session"
        />
      );
    },
  },
];

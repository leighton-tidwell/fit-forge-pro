"use client";
import { Exercise } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { deleteExercise } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { TableActions } from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Exercise>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const exercise = row.original;

      return (
        <TableActions
          item={exercise}
          action={deleteExercise}
          title="exercise"
        />
      );
    },
  },
];

export const selectableColumns: ColumnDef<Exercise>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    enableSorting: true,
  },
];

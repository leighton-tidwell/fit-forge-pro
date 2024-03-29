"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { Icons } from "./icons";
import { Exercise, Workout } from "@prisma/client";
import { useRouter } from "next/navigation";

type TableActionsProps = {
  item: any;
  action?: (id: string) => Promise<Exercise | Workout | undefined>;
  href?: string;
  title: string;
};

export const TableActions = ({
  item,
  action,
  href,
  title,
}: TableActionsProps) => {
  const router = useRouter();
  const [showLoadingFor, setShowLoadingFor] = useState("");

  return href ? (
    <Button
      variant="ghost"
      onClick={() => {
        router.push(href);
      }}
    >
      Resume Workout <Icons.chevronRight className="w-4" />
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            setShowLoadingFor(item.id);
            if (action) {
              await action(item.id);
            }
          }}
        >
          {showLoadingFor === item.id ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            `Delete ${title}`
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

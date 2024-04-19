"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useOrganizationList } from "@clerk/nextjs";

import { CardWithList } from "../../../../types";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { assignCard } from "../../../../action/assign-card";
import { useParams } from "next/navigation";

interface AssignCardProps {
  data: CardWithList;
}

export const AssignCard = ({ data }: AssignCardProps) => {
  const params = useParams();

  const { run } = useAction(assignCard, {
    onSuccess: (data) => {
      console.log("Assigned", data);
      toast.success(
        `${data.title} card assigned to ${data.assignedTo || "No one"}.`
      );
    },
    onError: (error) => {
      console.log("Assign failed", error);
      toast.error("Assign failed");
    },
  });

  const [position, setPosition] = useState("top");

  const handleAssign = (assignedTo: string) => {
    const boardId = params.boardId as string;
    const id = data.id as string;

    run({
      id,
      boardId,
      assignedTo,
      listId: data.listId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gray" className="w-full">
          {data.assignedTo || "Unassignned"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Assign To:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            value="Yagyaraj Lodhi"
            onClick={() => handleAssign("Yagyaraj Lodhi")}
          >
            Yagyaraj Lodhi
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => handleAssign("Unassignned")}
            value="Unassignned"
          >
            Unassignned
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

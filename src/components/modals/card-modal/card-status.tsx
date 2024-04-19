"use client";

import { useState } from "react";
import { toast } from "sonner";

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
import { useParams } from "next/navigation";
import { updateCardStatus } from "../../../../action/update-card-status";

const cardStatus = ["TODO", "IN PROGRESS", "DONE", "REVIEW", "ARCHIEVED"];

interface CardStatusProps {
  data: CardWithList;
}

export const CardStatus = ({ data }: CardStatusProps) => {
  const params = useParams();

  const { run } = useAction(updateCardStatus, {
    onSuccess: (data) => {
      toast.success(`${data.title} marked as ${data?.currentStatus}.`);
    },
    onError: (error) => {
      toast.error("Failed to update status.");
    },
  });

  const [position, setPosition] = useState("Select Status");

  const handleAssign = (status: string) => {
    const boardId = params.boardId as string;
    const id = data.id as string;

    run({
      id,
      boardId,
      status,
      listId: data.listId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gray" className="w-full">
          {data.currentStatus || "None"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Current Status:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {cardStatus?.map((item, idx) => (
            <DropdownMenuRadioItem
              value={item}
              onClick={() => handleAssign(item)}
              key={idx}
            >
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

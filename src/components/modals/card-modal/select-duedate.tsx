"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/use-action";

import { createDueDate } from "../../../../action/create-card-dueData";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarHeartIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CardWithList } from "../../../../types";

interface SelectDueDateProps {
  cardId?: string;
  listId?: string;
  date?: any;
  data: CardWithList;
}

export const SelectDueDate = ({ data }: SelectDueDateProps) => {
  const params = useParams();

  const [dueDate, setDueDate] = useState<any>(data.dueDate || null);

  const { run } = useAction(createDueDate, {
    onSuccess: () => {
      console.log("Due date created");
    },
    onError: () => {
      console.log("Due date creation failed");
    },
  });

  useEffect(() => {
    callFunction();
  }, [dueDate]);

  const callFunction = useCallback(() => {
    console.log(dueDate, data.dueDate);
    if (dueDate && dueDate !== data.dueDate) {
      run({
        boardId: params.boardId as string,
        id: data.id as string,
        dueDate,
        listId: data.listId,
      });
    }
  }, [dueDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"gray"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !dueDate && "text-muted-foreground"
          )}
        >
          <CalendarHeartIcon className="mr-2 h-4 w-4" />
          {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={setDueDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

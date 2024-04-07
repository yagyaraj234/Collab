"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, MoreHorizontal, Trash } from "lucide-react";

export const DeleteBoard = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-10 p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 max-w-[160px] pt-3 mr-4 pb-3"
        side="bottom"
        align="start"
      >
        {/* <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div> */}
        {/* <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose> */}
        <Button
          variant="ghost"
          //    TODO: Implement onDelete
          //   onClick={onDelete}
          //   disabled={isLoading}
          className="rounded-none w-full h-auto p-1 px-2  justify-start font-medium text-sm flex gap-4 items-center "
        >
          <Trash className="h-4 w-4" /> Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

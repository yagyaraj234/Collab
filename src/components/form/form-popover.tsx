"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "./form-input";
import { FormSubmitButton } from "./form-button";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { createBoard } from "../../../action/create-board";
import { toast } from "sonner";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { run, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Board created", data);
      toast.success("Board created successfully");
    },
    onError: (error) => {
      console.log("Error creating board", error);
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    // const { description } = formData.get("description") as string;
    await run({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-3 absolute right-2 text-neutral-600 top-2 shadow-none bg-white hover:bg-white">
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>

        <form action={onSubmit}>
          <div className="space-y-4">
            <FormInput
              id="title"
              placeholder="Nov"
              label="Board title"
              type="text"
              className="p-2 mb-2"
              errors={fieldErrors}
            />
            <FormInput
              id="description"
              placeholder="This board is for the new project"
              label="Board description"
              type="text"
              className="p-2 mb-2"
            />
          </div>
          <FormSubmitButton className="w-full">Create</FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

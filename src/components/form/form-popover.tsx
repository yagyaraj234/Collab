"use client";

import { useRef } from "react";

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
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-model";

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
  const router = useRouter();
  const closeRef = useRef(null);

  const upgradeModal = useUpgradeModal();

  const { run, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      (closeRef.current as unknown as HTMLElement)?.click();
      toast.success("Board created successfully");
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      upgradeModal.onOpen();
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    // const { description } = formData.get("description") as string;
    await run({ title, image });
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
        <PopoverClose asChild ref={closeRef}>
          <Button className="h-auto w-auto p-3 absolute right-2 text-neutral-600 top-2 shadow-none bg-white hover:bg-white">
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>

        <form action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              placeholder="Nov"
              label="Board title"
              type="text"
              className="p-2 mb-2"
              errors={fieldErrors}
            />
            {/* <FormInput
              id="description"
              placeholder="This board is for the new project"
              label="Board description"
              type="text"
              className="p-2 mb-2"
            /> */}
          </div>
          <FormSubmitButton className="w-full">Create</FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

"use client";
import { ElementRef, useRef } from "react";
import { List } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmitButton } from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "../../../../../../action/delete-list";
import { toast } from "sonner";
import { copyList } from "../../../../../../action/copy-list";

interface ListOptionProps {
  data: List;
  onAddCard: () => void;
}

export const ListOption = ({ onAddCard, data }: ListOptionProps) => {
  const buttonRef = useRef<ElementRef<"button">>(null);
  const { run, isLoading } = useAction(deleteList, {
    onSuccess: () => {
      toast.success("List deleted successfully");
      buttonRef.current?.click();
    },
    onError: (error) => {
      toast.error("Error deleting list");
    },
  });

  const { run: runDelete } = useAction(copyList, {
    onSuccess: () => {
      toast.success("List Copied successfully");
      buttonRef.current?.click();
    },
    onError: (error) => {
      toast.error("Error while copying list");
    },
  });

  const onDeleteSubmit = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    await run({ id, boardId });
  };

  const onCopyList = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    console.log({ id, boardId });
    await runDelete({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="px-0 pt-3 pb-3">
        <PopoverClose>
          <Button
            variant="ghost"
            className="sm h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 pb-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant={"ghost"}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          onClick={onAddCard}
        >
          Add Card...
        </Button>
        <form action={onCopyList}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmitButton
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant={"ghost"}
          >
            Copy List...
          </FormSubmitButton>
        </form>
        <Separator />
        <form className="mt-2" action={onDeleteSubmit}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmitButton
            variant={"ghost"}
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            {isLoading ? "Deleting..." : "Delete List..."}
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

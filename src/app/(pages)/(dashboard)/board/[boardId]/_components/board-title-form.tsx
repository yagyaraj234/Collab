"use client";
import { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";

import { updateBoard } from "../../../../../../../action/update-board";
import { useAction } from "@/hooks/use-action";

interface BoardTitleFormProps {
  data: Board;
}
export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { run, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated.`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error("Error updating board");
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = async (formdata: FormData) => {
    const title = formdata.get("title") as string;
    await run({ title, id: data.id });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};

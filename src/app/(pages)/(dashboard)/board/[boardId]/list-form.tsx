"use client";

import { useState, useRef, ElementRef } from "react";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { ListWrapper } from "./list-wrapper";
import { FormInput } from "@/components/form/form-input";
import { useParams } from "next/navigation";
import { FormSubmitButton } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { createList } from "../../../../../../action/create-list";

export const ListForm = () => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { fieldErrors, run } = useAction(createList, {
    onSuccess: () => {
      disableEditing();
      toast.success("List created successfully");
    },
    onError: (error) => {
      console.log("Error creating list", error);
      toast.error("Error creating list");
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    console.log({ title, boardId });
    await run({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className="w-full rounded-md space-y-4 shadow-md bg-white p-2"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />

          <div className="flex items-center gap-x-1">
            <FormSubmitButton>Add List</FormSubmitButton>
            <Button onClick={disableEditing} size="sm" variant={"ghost"}>
              <X className="h-5 w-5 " />
            </Button>
          </div>

          {/* <button
            type="submit"
            className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
          >
            Add List
          </button> */}
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a List
      </button>
      {/* <form className="w-full -3 rounded-md space-y-4 shadow-md"></form> */}
    </ListWrapper>
  );
};

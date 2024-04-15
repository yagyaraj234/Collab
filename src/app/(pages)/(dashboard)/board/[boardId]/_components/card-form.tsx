"use client";
import { forwardRef, ElementRef, KeyboardEventHandler, useRef } from "react";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";

import { FormSubmitButton } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { createCard } from "../../../../../../../action/create-card";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

interface CardFormProps {
  ref: any;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
  listId: string;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, disableEditing, enableEditing, listId }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { run, fieldErrors } = useAction(createCard, {
      onSuccess: () => {
        disableEditing();
        toast.success("Card created successfully");
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Esc" && e.shiftKey) {
        disableEditing();
      }
    };

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      run({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            ref={ref}
            onKeyDown={onTextareaKeyDown}
            id="title"
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
            className="bg-white"
          />
          <input hidden id="listId" name="listId" value={listId} />

          <div className="flex items-center gap-x-1">
            <FormSubmitButton>Add Card</FormSubmitButton>
            <Button onClick={disableEditing} size={"sm"} variant={`ghost`}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size={"sm"}
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 mr-2" /> Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";

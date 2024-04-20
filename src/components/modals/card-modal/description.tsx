"use client";

import { useState, useRef, ElementRef } from "react";
import { AlignLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "../../../../types";
import { FormTextarea } from "@/components/form/form-textarea";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "../../../../action/update-card";
import { FormSubmitButton } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const textareaRef = useRef<ElementRef<"textarea"> | null>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const { run } = useAction(updateCard, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card ${data.title} updated.`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
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

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    if (!boardId) {
      return;
    }

    run({ id: data.id, boardId, description });
  };

  return (
    <div className="flex flex-col w-full justify-start gap-x-3 text-neutral-700">
      <div className="flex gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full min-w-9/12">
          <p className="mb-2 text-neutral-700 font-semibold">Description</p>

          {isEditing ? (
            <form action={onSubmit} ref={formRef} className="w-full">
              <FormTextarea
                ref={textareaRef}
                id="description"
                placeholder="Add a more detailed description"
                defaultValue={data?.description || undefined}
                className="w-full h-[160px] text-black"
              />
              <div className="flex gap-x-2 mt-2">
                <FormSubmitButton>Save</FormSubmitButton>
                <Button
                  type="button"
                  onClick={disableEditing}
                  size="sm"
                  variant={`outline`}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              onClick={enableEditing}
              role="button"
              className="flex h-[160px] w-full bg-neutral-200 text-sm font-medium px-3.5 rounded-md py-3 "
            >
              {data.description || "Add a more detailed description..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Description.Skeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-x-3 mb-2">
        <Skeleton className="h-5 w-5 bg-neutral-200" />
        <Skeleton className="h-5 w-24 bg-neutral-200" />
      </div>

      <Skeleton className="min-h-[160px] w-full" />
    </div>
  );
};

Description.displayName = "Description";

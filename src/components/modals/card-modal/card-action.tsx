"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, Copy, Trash } from "lucide-react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "../../../../types";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "../../../../action/copy-card";
import { deleteCard } from "../../../../action/delete-card";
import { useCardModal } from "@/hooks/use-card-modal";
import { SelectDueDate } from "./select_duedate";
import { AssignCard } from "./assigned-card";
import { CardStatus } from "./card-status";

interface CardActionProps {
  data: CardWithList;
}
export const CardAction = ({ data }: CardActionProps) => {
  const params = useParams();

  const cardModal = useCardModal();

  // States

  const [showMore, setShowMore] = useState<boolean>(false);

  // Actions
  const { run: runDeleteCard, isLoading: isDeleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        cardModal.onClose();
        toast.success(`${data.title} card deleted.`);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { run: runCopyCard, isLoading: isCopyLoading } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`${data.title} card copied.`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error("Someting went wrong");
    },
  });

  const onDelete = async () => {
    const boardId = params.boardId as string;
    const id = data.id as string;

    await runDeleteCard({
      id,
      boardId,
    });
  };

  const onCopy = async () => {
    const boardId = params.boardId as string;
    const id = data.id as string;
    await runCopyCard({
      id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Due date:</p>
      <SelectDueDate data={data} />

      {/* <p className="text-xs font-semibold">Assigned to:</p>
      <AssignCard data={data} /> */}

      <p className="text-xs font-semibold">Status:</p>
      <CardStatus data={data} />

      {showMore && (
        <>
          <Button
            onClick={onCopy}
            disabled={isCopyLoading}
            variant={`gray`}
            size="inline"
            className="w-full justify-start"
          >
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button
            onClick={onDelete}
            disabled={isDeleteLoading}
            variant={`gray`}
            size="inline"
            className="w-full justify-start"
          >
            <Trash className="h-4 w-4 mr-2" /> Delete
          </Button>
        </>
      )}

      {showMore ? (
        <div
          className="text-sm border border-slate-200 flex items-center  w-full p-2 rounded-md text-black cursor-pointer justify-between"
          onClick={() => setShowMore(!showMore)}
        >
          <div>Show less</div> <ChevronDown className="h-4 w-4  rotate-180" />
        </div>
      ) : (
        <div
          className="text-sm border border-slate-200 flex items-center  w-full p-2 rounded-md text-black cursor-pointer justify-between font-medium"
          onClick={() => setShowMore(!showMore)}
        >
          <div>Show more actions</div> <ChevronDown className="h-4 w-4 " />
        </div>
      )}
    </div>
  );
};

CardAction.Skeleton = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

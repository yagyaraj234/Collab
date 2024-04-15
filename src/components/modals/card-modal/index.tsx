"use cleint";
import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "../../../../types";
import { fetcher } from "@/lib/fetcher";
import { Header } from "./header";
import { Description } from "./description";
import { CardAction } from "./card-action";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: auditData } = useQuery<AuditLog>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-black">
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <Description data={cardData} />
              ) : (
                <Description.Skeleton />
              )}
              {auditData ? (
                <Activity items={auditData} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <CardAction data={cardData} /> : <CardAction.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

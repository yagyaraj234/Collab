"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivityProps {
  items: AuditLog[] | undefined;
}

export const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="flex flex-col items-start gap-x-3 w-full">
      <div className="flex gap-4">
        <ActivityIcon className="h-5 w-5 text-neutral-700 mt-0.5" />
        <p className="font-semibold text-neutral-700 mb-2">Activity</p>
      </div>

      <ol className="mt-2 space-y-4 flex flex-col">
        {items?.map((item: any) => (
          <ActivityItem data={item} key={item.id} />
        ))}
      </ol>
    </div>
  );
};

Activity.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full ">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};

Activity.displayName = "Activity";

import { Hint } from "./hint";
import { HelpCircle, User2 } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { FormPopover } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/board";
import { getAvailableCount } from "@/lib/orgLimit";
import { checkSubscription } from "@/lib/subscription";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-2  h-full ">
      <div className="flex items-center font-semibold text-left text-neutral-700 mb-6">
        <User2 className="h- w-6 mr-2" />
        Your boards
      </div>

      <div
        className="grid grid-cols-2
         sm:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className="group relative aspect-video bg-no-repeat bg-cover bg-sky-700 rounded-sm p-2 overflow-hidden  hover:opacity-75 transition text-neutral-700 "
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="text-white font-medium text-[14px]">
              {board.title}
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side={`right`}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition p-4 text-neutral-700 "
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">
              {isPro
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - availableCount} remaining`}
            </span>
            <Hint
              sideOffset={40}
              description="Free Plan you can create maximum 5 board upgrade to higher plan to create more boards"
            >
              <HelpCircle className="h-4 w-4 right-2 absolute bottom-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
      <Skeleton className="aspect-video h-full w-full p-2 min-w-[160px]" />
    </div>
  );
};

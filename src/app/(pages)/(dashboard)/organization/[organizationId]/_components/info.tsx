"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface InfoProps {
  isPro: boolean;
}
export const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  // getBoard();

  return (
    <div className="flex items-center gap-x-4 ">
      <div className="flex  gap-x-2">
        <div className="flex gap-2 ">
          <Image
            // fill
            height={48}
            width={48}
            src={organization?.imageUrl!}
            alt="Organization"
            className="rounded-md"
          />
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-xl text-slate-600">
            {organization?.name}
          </p>
          <div className="flex items-center text-slate-400">
            <CreditCardIcon className="h-4 w-4 mr-1" /> {isPro ? "Pro" : "Free"}
          </div>
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-[48px] h-[48px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>

      <div className="flex flex-col space-y-2 justify-center ">
        <div>
          <Skeleton className="w-[100px]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-[80px] h-4" />
        </div>
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";

import { useUpgradeModal } from "@/hooks/use-upgrade-model";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "../../../action/stripe-redirect";
import { toast } from "sonner";
export const UpgradeModal = () => {
  const upgradeModal = useUpgradeModal();

  const { run, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data: any) => {
      window.location.href = data;
      console.log();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    run({});
  };

  return (
    <Dialog open={upgradeModal.isOpen} onOpenChange={upgradeModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.jpg" alt="hero" className="object-cover" fill />
        </div>

        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold">Upgrade to Collab Pro Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>

          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited Boards</li>
              <li>Advanced checklists</li>
              <li>And more!</li>
            </ul>
          </div>

          <Button onClick={onClick} disabled={isLoading} className="w-full">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modal";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CardModal />
      <UpgradeModal />
    </>
  );
};

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams();
  console.log(params.organizationId as string);
  const { setActive } = useOrganizationList();

  useEffect(() => {
    console.log(params.organizationId as string);
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId as string]);

  return null;
};

import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

import { OrgControl } from "./_components/org-control";
import Sidebar from "./_components/sidebar";
import { Info } from "./_components/info";
import { checkSubscription } from "@/lib/subscription";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isPro = await checkSubscription();
  return (
    <>
      <OrgControl />

      <div className="flex flex-col p-4">
        <div className="pl-4">
          <Info isPro={isPro} />
        </div>
        <div className="border-t border-slate-200 my-4"></div>

        <div className="flex gap-4 ">
          <Sidebar />

          {children}
        </div>
      </div>
    </>
  );
};

export default OrganizationIdLayout;

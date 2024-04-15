import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

import { OrgControl } from "./_components/org-control";
import Sidebar from "./_components/sidebar";
import { Info } from "./_components/info";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />

      <div className="flex flex-col p-4">
        <div className="pl-4">
          <Info />
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

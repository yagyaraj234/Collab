import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import Sidebar from "./_components/sidebar";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";

const OrganizationPage = () => {
  return (
    <div className="text-white p-4">
      <Info />
      <Separator className="my-4" />

      <div className="flex gap-4 ">
        <Sidebar />

        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationPage;

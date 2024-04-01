import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import Sidebar from "./_components/sidebar";
import { BoardList } from "./_components/board-list";

const OrganizationPage = () => {
  return (
    <div className="text-white p-4">
      <Info />
      <Separator className="my-4" />

      <div className="flex gap-4 ">
        <Sidebar />
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationPage;

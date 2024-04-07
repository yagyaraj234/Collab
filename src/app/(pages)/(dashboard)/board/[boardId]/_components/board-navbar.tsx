import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { DeleteBoard } from "./board-options";

interface BoardNavbarProps {
  data: Board;
}
export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/20 fixed  flex items-center px-6 gap-x-4 text-white justify-between">
      <BoardTitleForm data={data} />
      <div className="flex gap-x-4">
        <DeleteBoard />
      </div>
    </div>
  );
};

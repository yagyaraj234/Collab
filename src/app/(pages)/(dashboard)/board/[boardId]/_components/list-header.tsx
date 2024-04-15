"use client";

import { List } from "@prisma/client";
import { ListOption } from "./list-option";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-center items-start gap-x-2">
      <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent flex justify-between items-center">
        {data.title}
        <ListOption data={data} onAddCard={onAddCard} />
      </div>
    </div>
  );
};

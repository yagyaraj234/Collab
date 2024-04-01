"use client";
import { User2 } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
const BoardPage = () => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <User2 />
        Your Boards
      </div>

      <Separator className="my-2" />
    </div>
  );
};

export default BoardPage;

import { User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

const BoardPage = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

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

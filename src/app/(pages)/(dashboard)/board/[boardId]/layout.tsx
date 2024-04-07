import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { title } from "process";
import { Bona_Nova } from "next/font/google";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  if (!board) {
    notFound();
  }
  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative bg-cover bg-center h-[calc(100vh-70px)] bg-fixed bg-no-repeat  "
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;

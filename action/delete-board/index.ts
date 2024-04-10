"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId } = data;

  let board;

  try {
    board = await db.board.delete({
      where: {
        id: boardId,
      },
    });
  } catch (error) {
    return {
      error: "An error occurred",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);

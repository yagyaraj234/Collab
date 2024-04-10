"use server";

import { db } from "@/lib/db";
import { InputType, OutputType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  console.log({ id, boardId });
  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return {
        error: "Board not found",
      };
    }
    const copylistItem = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!copylistItem) {
      return {
        error: "List not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title: `${copylistItem.title} Copy`,
        boardId: copylistItem?.boardId!,
        order: newOrder,
        createdBy: userId,
        cards: {
          createMany: {
            data: copylistItem.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
              createdBy: card.createdBy,
              assignedTo: card.assignedTo || "", // Add the missing assignedTo property
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);

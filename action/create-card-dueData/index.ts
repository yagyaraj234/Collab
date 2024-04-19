"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateDueDate } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, listId, id, dueDate } = data;
  let card;
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

    const listExists = await db.list.findFirst({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });
    if (!listExists) {
      return {
        error: "List not found",
      };
    }

    card = await db.card.update({
      where: {
        id: id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        dueDate,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createDueDate = createSafeAction(CreateDueDate, handler);

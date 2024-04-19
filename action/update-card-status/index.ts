"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardStatus } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId, status } = data;

  let card;
  try {
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
        currentStatus: status,
      },
    });
    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Error updating board",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCardStatus = createSafeAction(UpdateCardStatus, handler);

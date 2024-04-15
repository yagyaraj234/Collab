"use server";

import { db } from "@/lib/db";
import { InputType, OutputType } from "./types";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  // console.log({ id, boardId });
  let card;
  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return { error: "Card not found" };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        assignedTo: "",
        listId: cardToCopy.listId,
        createdBy: user.firstName + " " + user.lastName || "",
      },
    });
    // await createAuditLog({
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   entityTitle: card.title,
    //   action: ACTION.C,
    // });
  } catch (error) {
    return {
      error: "Failed to copy list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);

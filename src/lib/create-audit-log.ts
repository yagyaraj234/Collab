import { auth, currentUser } from "@clerk/nextjs";

import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export async function createAuditLog(props: Props) {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !user.id) {
      throw new Error("User not found");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await db.auditLog.create({
      data: {
        action,
        entityType,
        entityTitle,
        entityId,
        orgId: orgId as string,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.error("Error creating audit log", error);
  }
}

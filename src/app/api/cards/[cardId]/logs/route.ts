import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      cardId: string;
    };
  }
) {
  try {
    const { orgId, userId } = auth();

    if (!orgId || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLog = await db.auditLog.findMany({
      where: {
        entityId: params.cardId,
        entityType: "CARD",
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(auditLog);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { auth } from "@clerk/nextjs";

import { db } from "./db";
import { MAX_FREE_BOARDS } from "@/constants/board";

export const increarementAvailableBoards = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const organizationLimit = await db.orgLimit.findFirst({
    where: {
      orgId,
    },
  });

  if (organizationLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: organizationLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};
export const decrementAvailableBoards = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const organizationLimit = await db.orgLimit.findFirst({
    where: {
      orgId,
    },
  });

  if (organizationLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: organizationLimit.count > 0 ? organizationLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const organizationLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!organizationLimit || organizationLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};

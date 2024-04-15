import { z } from "zod";

export const CopyCard = z.object({
  boardId: z.string({
    required_error: "Board ID is required",
  }),
  id: z.string({
    required_error: "List ID is required",
  }),
});

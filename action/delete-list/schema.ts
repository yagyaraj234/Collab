import { z } from "zod";

export const DeleteList = z.object({
  id: z.string({
    required_error: "List ID is required",
  }),
  boardId: z.string({
    required_error: "Board ID is required",
  }),
});

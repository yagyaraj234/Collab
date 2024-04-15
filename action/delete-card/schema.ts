import { z } from "zod";

export const DeleteCard = z.object({
  boardId: z.string({
    required_error: "Board ID is required",
  }),
  id: z.string({
    required_error: "List ID is required",
  }),
});

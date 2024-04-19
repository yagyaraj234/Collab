import { z } from "zod";

export const UpdateCardStatus = z.object({
  boardId: z.string({
    required_error: "Board ID is required",
  }),
  listId: z.string({
    required_error: "List ID is required",
  }),

  id: z.string({
    required_error: "ID is required",
  }),
  status: z.string({
    required_error: "Card status is required",
  }),
});
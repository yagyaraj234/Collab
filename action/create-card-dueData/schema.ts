import { z } from "zod";

export const CreateDueDate = z.object({
  id: z.string({
    required_error: "Card ID is required",
  }),
  boardId: z.string({
    required_error: "Board ID is required",
  }),
  listId: z.string({
    required_error: "List ID is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
});

import { z } from "zod";

export const AssignCard = z.object({
  boardId: z.string({
    required_error: "Board ID is required",
  }),
  listId: z.string({
    required_error: "List ID is required",
  }),
  id: z.string({
    required_error: "Card ID is required",
  }),
  assignedTo: z.string({
    required_error: "Assignee is required",
  }),
});

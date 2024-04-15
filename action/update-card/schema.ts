import { z } from "zod";

export const UpdateCard = z.object({
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
      })
      .min(5, {
        message: "Minimum 5 characters required",
      })
      .max(30, {
        message: "Maximum 30 characters allowed",
      })
  ),
  boardId: z.string({
    required_error: "Board ID is required",
  }),
  description: z.optional(
    z.string({
      required_error: "Description is required",
    })
  ),
  id: z.string({
    required_error: "Board ID is required",
  }),
});

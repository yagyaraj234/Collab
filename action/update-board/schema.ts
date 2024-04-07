import { z } from "zod";

export const UpdateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(5, {
      message: "Minimum 5 characters required",
    })
    .max(30, {
      message: "Maximum 30 characters allowed",
    }),
  id: z.string({
    required_error: "Board ID is required",
  }),
});

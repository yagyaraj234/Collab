import { title } from "process";
import { z } from "zod";

export const EditList = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, {
      message: "Minimum 3 characters required",
    })
    .max(30, {
      message: "Maximum 30 characters allowed",
    }),
  id: z.string({
    required_error: "List ID is required",
  }),
  boardId: z.string({
    required_error: "Board ID is required",
  }),
});

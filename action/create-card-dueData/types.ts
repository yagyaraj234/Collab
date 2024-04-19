import { z } from "zod";

import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateDueDate } from "./schema";

export type InputType = z.infer<typeof CreateDueDate>;
export type OutputType = ActionState<InputType, Card>;

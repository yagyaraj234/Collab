import { z } from "zod";

import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { AssignCard } from "./schema";

export type InputType = z.infer<typeof AssignCard>;
export type OutputType = ActionState<InputType, Card>;

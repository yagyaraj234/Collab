import { z } from "zod";

import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateCardStatus } from "./schema";

export type InputType = z.infer<typeof UpdateCardStatus>;
export type OutputType = ActionState<InputType, Card>;

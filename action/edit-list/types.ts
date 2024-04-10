import { z } from "zod";

import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { EditList } from "./schema";

export type InputType = z.infer<typeof EditList>;
export type OutputType = ActionState<InputType, List>;

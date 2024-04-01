import { z } from "zod";

export type FieldError<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  loading?: boolean;
  error?: string | any;
  data?: TOutput | null;
  fieldErrors?: FieldError<TInput>;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput) => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldError<TInput>,
      };
    }
    return await handler(validationResult.data);
  };
};

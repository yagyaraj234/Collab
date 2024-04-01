import { useState, useCallback } from "react";

import { ActionState, FieldError } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string | any) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldError<TInput> | undefined
  >(undefined); // (1)
  const [data, setData] = useState<TOutput | null>(null); // (2)
  const [isLoading, setIsLoading] = useState<boolean>(false); // (3)

  const run = useCallback(
    async (data: TInput) => {
      setIsLoading(true);
      const result = await action(data);
      if (!result) {
        return;
      }

      // if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
      // } else {
      //   setFieldErrors("");
      // }
      if (result.data) {
        setData(result.data);
        options.onSuccess?.(result.data);
      }
      if (result.error) {
        options.onError?.(result.error);
      }
      setIsLoading(false);
      options.onComplete?.();
    },
    [action, options]
  );

  return {
    run,
    fieldErrors,
    data,
    isLoading,
  };
};

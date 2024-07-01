import { useState, useCallback } from 'react';
import { ActionState, FieldErrors } from '@/types';
import { useToast } from '@/components/ui/use-toast';

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onFinally?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput>
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) return;
        const { fieldErrors, error, data } = result;

        if (fieldErrors) {
          setFieldErrors(fieldErrors);
        }

        if (error) {
          setError(error);

          if (options.onError) {
            options.onError?.(error);
            return;
          }

          toast({
            title: 'ERROR',
            description: `[ERROR]: ${error}`,
          });
        }
        if (data) {
          setData(data);
          options.onSuccess?.(data);
        }
      } finally {
        setIsLoading(false);
        options.onFinally?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    data,
    fieldErrors,
    error,
    isLoading,
  };
};

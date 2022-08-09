import axios, { AxiosError } from "axios";
import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

function useMutation<T>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const mutation = async (data: any) => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
      }));
      const result = await axios.post(url, {
        data,
      });

      setState((prev) => ({
        ...prev,
        data: result.data,
      }));
    } catch (_e) {
      const e = _e as AxiosError;
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };
  return [
    mutation,
    {
      loading: state.loading,
      data: state.data,
      error: state.error,
    },
  ];
}

export default useMutation;

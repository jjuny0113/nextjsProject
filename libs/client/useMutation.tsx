import axios, { AxiosError } from "axios";
import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

const useMutation = (url: string): UseMutationResult => {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const mutation = async (data: any) => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const result = await axios.post(url, {
        data,
      });
      setState({
        ...state,
        data: result.data,
      });
    } catch (_e) {
      const e = _e as AxiosError;
      setState({
        ...state,
        error: e,
      });
    } finally {
      setState({
        ...state,
        loading: false,
      });
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
};

export default useMutation;

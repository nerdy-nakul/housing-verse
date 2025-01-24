import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/react-query";

export default function useUnlockHouse() {
  return useMutation({
    mutationFn: async (data: {
      id: string;
      data: { unlocked: boolean };
      onSuccess?: (res: any) => void;
      onError?: (err: any) => void;
    }) => {
      const response = await axios.put(`http://192.168.1.5:3000/house/${data.id}`, data.data);

      queryClient.invalidateQueries({
        queryKey: ["house", data.id],
        refetchType: "none",
      });

      return response.data;
    },
    onSuccess: async (res, { onSuccess }) => {
      await onSuccess?.(res);
    },
    onError: async (err, { onError }) => {
      await onError?.(err);
    },
  });
}

import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { getTransactions } = await import("./transactionServices");
      return getTransactions();
    },
  });
};

type AddTransactionPayload = {
  user_id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  description?: string;
};

export const useAddTransaction = (
  options: Omit<
    UseMutationOptions<unknown, Error, AddTransactionPayload>,
    "mutationFn"
  >,
) => {
  return useMutation<unknown, Error, AddTransactionPayload>({
    mutationKey: ["add-transactions"],
    mutationFn: async (payload: AddTransactionPayload) => {
      const { addTransaction } = await import("./transactionServices");
      return addTransaction(payload);
    },
    ...options,
  });
};

import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { AddTransactionRequest } from "./transactionTypes";

export const useGetTransactions = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || undefined;
  const q = searchParams.get("q") || undefined;

  const filterDates = () => {
    if (filter === "today") {
      return {
        gte: dayjs().startOf("day").toISOString(),
        lte: dayjs().endOf("day").toISOString(),
      };
    }

    if (filter === "last-week") {
      return {
        gte: dayjs().subtract(7, "day").toISOString(),
      };
    }

    if (filter === "this-month") {
      return {
        gte: dayjs().startOf("month").toISOString(),
      };
    }
  };

  const payload = {
    ...filterDates(),
    name: q,
  };

  return useQuery({
    queryKey: ["transactions", q, filter],
    queryFn: async () => {
      const { getTransactions } = await import("./transactionServices");
      return getTransactions(payload);
    },
  });
};

export const useAddTransaction = (
  options: Omit<
    UseMutationOptions<unknown, Error, AddTransactionRequest>,
    "mutationFn"
  >,
) => {
  return useMutation<unknown, Error, AddTransactionRequest>({
    mutationKey: ["add-transactions"],
    mutationFn: async (payload: AddTransactionRequest) => {
      const { addTransaction } = await import("./transactionServices");
      return addTransaction(payload);
    },
    ...options,
  });
};

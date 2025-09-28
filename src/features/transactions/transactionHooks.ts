import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { AddTransactionRequest } from "./transactionTypes";
import { WalletName } from "../wallets/walletTypes";
import { walletNames } from "@/utils/constants";

// Helper function to get filter dates
const getFilterDates = (filter: string | null | undefined) => {
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

  return {};
};

// Version that can be used within Suspense boundaries
export const useGetWalletTransactions = (walletName: WalletName) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || undefined;
  const q = searchParams.get("q") || undefined;

  const payload = {
    ...getFilterDates(filter),
    name: q,
    walletName,
  };

  return useQuery({
    queryKey: [`${walletName}-transactions`, q, filter],
    queryFn: async () => {
      const { getWalletTransactions } = await import("./transactionServices");
      return getWalletTransactions(payload);
    },
  });
};

export const useGetKasTransactions = () => {
  return useGetWalletTransactions(walletNames.kas);
};

export const useGetBergulirTransactions = () => {
  return useGetWalletTransactions(walletNames.bergulir);
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

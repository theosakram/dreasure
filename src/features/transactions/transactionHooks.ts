import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "next/navigation";
import { AddTransactionRequest } from "./transactionTypes";
import { WalletTypes } from "../wallets/walletTypes";
import { walletTypes } from "@/utils/constants";
import { getPageRange } from "@/utils/helpers/getPageRange";

const getFilterDates = (filter: string | null | undefined) => {
  if (filter === "today") {
    return {
      gte: dayjs().startOf("day").toISOString(),
      lte: dayjs().endOf("day").toISOString(),
    };
  }

  if (filter === "week") {
    return {
      gte: dayjs().subtract(7, "day").toISOString(),
    };
  }

  if (filter === "month") {
    return {
      gte: dayjs().startOf("month").toISOString(),
    };
  }

  return {};
};

export const useGetWalletTransactions = (walletType: WalletTypes) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || undefined;
  const q = searchParams.get("q") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const { orgId } = useParams<{ orgId: string }>();

  const payload = {
    ...getFilterDates(filter),
    name: q,
    walletType,
    pagination: getPageRange(page),
    orgId: orgId,
  };

  return useQuery({
    queryKey: [
      `${walletType}-transactions-${orgId}`,
      q,
      filter,
      page,
      orgId,
      walletType,
    ],
    queryFn: async () => {
      const { getWalletTransactions } = await import("./transactionServices");
      return getWalletTransactions(payload);
    },
  });
};

export const useGetTransactionWalletTransactions = () => {
  return useGetWalletTransactions(walletTypes.transaction);
};

export const useGetInstallmentWalletTransactions = () => {
  return useGetWalletTransactions(walletTypes.installment);
};

export const useAddTransaction = (
  options?: Omit<
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

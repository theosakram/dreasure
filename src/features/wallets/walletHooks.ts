import { walletTypes } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useGetWallets = () => {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const { getWallets } = await import("./walletService");
      return getWallets();
    },
  });
};

export const useGetWalletByType = (type: string) => {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: ["wallet", type, id],
    queryFn: async () => {
      const { getWalletByType } = await import("./walletService");
      return getWalletByType(type, id);
    },
    enabled: !!type && !!id,
  });
};

export const useGetTransactionWallet = () => {
  return useGetWalletByType(walletTypes.transaction);
};

export const useGetInstallmentWallet = () => {
  return useGetWalletByType(walletTypes.installment);
};

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
  const { orgId } = useParams<{ orgId: string }>();

  return useQuery({
    queryKey: ["wallet", type, orgId],
    queryFn: async () => {
      const { getWalletByType } = await import("./walletService");
      return getWalletByType(type, orgId);
    },
    enabled: !!type && !!orgId,
  });
};

export const useGetTransactionWallet = () => {
  return useGetWalletByType(walletTypes.transaction);
};

export const useGetInstallmentWallet = () => {
  return useGetWalletByType(walletTypes.installment);
};

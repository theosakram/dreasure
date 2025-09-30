import { walletTypes } from "@/utils/constants";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";
import { useQuery } from "@tanstack/react-query";

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
  const { orgId } = useGetIdsFromParam();

  return useQuery({
    queryKey: ["wallet", type, orgId],
    queryFn: async () => {
      const { getWalletByType } = await import("./walletService");
      return getWalletByType(type, orgId || "");
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

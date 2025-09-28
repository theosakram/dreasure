import { walletNames } from "@/utils/constants";
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

export const useGetWalletByName = (name: string) => {
  return useQuery({
    queryKey: ["wallet", name],
    queryFn: async () => {
      const { getWalletByName } = await import("./walletService");
      return getWalletByName(name);
    },
    enabled: !!name,
  });
};

export const useGetKasWallet = () => {
  return useGetWalletByName(walletNames.kas);
};

export const useGetBergulirWallet = () => {
  return useGetWalletByName(walletNames.bergulir);
};

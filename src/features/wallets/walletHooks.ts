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

export const useGetKasWallet = () => {
  return useQuery({
    queryKey: ["kas_wallet"],
    queryFn: async () => {
      const { getKasWallet } = await import("./walletService");
      return getKasWallet();
    },
  });
};

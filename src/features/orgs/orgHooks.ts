import { useQuery } from "@tanstack/react-query";

export const useGetOrgById = (id?: string) => {
  return useQuery({
    queryKey: ["org", id],
    queryFn: async () => {
      const { getOrgById } = await import("./orgServices");
      return getOrgById(id || "");
    },
    enabled: !!id,
  });
};

export const useGetOrgsByOwnerId = () => {
  return useQuery({
    queryKey: ["orgs"],
    queryFn: async () => {
      const { getOrgsByOwnerId } = await import("./orgServices");
      return getOrgsByOwnerId();
    },
  });
};

export const useGetOrgWalletsByOwnerId = (id: string) => {
  return useQuery({
    queryKey: ["org_wallets", id],
    queryFn: async () => {
      const { getOrgWalletsByOwnerId } = await import("./orgServices");

      return getOrgWalletsByOwnerId(id);
    },
  });
};

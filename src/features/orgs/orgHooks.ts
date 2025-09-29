import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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

export const useGetOrgMembersByOrgId = () => {
  const { orgId } = useParams<{ orgId: string }>();

  return useQuery({
    queryKey: ["org_members", orgId],
    queryFn: async () => {
      const { getOrgMembersByOrgId } = await import("./orgServices");
      return getOrgMembersByOrgId(orgId || "");
    },
    enabled: !!orgId,
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

import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CreateOrgMembershipFromNewProfileRequest } from "./orgTypes";

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

export const useCreateOrgMembershipFromNewUser = (
  options?: Omit<
    UseMutationOptions<
      unknown,
      Error,
      CreateOrgMembershipFromNewProfileRequest
    >,
    "mutationFn"
  >,
) => {
  const { orgId } = useParams<{ orgId: string }>();

  return useMutation<unknown, Error, CreateOrgMembershipFromNewProfileRequest>({
    mutationKey: ["create-org-membership-from-new-user"],
    mutationFn: async (payload) => {
      const { createProfile } = await import("../profiles/profileServices");
      const profile = await createProfile({ fullname: payload.fullname });

      const { createOrgMembershipFromNewProfile } = await import(
        "./orgServices"
      );

      return createOrgMembershipFromNewProfile({
        org_id: orgId,
        user_id: profile.id,
        role: payload.role,
      });
    },
    ...options,
  });
};

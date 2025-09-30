import { supabaseClient } from "@/supabase/client";
import {
  CreateOrgMembershipRequest,
  Organization,
  OrganizationMembershipWithProfile,
  OrganizationWithWallets,
} from "./orgTypes";

export const getOrgById = async (id: string) => {
  const supabase = supabaseClient();
  const { data, error } = await supabase
    .from("orgs")
    .select("*")
    .eq("id", id)
    .single<Organization>();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getOrgMembersByOrgId = async (org_id: string) => {
  const supabase = supabaseClient();
  const { data, error, count } = await supabase
    .from("org_memberships")
    .select("*, user:profiles(*)", { count: "exact" })
    .eq("org_id", org_id)
    .overrideTypes<Array<OrganizationMembershipWithProfile>>();

  if (error) {
    throw new Error(error.message);
  }
  return { data, count };
};

export const getOrgsByOwnerId = async () => {
  const supabase = supabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data, error, count } = await supabase
    .from("orgs")
    .select("*", { count: "exact" })
    .eq("owner_id", user?.id)
    .overrideTypes<Array<Organization>>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
};

export const getOrgWalletsByOwnerId = async (owner_id: string) => {
  const supabase = supabaseClient();

  const { data, error, count } = await supabase
    .from("orgs")
    .select("*, wallets(*)", { count: "exact" })
    .eq("owner_id", owner_id)
    .single<OrganizationWithWallets>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
};

export const createOrgMembershipFromNewProfile = async (
  payload: CreateOrgMembershipRequest,
) => {
  const supabase = supabaseClient();

  const { error } = await supabase
    .from("org_memberships")
    .insert(payload)
    .single();

  if (error) {
    throw new Error(error.message);
  }
};

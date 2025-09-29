import { supabaseClient } from "@/supabase/client";
import { Profile, ProfileWithTransactions } from "./profileTypes";
import { GetPaginationRequest } from "../shared/sharedTypes";

export const getSelf = async () => {
  const supabase = supabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single<Profile>();
  if (profileError) throw profileError;

  return { profile };
};

export const getProfiles = async (payload: GetPaginationRequest) => {
  const supabase = supabaseClient();
  const { data: profiles, count } = await supabase
    .from("profiles")
    .select(`*`, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(payload.from, payload.to)
    .overrideTypes<Array<Profile>>();

  return { profiles, count };
};

export const getProfileById = async (id: string) => {
  const supabase = supabaseClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select(
      `*, transactions(*, wallet:wallets(*)), installments (*,
        installment_payments(*)
      )`,
    )
    .eq("id", id)
    .single<ProfileWithTransactions>();

  return profiles;
};

import { supabaseClient } from "@/supabase/client";
import { Profile, ProfileWithTransactions } from "./profileTypes";
import { GetPaginationRequest } from "../shared/sharedTypes";

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

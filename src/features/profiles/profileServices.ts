import { supabaseClient } from "@/supabase/client";
import { Profile, ProfileWithTransactions } from "./profileTypes";

export const getProfiles = async () => {
  const supabase = supabaseClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .overrideTypes<Array<Profile>>();

  return profiles;
};

export const getProfileById = async (id: string) => {
  const supabase = supabaseClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select(`*, transactions(*)`)
    .eq("id", id)
    .single<ProfileWithTransactions>();

  return profiles;
};

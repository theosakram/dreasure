"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SupabaseLogin, SupabaseSignUp } from "./supabaseType";

export async function login(payload: SupabaseLogin) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(payload.returnTo || "/dashboard");
}

export async function signup(payload: SupabaseSignUp) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

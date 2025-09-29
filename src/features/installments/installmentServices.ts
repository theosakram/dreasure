import { supabaseClient } from "@/supabase/client";
import {
  AddInstallmentPaymentRequest,
  AddInstallmentRequest,
  InstallmentPaymentFull,
  InstallmentWithUser,
} from "./installmentTypes";

export const getInstallments = async () => {
  const supabase = supabaseClient();
  const { data, error, count } = await supabase
    .from("installments")
    .select(`*, user:profiles(*)`, { count: "exact" })
    .overrideTypes<InstallmentWithUser[]>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
};

export const getInstallmentsByUserId = async (userId: string) => {
  const supabase = supabaseClient();
  const { data, error } = await supabase
    .from("installments")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addInstallment = async (payload: AddInstallmentRequest) => {
  const supabase = supabaseClient();

  const { data, error } = await supabase
    .from("installments")
    .insert(payload)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getInstallmentPayments = async () => {
  const supabase = supabaseClient();
  const { data, error, count } = await supabase
    .from("installment_payments")
    .select(`*, user:profiles(*), installments(*)`, { count: "exact" })
    .overrideTypes<InstallmentPaymentFull[]>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
};

export const addInstallmentPayment = async (
  payload: AddInstallmentPaymentRequest,
) => {
  const supabase = supabaseClient();

  const { data, error } = await supabase
    .from("installment_payments")
    .insert(payload)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

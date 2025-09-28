import { supabaseClient } from "@/supabase/client";
import {
  AddInstallmentPaymentRequest,
  AddInstallmentRequest,
} from "./installmentTypes";

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

export type Installment = {
  id: string;
  user_id: string;
  total_to_be_paid: number;
  start_date: string;
  due_date: string;
  description: string;
  created_at: string;
};

export type InstallmentPayment = {
  id: string;
  installment_id: string;
  wallet_id: string;
  user_id: string;
  amount: number;
  paid_date: string;
  created_at: string;
};

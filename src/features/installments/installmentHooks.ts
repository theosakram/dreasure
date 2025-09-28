import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  AddInstallmentPaymentRequest,
  AddInstallmentRequest,
} from "./installmentTypes";

export const useGetInstallmentsByUserId = (userId?: string) => {
  return useQuery({
    queryKey: ["installments-by-user-id", userId],
    queryFn: async () => {
      const { getInstallmentsByUserId } = await import("./installmentServices");

      return getInstallmentsByUserId(userId || "");
    },
    enabled: !!userId,
  });
};

export const useAddInstallment = (
  options?: Omit<
    UseMutationOptions<unknown, Error, AddInstallmentRequest>,
    "mutationFn"
  >,
) => {
  return useMutation<unknown, Error, AddInstallmentRequest>({
    mutationKey: ["add-installment"],
    mutationFn: async (payload: AddInstallmentRequest) => {
      const { addInstallment } = await import("./installmentServices");
      return addInstallment(payload);
    },
    ...options,
  });
};

export const useAddInstallmentPayment = (
  options?: Omit<
    UseMutationOptions<unknown, Error, AddInstallmentPaymentRequest>,
    "mutationFn"
  >,
) => {
  return useMutation<unknown, Error, AddInstallmentPaymentRequest>({
    mutationKey: ["add-installment-payment"],
    mutationFn: async (payload: AddInstallmentPaymentRequest) => {
      const { addInstallmentPayment } = await import("./installmentServices");
      return addInstallmentPayment(payload);
    },
    ...options,
  });
};

import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { getUsers } = await import("./usersServices");
      return getUsers();
    },
  });
};

export const useGetUserTransactionSummary = () => {
  return useQuery({
    queryKey: ["user_transaction_summary"],
    queryFn: async () => {
      const { getUserTransactionsSummary } = await import("./usersServices");
      return getUserTransactionsSummary();
    },
  });
};

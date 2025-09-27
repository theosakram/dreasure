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

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user_by_id", id],
    queryFn: async () => {
      const { getUserById } = await import("./usersServices");

      return getUserById(id);
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

export const useGetUserTransactionSummaryById = (id: string) => {
  return useQuery({
    queryKey: ["user_transaction_summary_by_id", id],
    queryFn: async () => {
      const { getUserTransactionsSummaryById } = await import(
        "./usersServices"
      );
      return getUserTransactionsSummaryById(id);
    },
  });
};

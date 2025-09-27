import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { getTransactions } = await import("./transactionServices");
      return getTransactions();
    },
  });
};

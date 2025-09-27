import { SimpleGrid, StatGroup } from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
} from "react-icons/lu";
import { MetricStat } from "../custom/MetricStat";
import { useGetUserTransactionSummary } from "@/features/users/userHooks";
import { useMemo } from "react";

export const MoneyFlowContainer = () => {
  const { data } = useGetUserTransactionSummary();
  const mappedData = useMemo(() => {
    if (data) {
      const totalDeposit = data.reduce(
        (acc, user) => acc + (user.deposit_total || 0),
        0,
      );
      const totalWithdraw = data.reduce(
        (acc, user) => acc + (user.withdraw_total || 0),
        0,
      );
      const netFlow = totalDeposit - totalWithdraw;
      return [
        {
          label: "Total Saldo",
          value: data.reduce((acc, user) => acc + (user.balance || 0), 0),
          icon: <LuWallet size={16} />,
          colorScheme: "blue",
        },
        {
          label: "Uang Masuk",
          value: totalDeposit,
          icon: <LuTrendingUp size={16} />,
          colorScheme: "brand",
        },
        {
          label: "Uang Keluar",
          value: totalWithdraw,
          icon: <LuTrendingDown size={16} />,
          colorScheme: "red",
        },
        {
          label: "Perubahan",
          value: netFlow,
          icon: <LuArrowUpDown size={16} />,
          colorScheme: netFlow >= 0 ? "brand" : "red",
          showSign: true,
        },
      ];
    }

    return [];
  }, [data]);

  return (
    <StatGroup asChild>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
        {mappedData.map((metric) => (
          <MetricStat key={metric.label} {...metric} />
        ))}
      </SimpleGrid>
    </StatGroup>
  );
};

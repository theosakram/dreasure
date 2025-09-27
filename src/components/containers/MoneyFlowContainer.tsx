import { SimpleGrid, StatGroup } from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
} from "react-icons/lu";
import { MetricStat } from "../custom/MetricStat";
import { useMemo } from "react";
import { useGetKasWallet } from "@/features/wallets/walletHooks";

export const MoneyFlowContainer = () => {
  const { data } = useGetKasWallet();

  const mappedData = useMemo(() => {
    if (data) {
      const totalDeposit = data.transactions
        .filter((t) => t.type === "deposit")
        .reduce((acc, t) => acc + (t.amount || 0), 0);

      const totalWithdraw = data.transactions
        .filter((t) => t.type === "withdraw")
        .reduce((acc, t) => acc + (t.amount || 0), 0);

      const balance = data.transactions.reduce((acc, t) => {
        if (t.type === "deposit") return acc + (t.amount || 0);
        if (t.type === "withdraw") return acc - (t.amount || 0);
        return acc;
      }, 0);
      const netFlow = totalDeposit - totalWithdraw;

      return [
        {
          label: "Total Saldo",
          value: balance || 0,
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

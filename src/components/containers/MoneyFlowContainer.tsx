import { SimpleGrid, StatGroup, Box } from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
} from "react-icons/lu";
import { MetricStat, MetricStatProps } from "../custom/MetricStat";
import { useMemo } from "react";
import { useGetKasWallet } from "@/features/wallets/walletHooks";

export const MoneyFlowContainer = () => {
  const { data } = useGetKasWallet();

  const mappedData = useMemo((): MetricStatProps[] => {
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
          icon: <LuWallet size={18} />,
          colorScheme: "sage",
          variant: "blue",
        },
        {
          label: "Uang Masuk",
          value: totalDeposit,
          icon: <LuTrendingUp size={18} />,
          colorScheme: "green",
          variant: "success",
        },
        {
          label: "Uang Keluar",
          value: totalWithdraw,
          icon: <LuTrendingDown size={18} />,
          colorScheme: "red",
          variant: "danger",
        },
        {
          label: "Perubahan",
          value: netFlow,
          icon: <LuArrowUpDown size={18} />,
          colorScheme: netFlow >= 0 ? "green" : "red",
          variant: netFlow >= 0 ? "success" : "danger",
          showSign: true,
        },
      ];
    }

    return [];
  }, [data]);

  return (
    <Box layerStyle="surface.raised" p={4} borderRadius="xl">
      <StatGroup asChild>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          {mappedData.map((metric) => (
            <MetricStat key={metric.label} {...metric} />
          ))}
        </SimpleGrid>
      </StatGroup>
    </Box>
  );
};

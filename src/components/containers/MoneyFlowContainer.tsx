import { SimpleGrid, StatGroup, Box } from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
} from "react-icons/lu";
import { MetricStat, MetricStatProps } from "../custom/MetricStat";
import { useMemo } from "react";

type MoneyFlowContainerProps = {
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  netFlow: number;
  isLoading?: boolean;
};

export const MoneyFlowContainer = (props: MoneyFlowContainerProps) => {
  const mappedData = useMemo((): MetricStatProps[] => {
    return [
      {
        label: "Total Saldo",
        value: props.balance,
        icon: <LuWallet size={18} />,
        colorScheme: "sage",
        variant: "blue",
      },
      {
        label: "Uang Masuk",
        value: props.totalDeposit,
        icon: <LuTrendingUp size={18} />,
        colorScheme: "green",
        variant: "success",
      },
      {
        label: "Uang Keluar",
        value: props.totalWithdraw,
        icon: <LuTrendingDown size={18} />,
        colorScheme: "red",
        variant: "danger",
      },
      {
        label: "Perubahan",
        value: props.netFlow,
        icon: <LuArrowUpDown size={18} />,
        colorScheme: props.netFlow >= 0 ? "green" : "red",
        variant: props.netFlow >= 0 ? "success" : "danger",
        showSign: true,
      },
    ];
  }, [props.balance, props.netFlow, props.totalDeposit, props.totalWithdraw]);

  return (
    <Box layerStyle="surface.raised" borderRadius="xl">
      <StatGroup asChild>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          {mappedData.map((metric) => (
            <MetricStat
              key={metric.label}
              {...metric}
              isLoading={props.isLoading}
            />
          ))}
        </SimpleGrid>
      </StatGroup>
    </Box>
  );
};

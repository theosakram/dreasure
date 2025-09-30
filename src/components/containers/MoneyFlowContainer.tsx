import { SimpleGrid } from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
} from "react-icons/lu";
import { StatCard } from "./StatCard";

type MoneyFlowContainerProps = {
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  netFlow: number;
  netFlowPercentage: number;
  balanceProgress: number;
  withdrawProgress: number;
  isLoading?: boolean;
  type?: "full" | "no-movement";
};

export const MoneyFlowContainer = ({
  type = "full",
  ...props
}: MoneyFlowContainerProps) => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: type === "full" ? 4 : 3 }}
      gap={4}
      w="full"
    >
      <StatCard
        label="Total Saldo"
        value={props.balance}
        icon={LuWallet}
        colorPalette="blue"
        isLoading={props.isLoading}
        badge="Aktual"
        showProgress={true}
        progressValue={props.balanceProgress}
        helpText={`${props.balanceProgress.toFixed(0)}% dari uang masuk`}
      />

      <StatCard
        label="Uang Masuk"
        value={props.totalDeposit}
        icon={LuTrendingUp}
        colorPalette="green"
        isLoading={props.isLoading}
        helpText="Total deposit"
      />

      <StatCard
        label="Uang Keluar"
        value={props.totalWithdraw}
        icon={LuTrendingDown}
        colorPalette="red"
        isLoading={props.isLoading}
        showProgress={true}
        progressValue={props.withdrawProgress}
        helpText={`${props.withdrawProgress.toFixed(0)}% dari uang masuk`}
      />

      {type === "full" && (
        <StatCard
          label="Perubahan Bersih"
          value={props.netFlow}
          icon={LuArrowUpDown}
          colorPalette={props.netFlow >= 0 ? "green" : "red"}
          showSign={true}
          isLoading={props.isLoading}
          trend={{
            value: props.netFlowPercentage / 100,
            isPositive: props.netFlow >= 0,
          }}
          helpText={props.netFlow >= 0 ? "Surplus" : "Defisit"}
        />
      )}
    </SimpleGrid>
  );
};

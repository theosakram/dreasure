import {
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Skeleton,
  FormatNumber,
} from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
  LuArrowDownRight,
  LuArrowUpRight,
} from "react-icons/lu";
import { useMemo } from "react";

type MoneyFlowContainerProps = {
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  netFlow: number;
  isLoading?: boolean;
};

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  showSign?: boolean;
  isLoading?: boolean;
  decorativeIcon?: React.ElementType;
  badge?: string;
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  showSign = false,
  isLoading = false,
  badge,
}: StatCardProps) => {
  if (isLoading) {
    return (
      <VStack
        gap={3}
        p={6}
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
        align="start"
        flex="1"
        minW="0"
      >
        <Skeleton boxSize="8" borderRadius="lg" />
        <Skeleton height="4" width="20" borderRadius="md" />
        <Skeleton height="8" width="32" borderRadius="md" />
      </VStack>
    );
  }

  return (
    <VStack
      gap={3}
      p={6}
      bg="bg.panel"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.subtle"
      align="start"
      flex="1"
      minW="0"
      transition="all 0.2s"
      _hover={{
        borderColor: `${color}.emphasized`,
        shadow: "sm",
      }}
    >
      <HStack justify="space-between" w="full">
        <Box
          p={2}
          borderRadius="lg"
          bg={`${color}.muted`}
          color={`${color}.fg`}
        >
          <Icon size={20} />
        </Box>
        {badge && (
          <Badge
            colorPalette={color}
            variant="subtle"
            size="sm"
            borderRadius="full"
          >
            {badge}
          </Badge>
        )}
      </HStack>

      <VStack gap={1} align="start" w="full">
        <Text fontSize="sm" color="fg.muted" fontWeight="medium">
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color={`${color}.fg`}>
          <FormatNumber
            value={value}
            style="currency"
            currency="IDR"
            signDisplay={showSign ? "always" : "auto"}
          />
        </Text>
      </VStack>
    </VStack>
  );
};

export const MoneyFlowContainer = (props: MoneyFlowContainerProps) => {
  const netFlowPercentage = useMemo(() => {
    if (props.totalDeposit === 0) return 0;
    return (props.netFlow / props.totalDeposit) * 100;
  }, [props.netFlow, props.totalDeposit]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} w="full">
      <StatCard
        label="Total Saldo"
        value={props.balance}
        icon={LuWallet}
        color="blue"
        isLoading={props.isLoading}
        badge="Aktual"
      />

      <StatCard
        label="Uang Masuk"
        value={props.totalDeposit}
        icon={LuTrendingUp}
        color="green"
        isLoading={props.isLoading}
        decorativeIcon={LuArrowUpRight}
      />

      <StatCard
        label="Uang Keluar"
        value={props.totalWithdraw}
        icon={LuTrendingDown}
        color="red"
        isLoading={props.isLoading}
        decorativeIcon={LuArrowDownRight}
      />

      <StatCard
        label="Perubahan Bersih"
        value={props.netFlow}
        icon={LuArrowUpDown}
        color={props.netFlow >= 0 ? "green" : "red"}
        showSign={true}
        isLoading={props.isLoading}
        badge={`${netFlowPercentage >= 0 ? "+" : ""}${netFlowPercentage.toFixed(
          1,
        )}%`}
      />
    </SimpleGrid>
  );
};

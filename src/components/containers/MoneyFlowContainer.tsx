import {
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Text,
  Circle,
  Badge,
  Float,
  Skeleton,
  FormatNumber,
} from "@chakra-ui/react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuArrowUpDown,
  LuArrowUpRight,
  LuArrowDownRight,
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
  bgColor: string;
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
  bgColor,
  showSign = false,
  isLoading = false,
  decorativeIcon: DecorativeIcon,
  badge,
}: StatCardProps) => {
  if (isLoading) {
    return (
      <Box
        bg="bg.subtle"
        borderRadius="xl"
        p={4}
        border="1px solid"
        borderColor="border.muted"
        position="relative"
        overflow="hidden"
        minH="24"
      >
        <VStack gap={3} align="start" w="full">
          <HStack gap={2} align="center" w="full">
            <Skeleton boxSize="8" borderRadius="full" />
            <VStack gap={0} align="start" flex="1" minW="0">
              <Skeleton height="3" width="20" borderRadius="md" />
              <Skeleton height="6" width="28" borderRadius="md" />
            </VStack>
          </HStack>
          <Skeleton
            height="4"
            width="16"
            borderRadius="full"
            alignSelf="flex-end"
          />
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bg="bg.panel"
      borderRadius="xl"
      p={4}
      border="1px solid"
      borderColor="border.muted"
      position="relative"
      overflow="hidden"
      minH="24"
      transition="all 0.2s"
    >
      {/* Decorative background element */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="16"
        h="16"
        bg={`${color}.500/5`}
        borderRadius="full"
        transform="translate(8px, -8px)"
      />

      <VStack gap={3} align="start" position="relative" w="full">
        <HStack gap={2} align="center" w="full">
          <Circle bg={bgColor} size="8" color={`${color}.600`}>
            <Icon size={16} />
          </Circle>
          <VStack gap={0} align="start" flex="1" minW="0">
            <Text fontSize="xs" color="fg.muted" fontWeight="medium">
              {label}
            </Text>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={`${color}.500`}
              truncate
            >
              <FormatNumber
                value={value}
                style="currency"
                currency="IDR"
                signDisplay={showSign ? "always" : "auto"}
              />
            </Text>
          </VStack>
        </HStack>

        {DecorativeIcon && (
          <Float placement="top-end">
            <Circle bg={bgColor} size="4" color={`${color}.600`}>
              <DecorativeIcon size={10} />
            </Circle>
          </Float>
        )}

        {badge && (
          <Badge
            colorPalette={color}
            variant="surface"
            size="xs"
            borderRadius="full"
            alignSelf="flex-end"
          >
            {badge}
          </Badge>
        )}
      </VStack>
    </Box>
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
        bgColor="blue.100"
        isLoading={props.isLoading}
        badge="Aktual"
      />

      <StatCard
        label="Uang Masuk"
        value={props.totalDeposit}
        icon={LuTrendingUp}
        color="green"
        bgColor="green.100"
        isLoading={props.isLoading}
        decorativeIcon={LuArrowUpRight}
      />

      <StatCard
        label="Uang Keluar"
        value={props.totalWithdraw}
        icon={LuTrendingDown}
        color="red"
        bgColor="red.100"
        isLoading={props.isLoading}
        decorativeIcon={LuArrowDownRight}
      />

      <StatCard
        label="Perubahan Bersih"
        value={props.netFlow}
        icon={LuArrowUpDown}
        color={props.netFlow >= 0 ? "green" : "red"}
        bgColor={props.netFlow >= 0 ? "green.100" : "red.100"}
        showSign={true}
        isLoading={props.isLoading}
        badge={`${netFlowPercentage >= 0 ? "+" : ""}${netFlowPercentage.toFixed(
          1,
        )}%`}
      />
    </SimpleGrid>
  );
};

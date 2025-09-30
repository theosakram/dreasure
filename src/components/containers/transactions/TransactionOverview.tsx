import { useGetProfileById } from "@/features/profiles/profileHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import {
  Card,
  Skeleton,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Separator,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useMemo } from "react";
import {
  LuWallet,
  LuArrowUpRight,
  LuArrowDownRight,
  LuActivity,
} from "react-icons/lu";
import { MemberTransactionTimeline } from "../MemberTransactionTimeline";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";

// Stat Card Component for cleaner code
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactElement;
  colorScheme: "green" | "red" | "blue";
  subtitle?: string;
}

const StatCard = ({
  label,
  value,
  icon,
  colorScheme,
  subtitle,
}: StatCardProps) => (
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
      borderColor: `${colorScheme}.emphasized`,
      shadow: "sm",
    }}
  >
    <HStack justify="space-between" w="full">
      <Box
        p={2}
        borderRadius="lg"
        bg={`${colorScheme}.muted`}
        color={`${colorScheme}.fg`}
      >
        {icon}
      </Box>
      {subtitle && (
        <Badge
          colorPalette={colorScheme}
          variant="subtle"
          size="sm"
          borderRadius="full"
        >
          {subtitle}
        </Badge>
      )}
    </HStack>

    <VStack gap={1} align="start" w="full">
      <Text fontSize="sm" color="fg.muted" fontWeight="medium">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color={`${colorScheme}.fg`}>
        {value}
      </Text>
    </VStack>
  </VStack>
);

export const TransactionOverview = () => {
  const { userId } = useGetIdsFromParam();
  const { data, isLoading } = useGetProfileById(userId);

  const stats = useMemo(() => {
    if (!data)
      return {
        totalDeposits: 0,
        totalWithdrawals: 0,
        balance: 0,
        transactionCount: 0,
      };

    const deposits = data.transactions.filter(
      (t: Transaction) => t.type === "deposit",
    );
    const withdrawals = data.transactions.filter(
      (t: Transaction) => t.type === "withdraw",
    );

    const totalDeposits = deposits.reduce(
      (sum: number, t: Transaction) => sum + t.amount,
      0,
    );
    const totalWithdrawals = withdrawals.reduce(
      (sum: number, t: Transaction) => sum + t.amount,
      0,
    );
    const balance = totalDeposits - totalWithdrawals;

    return {
      totalDeposits,
      totalWithdrawals,
      balance,
      transactionCount: data.transactions.length,
    };
  }, [data]);

  if (isLoading) {
    return (
      <VStack gap={6} align="stretch">
        {/* Header Skeleton */}
        <VStack gap={2} align="start">
          <Skeleton height="8" width="160px" borderRadius="lg" />
          <Skeleton height="4" width="240px" borderRadius="md" />
        </VStack>

        {/* Stats Skeleton */}
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={4}
          align="stretch"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <VStack
              key={i}
              gap={3}
              p={6}
              bg="bg.panel"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.subtle"
              align="start"
              flex="1"
            >
              <Skeleton boxSize="8" borderRadius="lg" />
              <Skeleton height="4" width="80px" borderRadius="md" />
              <Skeleton height="8" width="120px" borderRadius="md" />
            </VStack>
          ))}
        </Stack>

        {/* Timeline Skeleton */}
        <Card.Root
          bg="bg.panel"
          borderRadius="xl"
          border="1px solid"
          borderColor="border.subtle"
        >
          <Card.Body p={6}>
            <VStack gap={4} align="stretch">
              <Skeleton height="6" width="180px" borderRadius="md" />
              <Skeleton height="32" borderRadius="lg" />
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <VStack gap={2} align="start">
        <Heading size="xl" fontWeight="bold" color="fg.default">
          Uang Kas
        </Heading>
        <HStack gap={3} align="center">
          <Text color="fg.muted" fontSize="md">
            Total {stats.transactionCount} transaksi
          </Text>
          <Badge
            colorPalette="brand"
            variant="subtle"
            size="sm"
            borderRadius="full"
          >
            <HStack gap={1}>
              <LuActivity size={14} />
              <Text>Aktif</Text>
            </HStack>
          </Badge>
        </HStack>
      </VStack>

      {/* Stats Grid */}
      <Stack direction={{ base: "column", md: "row" }} gap={4} align="stretch">
        <StatCard
          label="Total Setoran"
          value={formatCurrency(stats.totalDeposits)}
          icon={<LuArrowUpRight size={20} />}
          colorScheme="green"
          subtitle={
            stats.totalDeposits + stats.totalWithdrawals > 0
              ? `${(
                  (stats.totalDeposits /
                    (stats.totalDeposits + stats.totalWithdrawals)) *
                  100
                ).toFixed(0)}%`
              : undefined
          }
        />

        <StatCard
          label="Total Penarikan"
          value={formatCurrency(stats.totalWithdrawals)}
          icon={<LuArrowDownRight size={20} />}
          colorScheme="red"
          subtitle={
            stats.totalDeposits + stats.totalWithdrawals > 0
              ? `${(
                  (stats.totalWithdrawals /
                    (stats.totalDeposits + stats.totalWithdrawals)) *
                  100
                ).toFixed(0)}%`
              : undefined
          }
        />

        <StatCard
          label="Saldo Kas"
          value={formatCurrency(stats.balance)}
          icon={<LuWallet size={20} />}
          colorScheme={stats.balance >= 0 ? "blue" : "red"}
          subtitle={stats.balance >= 0 ? "Surplus" : "Defisit"}
        />
      </Stack>

      <Separator />

      {/* Transaction Timeline */}
      <Card.Root
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
      >
        <Card.Body p={6}>
          <VStack gap={6} align="stretch">
            <VStack gap={1} align="start">
              <Heading size="md" fontWeight="semibold" color="fg.default">
                Riwayat Transaksi
              </Heading>
              <Text fontSize="sm" color="fg.muted">
                Aktivitas terbaru dalam kas
              </Text>
            </VStack>

            <MemberTransactionTimeline
              isLoading={isLoading}
              maxWidth="100%"
              timelines={
                data?.transactions.map((d) => ({
                  amount: d.amount,
                  date: d.created_at,
                  type: d.type,
                  walletName: d.wallet.name,
                  walletType: d.wallet.type,
                  title: (
                    <HStack gap={3} align="center" justify="space-between">
                      <HStack gap={3} flex="1" minW="0">
                        <Box
                          p={2}
                          borderRadius="lg"
                          bg={
                            d.type === "deposit" ? "green.muted" : "red.muted"
                          }
                          color={d.type === "deposit" ? "green.fg" : "red.fg"}
                        >
                          {d.type === "deposit" ? (
                            <LuArrowUpRight size={16} />
                          ) : (
                            <LuArrowDownRight size={16} />
                          )}
                        </Box>
                        <VStack gap={0.5} align="start" flex="1" minW="0">
                          <Text
                            fontWeight="medium"
                            color="fg.default"
                            fontSize="sm"
                          >
                            {d.type === "deposit" ? "Setoran" : "Penarikan"}
                          </Text>
                          <Text
                            color="fg.muted"
                            fontSize="xs"
                            lineClamp={1}
                            maxW="full"
                          >
                            {d.description}
                          </Text>
                        </VStack>
                      </HStack>
                      <Badge
                        colorPalette={d.type === "deposit" ? "green" : "red"}
                        variant="subtle"
                        size="sm"
                        borderRadius="full"
                        flexShrink={0}
                      >
                        {formatCurrency(d.amount)}
                      </Badge>
                    </HStack>
                  ),
                  id: d.id,
                  description: d.description,
                })) || []
              }
            />
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};

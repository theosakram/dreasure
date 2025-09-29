import { useGetProfileById } from "@/features/profiles/profileHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import {
  Card,
  Skeleton,
  SimpleGrid,
  VStack,
  HStack,
  Box,
  Progress,
  Text,
  Circle,
  Badge,
  Float,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  LuChartPie,
  LuWallet,
  LuArrowUpRight,
  LuArrowDownRight,
  LuActivity,
  LuChartBar,
} from "react-icons/lu";
import { MemberTransactionTimeline } from "../MemberTransactionTimeline";

export const TransactionOverview = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProfileById(id);

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
      <Card.Root
        variant="subtle"
        layerStyle="fill.surface"
        borderRadius="2xl"
        overflow="hidden"
        bg="bg.panel"
        boxShadow="lg"
        border="1px solid"
        borderColor="border.muted"
      >
        <Card.Body p={0}>
          {/* Header Skeleton */}
          <Box
            bgGradient="to-r"
            gradientFrom="blue.500/10"
            gradientVia="green.500/10"
            gradientTo="purple.500/10"
            p={6}
            position="relative"
          >
            <HStack justify="space-between" align="start">
              <VStack align="start" gap={2}>
                <Skeleton height="8" width="180px" borderRadius="lg" />
                <Skeleton height="4" width="120px" borderRadius="md" />
              </VStack>
              <Skeleton boxSize="12" borderRadius="2xl" />
            </HStack>
          </Box>

          {/* Stats Skeleton */}
          <Box p={6}>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              {Array.from({ length: 3 }).map((_, i) => (
                <VStack
                  key={i}
                  gap={3}
                  p={5}
                  bg="bg.subtle"
                  borderRadius="xl"
                  align="center"
                  minH="24"
                >
                  <Skeleton boxSize="12" borderRadius="full" />
                  <Skeleton height="4" width="80px" borderRadius="md" />
                  <Skeleton height="6" width="100px" borderRadius="md" />
                </VStack>
              ))}
            </SimpleGrid>
          </Box>
        </Card.Body>
      </Card.Root>
    );
  }

  const balancePercentage =
    stats.totalDeposits > 0 ? (stats.balance / stats.totalDeposits) * 100 : 0;

  return (
    <Card.Root
      variant="subtle"
      layerStyle="fill.surface"
      borderRadius="2xl"
      overflow="hidden"
      bg="bg.panel"
      boxShadow="lg"
      border="1px solid"
      borderColor="border.muted"
      _hover={{
        boxShadow: "xl",
      }}
      transition="all 0.2s ease-in-out"
    >
      <Card.Body p={0}>
        {/* Header with gradient background */}
        <Box
          bgGradient="to-r"
          gradientFrom="blue.500/10"
          gradientVia="green.500/10"
          gradientTo="purple.500/10"
          p={6}
          position="relative"
          _dark={{
            gradientFrom: "blue.400/20",
            gradientVia: "green.400/20",
            gradientTo: "purple.400/20",
          }}
        >
          {/* Decorative elements */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="24"
            h="24"
            bg="green.500/5"
            borderRadius="full"
            transform="translate(12px, -12px)"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w="20"
            h="20"
            bg="blue.500/5"
            borderRadius="full"
            transform="translate(-10px, 10px)"
          />

          <HStack justify="space-between" align="start" position="relative">
            <VStack align="start" gap={1}>
              <HStack gap={3} align="center">
                <Text
                  textStyle="2xl"
                  fontWeight="bold"
                  color="fg"
                  letterSpacing="tight"
                >
                  Uang Kas
                </Text>
                <Badge
                  colorPalette="blue"
                  variant="surface"
                  size="sm"
                  borderRadius="full"
                  px={3}
                  fontWeight="medium"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <LuActivity size={12} />
                  Aktif
                </Badge>
              </HStack>
              <Text color="fg.muted" fontSize="md" opacity={0.8}>
                Total {stats.transactionCount} transaksi tercatat
              </Text>
            </VStack>

            <Circle
              bg="blue.100"
              size="16"
              color="blue.600"
              boxShadow="lg"
              _dark={{
                bg: "blue.900/30",
                color: "blue.300",
              }}
            >
              <LuChartBar size={28} />
            </Circle>
          </HStack>
        </Box>

        {/* Stats Grid */}
        <Box p={6}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
            {/* Deposits Card */}
            <Box
              bg="bg.subtle"
              borderRadius="xl"
              p={6}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              _hover={{
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="20"
                h="20"
                bg="green.500/5"
                borderRadius="full"
                transform="translate(10px, -10px)"
              />
              <VStack gap={4} align="start" position="relative">
                <HStack gap={3} align="center" w="full">
                  <Circle bg="green.100" size="12" color="green.600">
                    <LuArrowUpRight size={20} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1">
                    <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                      Setoran
                    </Text>
                    <Text textStyle="xl" fontWeight="bold" color="green.500">
                      {formatCurrency(stats.totalDeposits)}
                    </Text>
                  </VStack>
                </HStack>
                <Float placement="top-end">
                  <Badge
                    colorPalette="green"
                    variant="surface"
                    size="xs"
                    borderRadius="full"
                  >
                    +
                    {(
                      (stats.totalDeposits /
                        (stats.totalDeposits + stats.totalWithdrawals)) *
                        100 || 0
                    ).toFixed(0)}
                    %
                  </Badge>
                </Float>
              </VStack>
            </Box>

            {/* Withdrawals Card */}
            <Box
              bg="bg.subtle"
              borderRadius="xl"
              p={6}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              _hover={{
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="20"
                h="20"
                bg="red.500/5"
                borderRadius="full"
                transform="translate(10px, -10px)"
              />
              <VStack gap={4} align="start" position="relative">
                <HStack gap={3} align="center" w="full">
                  <Circle bg="red.100" size="12" color="red.600">
                    <LuArrowDownRight size={20} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1">
                    <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                      Penarikan
                    </Text>
                    <Text textStyle="xl" fontWeight="bold" color="red.500">
                      {formatCurrency(stats.totalWithdrawals)}
                    </Text>
                  </VStack>
                </HStack>
                <Float placement="top-end">
                  <Badge
                    colorPalette="red"
                    variant="surface"
                    size="xs"
                    borderRadius="full"
                  >
                    -
                    {(
                      (stats.totalWithdrawals /
                        (stats.totalDeposits + stats.totalWithdrawals)) *
                        100 || 0
                    ).toFixed(0)}
                    %
                  </Badge>
                </Float>
              </VStack>
            </Box>

            {/* Balance Card */}
            <Box
              bg="bg.subtle"
              borderRadius="xl"
              p={6}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="20"
                h="20"
                bg={stats.balance >= 0 ? "blue.500/5" : "red.500/5"}
                borderRadius="full"
                transform="translate(10px, -10px)"
              />
              <VStack gap={4} align="start" position="relative">
                <HStack gap={3} align="center" w="full">
                  <Circle
                    bg={stats.balance >= 0 ? "blue.100" : "red.100"}
                    size="12"
                    color={stats.balance >= 0 ? "blue.600" : "red.600"}
                  >
                    <LuWallet size={20} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1">
                    <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                      Saldo Kas
                    </Text>
                    <Text
                      textStyle="xl"
                      fontWeight="bold"
                      color={stats.balance >= 0 ? "blue.500" : "red.500"}
                    >
                      {formatCurrency(stats.balance)}
                    </Text>
                  </VStack>
                </HStack>
                <Float placement="top-end">
                  <Badge
                    colorPalette={stats.balance >= 0 ? "blue" : "red"}
                    variant="surface"
                    size="xs"
                    borderRadius="full"
                  >
                    {stats.balance >= 0 ? "Surplus" : "Defisit"}
                  </Badge>
                </Float>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Balance Ratio Progress */}
          {stats.totalDeposits > 0 && (
            <Box
              bg="bg.subtle"
              borderRadius="xl"
              p={6}
              border="1px solid"
              borderColor="border.muted"
              mb={8}
            >
              <VStack gap={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <HStack gap={3}>
                    <Circle bg="purple.100" size="8" color="purple.600">
                      <LuChartPie size={16} />
                    </Circle>
                    <VStack gap={0} align="start">
                      <Text fontSize="sm" fontWeight="medium" color="fg">
                        Rasio Saldo
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        Persentase saldo dari total setoran
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge
                    colorPalette={stats.balance >= 0 ? "green" : "red"}
                    variant="solid"
                    size="sm"
                    borderRadius="full"
                    fontWeight="bold"
                  >
                    {balancePercentage.toFixed(1)}%
                  </Badge>
                </HStack>

                <Progress.Root
                  value={Math.abs(balancePercentage)}
                  colorPalette={stats.balance >= 0 ? "green" : "red"}
                  size="lg"
                  borderRadius="full"
                  bg="bg.emphasized"
                >
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </VStack>
            </Box>
          )}

          {/* Transaction Timeline Section */}
          <Box
            borderRadius="xl"
            p={6}
            border="1px solid"
            borderColor="border.muted"
          >
            <HStack gap={3} mb={6} align="center">
              <Circle bg="gray.100" size="8" color="gray.600">
                <LuActivity size={16} />
              </Circle>
              <VStack gap={0} align="start">
                <Text textStyle="lg" fontWeight="bold" color="fg">
                  Riwayat Transaksi
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  Aktivitas terbaru dalam kas
                </Text>
              </VStack>
            </HStack>

            <MemberTransactionTimeline
              isLoading={isLoading}
              maxWidth="100%"
              timelines={
                data?.transactions.map((d) => ({
                  amount: d.amount,
                  date: d.created_at,
                  type: d.type,
                  walletName: d.wallet.name,
                  title: (
                    <HStack gap={3} align="center">
                      <Circle
                        bg={d.type === "deposit" ? "green.100" : "red.100"}
                        size="6"
                        color={d.type === "deposit" ? "green.600" : "red.600"}
                      >
                        {d.type === "deposit" ? (
                          <LuArrowUpRight size={12} />
                        ) : (
                          <LuArrowDownRight size={12} />
                        )}
                      </Circle>
                      <VStack gap={0} align="start" minW="0" flex="1">
                        <HStack gap={2} align="center">
                          <Text
                            fontWeight="medium"
                            color={
                              d.type === "deposit" ? "green.500" : "red.500"
                            }
                            fontSize="sm"
                          >
                            {d.type === "deposit" ? "Setoran" : "Penarikan"}
                          </Text>
                          <Badge
                            colorPalette={
                              d.type === "deposit" ? "green" : "red"
                            }
                            variant="surface"
                            size="xs"
                            borderRadius="full"
                          >
                            {formatCurrency(d.amount)}
                          </Badge>
                        </HStack>
                        <Text
                          color="fg.muted"
                          fontSize="xs"
                          truncate
                          maxW="300px"
                        >
                          {d.description}
                        </Text>
                      </VStack>
                    </HStack>
                  ),
                  id: d.id,
                  description: d.description,
                })) || []
              }
            />
          </Box>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

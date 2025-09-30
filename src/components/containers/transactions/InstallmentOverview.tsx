import { useGetProfileById } from "@/features/profiles/profileHooks";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";
import {
  Card,
  Skeleton,
  VStack,
  HStack,
  Box,
  Button,
  Progress,
  Badge,
  Text,
  Separator,
  Collapsible,
  Stack,
  Heading,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
  LuCreditCard,
  LuPlus,
  LuCheck,
  LuClock,
  LuChevronDown,
  LuDollarSign,
  LuArrowUpRight,
  LuActivity,
} from "react-icons/lu";

export const InstallmentOverview = () => {
  const { userId } = useGetIdsFromParam();
  const { data, isLoading } = useGetProfileById(userId);

  const installmentStats = useMemo(() => {
    if (!data || !data.installments)
      return {
        totalInstallments: 0,
        totalToBePaid: 0,
        totalPaid: 0,
        totalRemaining: 0,
        activeInstallments: 0,
      };

    const totalToBePaid = data.installments.reduce(
      (sum, i) => sum + i.total_to_be_paid,
      0,
    );

    const totalPaid = data.installments.reduce((sum, installment) => {
      return (
        sum +
        (installment.installment_payments?.reduce(
          (paymentSum, payment) => paymentSum + payment.amount,
          0,
        ) || 0)
      );
    }, 0);

    const totalRemaining = totalToBePaid - totalPaid;
    const activeInstallments = data.installments.filter(
      (i) => new Date(i.due_date) > new Date(),
    ).length;

    return {
      totalInstallments: data.installments.length,
      totalToBePaid,
      totalPaid,
      totalRemaining,
      activeInstallments,
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
          {Array.from({ length: 4 }).map((_, i) => (
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

        {/* Installments Skeleton */}
        <Card.Root
          bg="bg.panel"
          borderRadius="xl"
          border="1px solid"
          borderColor="border.subtle"
        >
          <Card.Body p={6}>
            <VStack gap={4} align="stretch">
              <Skeleton height="6" width="180px" borderRadius="md" />
              <Skeleton height="24" borderRadius="lg" />
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    );
  }

  if (!data?.installments || data.installments.length === 0) {
    return (
      <VStack gap={6} align="stretch">
        {/* Header */}
        <VStack gap={2} align="start">
          <Heading size="xl" fontWeight="bold" color="fg.default">
            Dana Bergulir
          </Heading>
          <HStack gap={3} align="center">
            <Text color="fg.muted" fontSize="md">
              Belum ada cicilan
            </Text>
            <Badge
              colorPalette="gray"
              variant="subtle"
              size="sm"
              borderRadius="full"
            >
              Kosong
            </Badge>
          </HStack>
        </VStack>

        {/* Empty State */}
        <Card.Root
          bg="bg.panel"
          borderRadius="xl"
          border="1px solid"
          borderColor="border.subtle"
        >
          <Card.Body p={12}>
            <VStack gap={6} align="center">
              <Box
                p={4}
                borderRadius="xl"
                bg="orange.muted"
                border="1px solid"
                borderColor="orange.emphasized"
              >
                <LuCreditCard
                  size={32}
                  strokeWidth={1.5}
                  color="var(--chakra-colors-orange-fg)"
                />
              </Box>
              <VStack gap={1} textAlign="center">
                <Text fontSize="md" fontWeight="semibold" color="fg.default">
                  Belum ada cicilan
                </Text>
                <Text fontSize="sm" color="fg.muted" maxW="300px">
                  Anggota ini belum memiliki cicilan dana bergulir yang aktif
                </Text>
              </VStack>
              <Button
                variant="outline"
                colorPalette="orange"
                size="sm"
                borderRadius="lg"
              >
                <LuPlus size={16} />
                Tambah Cicilan
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    );
  }

  const completionPercentage =
    installmentStats.totalToBePaid > 0
      ? (installmentStats.totalPaid / installmentStats.totalToBePaid) * 100
      : 0;

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <VStack gap={2} align="start">
        <Heading size="xl" fontWeight="bold" color="fg.default">
          Dana Bergulir
        </Heading>
        <HStack gap={3} align="center">
          <Text color="fg.muted" fontSize="md">
            {installmentStats.totalInstallments} cicilan •{" "}
            {installmentStats.activeInstallments} aktif
          </Text>
          <Badge
            colorPalette="orange"
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

      {/* Stats Overview Card */}
      <Card.Root
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
      >
        <Card.Body p={6}>
          <VStack gap={4} align="stretch">
            {/* Primary Stats */}
            <HStack justify="space-between" align="start">
              <VStack gap={1} align="start" flex="1">
                <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                  Total Hutang
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="orange.fg">
                  {formatCurrency(installmentStats.totalToBePaid)}
                </Text>
                <Badge
                  colorPalette="orange"
                  variant="subtle"
                  size="sm"
                  borderRadius="full"
                >
                  {installmentStats.totalInstallments} cicilan
                </Badge>
              </VStack>
              <Box p={3} borderRadius="xl" bg="orange.muted" color="orange.fg">
                <LuCreditCard size={24} />
              </Box>
            </HStack>

            <Separator />

            {/* Secondary Stats */}
            <HStack gap={4} justify="space-between">
              <VStack gap={1} align="start" flex="1">
                <Text fontSize="xs" color="fg.muted">
                  Dibayar
                </Text>
                <Text fontSize="lg" fontWeight="semibold" color="green.fg">
                  {formatCurrency(installmentStats.totalPaid)}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {completionPercentage.toFixed(0)}%
                </Text>
              </VStack>

              <VStack gap={1} align="start" flex="1">
                <Text fontSize="xs" color="fg.muted">
                  Sisa
                </Text>
                <Text fontSize="lg" fontWeight="semibold" color="red.fg">
                  {formatCurrency(installmentStats.totalRemaining)}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {(100 - completionPercentage).toFixed(0)}%
                </Text>
              </VStack>

              <VStack gap={1} align="start" flex="1">
                <Text fontSize="xs" color="fg.muted">
                  Aktif
                </Text>
                <Text fontSize="lg" fontWeight="semibold" color="blue.fg">
                  {installmentStats.activeInstallments}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  berjalan
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Progress Section */}
      {installmentStats.totalToBePaid > 0 && (
        <VStack gap={2} align="stretch">
          <HStack justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="medium" color="fg.default">
              Progress Pembayaran
            </Text>
            <Badge
              colorPalette="orange"
              variant="subtle"
              size="sm"
              borderRadius="full"
            >
              {completionPercentage.toFixed(1)}%
            </Badge>
          </HStack>

          <Progress.Root
            value={completionPercentage}
            colorPalette="orange"
            size="md"
            borderRadius="full"
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </VStack>
      )}

      <Separator />

      {/* Installments List Section */}
      <Card.Root
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
      >
        <Card.Body p={6}>
          <VStack gap={5} align="stretch">
            <HStack justify="space-between" align="center">
              <VStack gap={1} align="start">
                <Heading size="md" fontWeight="semibold" color="fg.default">
                  Daftar Cicilan
                </Heading>
                <Text fontSize="sm" color="fg.muted">
                  {installmentStats.totalInstallments} cicilan terdaftar
                </Text>
              </VStack>
              <Button
                variant="outline"
                colorPalette="orange"
                size="sm"
                borderRadius="lg"
              >
                <LuPlus size={16} />
                Tambah
              </Button>
            </HStack>

            <VStack gap={3} align="stretch">
              {data.installments.map((installment) => {
                const totalPaid =
                  installment.installment_payments?.reduce(
                    (sum, payment) => sum + payment.amount,
                    0,
                  ) || 0;
                const remaining = installment.total_to_be_paid - totalPaid;
                const isOverdue = new Date(installment.due_date) < new Date();
                const isCompleted = remaining <= 0;
                const installmentProgress =
                  installment.total_to_be_paid > 0
                    ? (totalPaid / installment.total_to_be_paid) * 100
                    : 0;

                const colorScheme = isCompleted
                  ? "green"
                  : isOverdue
                  ? "red"
                  : "orange";

                return (
                  <Box
                    key={installment.id}
                    bg="bg.subtle"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="border.subtle"
                    overflow="hidden"
                    transition="all 0.15s"
                    _hover={{
                      borderColor: "border.emphasized",
                    }}
                  >
                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <Box p={4} cursor="pointer">
                          <VStack gap={3} align="stretch">
                            <HStack justify="space-between" align="start">
                              <HStack gap={3} flex="1" minW="0">
                                <Box
                                  p={2}
                                  borderRadius="lg"
                                  bg={`${colorScheme}.muted`}
                                  color={`${colorScheme}.fg`}
                                  flexShrink={0}
                                >
                                  {isCompleted ? (
                                    <LuCheck size={16} />
                                  ) : isOverdue ? (
                                    <LuClock size={16} />
                                  ) : (
                                    <LuCreditCard size={16} />
                                  )}
                                </Box>
                                <VStack
                                  gap={0.5}
                                  align="start"
                                  flex="1"
                                  minW="0"
                                >
                                  <HStack gap={2}>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="semibold"
                                      color="fg.default"
                                      lineClamp={1}
                                    >
                                      {installment.description || "Cicilan"}
                                    </Text>
                                    <Badge
                                      colorPalette={colorScheme}
                                      variant="subtle"
                                      size="xs"
                                      borderRadius="full"
                                    >
                                      {isCompleted
                                        ? "Lunas"
                                        : isOverdue
                                        ? "Terlambat"
                                        : "Aktif"}
                                    </Badge>
                                  </HStack>
                                  <Text fontSize="xs" color="fg.muted">
                                    Jatuh tempo:{" "}
                                    {dayjs(installment.due_date).format(
                                      "DD MMM YYYY",
                                    )}
                                  </Text>
                                </VStack>
                              </HStack>
                              <Box flexShrink={0} color="fg.muted">
                                <LuChevronDown size={16} />
                              </Box>
                            </HStack>

                            <HStack gap={4} wrap="wrap">
                              <VStack gap={0} align="start">
                                <Text fontSize="xs" color="fg.muted">
                                  Total
                                </Text>
                                <Text
                                  fontSize="sm"
                                  fontWeight="medium"
                                  color="fg.default"
                                >
                                  {formatCurrency(installment.total_to_be_paid)}
                                </Text>
                              </VStack>
                              <VStack gap={0} align="start">
                                <Text fontSize="xs" color="fg.muted">
                                  Sisa
                                </Text>
                                <Text
                                  fontSize="sm"
                                  fontWeight="medium"
                                  color={remaining > 0 ? "red.fg" : "green.fg"}
                                >
                                  {formatCurrency(remaining)}
                                </Text>
                              </VStack>
                            </HStack>

                            <Progress.Root
                              value={installmentProgress}
                              colorPalette={isCompleted ? "green" : "orange"}
                              size="sm"
                              borderRadius="full"
                            >
                              <Progress.Track>
                                <Progress.Range />
                              </Progress.Track>
                            </Progress.Root>
                          </VStack>
                        </Box>
                      </Collapsible.Trigger>

                      <Collapsible.Content>
                        <Box p={4} pt={0}>
                          <VStack gap={4} align="stretch">
                            {installment.installment_payments &&
                              installment.installment_payments.length > 0 && (
                                <>
                                  <Separator />
                                  <VStack gap={2} align="stretch">
                                    <Text
                                      fontSize="xs"
                                      fontWeight="medium"
                                      color="fg.muted"
                                      textTransform="uppercase"
                                      letterSpacing="wide"
                                    >
                                      Riwayat Pembayaran (
                                      {installment.installment_payments.length})
                                    </Text>
                                    {installment.installment_payments
                                      .sort(
                                        (a, b) =>
                                          new Date(b.paid_date).getTime() -
                                          new Date(a.paid_date).getTime(),
                                      )
                                      .slice(0, 5)
                                      .map((payment) => (
                                        <HStack
                                          key={payment.id}
                                          justify="space-between"
                                          p={3}
                                          bg="bg.panel"
                                          borderRadius="lg"
                                          border="1px solid"
                                          borderColor="border.subtle"
                                        >
                                          <HStack gap={2} flex="1" minW="0">
                                            <Box
                                              p={1.5}
                                              borderRadius="md"
                                              bg="green.muted"
                                              color="green.fg"
                                              flexShrink={0}
                                            >
                                              <LuArrowUpRight size={12} />
                                            </Box>
                                            <VStack
                                              align="start"
                                              gap={0}
                                              flex="1"
                                              minW="0"
                                            >
                                              <Text
                                                fontSize="sm"
                                                fontWeight="medium"
                                                color="green.fg"
                                              >
                                                {formatCurrency(payment.amount)}
                                              </Text>
                                              <Text
                                                fontSize="xs"
                                                color="fg.muted"
                                              >
                                                {dayjs(
                                                  payment.paid_date,
                                                ).format("DD MMM YYYY • HH:mm")}
                                              </Text>
                                            </VStack>
                                          </HStack>
                                        </HStack>
                                      ))}
                                  </VStack>
                                </>
                              )}

                            <Separator />

                            <HStack gap={2}>
                              <Button
                                variant="outline"
                                colorPalette="orange"
                                size="sm"
                                borderRadius="lg"
                                disabled={isCompleted}
                                flex="1"
                              >
                                <LuDollarSign size={16} />
                                {isCompleted ? "Sudah Lunas" : "Bayar"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                borderRadius="lg"
                              >
                                Detail
                              </Button>
                            </HStack>
                          </VStack>
                        </Box>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </Box>
                );
              })}
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};

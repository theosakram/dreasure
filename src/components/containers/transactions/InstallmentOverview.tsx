import { useGetProfileById } from "@/features/profiles/profileHooks";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";
import {
  Card,
  VStack,
  HStack,
  Box,
  Button,
  Progress,
  Badge,
  Text,
  Separator,
  Collapsible,
  Heading,
  Tabs,
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
} from "react-icons/lu";
import { TbCreditCard, TbMoneybag } from "react-icons/tb";
import { Loader } from "@/components/custom/Loader";
import { Empty } from "@/components/custom";
import { TransactionWidget } from "@/components/widgets/transactions";

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

  const installmentTransactions =
    data?.transactions.filter((d) => d.wallet.type === "installment") || [];

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.installments || data.installments.length === 0) {
    return <Empty />;
  }

  const completionPercentage =
    installmentStats.totalToBePaid > 0
      ? (installmentStats.totalPaid / installmentStats.totalToBePaid) * 100
      : 0;

  return (
    <TransactionWidget>
      <TransactionWidget.Header
        label="Dana Bergulir"
        length={installmentStats.totalInstallments}
      />

      <Tabs.Root defaultValue="donations">
        <Tabs.List>
          <Tabs.Trigger value="donations">
            <TbMoneybag />
            Donasi
          </Tabs.Trigger>
          <Tabs.Trigger value="installments">
            <TbCreditCard />
            Hutang
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="donations">
          <TransactionWidget.Timeline
            isLoading={isLoading}
            timelines={
              installmentTransactions.map((d) => ({
                amount: d.amount,
                date: d.created_at,
                type: d.type,
                walletName: d.wallet.name,
                walletType: d.wallet.type,
                id: d.id,
                description: d.description,
              })) || []
            }
          />
        </Tabs.Content>
        <Tabs.Content value="installments">
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
                  <Box
                    p={3}
                    borderRadius="xl"
                    bg="orange.muted"
                    color="orange.fg"
                  >
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
                    const isOverdue =
                      new Date(installment.due_date) < new Date();
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
                                      {formatCurrency(
                                        installment.total_to_be_paid,
                                      )}
                                    </Text>
                                  </VStack>
                                  <VStack gap={0} align="start">
                                    <Text fontSize="xs" color="fg.muted">
                                      Sisa
                                    </Text>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="medium"
                                      color={
                                        remaining > 0 ? "red.fg" : "green.fg"
                                      }
                                    >
                                      {formatCurrency(remaining)}
                                    </Text>
                                  </VStack>
                                </HStack>

                                <Progress.Root
                                  value={installmentProgress}
                                  colorPalette={
                                    isCompleted ? "green" : "orange"
                                  }
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
                                  installment.installment_payments.length >
                                    0 && (
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
                                          {
                                            installment.installment_payments
                                              .length
                                          }
                                          )
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
                                                    {formatCurrency(
                                                      payment.amount,
                                                    )}
                                                  </Text>
                                                  <Text
                                                    fontSize="xs"
                                                    color="fg.muted"
                                                  >
                                                    {dayjs(
                                                      payment.paid_date,
                                                    ).format(
                                                      "DD MMM YYYY • HH:mm",
                                                    )}
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
        </Tabs.Content>
      </Tabs.Root>
    </TransactionWidget>
  );
};

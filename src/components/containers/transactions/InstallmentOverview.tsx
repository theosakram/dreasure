import { useGetProfileById } from "@/features/profiles/profileHooks";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import {
  Card,
  Skeleton,
  VStack,
  SimpleGrid,
  HStack,
  Box,
  Button,
  Progress,
  Badge,
  Text,
  Circle,
  Separator,
  Collapsible,
  Group,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  LuTarget,
  LuCreditCard,
  LuPlus,
  LuCheck,
  LuClock,
  LuCalendarDays,
  LuChevronDown,
  LuDollarSign,
  LuWallet,
  LuTrendingUp,
  LuArrowUpRight,
  LuArrowDownRight,
  LuActivity,
  LuChartPie,
} from "react-icons/lu";

export const InstallmentOverview = () => {
  const { userId } = useParams<{ userId: string }>();
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
            gradientFrom="orange.500/10"
            gradientVia="yellow.500/10"
            gradientTo="red.500/10"
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
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={6}>
              {Array.from({ length: 4 }).map((_, i) => (
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

  if (!data?.installments || data.installments.length === 0) {
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
          transform: "translateY(-1px)",
        }}
        transition="all 0.2s ease-in-out"
      >
        <Card.Body p={0}>
          {/* Header with gradient */}
          <Box
            bgGradient="to-r"
            gradientFrom="orange.500/10"
            gradientVia="yellow.500/10"
            gradientTo="red.500/10"
            p={6}
            position="relative"
            _dark={{
              gradientFrom: "orange.400/20",
              gradientVia: "yellow.400/20",
              gradientTo: "red.400/20",
            }}
          >
            {/* Decorative elements */}
            <Box
              position="absolute"
              top={0}
              right={0}
              w="20"
              h="20"
              bg="orange.500/5"
              borderRadius="full"
              transform="translate(10px, -10px)"
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
                    Dana Bergulir
                  </Text>
                  <Badge
                    colorPalette="gray"
                    variant="surface"
                    size="sm"
                    borderRadius="full"
                    px={3}
                    fontWeight="medium"
                  >
                    Kosong
                  </Badge>
                </HStack>
                <Text color="fg.muted" fontSize="md" opacity={0.8}>
                  Belum ada cicilan yang terdaftar
                </Text>
              </VStack>

              <Circle
                bg="orange.100"
                size="16"
                color="orange.600"
                boxShadow="lg"
                _dark={{
                  bg: "orange.900/30",
                  color: "orange.300",
                }}
              >
                <LuTarget size={28} />
              </Circle>
            </HStack>
          </Box>

          {/* Empty State Content */}
          <VStack gap={8} py={12} align="center" px={6}>
            <Circle bg="orange.100" size="20" color="orange.400">
              <LuCreditCard size={32} />
            </Circle>
            <VStack gap={3} textAlign="center">
              <Text fontSize="lg" fontWeight="bold" color="fg">
                Belum Ada Cicilan
              </Text>
              <Text
                fontSize="sm"
                color="fg.muted"
                maxW="300px"
                lineHeight="1.6"
              >
                Anggota ini belum memiliki cicilan dana bergulir yang aktif.
                Tambahkan cicilan baru untuk memulai.
              </Text>
            </VStack>
            <Button
              variant="surface"
              colorPalette="orange"
              size="lg"
              borderRadius="full"
              px={8}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              <LuPlus size={18} />
              Tambah Cicilan Baru
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  const completionPercentage =
    installmentStats.totalToBePaid > 0
      ? (installmentStats.totalPaid / installmentStats.totalToBePaid) * 100
      : 0;

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
        transform: "translateY(-1px)",
      }}
      transition="all 0.2s ease-in-out"
    >
      <Card.Body p={0}>
        {/* Header with gradient background */}
        <Box
          bgGradient="to-r"
          gradientFrom="orange.500/10"
          gradientVia="yellow.500/10"
          gradientTo="red.500/10"
          p={6}
          position="relative"
          _dark={{
            gradientFrom: "orange.400/20",
            gradientVia: "yellow.400/20",
            gradientTo: "red.400/20",
          }}
        >
          {/* Decorative elements */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="24"
            h="24"
            bg="orange.500/5"
            borderRadius="full"
            transform="translate(12px, -12px)"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w="20"
            h="20"
            bg="yellow.500/5"
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
                  Dana Bergulir
                </Text>
                <Badge
                  colorPalette="orange"
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
                {installmentStats.totalInstallments} cicilan •{" "}
                {installmentStats.activeInstallments} aktif
              </Text>
            </VStack>

            <Circle
              bg="orange.100"
              size="16"
              color="orange.600"
              boxShadow="lg"
              _dark={{
                bg: "orange.900/30",
                color: "orange.300",
              }}
            >
              <LuTarget size={28} />
            </Circle>
          </HStack>
        </Box>

        {/* Stats Grid */}
        <Box p={6}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 4 }}
            gap={4}
            mb={8}
            w="full"
          >
            {/* Total Debt Card */}
            <Box
              bg="bg.subtle"
              borderRadius="lg"
              p={4}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              minH="20"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="16"
                h="16"
                bg="orange.500/5"
                borderRadius="full"
                transform="translate(8px, -8px)"
              />
              <VStack gap={3} align="start" position="relative" w="full">
                <HStack gap={2} align="center" w="full">
                  <Circle bg="orange.100" size="8" color="orange.600">
                    <LuCreditCard size={16} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1" minW="0">
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Total Hutang
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="orange.500"
                      truncate
                    >
                      {formatCurrency(installmentStats.totalToBePaid)}
                    </Text>
                  </VStack>
                </HStack>
                <Badge
                  colorPalette="orange"
                  variant="surface"
                  size="xs"
                  borderRadius="full"
                  alignSelf="flex-end"
                >
                  {installmentStats.totalInstallments} cicilan
                </Badge>
              </VStack>
            </Box>

            {/* Paid Card */}
            <Box
              bg="bg.subtle"
              borderRadius="lg"
              p={4}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              minH="20"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="16"
                h="16"
                bg="green.500/5"
                borderRadius="full"
                transform="translate(8px, -8px)"
              />
              <VStack gap={3} align="start" position="relative" w="full">
                <HStack gap={2} align="center" w="full">
                  <Circle bg="green.100" size="8" color="green.600">
                    <LuArrowUpRight size={16} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1" minW="0">
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Sudah Dibayar
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="green.500"
                      truncate
                    >
                      {formatCurrency(installmentStats.totalPaid)}
                    </Text>
                  </VStack>
                </HStack>
                <Badge
                  colorPalette="green"
                  variant="surface"
                  size="xs"
                  borderRadius="full"
                  alignSelf="flex-end"
                >
                  {completionPercentage.toFixed(0)}%
                </Badge>
              </VStack>
            </Box>

            {/* Remaining Card */}
            <Box
              bg="bg.subtle"
              borderRadius="lg"
              p={4}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              minH="20"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="16"
                h="16"
                bg="red.500/5"
                borderRadius="full"
                transform="translate(8px, -8px)"
              />
              <VStack gap={3} align="start" position="relative" w="full">
                <HStack gap={2} align="center" w="full">
                  <Circle bg="red.100" size="8" color="red.600">
                    <LuArrowDownRight size={16} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1" minW="0">
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Sisa Hutang
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="red.500"
                      truncate
                    >
                      {formatCurrency(installmentStats.totalRemaining)}
                    </Text>
                  </VStack>
                </HStack>
                <Badge
                  colorPalette="red"
                  variant="surface"
                  size="xs"
                  borderRadius="full"
                  alignSelf="flex-end"
                >
                  {(100 - completionPercentage).toFixed(0)}%
                </Badge>
              </VStack>
            </Box>

            {/* Active Installments Card */}
            <Box
              bg="bg.subtle"
              borderRadius="lg"
              p={4}
              border="1px solid"
              borderColor="border.muted"
              position="relative"
              overflow="hidden"
              minH="20"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                w="16"
                h="16"
                bg="blue.500/5"
                borderRadius="full"
                transform="translate(8px, -8px)"
              />
              <VStack gap={3} align="start" position="relative" w="full">
                <HStack gap={2} align="center" w="full">
                  <Circle bg="blue.100" size="8" color="blue.600">
                    <LuCalendarDays size={16} />
                  </Circle>
                  <VStack gap={0} align="start" flex="1" minW="0">
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Cicilan Aktif
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="blue.500">
                      {installmentStats.activeInstallments}
                    </Text>
                  </VStack>
                </HStack>
                <Badge
                  colorPalette="blue"
                  variant="surface"
                  size="xs"
                  borderRadius="full"
                  alignSelf="flex-end"
                >
                  Berjalan
                </Badge>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Progress Section */}
          {installmentStats.totalToBePaid > 0 && (
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
                    <Circle bg="orange.100" size="8" color="orange.600">
                      <LuChartPie size={16} />
                    </Circle>
                    <VStack gap={0} align="start">
                      <Text fontSize="sm" fontWeight="medium" color="fg">
                        Progress Pembayaran
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        Total dari semua cicilan
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge
                    colorPalette="orange"
                    variant="solid"
                    size="sm"
                    borderRadius="full"
                    fontWeight="bold"
                  >
                    {completionPercentage.toFixed(1)}%
                  </Badge>
                </HStack>

                <Progress.Root
                  value={completionPercentage}
                  colorPalette="orange"
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

          {/* Installments List Section */}
          <Box
            bg="bg.subtle"
            borderRadius="xl"
            p={6}
            border="1px solid"
            borderColor="border.muted"
          >
            <HStack justify="space-between" mb={6} align="center">
              <HStack gap={3}>
                <Circle bg="gray.100" size="8" color="gray.600">
                  <LuWallet size={16} />
                </Circle>
                <VStack gap={0} align="start">
                  <Text textStyle="lg" fontWeight="bold" color="fg">
                    Daftar Cicilan
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    {installmentStats.totalInstallments} cicilan terdaftar
                  </Text>
                </VStack>
              </HStack>
              <Button
                variant="surface"
                colorPalette="orange"
                size="sm"
                borderRadius="full"
                px={4}
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "md",
                }}
                transition="all 0.2s"
              >
                <LuPlus size={16} />
                Tambah Cicilan
              </Button>
            </HStack>

            <VStack gap={4} align="stretch">
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

                return (
                  <Box
                    key={installment.id}
                    bg="bg.emphasized"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={
                      isCompleted
                        ? "green.200"
                        : isOverdue
                        ? "red.200"
                        : "orange.200"
                    }
                    overflow="hidden"
                    _hover={{
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                    transition="all 0.2s"
                  >
                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <Box
                          p={4}
                          cursor="pointer"
                          _hover={{ bg: "bg.muted" }}
                          transition="background 0.2s"
                        >
                          <HStack justify="space-between" align="center">
                            <HStack gap={4} align="center" flex="1">
                              <Circle
                                bg={
                                  isCompleted
                                    ? "green.100"
                                    : isOverdue
                                    ? "red.100"
                                    : "orange.100"
                                }
                                size="12"
                                color={
                                  isCompleted
                                    ? "green.600"
                                    : isOverdue
                                    ? "red.600"
                                    : "orange.600"
                                }
                              >
                                {isCompleted ? (
                                  <LuCheck size={20} />
                                ) : isOverdue ? (
                                  <LuClock size={20} />
                                ) : (
                                  <LuCreditCard size={20} />
                                )}
                              </Circle>

                              <VStack align="start" gap={2} flex="1" minW="0">
                                <HStack gap={3} align="center" w="full">
                                  <Text
                                    fontSize="md"
                                    fontWeight="bold"
                                    color="fg"
                                    truncate
                                  >
                                    {installment.description || "Cicilan"}
                                  </Text>
                                  <Badge
                                    colorPalette={
                                      isCompleted
                                        ? "green"
                                        : isOverdue
                                        ? "red"
                                        : "orange"
                                    }
                                    variant="surface"
                                    size="sm"
                                    borderRadius="full"
                                  >
                                    {isCompleted
                                      ? "Lunas"
                                      : isOverdue
                                      ? "Terlambat"
                                      : "Aktif"}
                                  </Badge>
                                </HStack>

                                <Group gap={6}>
                                  <VStack gap={0} align="start">
                                    <Text fontSize="xs" color="fg.muted">
                                      Total Cicilan
                                    </Text>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="medium"
                                      color="fg"
                                    >
                                      {formatCurrency(
                                        installment.total_to_be_paid,
                                      )}
                                    </Text>
                                  </VStack>
                                  <VStack gap={0} align="start">
                                    <Text fontSize="xs" color="fg.muted">
                                      Sisa Hutang
                                    </Text>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="medium"
                                      color={
                                        remaining > 0 ? "red.500" : "green.500"
                                      }
                                    >
                                      {formatCurrency(remaining)}
                                    </Text>
                                  </VStack>
                                  <VStack gap={0} align="start">
                                    <Text fontSize="xs" color="fg.muted">
                                      Jatuh Tempo
                                    </Text>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="medium"
                                      color="fg"
                                    >
                                      {dayjs(installment.due_date).format(
                                        "DD MMM YYYY",
                                      )}
                                    </Text>
                                  </VStack>
                                </Group>

                                <Box w="full" mt={2}>
                                  <HStack justify="space-between" mb={1}>
                                    <Text fontSize="xs" color="fg.muted">
                                      Progress
                                    </Text>
                                    <Text fontSize="xs" fontWeight="medium">
                                      {installmentProgress.toFixed(1)}%
                                    </Text>
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
                                </Box>
                              </VStack>
                            </HStack>

                            <Circle size="8" color="fg.muted">
                              <LuChevronDown size={16} />
                            </Circle>
                          </HStack>
                        </Box>
                      </Collapsible.Trigger>

                      <Collapsible.Content>
                        <Box p={4} pt={0} bg="bg.muted">
                          <VStack gap={4} align="stretch">
                            {installment.installment_payments &&
                              installment.installment_payments.length > 0 && (
                                <Box>
                                  <HStack gap={2} mb={3} align="center">
                                    <Circle
                                      bg="green.100"
                                      size="6"
                                      color="green.600"
                                    >
                                      <LuTrendingUp size={12} />
                                    </Circle>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="medium"
                                      color="fg"
                                    >
                                      Riwayat Pembayaran (
                                      {installment.installment_payments.length})
                                    </Text>
                                  </HStack>
                                  <VStack gap={2} align="stretch">
                                    {installment.installment_payments
                                      .sort(
                                        (a, b) =>
                                          new Date(b.paid_date).getTime() -
                                          new Date(a.paid_date).getTime(),
                                      )
                                      .slice(0, 5) // Show only latest 5 payments
                                      .map((payment) => (
                                        <HStack
                                          key={payment.id}
                                          justify="space-between"
                                          p={3}
                                          bg="bg.subtle"
                                          borderRadius="lg"
                                          border="1px solid"
                                          borderColor="border.muted"
                                        >
                                          <HStack gap={3} align="center">
                                            <Circle
                                              bg="green.100"
                                              size="8"
                                              color="green.600"
                                            >
                                              <LuArrowUpRight size={14} />
                                            </Circle>
                                            <VStack align="start" gap={0}>
                                              <Text
                                                fontSize="sm"
                                                fontWeight="medium"
                                                color="green.500"
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
                                              {payment.description && (
                                                <Text
                                                  fontSize="xs"
                                                  color="fg.muted"
                                                  truncate
                                                  maxW="200px"
                                                >
                                                  {payment.description}
                                                </Text>
                                              )}
                                            </VStack>
                                          </HStack>
                                          <Badge
                                            colorPalette="green"
                                            variant="surface"
                                            size="xs"
                                            borderRadius="full"
                                          >
                                            Lunas
                                          </Badge>
                                        </HStack>
                                      ))}
                                  </VStack>
                                </Box>
                              )}

                            <Separator />

                            <HStack gap={3}>
                              <Button
                                variant="surface"
                                colorPalette="orange"
                                size="sm"
                                borderRadius="full"
                                disabled={isCompleted}
                                _hover={{
                                  transform: "translateY(-1px)",
                                  boxShadow: "sm",
                                }}
                                transition="all 0.2s"
                              >
                                <LuDollarSign size={16} />
                                {isCompleted ? "Sudah Lunas" : "Bayar Cicilan"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                borderRadius="full"
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
          </Box>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

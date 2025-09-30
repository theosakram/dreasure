import { TransactionType } from "@/features/transactions/transactionTypes";
import { WalletTypes } from "@/features/wallets/walletTypes";
import {
  VStack,
  Text,
  Box,
  HStack,
  Badge,
  Skeleton,
  Separator,
  Button,
  Group,
  Input,
  Stack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { ReactNode, useState, useMemo } from "react";
import {
  LuArrowUpRight,
  LuArrowDownRight,
  LuReceipt,
  LuChevronDown,
  LuSearch,
  LuX,
} from "react-icons/lu";

type TransactionEvent = {
  title: ReactNode;
  date: string;
  amount: number;
  id: string | number;
  type: TransactionType;
  description?: string;
  walletName: string;
  walletType: WalletTypes;
};

type MemberTransactionListProps = {
  timelines: TransactionEvent[];
  title?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  showAmount?: boolean;
  maxWidth?: string;
  variant?: "default" | "compact" | "detailed";
  initialDisplayCount?: number;
  enableSearch?: boolean;
  enableFiltering?: boolean;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const TransactionSkeleton = () => (
  <VStack align="stretch" gap={3}>
    {Array.from({ length: 5 }).map((_, i) => (
      <HStack
        key={i}
        gap={3}
        p={4}
        bg="bg.panel"
        borderRadius="lg"
        border="1px solid"
        borderColor="border.subtle"
      >
        <Skeleton boxSize="10" borderRadius="lg" />
        <VStack align="start" gap={1.5} flex="1">
          <Skeleton height="4" width="60%" borderRadius="md" />
          <Skeleton height="3" width="40%" borderRadius="md" />
        </VStack>
        <Skeleton height="5" width="80px" borderRadius="full" />
      </HStack>
    ))}
  </VStack>
);

export const MemberTransactionTimeline = ({
  timelines,
  isLoading = false,
  emptyMessage = "Belum ada transaksi",
  showAmount = true,
  maxWidth = "100%",
  initialDisplayCount = 20,
  enableSearch = true,
  enableFiltering = true,
}: MemberTransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdraw">(
    "all",
  );
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [dateRange, setDateRange] = useState<"all" | "week" | "month" | "year">(
    "all",
  );

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    let filtered = timelines;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          formatCurrency(t.amount)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = dayjs();
      const cutoffDate = {
        week: now.subtract(7, "day"),
        month: now.subtract(1, "month"),
        year: now.subtract(1, "year"),
      }[dateRange];

      filtered = filtered.filter((t) => dayjs(t.date).isAfter(cutoffDate));
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
  }, [timelines, searchTerm, filterType, dateRange]);

  // Paginated transactions
  const displayedTransactions = filteredTransactions.slice(0, displayCount);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    return displayedTransactions.reduce((acc, transaction) => {
      const date = dayjs(transaction.date).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, TransactionEvent[]>);
  }, [displayedTransactions]);

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) =>
    dayjs(b).diff(dayjs(a)),
  );

  const hasMore = filteredTransactions.length > displayCount;
  const showingCount = displayedTransactions.length;
  const totalCount = filteredTransactions.length;

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  if (!timelines.length) {
    return (
      <VStack gap={6} py={12} align="center">
        <Box
          p={4}
          borderRadius="xl"
          bg="bg.subtle"
          border="1px solid"
          borderColor="border.subtle"
        >
          <LuReceipt
            size={32}
            strokeWidth={1.5}
            color="var(--chakra-colors-fg-muted)"
          />
        </Box>
        <VStack gap={1} textAlign="center">
          <Text fontSize="md" fontWeight="semibold" color="fg.default">
            Belum ada transaksi
          </Text>
          <Text fontSize="sm" color="fg.muted" maxW="300px">
            {emptyMessage}
          </Text>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap={5} w="full" maxW={maxWidth}>
      {/* Search and Filter Controls */}
      {(enableSearch || enableFiltering) && timelines.length > 5 && (
        <VStack gap={3} align="stretch">
          {/* Search */}
          {enableSearch && (
            <Box position="relative">
              <Input
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                pl={10}
                size="md"
                bg="bg.subtle"
                border="1px solid"
                borderColor="border.subtle"
                borderRadius="lg"
                _hover={{
                  borderColor: "border.emphasized",
                }}
                _focus={{
                  borderColor: "brand.emphasized",
                  bg: "bg.panel",
                }}
              />
              <Box
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                color="fg.muted"
              >
                <LuSearch size={16} />
              </Box>
              {searchTerm && (
                <Button
                  position="absolute"
                  right="2"
                  top="50%"
                  transform="translateY(-50%)"
                  size="xs"
                  variant="ghost"
                  onClick={() => setSearchTerm("")}
                >
                  <LuX size={14} />
                </Button>
              )}
            </Box>
          )}

          {/* Filters */}
          {enableFiltering && (
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={3}
              align={{ base: "stretch", md: "center" }}
            >
              {/* Type Filter */}
              <Group attached flex={{ base: "1", md: "0" }}>
                <Button
                  variant={filterType === "all" ? "solid" : "outline"}
                  colorPalette={filterType === "all" ? "gray" : "gray"}
                  onClick={() => setFilterType("all")}
                  flex="1"
                >
                  Semua
                </Button>
                <Button
                  variant={filterType === "deposit" ? "solid" : "outline"}
                  colorPalette="green"
                  onClick={() => setFilterType("deposit")}
                  flex="1"
                >
                  Setoran
                </Button>
                <Button
                  variant={filterType === "withdraw" ? "solid" : "outline"}
                  colorPalette="red"
                  onClick={() => setFilterType("withdraw")}
                  flex="1"
                >
                  Penarikan
                </Button>
              </Group>

              {/* Date Range Filter */}
              <Group attached flex={{ base: "1", md: "0" }}>
                <Button
                  variant={dateRange === "all" ? "solid" : "outline"}
                  colorPalette={dateRange === "all" ? "gray" : "gray"}
                  onClick={() => setDateRange("all")}
                  flex="1"
                >
                  Semua
                </Button>
                <Button
                  variant={dateRange === "week" ? "solid" : "outline"}
                  colorPalette="blue"
                  onClick={() => setDateRange("week")}
                  flex="1"
                >
                  7 Hari
                </Button>
                <Button
                  variant={dateRange === "month" ? "solid" : "outline"}
                  colorPalette="blue"
                  onClick={() => setDateRange("month")}
                  flex="1"
                >
                  1 Bulan
                </Button>
              </Group>

              {(searchTerm || filterType !== "all" || dateRange !== "all") && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setDateRange("all");
                    setDisplayCount(initialDisplayCount);
                  }}
                  flexShrink={0}
                >
                  Reset
                </Button>
              )}
            </Stack>
          )}

          {/* Results Summary */}
          {filteredTransactions.length > 0 && (
            <Text fontSize="xs" color="fg.muted">
              {totalCount === timelines.length
                ? `${showingCount} transaksi`
                : `${totalCount} hasil • menampilkan ${showingCount}`}
            </Text>
          )}
        </VStack>
      )}

      {/* No results state */}
      {filteredTransactions.length === 0 &&
        (searchTerm || filterType !== "all" || dateRange !== "all") && (
          <VStack gap={6} py={12} align="center">
            <Box
              p={4}
              borderRadius="xl"
              bg="bg.subtle"
              border="1px solid"
              borderColor="border.subtle"
            >
              <LuSearch
                size={28}
                strokeWidth={1.5}
                color="var(--chakra-colors-fg-muted)"
              />
            </Box>
            <VStack gap={1} textAlign="center">
              <Text fontSize="md" fontWeight="semibold" color="fg.default">
                Tidak ada transaksi ditemukan
              </Text>
              <Text fontSize="sm" color="fg.muted" maxW="280px">
                Coba ubah kriteria pencarian atau filter
              </Text>
            </VStack>
          </VStack>
        )}

      {/* Transaction List */}
      {sortedDates.map((date, dateIndex) => {
        const transactions = groupedTransactions[date];
        const isToday = dayjs().isSame(dayjs(date), "day");
        const isYesterday = dayjs()
          .subtract(1, "day")
          .isSame(dayjs(date), "day");

        let dateLabel = dayjs(date).format("DD MMMM YYYY");
        if (isToday) dateLabel = "Hari ini";
        else if (isYesterday) dateLabel = "Kemarin";

        return (
          <VStack key={date} align="stretch" gap={3}>
            {/* Date Header */}
            {dateIndex > 0 && <Separator />}
            <HStack gap={2} align="center">
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="fg.muted"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {dateLabel}
              </Text>
              <Box h="1px" flex="1" bg="border.subtle" />
              <Text fontSize="xs" color="fg.muted">
                {transactions.length}
              </Text>
            </HStack>

            {/* Transaction Cards */}
            <VStack gap={2} align="stretch">
              {transactions.map((transaction) => (
                <HStack
                  key={transaction.id}
                  gap={3}
                  p={3}
                  bg="bg.panel"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="border.subtle"
                  transition="all 0.15s"
                  _hover={{
                    borderColor: "border.emphasized",
                    bg: "bg.subtle",
                  }}
                  cursor="pointer"
                >
                  <Box
                    p={2}
                    borderRadius="lg"
                    bg={
                      transaction.type === "deposit"
                        ? "green.muted"
                        : "red.muted"
                    }
                    color={
                      transaction.type === "deposit" ? "green.fg" : "red.fg"
                    }
                    flexShrink={0}
                  >
                    {transaction.type === "deposit" ? (
                      <LuArrowUpRight size={16} />
                    ) : (
                      <LuArrowDownRight size={16} />
                    )}
                  </Box>

                  <VStack gap={0.5} align="start" flex="1" minW="0">
                    <HStack gap={2} align="center">
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="fg.default"
                      >
                        {transaction.type === "deposit"
                          ? "Setoran"
                          : "Penarikan"}
                      </Text>
                      <Badge
                        colorPalette={
                          transaction.walletType === "transaction"
                            ? "blue"
                            : "orange"
                        }
                        variant="subtle"
                        size="xs"
                        borderRadius="full"
                      >
                        {transaction.walletName}
                      </Badge>
                    </HStack>
                    <Text fontSize="xs" color="fg.muted" lineClamp={1}>
                      {transaction.description || "Tanpa keterangan"} •{" "}
                      {dayjs(transaction.date).format("HH:mm")}
                    </Text>
                  </VStack>

                  {showAmount && (
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color={
                        transaction.type === "deposit" ? "green.fg" : "red.fg"
                      }
                      flexShrink={0}
                    >
                      {transaction.type === "deposit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </Text>
                  )}
                </HStack>
              ))}
            </VStack>
          </VStack>
        );
      })}

      {/* Load More / Pagination */}
      {hasMore && (
        <VStack gap={3} pt={4}>
          <Separator />
          <VStack gap={2} align="center" w="full">
            <Text fontSize="xs" color="fg.muted">
              {showingCount} dari {totalCount} transaksi
            </Text>
            <HStack gap={2} w="full" justify="center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDisplayCount((prev) => prev + 20)}
                borderRadius="lg"
              >
                <LuChevronDown size={14} />
                Muat 20 Lagi
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDisplayCount(totalCount)}
                borderRadius="lg"
              >
                Semua
              </Button>
            </HStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

import { VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Loader } from "../../custom/Loader";
import { Empty } from "../../custom";
import { type TransactionTimelineCardProps } from "./TransactionTimelineCard";
import { sortByDateDesc } from "@/utils/helpers/sortByDateDesc";
import { TransactionGroup } from "./TransactionGroup";

type TransactionListProps = {
  timelines: TransactionTimelineCardProps[];
  isLoading?: boolean;
};

type GroupedTransactions = Record<string, TransactionTimelineCardProps[]>;

const groupByDate = (
  transactions: TransactionTimelineCardProps[],
): GroupedTransactions =>
  sortByDateDesc(transactions).reduce((acc, transaction) => {
    const date = dayjs(transaction.date).format("YYYY-MM-DD");
    (acc[date] ??= []).push(transaction);
    return acc;
  }, {} as GroupedTransactions);

export const TransactionTimeline = ({
  timelines,
  isLoading = false,
}: TransactionListProps) => {
  const groupedTransactions = useMemo(
    () => groupByDate(timelines),
    [timelines],
  );

  const sortedDates = useMemo(
    () =>
      sortByDateDesc(
        Object.keys(groupedTransactions).map((d) => ({ date: d })),
      ).map((d) => d.date),
    [groupedTransactions],
  );

  if (isLoading) return <Loader />;
  if (!timelines.length) return <Empty />;

  return (
    <VStack align="stretch" gap={5} w="full">
      {sortedDates.map((date, index) => (
        <TransactionGroup
          key={date}
          date={date}
          transactions={groupedTransactions[date]}
          showSeparator={index > 0}
        />
      ))}
    </VStack>
  );
};

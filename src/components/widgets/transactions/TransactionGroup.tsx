import { VStack, Separator } from "@chakra-ui/react";
import { DateHeader } from "./DateGroup";
import {
  TransactionTimelineCardProps,
  TransactionTimelineCard,
} from "./TransactionTimelineCard";

export const TransactionGroup = ({
  date,
  transactions,
  showSeparator,
}: {
  date: string;
  transactions: TransactionTimelineCardProps[];
  showSeparator: boolean;
}) => (
  <VStack key={date} align="stretch" gap={3}>
    {showSeparator && <Separator />}
    <DateHeader date={date} count={transactions.length} />
    <VStack gap={2} align="stretch">
      {transactions.map((transaction) => (
        <TransactionTimelineCard key={transaction.id} {...transaction} />
      ))}
    </VStack>
  </VStack>
);

import { VStack } from "@chakra-ui/react";
import { TransactionHeader } from "./TransactionHeader";
import { TransactionHistoryBody } from "./TransactionHistoryBody";
import { ReactNode } from "react";
import { TransactionTimeline } from "./TransactionTimeline";

type TransactionWidgetProps = {
  children?: ReactNode;
};

export const TransactionWidget = (props: TransactionWidgetProps) => {
  return (
    <VStack gap={6} align="stretch">
      {props.children}
    </VStack>
  );
};

TransactionWidget.Header = TransactionHeader;
TransactionWidget.HistoryBody = TransactionHistoryBody;
TransactionWidget.Timeline = TransactionTimeline;

import { Separator } from "@chakra-ui/react";
import { Loader } from "@/components/custom/Loader";
import { useFinancialPercentages } from "@/utils/helpers/hooks/useFinancialPercentages";
import { useGetTransactionWalletTransactions } from "@/features/transactions/transactionHooks";
import { MoneyFlowContainer } from "../MoneyFlowContainer";
import { TransactionWidget } from "@/components/widgets/transactions";

export const TransactionOverview = () => {
  const { data, isLoading } = useGetTransactionWalletTransactions();
  const financialPercentages = useFinancialPercentages(data?.data || []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TransactionWidget>
      <TransactionWidget.Header
        label="Uang Kas"
        length={data?.data.length || 0}
      />
      <MoneyFlowContainer {...financialPercentages} type="no-movement" />

      <Separator />

      <TransactionWidget.HistoryBody>
        <TransactionWidget.Timeline
          isLoading={isLoading}
          timelines={
            data?.data.map((d) => ({
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
      </TransactionWidget.HistoryBody>
    </TransactionWidget>
  );
};

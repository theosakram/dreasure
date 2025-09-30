"use client";

import { DonationTable } from "@/components/containers/installments/DonationTable";
import { InstallmentTable } from "@/components/containers/installments/InstallmentTable";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { SearchName } from "@/components/containers/SearchName";
import { TimeFilter } from "@/components/custom";
import { useGetInstallmentWalletTransactions } from "@/features/transactions/transactionHooks";
import { useGetInstallmentWallet } from "@/features/wallets/walletHooks";
import { useFinancialPercentages } from "@/utils/helpers/hooks/useFinancialPercentages";
import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
import { Stack, Tabs, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { TbCreditCard, TbMoneybag } from "react-icons/tb";

const RevolvingContent = () => {
  const { isLoading } = useGetInstallmentWalletTransactions();
  const { data: bergulir } = useGetInstallmentWallet();
  const financialPercentages = useFinancialPercentages(
    bergulir?.transactions || [],
  );

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "donations";
  const { shallowPush } = useShallowPush({ type: "replace" });

  return (
    <Stack gap={6}>
      <MoneyFlowContainer {...financialPercentages} isLoading={isLoading} />
      <TimeFilter />
      <SearchName />

      <Tabs.Root
        defaultValue={tab}
        onValueChange={(e) => shallowPush({ tab: e.value })}
      >
        <Tabs.List>
          <Tabs.Trigger value="donations">
            <TbMoneybag />
            Donasi
          </Tabs.Trigger>
          <Tabs.Trigger value="debts">
            <TbCreditCard />
            Hutang
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="donations">
          <DonationTable />
        </Tabs.Content>
        <Tabs.Content value="debts">
          <InstallmentTable />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};

const RevolvingPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RevolvingContent />
    </Suspense>
  );
};

export default RevolvingPage;

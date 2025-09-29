"use client";

import { DonationTable } from "@/components/containers/installments/DonationTable";
import { InstallmentTable } from "@/components/containers/installments/InstallmentTable";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { SearchName } from "@/components/containers/SearchName";
import { TimeFilter } from "@/components/custom";
import { useGetBergulirTransactions } from "@/features/transactions/transactionHooks";
import { useGetBergulirWallet } from "@/features/wallets/walletHooks";
import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
import { moneyFlowMapper } from "@/utils/helpers/moneyFlowMapper";
import { Stack, Skeleton, VStack, Tabs } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { TbCreditCard, TbMoneybag } from "react-icons/tb";

const RevolvingSkeleton = () => (
  <Stack gap={6}>
    <VStack gap={4}>
      <Skeleton height="120px" width="full" borderRadius="xl" />
      <Stack direction="row" gap={4} width="full">
        <Skeleton height="80px" flex="1" borderRadius="lg" />
        <Skeleton height="80px" flex="1" borderRadius="lg" />
        <Skeleton height="80px" flex="1" borderRadius="lg" />
      </Stack>
    </VStack>

    <Skeleton height="40px" width="320px" borderRadius="lg" />

    <Skeleton height="40px" width="280px" borderRadius="md" />

    <VStack gap={3}>
      <Skeleton height="60px" width="full" borderRadius="lg" />
      <Skeleton height="300px" width="full" borderRadius="lg" />
    </VStack>
  </Stack>
);

const RevolvingContent = () => {
  const { isLoading } = useGetBergulirTransactions();
  const { data: bergulir } = useGetBergulirWallet();
  const mappedBergulir = useMemo(
    () => moneyFlowMapper(bergulir?.transactions || []),
    [bergulir?.transactions],
  );

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "donations";
  const { shallowPush } = useShallowPush({ type: "replace" });

  return (
    <Stack gap={6}>
      <MoneyFlowContainer {...mappedBergulir} isLoading={isLoading} />
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
    <Suspense fallback={<RevolvingSkeleton />}>
      <RevolvingContent />
    </Suspense>
  );
};

export default RevolvingPage;

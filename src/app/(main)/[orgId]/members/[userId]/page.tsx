"use client";

import { VStack, Grid, GridItem } from "@chakra-ui/react";
import { InstallmentOverview } from "@/components/containers/transactions/InstallmentOverview";
import { TransactionOverview } from "@/components/containers/transactions/TransactionOverview";
import { ProfileHeader } from "@/components/containers/profiles/ProfileHeader";

const MembersDetailPage = () => {
  return (
    <VStack gap={6} align="stretch" w="full">
      <ProfileHeader />

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <TransactionOverview />
        </GridItem>
        <GridItem>
          <InstallmentOverview />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default MembersDetailPage;

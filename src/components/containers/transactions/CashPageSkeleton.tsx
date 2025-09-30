import { Stack, VStack, Skeleton } from "@chakra-ui/react";

export const CashPageSkeleton = () => (
  <Stack gap={6}>
    {/* MoneyFlow skeleton */}
    <VStack gap={4}>
      <Skeleton height="120px" width="full" borderRadius="xl" />
      <Stack direction="row" gap={4} width="full">
        <Skeleton height="80px" flex="1" borderRadius="lg" />
        <Skeleton height="80px" flex="1" borderRadius="lg" />
        <Skeleton height="80px" flex="1" borderRadius="lg" />
      </Stack>
    </VStack>

    {/* TimeFilter skeleton */}
    <Skeleton height="40px" width="320px" borderRadius="lg" />

    {/* SearchName skeleton */}
    <Skeleton height="40px" width="280px" borderRadius="md" />

    {/* Table skeleton */}
    <VStack gap={3}>
      <Skeleton height="60px" width="full" borderRadius="lg" />
      <Skeleton height="300px" width="full" borderRadius="lg" />
    </VStack>
  </Stack>
);

"use client";

import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
import {
  Box,
  HStack,
  VStack,
  Text,
  SegmentGroup,
  Icon,
  Flex,
  Separator,
  Skeleton,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LuCalendarDays, LuFilter } from "react-icons/lu";

export type TimeFilterOption = {
  value: "today" | "week" | "month" | "all";
  label: string;
  shortLabel?: string; // For responsive design
  description?: string; // For accessibility
};

type TimeFilterProps = {
  options?: TimeFilterOption[];
  label?: string;
  showIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "compact" | "card";
  orientation?: "horizontal" | "vertical";
  showDescription?: boolean;
  disabled?: boolean;
};

const defaultOptions: TimeFilterOption[] = [
  {
    value: "today",
    label: "Hari Ini",
    shortLabel: "Hari Ini",
    description: "Transaksi hari ini saja",
  },
  {
    value: "week",
    label: "7 Hari Terakhir",
    shortLabel: "7 Hari",
    description: "Transaksi dalam 7 hari terakhir",
  },
  {
    value: "month",
    label: "Bulan Ini",
    shortLabel: "Bulan Ini",
    description: "Transaksi bulan berjalan",
  },
  {
    value: "all",
    label: "Sepanjang Waktu",
    shortLabel: "Semua",
    description: "Seluruh riwayat transaksi",
  },
];

// Loading fallback component
const TimeFilterSkeleton = ({
  variant = "default",
}: {
  variant?: TimeFilterProps["variant"];
}) => {
  if (variant === "card") {
    return (
      <Box
        p={4}
        bg="surface.subtle"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
      >
        <VStack align="stretch" gap={3}>
          <HStack gap={2} align="center">
            <Skeleton height="32px" width="32px" borderRadius="md" />
            <VStack align="start" gap={1}>
              <Skeleton height="16px" width="80px" borderRadius="sm" />
              <Skeleton height="12px" width="120px" borderRadius="sm" />
            </VStack>
          </HStack>
          <Skeleton height="40px" width="full" borderRadius="lg" />
        </VStack>
      </Box>
    );
  }

  if (variant === "compact") {
    return (
      <HStack gap={2} align="center">
        <Skeleton height="20px" width="20px" borderRadius="sm" />
        <Skeleton height="32px" width="280px" borderRadius="lg" />
      </HStack>
    );
  }

  return (
    <HStack gap={4} align="center">
      <HStack gap={2.5} align="center">
        <Skeleton height="32px" width="32px" borderRadius="lg" />
        <Skeleton height="16px" width="100px" borderRadius="sm" />
      </HStack>
      <Skeleton height="40px" width="320px" borderRadius="lg" />
    </HStack>
  );
};

// Main TimeFilter component that uses useSearchParams
const TimeFilterContent = ({
  options = defaultOptions,
  label = "Filter Periode",
  showIcon = true,
  size = "sm",
  variant = "default",
  orientation = "horizontal",
  showDescription = false,
  disabled = false,
}: TimeFilterProps) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") as TimeFilterOption["value"];
  const currentOption = options.find((option) => option.value === filter);

  const { shallowPush } = useShallowPush({ type: "replace" });

  if (variant === "card") {
    return (
      <Box
        p={4}
        bg="surface.subtle"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
        shadow="sm"
        _hover={{
          shadow: "md",
          borderColor: "brand.fg",
        }}
        transition="all 0.2s"
      >
        <VStack align="stretch" gap={3}>
          <HStack gap={2} align="center">
            <Box p={2} borderRadius="md" bg="brand.muted" color="brand.solid">
              <Icon size="sm">
                <LuFilter />
              </Icon>
            </Box>
            <VStack align="start" gap={0}>
              <Text fontSize="sm" fontWeight="semibold" color="fg.default">
                {label}
              </Text>
              {showDescription && currentOption?.description && (
                <Text fontSize="xs" color="fg.muted" lineHeight="1.3">
                  {currentOption.description}
                </Text>
              )}
            </VStack>
          </HStack>

          <SegmentGroup.Root
            value={filter || "all"}
            onValueChange={(e) =>
              !disabled && shallowPush({ filter: e.value || "all" })
            }
            size={size}
            disabled={disabled}
            width="full"
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={options} />
          </SegmentGroup.Root>
        </VStack>
      </Box>
    );
  }

  if (variant === "compact") {
    return (
      <HStack gap={2} align="center">
        {showIcon && (
          <Icon size="sm" color="brand.solid">
            <LuCalendarDays />
          </Icon>
        )}
        <SegmentGroup.Root
          value={filter || "all"}
          onValueChange={(e) =>
            !disabled && shallowPush({ filter: e.value || "all" })
          }
          size={size}
          disabled={disabled}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={options.map((option) => ({
              ...option,
              label: option.shortLabel || option.label,
            }))}
          />
        </SegmentGroup.Root>
      </HStack>
    );
  }

  const containerProps =
    orientation === "vertical"
      ? { as: VStack, align: "start", gap: 3 }
      : { as: HStack, align: "center", gap: 4 };

  return (
    <Flex {...containerProps}>
      {/* Enhanced Label Section */}
      <HStack gap={2.5} align="center" minW="fit-content">
        {showIcon && (
          <Box
            p={2}
            borderRadius="lg"
            color="brand.solid"
            transition="all 0.2s"
            _hover={{
              bg: "brand.muted",
              transform: "scale(1.05)",
            }}
          >
            <Icon size="sm">
              <LuCalendarDays />
            </Icon>
          </Box>
        )}
        <VStack align="start" gap={0}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="fg.default"
            letterSpacing="tight"
          >
            {label}
          </Text>
          {showDescription && currentOption?.description && (
            <Text fontSize="xs" color="fg.subtle" lineHeight="1.2">
              {currentOption.description}
            </Text>
          )}
        </VStack>
      </HStack>

      {orientation === "vertical" && (
        <Separator size="sm" colorPalette="gray" />
      )}

      <SegmentGroup.Root
        value={filter || "all"}
        onValueChange={(e) =>
          !disabled && shallowPush({ filter: e.value || "all" })
        }
        size={size}
        disabled={disabled}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={options} />
      </SegmentGroup.Root>
    </Flex>
  );
};

// Main export component with Suspense boundary
export const TimeFilter = (props: TimeFilterProps) => {
  return (
    <Suspense fallback={<TimeFilterSkeleton variant={props.variant} />}>
      <TimeFilterContent {...props} />
    </Suspense>
  );
};

"use client";

import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
import { HStack, SegmentGroup, Icon } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { Loader } from "./Loader";

export type TimeFilterOption = {
  value: "today" | "week" | "month" | "all";
  label: string;
  shortLabel?: string;
  description?: string;
};

type TimeFilterProps = {
  options?: TimeFilterOption[];
  showIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
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

const TimeFilterContent = ({
  options = defaultOptions,
  showIcon = true,
  size = "sm",
  disabled = false,
}: TimeFilterProps) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") as TimeFilterOption["value"];

  const { shallowPush } = useShallowPush({ type: "replace" });

  return (
    <HStack gap={2.5} align="center">
      {showIcon && (
        <Icon size="sm" color="brand.fg">
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
};

export const TimeFilter = (props: TimeFilterProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <TimeFilterContent {...props} />
    </Suspense>
  );
};

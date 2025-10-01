import {
  Combobox,
  useFilter,
  useListCollection,
  Spinner,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

type SelectProps = {
  options: Array<{ value: string; label: string }>;
  title?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
  loadingText?: string;
  placeholder?: string;
  emptyText?: string;
};

export const Select = ({
  options,
  title,
  onChange,
  isLoading = false,
  loadingText = "Memuat data...",
  placeholder = "Ketik untuk cari...",
  emptyText = "Tidak ada data ditemukan",
}: SelectProps) => {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter, set } = useListCollection({
    initialItems: options,
    filter: contains,
  });

  useEffect(() => {
    set(options);
  }, [options, set]);

  const LoadingSkeleton = () => (
    <VStack gap={2} p={2}>
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} height="32px" width="full" borderRadius="md" />
      ))}
    </VStack>
  );

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => !isLoading && filter(e.inputValue)}
      openOnClick
      onValueChange={(details) =>
        !isLoading && onChange?.(details.value?.[0] || "")
      }
      disabled={isLoading}
      placeholder="Pilih opsi..."
    >
      {title && <Combobox.Label>{title}</Combobox.Label>}
      <Combobox.Control>
        <Combobox.Input
          placeholder={isLoading ? loadingText : placeholder}
          disabled={isLoading}
        />
        <Combobox.IndicatorGroup>
          {isLoading ? (
            <Spinner size="sm" color="brand.solid" />
          ) : (
            <>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </>
          )}
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Combobox.Positioner>
        <Combobox.Content>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <Combobox.Empty>{emptyText}</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </>
          )}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

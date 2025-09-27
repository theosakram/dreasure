import { Combobox, useFilter, useListCollection } from "@chakra-ui/react";

type SelectProps = {
  options: Array<{ value: string; label: string }>;
  title?: string;
  onChange?: (value: string) => void;
};

export const Select = ({ options, title, onChange }: SelectProps) => {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: options,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      openOnClick
      onValueChange={(details) => onChange?.(details.value?.[0] || "")}
    >
      {title && <Combobox.Label>{title}</Combobox.Label>}
      <Combobox.Control>
        <Combobox.Input placeholder="Ketik untuk cari..." />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No items found</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item item={item} key={item.value}>
              {item.label}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

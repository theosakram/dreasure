import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table as ChakraTable } from "@chakra-ui/react";

type TableProps<T extends Record<string, unknown>> = {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  variant?: "line" | "outline";
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  interactive?: boolean;
  showColumnBorder?: boolean;
  caption?: string;
};

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  variant = "line",
  size = "md",
  striped = false,
  interactive = false,
  showColumnBorder = false,
  caption,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ChakraTable.Root
      variant={variant}
      size={size}
      striped={striped}
      interactive={interactive}
      showColumnBorder={showColumnBorder}
    >
      {caption && <ChakraTable.Caption>{caption}</ChakraTable.Caption>}

      <ChakraTable.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <ChakraTable.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <ChakraTable.ColumnHeader key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </ChakraTable.ColumnHeader>
            ))}
          </ChakraTable.Row>
        ))}
      </ChakraTable.Header>

      <ChakraTable.Body>
        {table.getRowModel().rows.map((row) => (
          <ChakraTable.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <ChakraTable.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </ChakraTable.Cell>
            ))}
          </ChakraTable.Row>
        ))}
      </ChakraTable.Body>

      {table
        .getFooterGroups()
        .some((group) =>
          group.headers.some((header) => header.column.columnDef.footer),
        ) && (
        <ChakraTable.Footer>
          {table.getFooterGroups().map((footerGroup) => (
            <ChakraTable.Row key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <ChakraTable.ColumnHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </ChakraTable.ColumnHeader>
              ))}
            </ChakraTable.Row>
          ))}
        </ChakraTable.Footer>
      )}
    </ChakraTable.Root>
  );
};

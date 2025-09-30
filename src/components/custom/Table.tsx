import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table as ChakraTable, Box } from "@chakra-ui/react";

export type TableProps<T extends Record<string, unknown>> = {
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
  interactive = true,
  showColumnBorder = false,
  caption,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box overflow="hidden">
      <ChakraTable.Root
        variant={variant}
        size={size}
        striped={striped}
        interactive={interactive}
        showColumnBorder={showColumnBorder}
        bg="bg.panel"
        borderRadius="none"
      >
        {caption && (
          <ChakraTable.Caption
            textStyle="caption"
            color="fg.muted"
            fontWeight="medium"
          >
            {caption}
          </ChakraTable.Caption>
        )}

        <ChakraTable.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <ChakraTable.Row key={headerGroup.id} bg="bg.subtle">
              {headerGroup.headers.map((header) => (
                <ChakraTable.ColumnHeader
                  key={header.id}
                  fontSize="xs"
                  fontWeight="semibold"
                  color="fg.muted"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  py={3}
                  px={4}
                  borderColor="border.subtle"
                  bg="bg.subtle"
                >
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
            <ChakraTable.Row
              key={row.id}
              transition="all 0.15s"
              _odd={striped ? { bg: "bg.default" } : {}}
              _even={striped ? { bg: "bg.panel" } : { bg: "bg.panel" }}
              _hover={interactive ? { bg: "bg.subtle" } : {}}
              borderColor="border.subtle"
            >
              {row.getVisibleCells().map((cell) => (
                <ChakraTable.Cell
                  key={cell.id}
                  py={3}
                  px={4}
                  fontSize="sm"
                  color="fg.default"
                  borderColor="border.subtle"
                >
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
              <ChakraTable.Row
                key={footerGroup.id}
                bg="bg.subtle"
                borderTop="1px solid"
                borderColor="border.emphasized"
              >
                {footerGroup.headers.map((header) => (
                  <ChakraTable.ColumnHeader
                    key={header.id}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="fg.default"
                    py={3}
                    px={4}
                  >
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
    </Box>
  );
};

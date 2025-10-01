import {
  Box,
  Pagination as ChakraPagination,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type PaginationProps = {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ total }: PaginationProps) => {
  return (
    <ChakraPagination.Root count={total} pageSize={10} defaultPage={1}>
      <HStack gap={2}>
        <ChakraPagination.PrevTrigger asChild>
          <IconButton
            variant="ghost"
            size="sm"
            borderRadius="lg"
            _hover={{
              bg: "bg.muted",
              borderColor: "border.emphasized",
            }}
          >
            <HiChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <Box
          px={3}
          py={2}
          bg="bg.subtle"
          borderRadius="lg"
          border="1px solid"
          borderColor="border.muted"
        >
          <ChakraPagination.PageText
            textStyle="caption"
            fontWeight="medium"
            color="fg.default"
          />
        </Box>

        <ChakraPagination.NextTrigger asChild>
          <IconButton
            variant="ghost"
            size="sm"
            borderRadius="lg"
            _hover={{
              bg: "bg.muted",
              borderColor: "border.emphasized",
            }}
          >
            <HiChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </HStack>
    </ChakraPagination.Root>
  );
};

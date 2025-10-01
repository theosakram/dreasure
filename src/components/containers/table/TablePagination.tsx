import { Pagination } from "@/components/custom/Pagination";
import { Flex, Text } from "@chakra-ui/react";

type TablePaginationProps = {
  total: number;
  totalData: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const TablePagination = (props: TablePaginationProps) => {
  return (
    <Flex justify="space-between" align="center" pt={2}>
      <Text fontSize="xs" color="fg.muted">
        Menampilkan {props.total} dari {props.totalData} data
      </Text>

      <Pagination {...props} />
    </Flex>
  );
};

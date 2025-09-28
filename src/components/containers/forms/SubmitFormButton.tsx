import { Flex, HStack, Button, Icon, Text } from "@chakra-ui/react";
import { useFormState } from "react-final-form";
import { LuPlus } from "react-icons/lu";

type SubmitFormButtonProps = {
  isLoading?: boolean;
  onCancel: () => void;
};

export const SubmitFormButton = (props: SubmitFormButtonProps) => {
  const { submitting } = useFormState();

  return (
    <Flex justify="space-between" align="center" pt={2}>
      <Text fontSize="xs" color="fg.muted">
        Transaksi akan tercatat dalam sistem
      </Text>
      <HStack gap={3}>
        <Button
          variant="ghost"
          size="md"
          onClick={props.onCancel}
          disabled={submitting || props.isLoading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          colorPalette="brand"
          size="md"
          minW="32"
          loading={submitting || props.isLoading}
          loadingText="Menyimpan..."
        >
          <Icon size="sm">
            <LuPlus />
          </Icon>
          Simpan Transaksi
        </Button>
      </HStack>
    </Flex>
  );
};

import { Modal } from "../custom/Modal";
import { Form } from "../custom/Form";
import { addTransactionSchema } from "@/utils/forms/schemas/addTransactionSchema";
import { FormField } from "../custom/FormFIeld";
import { Select } from "../custom/Select";
import { useGetProfiles } from "@/features/profiles/profileHooks";
import {
  Button,
  HStack,
  Input,
  Stack,
  Textarea,
  Text,
  Box,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import {
  LuUsers,
  LuDollarSign,
  LuFileText,
  LuArrowUpDown,
} from "react-icons/lu";
import {
  useAddTransaction,
  useGetTransactions,
} from "@/features/transactions/transactionHooks";
import { useGetKasWallet } from "@/features/wallets/walletHooks";

type AddTransactionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AddTransactionModal = ({
  open,
  setOpen,
}: AddTransactionModalProps) => {
  const { data } = useGetProfiles();
  const { refetch } = useGetTransactions();
  const { data: kas, refetch: refetchKas } = useGetKasWallet();
  const { mutateAsync: addTransaction, isPending } = useAddTransaction({
    onSuccess: () => {
      refetch();
      refetchKas();
      setOpen(false);
    },
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Tambah Transaksi"
      body={
        <Box p={2}>
          <Form
            initialValues={{ wallet_id: kas?.id, amount: 0 }}
            onSubmit={(e) => addTransaction(e)}
            schema={addTransactionSchema}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Stack gap={6}>
                  {/* Member Selection */}
                  <Box>
                    <HStack gap={2} mb={2}>
                      <Icon color="brand.solid" size="sm">
                        <LuUsers />
                      </Icon>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="fg.default"
                      >
                        Pilih Anggota
                      </Text>
                      <Text color="red.500">*</Text>
                    </HStack>
                    <FormField name="user_id" label="" isRequired>
                      {({ input }) => (
                        <Select
                          options={
                            data?.map((user) => ({
                              value: user.id,
                              label: user.fullname,
                            })) || []
                          }
                          onChange={(option) => input.onChange(option)}
                        />
                      )}
                    </FormField>
                  </Box>

                  {/* Amount Input */}
                  <Box>
                    <HStack gap={2} mb={2}>
                      <Icon color="brand.solid" size="sm">
                        <LuDollarSign />
                      </Icon>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="fg.default"
                      >
                        Jumlah
                      </Text>
                      <Text color="red.500">*</Text>
                    </HStack>
                    <FormField<string> name="amount" label="" isRequired>
                      {({ input }) => (
                        <InputGroup>
                          <Input
                            type="number"
                            placeholder="0"
                            size="md"
                            {...input}
                          />
                        </InputGroup>
                      )}
                    </FormField>
                  </Box>

                  {/* Transaction Type */}
                  <Box>
                    <HStack gap={2} mb={2}>
                      <Icon color="brand.solid" size="sm">
                        <LuArrowUpDown />
                      </Icon>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="fg.default"
                      >
                        Tipe Transaksi
                      </Text>
                      <Text color="red.500">*</Text>
                    </HStack>
                    <FormField name="type" label="" isRequired>
                      {({ input }) => (
                        <Select
                          options={[
                            { value: "deposit", label: "Setor" },
                            { value: "withdraw", label: "Tarik" },
                          ]}
                          onChange={(option) => input.onChange(option)}
                        />
                      )}
                    </FormField>
                  </Box>

                  {/* Description */}
                  <Box>
                    <HStack gap={2} mb={2}>
                      <Icon color="brand.solid" size="sm">
                        <LuFileText />
                      </Icon>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="fg.default"
                      >
                        Catatan
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        (Opsional)
                      </Text>
                    </HStack>
                    <FormField<string> name="description" label="">
                      {({ input }) => (
                        <Textarea
                          placeholder="Tambahkan catatan transaksi..."
                          resize="vertical"
                          minH="20"
                          size="md"
                          {...input}
                        />
                      )}
                    </FormField>
                  </Box>

                  {/* Action Buttons */}
                  <HStack
                    justify="end"
                    gap={3}
                    pt={4}
                    borderTopWidth="1px"
                    borderColor="border.muted"
                  >
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setOpen(false)}
                      disabled={submitting || isPending}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      colorPalette="brand"
                      size="xs"
                      minW="20"
                      loading={submitting || isPending}
                      loadingText="Menyimpan..."
                    >
                      Simpan Transaksi
                    </Button>
                  </HStack>
                </Stack>
              </form>
            )}
          </Form>
        </Box>
      }
    />
  );
};

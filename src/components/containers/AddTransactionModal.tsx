import { Modal } from "../custom/Modal";
import { Form } from "../custom/Form";
import { addTransactionSchema } from "@/utils/forms/schemas/addTransactionSchema";
import { FormField } from "../custom/FormFIeld";
import { Select } from "../custom/Select";
import { useGetProfiles } from "@/features/profiles/profileHooks";
import {
  Button,
  HStack,
  VStack,
  Input,
  Textarea,
  Text,
  Box,
  Icon,
  Badge,
  Separator,
  Flex,
} from "@chakra-ui/react";
import {
  LuUsers,
  LuDollarSign,
  LuFileText,
  LuArrowUpDown,
  LuPlus,
  LuArrowUp,
  LuArrowDown,
} from "react-icons/lu";
import {
  useAddTransaction,
  useGetWalletTransactions,
} from "@/features/transactions/transactionHooks";
import { useGetWalletByName } from "@/features/wallets/walletHooks";
import { WalletName } from "@/features/wallets/walletTypes";

type AddTransactionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: WalletName;
};

export const AddTransactionModal = ({
  open,
  setOpen,
  type,
}: AddTransactionModalProps) => {
  const { data } = useGetProfiles();
  const { refetch } = useGetWalletTransactions(type);
  const { data: wallet, refetch: refetchWallet } = useGetWalletByName(type);
  const { mutateAsync: addTransaction, isPending } = useAddTransaction({
    onSuccess: () => {
      refetch();
      refetchWallet();
      setOpen(false);
    },
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Tambah Transaksi Baru"
      body={
        <Box p="1rem">
          <Form
            initialValues={{ wallet_id: wallet?.id, amount: 0 }}
            onSubmit={(e) => addTransaction(e)}
            schema={addTransactionSchema}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <VStack gap={5} align="stretch">
                  {/* Member Selection */}
                  <Box
                    p={4}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="border.subtle"
                    bg="surface.subtle"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "brand.fg",
                      shadow: "sm",
                    }}
                  >
                    <HStack gap={3} mb={3}>
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg="brand.subtle"
                        color="brand.solid"
                      >
                        <Icon size="sm">
                          <LuUsers />
                        </Icon>
                      </Box>
                      <VStack align="start" gap={0}>
                        <HStack gap={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="fg.default"
                          >
                            Pilih Anggota
                          </Text>
                          <Badge size="xs" colorPalette="red" variant="solid">
                            Wajib
                          </Badge>
                        </HStack>
                        <Text fontSize="xs" color="fg.muted">
                          Pilih anggota yang akan melakukan transaksi
                        </Text>
                      </VStack>
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

                  {/* Transaction Type */}
                  <Box
                    p={4}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="border.subtle"
                    bg="surface.subtle"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "brand.fg",
                      shadow: "sm",
                    }}
                  >
                    <HStack gap={3} mb={3}>
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg="brand.subtle"
                        color="brand.solid"
                      >
                        <Icon size="sm">
                          <LuArrowUpDown />
                        </Icon>
                      </Box>
                      <VStack align="start" gap={0}>
                        <HStack gap={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="fg.default"
                          >
                            Jenis Transaksi
                          </Text>
                          <Badge size="xs" colorPalette="red" variant="solid">
                            Wajib
                          </Badge>
                        </HStack>
                        <Text fontSize="xs" color="fg.muted">
                          Pilih apakah ini transaksi setor atau tarik dana
                        </Text>
                      </VStack>
                    </HStack>
                    <FormField name="type" label="" isRequired>
                      {({ input }) => (
                        <HStack gap={3} w="full">
                          <Button
                            variant={
                              input.value === "deposit" ? "solid" : "outline"
                            }
                            colorPalette={
                              input.value === "deposit" ? "success" : "gray"
                            }
                            size="md"
                            flex="1"
                            onClick={() => input.onChange("deposit")}
                          >
                            <Icon size="sm">
                              <LuArrowUp />
                            </Icon>
                            Setor Dana
                          </Button>
                          <Button
                            variant={
                              input.value === "withdraw" ? "solid" : "outline"
                            }
                            colorPalette={
                              input.value === "withdraw" ? "orange" : "gray"
                            }
                            size="md"
                            flex="1"
                            onClick={() => input.onChange("withdraw")}
                          >
                            <Icon size="sm">
                              <LuArrowDown />
                            </Icon>
                            Tarik Dana
                          </Button>
                        </HStack>
                      )}
                    </FormField>
                  </Box>

                  {/* Amount Input */}
                  <Box
                    p={4}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="border.subtle"
                    bg="surface.subtle"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "brand.fg",
                      shadow: "sm",
                    }}
                  >
                    <HStack gap={3} mb={3}>
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg="brand.subtle"
                        color="brand.solid"
                      >
                        <Icon size="sm">
                          <LuDollarSign />
                        </Icon>
                      </Box>
                      <VStack align="start" gap={0}>
                        <HStack gap={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="fg.default"
                          >
                            Jumlah Transaksi
                          </Text>
                          <Badge size="xs" colorPalette="red" variant="solid">
                            Wajib
                          </Badge>
                        </HStack>
                        <Text fontSize="xs" color="fg.muted">
                          Masukkan nominal dalam Rupiah
                        </Text>
                      </VStack>
                    </HStack>
                    <FormField<string> name="amount" label="" isRequired>
                      {({ input }) => (
                        <Box position="relative" w="100%">
                          <Input
                            type="number"
                            placeholder="0"
                            size="lg"
                            fontSize="lg"
                            fontWeight="semibold"
                            textAlign="right"
                            ps="12"
                            {...input}
                          />
                          <Box
                            position="absolute"
                            left="4"
                            top="50%"
                            transform="translateY(-50%)"
                            fontSize="lg"
                            fontWeight="semibold"
                            color="fg.muted"
                            zIndex="1"
                            pointerEvents="none"
                          >
                            Rp
                          </Box>
                        </Box>
                      )}
                    </FormField>
                  </Box>

                  {/* Description */}
                  <Box
                    p={4}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="border.subtle"
                    bg="surface.subtle"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "brand.fg",
                      shadow: "sm",
                    }}
                  >
                    <HStack gap={3} mb={3}>
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg="sage.100"
                        color="sage.700"
                        _dark={{
                          bg: "sage.900",
                          color: "sage.300",
                        }}
                      >
                        <Icon size="sm">
                          <LuFileText />
                        </Icon>
                      </Box>
                      <VStack align="start" gap={0}>
                        <HStack gap={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="fg.default"
                          >
                            Catatan Transaksi
                          </Text>
                          <Badge
                            size="xs"
                            variant="outline"
                            colorPalette="gray"
                          >
                            Opsional
                          </Badge>
                        </HStack>
                        <Text fontSize="xs" color="fg.muted">
                          Tambahkan keterangan untuk transaksi ini
                        </Text>
                      </VStack>
                    </HStack>
                    <FormField<string> name="description" label="">
                      {({ input }) => (
                        <Textarea
                          placeholder="Contoh: Bayar arisan bulan Januari, Penarikan untuk keperluan darurat..."
                          resize="vertical"
                          minH="24"
                          size="md"
                          {...input}
                        />
                      )}
                    </FormField>
                  </Box>

                  <Separator my={2} />

                  {/* Enhanced Action Buttons */}
                  <Flex justify="space-between" align="center" pt={2}>
                    <Text fontSize="xs" color="fg.muted">
                      Transaksi akan tercatat dalam sistem
                    </Text>
                    <HStack gap={3}>
                      <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setOpen(false)}
                        disabled={submitting || isPending}
                      >
                        Batal
                      </Button>
                      <Button
                        type="submit"
                        colorPalette="brand"
                        size="md"
                        minW="32"
                        loading={submitting || isPending}
                        loadingText="Menyimpan..."
                      >
                        <Icon size="sm">
                          <LuPlus />
                        </Icon>
                        Simpan Transaksi
                      </Button>
                    </HStack>
                  </Flex>
                </VStack>
              </form>
            )}
          </Form>
        </Box>
      }
    />
  );
};

import { Modal } from "../../custom/Modal";
import { Form } from "../../custom/Form";
import { addTransactionSchema } from "@/utils/forms/schemas/transactionSchema";
import { VStack, Box, Separator } from "@chakra-ui/react";
import {
  useAddTransaction,
  useGetWalletTransactions,
} from "@/features/transactions/transactionHooks";
import { useGetWalletByName } from "@/features/wallets/walletHooks";
import { WalletName } from "@/features/wallets/walletTypes";
import { UserSelectForm } from "../forms/UserSelectForm";
import { AmountForm } from "../forms/AmountForm";
import { DescriptionForm } from "../forms/DescriptionForm";
import { TransactionTypeForm } from "../forms/TransactionTypeForm";
import { SubmitFormButton } from "../forms/SubmitFormButton";

type AddTransactionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: WalletName;
};

export const AddTransactionModal = ({
  open,
  setOpen,
  type: transactionType,
}: AddTransactionModalProps) => {
  const { refetch } = useGetWalletTransactions(transactionType);
  const { data, refetch: refetchWallet } = useGetWalletByName(transactionType);
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
            initialValues={{
              wallet_id: data?.id,
              amount: 0,
              type: transactionType === "bergulir" ? "deposit" : undefined,
            }}
            onSubmit={(e) => addTransaction(e)}
            schema={addTransactionSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VStack gap={5} align="stretch">
                  <UserSelectForm />
                  {transactionType === "kas" && <TransactionTypeForm />}
                  <AmountForm />
                  <DescriptionForm />

                  <Separator my={2} />

                  <SubmitFormButton
                    isLoading={isPending}
                    onCancel={() => setOpen(false)}
                  />
                </VStack>
              </form>
            )}
          </Form>
        </Box>
      }
    />
  );
};

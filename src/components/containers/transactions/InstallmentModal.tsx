import { Form } from "@/components/custom/Form";
import { Modal, ModalProps } from "@/components/custom/Modal";
import {
  installmentPaymentSchema,
  installmentSchema,
} from "@/utils/forms/schemas/transactionSchema";
import { matchPI } from "@/utils/helpers/match";
import { UserSelectForm } from "../forms/UserSelectForm";
import { Separator, Stack } from "@chakra-ui/react";
import { AmountForm } from "../forms/AmountForm";
import { StartDueDateForm } from "../forms/StartDueDateForm";
import { DescriptionForm } from "../forms/DescriptionForm";
import { SubmitFormButton } from "../forms/SubmitFormButton";
import {
  useAddInstallment,
  useAddInstallmentPayment,
} from "@/features/installments/installmentHooks";
import { useGetInstallmentWalletTransactions } from "@/features/transactions/transactionHooks";
import { InstallmentForm } from "../forms/InstallmentForm";
import { useGetInstallmentWallet } from "@/features/wallets/walletHooks";
import dayjs from "dayjs";

type InstallmentType = "take" | "pay";
type ModalShowProps = Pick<ModalProps, "open" | "setOpen">;

type InstallmentModalProps = {
  type: InstallmentType;
  modalProps: ModalShowProps;
};

const TakeInstallmentModal = (props: ModalShowProps) => {
  const { refetch } = useGetInstallmentWalletTransactions();
  const { mutateAsync, isPending } = useAddInstallment({
    onSuccess: () => {
      props.setOpen(false);
      refetch();
    },
  });

  return (
    <Modal
      {...props}
      title="Ambil Hutang"
      body={
        <Form onSubmit={(e) => mutateAsync(e)} schema={installmentSchema}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Stack w="100%" gap="1rem">
                <UserSelectForm />
                <AmountForm name="total_to_be_paid" />
                <StartDueDateForm />
                <DescriptionForm />

                <Separator my={2} />

                <SubmitFormButton
                  isLoading={isPending}
                  onCancel={() => props.setOpen(false)}
                />
              </Stack>
            </form>
          )}
        </Form>
      }
    />
  );
};

const PayInstallmentModal = (props: ModalShowProps) => {
  const { data, refetch } = useGetInstallmentWallet();
  const { mutateAsync, isPending } = useAddInstallmentPayment({
    onSuccess: () => {
      props.setOpen(false);
      refetch();
    },
  });

  return (
    <Modal
      {...props}
      title="Bayar Hutang"
      body={
        <Form
          initialValues={{ wallet_id: data?.id }}
          onSubmit={(e) =>
            mutateAsync({ ...e, paid_date: dayjs().toISOString() })
          }
          schema={installmentPaymentSchema}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Stack w="100%" gap="1rem">
                <UserSelectForm />
                <InstallmentForm />
                <AmountForm />
                <DescriptionForm />

                <Separator my={2} />

                <SubmitFormButton
                  isLoading={isPending}
                  onCancel={() => props.setOpen(false)}
                />
              </Stack>
            </form>
          )}
        </Form>
      }
    />
  );
};

export const InstallmentModal = (props: InstallmentModalProps) => {
  return matchPI({ _tag: props.type })({
    take: () => <TakeInstallmentModal {...props.modalProps} />,
    _: () => <PayInstallmentModal {...props.modalProps} />,
  });
};

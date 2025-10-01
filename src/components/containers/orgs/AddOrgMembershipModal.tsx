import { Modal } from "@/components/custom/Modal";
import { Box, VStack, Separator } from "@chakra-ui/react";
import { SubmitFormButton } from "../forms/SubmitFormButton";
import { Form } from "@/components/custom/Form";
import {
  useCreateOrgMembershipFromNewUser,
  useGetOrgMembersByOrgId,
} from "@/features/orgs/orgHooks";
import { orgMembershipSchema } from "@/utils/forms/schemas/orgMembershipSchema";
import { FullnameForm } from "../forms/FullnameForm";
import { OrgRoleForm } from "../forms/OrgRoleForm";
import { EmailForm } from "../forms/EmailForm";
import { PhoneNumberForm } from "../forms/PhoneNumberForm";

type AddOrgMembershipModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AddOrgMembershipModal = (props: AddOrgMembershipModalProps) => {
  const { refetch } = useGetOrgMembersByOrgId();
  const { mutateAsync, isPending } = useCreateOrgMembershipFromNewUser({
    onSuccess: () => {
      refetch();
      props.setOpen(false);
    },
  });

  return (
    <Modal
      open={props.open}
      setOpen={props.setOpen}
      title="Tambah Anggota Organisasi"
      body={
        <Box p="1rem">
          <Form
            onSubmit={(e) => mutateAsync({ ...e, phone: `+62${e.phone}` })}
            schema={orgMembershipSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VStack gap={5} align="stretch">
                  <FullnameForm />
                  <OrgRoleForm />
                  <EmailForm />
                  <PhoneNumberForm />

                  <Separator my={2} />

                  <SubmitFormButton
                    isLoading={isPending}
                    onCancel={() => props.setOpen(false)}
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

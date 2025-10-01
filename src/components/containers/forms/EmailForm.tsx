import { FormField } from "@/components/custom/FormFIeld";
import { Input } from "@chakra-ui/react";
import { FormCard, FormCardHeader } from "./FormCard";
import { RiMailLine } from "react-icons/ri";

export const EmailForm = () => {
  return (
    <FormCard>
      <FormCardHeader icon={<RiMailLine />} title="Email" />
      <FormField<string> name="email" label="">
        {({ input }) => (
          <Input
            placeholder="Masukkan alamat email Anda"
            size="md"
            {...input}
          />
        )}
      </FormField>
    </FormCard>
  );
};

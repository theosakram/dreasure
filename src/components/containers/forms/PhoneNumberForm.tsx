import { FormField } from "@/components/custom/FormFIeld";
import { Input, InputGroup } from "@chakra-ui/react";
import { LuPhone } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

export const PhoneNumberForm = () => {
  return (
    <FormCard>
      <FormCardHeader icon={<LuPhone />} title="Nomor Handphone" />
      <FormField<string> name="phone" label="">
        {({ input }) => (
          <InputGroup startAddon="+62">
            <Input placeholder="813xxxxxxx" size="md" {...input} />
          </InputGroup>
        )}
      </FormField>
    </FormCard>
  );
};

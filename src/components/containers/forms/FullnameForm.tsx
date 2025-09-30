import { FormField } from "@/components/custom/FormFIeld";
import { Input } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

type FullnameFormProps = {
  name?: string;
};

export const FullnameForm = ({ name = "fullname" }: FullnameFormProps) => {
  return (
    <FormCard>
      <FormCardHeader
        icon={<LuUser />}
        title="Nama Lengkap"
        description="Masukkan nama lengkap "
        isRequired
      />
      <FormField<string> name={name} label="" isRequired>
        {({ input }) => <Input placeholder="" {...input} />}
      </FormField>
    </FormCard>
  );
};

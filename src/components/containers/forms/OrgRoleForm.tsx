import { FormField } from "@/components/custom/FormFIeld";
import { Select } from "@/components/custom/Select";
import { LuUsers } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

const roleOptions = [
  { value: "member", label: "Anggota" },
  { value: "admin", label: "Administrasi" },
  { value: "owner", label: "Pemilik" },
];

export const OrgRoleForm = () => {
  return (
    <FormCard>
      <FormCardHeader icon={<LuUsers />} title="Peran Organisasi" required />
      <FormField name="role" label="" isRequired>
        {({ input }) => (
          <Select
            options={roleOptions}
            onChange={(option) => input.onChange(option)}
          />
        )}
      </FormField>
    </FormCard>
  );
};

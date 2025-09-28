import { FormField } from "@/components/custom/FormFIeld";
import { Select } from "@/components/custom/Select";
import { useGetProfiles } from "@/features/profiles/profileHooks";
import { useMemo } from "react";
import { LuUsers } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

export const UserSelectForm = () => {
  const { data, isLoading } = useGetProfiles();
  const mappedData = useMemo(() => {
    if (data) {
      return data.map((user) => ({
        value: user.id,
        label: user.fullname,
      }));
    }

    return [];
  }, [data]);

  return (
    <FormCard>
      <FormCardHeader
        icon={<LuUsers />}
        title="Pilih Anggota"
        description="Pilih anggota yang akan melakukan transaksi"
        isRequired
      />
      <FormField name="user_id" label="" isRequired>
        {({ input }) => (
          <Select
            options={mappedData}
            onChange={(option) => input.onChange(option)}
            isLoading={isLoading}
          />
        )}
      </FormField>
    </FormCard>
  );
};

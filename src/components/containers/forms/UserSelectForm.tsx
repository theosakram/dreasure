import { FormField } from "@/components/custom/FormFIeld";
import { Select } from "@/components/custom/Select";
import { useGetProfiles } from "@/features/profiles/profileHooks";
import { useMemo } from "react";
import { LuUsers } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

type UserSectFormProps = {
  title?: string;
};

export const UserSelectForm = ({
  title = "Pilih Anggota",
}: UserSectFormProps) => {
  const { data, isLoading } = useGetProfiles();
  const { profiles } = data || {};
  const mappedData = useMemo(() => {
    if (profiles) {
      return profiles.map((user) => ({
        value: user.id,
        label: user.fullname,
      }));
    }

    return [];
  }, [profiles]);

  return (
    <FormCard>
      <FormCardHeader icon={<LuUsers />} title={title} required />
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

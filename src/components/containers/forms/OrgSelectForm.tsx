import { FormField } from "@/components/custom/FormFIeld";
import { Select } from "@/components/custom/Select";
import { useMemo } from "react";
import { LuUsers } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";
import { useGetOrgsByOwnerId } from "@/features/orgs/orgHooks";

export const OrgSelectForm = () => {
  const { data, isLoading } = useGetOrgsByOwnerId();
  const mappedData = useMemo(() => {
    if (data) {
      return data.data.map((org) => ({
        value: org.id,
        label: org.name,
      }));
    }

    return [];
  }, [data]);

  return (
    <FormCard>
      <FormCardHeader icon={<LuUsers />} title="Pilih Organisasi" required />
      <FormField name="org_id" label="" isRequired>
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

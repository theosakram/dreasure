import { FormField } from "@/components/custom/FormFIeld";
import { Select } from "@/components/custom/Select";
import { useMemo } from "react";
import { FormCard, FormCardHeader } from "./FormCard";
import { useFormState } from "react-final-form";
import { useGetInstallmentsByUserId } from "@/features/installments/installmentHooks";
import { FaCreditCard } from "react-icons/fa";

export const InstallmentForm = () => {
  const { values } = useFormState();
  const { data, isLoading } = useGetInstallmentsByUserId(values?.user_id);
  const mappedData = useMemo(() => {
    if (data) {
      return data.map((installment) => ({
        value: installment.id,
        label: installment.description,
      }));
    }

    return [];
  }, [data]);

  if (!values?.user_id) {
    return null;
  }

  return (
    <FormCard>
      <FormCardHeader icon={<FaCreditCard />} title="Pilih Cicilan" required />
      <FormField name="installment_id" label="" isRequired>
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

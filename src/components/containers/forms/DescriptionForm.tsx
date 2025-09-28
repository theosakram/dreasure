import { FormField } from "@/components/custom/FormFIeld";
import { Textarea } from "@chakra-ui/react";
import { LuFileText } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

export const DescriptionForm = () => {
  return (
    <FormCard>
      <FormCardHeader
        icon={<LuFileText />}
        title="Catatan Transaksi"
        description="Tambahkan keterangan untuk transaksi ini"
        isRequired={false}
        badgeText="Opsional"
        badgeColorPalette="gray"
        badgeVariant="outline"
        iconBg="sage.100"
        iconColor="sage.700"
      />
      <FormField<string> name="description" label="">
        {({ input }) => (
          <Textarea
            placeholder="Contoh: Bayar arisan bulan Januari, Penarikan untuk keperluan darurat..."
            resize="vertical"
            minH="24"
            size="md"
            {...input}
          />
        )}
      </FormField>
    </FormCard>
  );
};

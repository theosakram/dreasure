import { FormField } from "@/components/custom/FormFIeld";
import { Input, InputGroup } from "@chakra-ui/react";
import { LuDollarSign } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

type AmountFormProps = {
  name?: string;
};

export const AmountForm = ({ name = "amount" }: AmountFormProps) => {
  return (
    <FormCard>
      <FormCardHeader
        icon={<LuDollarSign />}
        title="Jumlah Transaksi"
        description="Masukkan nominal dalam Rupiah"
        isRequired
      />
      <FormField<string> name={name} label="" isRequired>
        {({ input }) => (
          <InputGroup
            startElement="Rp"
            startElementProps={{ color: "fg.muted", fontWeight: "semibold" }}
          >
            <Input
              type="number"
              placeholder="0"
              size="lg"
              fontSize="lg"
              fontWeight="semibold"
              textAlign="right"
              {...input}
            />
          </InputGroup>
        )}
      </FormField>
    </FormCard>
  );
};

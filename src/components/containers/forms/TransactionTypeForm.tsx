import { FormField } from "@/components/custom/FormFIeld";
import { HStack, Icon, Button } from "@chakra-ui/react";
import { LuArrowUpDown, LuArrowUp, LuArrowDown } from "react-icons/lu";
import { FormCard, FormCardHeader } from "./FormCard";

export const TransactionTypeForm = () => {
  return (
    <FormCard>
      <FormCardHeader
        icon={<LuArrowUpDown />}
        title="Jenis Transaksi"
        required
      />
      <FormField name="type" label="" isRequired>
        {({ input }) => (
          <HStack gap={3} w="full">
            <Button
              variant={input.value === "deposit" ? "solid" : "outline"}
              colorPalette={input.value === "deposit" ? "success" : "gray"}
              size="md"
              flex="1"
              onClick={() => input.onChange("deposit")}
            >
              <Icon size="sm">
                <LuArrowUp />
              </Icon>
              Setor Dana
            </Button>
            <Button
              variant={input.value === "withdraw" ? "solid" : "outline"}
              colorPalette={input.value === "withdraw" ? "orange" : "gray"}
              size="md"
              flex="1"
              onClick={() => input.onChange("withdraw")}
            >
              <Icon size="sm">
                <LuArrowDown />
              </Icon>
              Tarik Dana
            </Button>
          </HStack>
        )}
      </FormField>
    </FormCard>
  );
};

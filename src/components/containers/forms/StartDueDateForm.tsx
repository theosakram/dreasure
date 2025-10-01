import { FormField } from "@/components/custom/FormFIeld";
import { Box, VStack, Text, Input } from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";
import { useForm, useFormState } from "react-final-form";
import { useEffect } from "react";
import { FormCard, FormCardHeader } from "./FormCard";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const StartDueDateForm = () => {
  const form = useForm();
  const { values } = useFormState();
  const startDate = values?.start_date as string;

  useEffect(() => {
    if (startDate) {
      const dueDateString = dayjs(startDate)
        .add(1, "year")
        .format("YYYY-MM-DD");
      form.change("due_date", dueDateString);
    } else {
      form.change("due_date", "");
    }
  }, [startDate, form]);

  const dueDateDisplay = startDate
    ? dayjs(startDate).add(1, "year").locale("id").format("D MMMM YYYY")
    : "";

  return (
    <FormCard>
      <FormCardHeader
        icon={<LuCalendar />}
        title="Tanggal Mulai Cicilan"
        description="Jatuh tempo otomatis 1 tahun kemudian"
        required
      />

      <VStack align="stretch" gap={4} w="100%">
        <FormField name="start_date" label="" isRequired>
          {({ input }) => (
            <VStack align="start" gap={2} w="100%">
              <Text fontSize="xs" fontWeight="medium" color="fg.muted">
                Tanggal Mulai
              </Text>
              <Input
                {...input}
                value={input.value as string}
                type="date"
                size="md"
                bg="bg.panel"
                border="2px solid"
                borderColor="border.subtle"
                _hover={{
                  borderColor: "brand.300",
                  bg: "bg.canvas",
                }}
                _focus={{
                  borderColor: "brand.500",
                  shadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                  bg: "bg.canvas",
                }}
                fontSize="sm"
                placeholder="Pilih tanggal mulai"
              />
            </VStack>
          )}
        </FormField>

        {dueDateDisplay && (
          <VStack align="start" gap={2}>
            <Text fontSize="xs" fontWeight="medium" color="success.600">
              Tanggal Jatuh Tempo (Otomatis)
            </Text>
            <Box
              p={3}
              bg="success.50"
              border="2px solid"
              borderColor="success.200"
              borderRadius="md"
              w="full"
            >
              <Text fontSize="sm" fontWeight="medium" color="success.700">
                {dueDateDisplay}
              </Text>
            </Box>
          </VStack>
        )}
      </VStack>
    </FormCard>
  );
};

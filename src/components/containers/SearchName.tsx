import { Box, InputGroup, Icon, Input, Button } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { LuSearch, LuX } from "react-icons/lu";
import { FormField } from "../custom/FormFIeld";
import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
import { useSearchParams } from "next/navigation";

export const SearchName = () => {
  const { shallowPush } = useShallowPush({ type: "replace" });
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";

  return (
    <Form initialValues={{ q }} onSubmit={(e) => shallowPush({ q: e.q })}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box w="fit-content">
            <FormField<string> name="q">
              {({ input }) => (
                <InputGroup
                  flex="1"
                  startElement={<LuSearch />}
                  endElement={
                    q && (
                      <Icon
                        as={LuX}
                        _hover={{ bg: "bg.muted", borderRadius: "full" }}
                        cursor="pointer"
                        onClick={() => shallowPush({ q: "" })}
                      />
                    )
                  }
                >
                  <Input placeholder="Cari nama..." {...input} bg="bg.panel" />
                </InputGroup>
              )}
            </FormField>
          </Box>
          <Button type="submit" display="none">
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
};

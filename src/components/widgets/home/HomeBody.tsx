import { VStack, Heading, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

type HomeBodyProps = {
  children?: ReactNode;
};

export const HomeBody = (props: HomeBodyProps) => {
  return (
    <VStack gap={5} w="full" maxW="5xl">
      <Heading size="xl" color="fg.default" fontWeight="semibold">
        Feature yang tersedia
      </Heading>

      <Stack
        direction={{ base: "column", xl: "row" }}
        gap={5}
        w="full"
        justify="center"
        align="stretch"
      >
        {props.children}
      </Stack>
    </VStack>
  );
};

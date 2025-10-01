import { Center, Card, Stack } from "@chakra-ui/react";

import { ReactNode } from "react";
import { LoginHeader } from "./LoginHeader";
import { LoginFooter } from "./LoginFooter";

type LoginContainerProps = {
  children?: ReactNode;
};

export const LoginContainer = ({ children }: LoginContainerProps) => {
  return (
    <Center
      w="100vw"
      maxH="100vh"
      h="100vh"
      bg="bg.default"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Root
        maxW="md"
        w="full"
        variant="elevated"
        rounded="2xl"
        overflow="hidden"
        border="1px solid"
        borderColor="border.muted"
        bg="bg.panel"
        boxShadow="lg"
      >
        <Card.Body p={10}>
          <Stack gap={8}>{children}</Stack>
        </Card.Body>
      </Card.Root>
    </Center>
  );
};

LoginContainer.Header = LoginHeader;
LoginContainer.Footer = LoginFooter;

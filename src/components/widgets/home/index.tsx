import {
  Box,
  Container,
  Center,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { HomeHeader } from "./HomeHeader";
import { HomeBody } from "./HomeBody";

type HomeWidgetProps = {
  children?: ReactNode;
};

export const HomeWidget = (props: HomeWidgetProps) => {
  return (
    <Box h="100vh" w="100vw" bg="bg.canvas" overflow="hidden">
      <Container maxW="7xl" h="full" py={0}>
        <Center h="full">
          <VStack gap={10} w="full" textAlign="center">
            {props.children}

            <HStack gap={4} pt={3}>
              <Button
                asChild
                size="lg"
                variant="solid"
                colorPalette="brand"
                borderRadius="xl"
              >
                <Link href="/login">Masuk</Link>
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
};

HomeWidget.Header = HomeHeader;
HomeWidget.Body = HomeBody;

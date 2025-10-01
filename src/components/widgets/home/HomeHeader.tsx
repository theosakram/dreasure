import { VStack, Box, Icon, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TbMoneybag } from "react-icons/tb";

type HomeHeaderProps = {
  children?: ReactNode;
};

export const HomeHeader = (props: HomeHeaderProps) => {
  return (
    <VStack gap={5}>
      <VStack gap={3} align="center">
        <Box p={4} borderRadius="2xl" bg="brand.muted" color="brand.fg">
          <Icon fontSize="4xl">
            <TbMoneybag />
          </Icon>
        </Box>

        <VStack gap={1}>
          <Heading size="4xl" color="fg.default" fontWeight="bold">
            Dreasury
          </Heading>
          <Text fontSize="md" color="fg.muted" fontWeight="medium">
            Aplikasi Manajemen Keuangan Organisasi
          </Text>
        </VStack>
      </VStack>

      {props.children}
    </VStack>
  );
};

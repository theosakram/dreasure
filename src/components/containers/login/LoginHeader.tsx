import { VStack, Box, Icon, Heading, Text } from "@chakra-ui/react";
import { TbMoneybag } from "react-icons/tb";

type LoginHeaderProps = {
  title: string;
  subtitle: string;
};

export const LoginHeader = ({ title, subtitle }: LoginHeaderProps) => (
  <VStack gap={4} textAlign="center">
    <Box p={4} borderRadius="2xl" bg="brand.muted" color="brand.fg">
      <Icon fontSize="4xl">
        <TbMoneybag />
      </Icon>
    </Box>

    <VStack gap={2}>
      <Heading size="3xl" color="fg.default" fontWeight="bold">
        {title}
      </Heading>
      <Text color="fg.muted" fontSize="sm" maxW="md">
        {subtitle}
      </Text>
    </VStack>
  </VStack>
);

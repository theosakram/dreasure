import { VStack, Button, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

type LoginFooterProps = {
  submitting?: boolean;
};

export const LoginFooter = ({ submitting }: LoginFooterProps) => {
  return (
    <VStack gap={4} pt={2}>
      <Button
        size="lg"
        colorPalette="brand"
        loading={submitting}
        loadingText="Sedang masuk..."
        type="submit"
        w="full"
        fontSize="md"
        fontWeight="semibold"
        transition="all 0.15s"
      >
        Masuk
      </Button>

      <ChakraLink
        asChild
        fontSize="sm"
        color="brand.fg"
        fontWeight="medium"
        _hover={{
          textDecoration: "underline",
        }}
      >
        <Link href="/">Lupa kata sandi?</Link>
      </ChakraLink>
    </VStack>
  );
};

"use client";

import { Box, Button, Card, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, brand.600 0%, brand.800 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Card.Root
        maxW="md"
        w="full"
        variant="elevated"
        shadow="xl"
        rounded="2xl"
        overflow="hidden"
      >
        <Card.Body p={8}>
          <Stack gap={6} textAlign="center">
            <Heading size="lg">Create Account</Heading>
            <Text color="fg.muted">
              This would be your signup form using the same auth layout
            </Text>
            <Button asChild colorPalette="brand">
              <Link href="/login">Back to Login</Link>
            </Button>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}

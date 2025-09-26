import type { Metadata } from "next";
import { Box, Text } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Authentication - Dreasure",
  description: "Sign in to your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Auth layout - minimal, focused on the authentication flow */}
      {children}

      {/* Optional: Auth-specific footer */}
      <Box as="footer" py={4} textAlign="center">
        <Text textStyle="xs" color="fg.muted">
          © 2025 Dreasure. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}

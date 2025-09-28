import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";

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
    <Box maxH="100vh" bg="gray.50">
      {children}
    </Box>
  );
}

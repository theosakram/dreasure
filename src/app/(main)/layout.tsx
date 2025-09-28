import type { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/custom/Sidebar";
import { Header } from "@/components/custom/Header";

export const metadata: Metadata = {
  title: "Dashboard - Dreasure",
  description: "Your dashboard",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" bg="bg.default">
      <Sidebar />

      <Flex direction="column" flex={1}>
        <Header />

        <Box flex={1} p={6}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

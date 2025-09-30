import type { Metadata } from "next";
import { Box, Flex, ScrollArea } from "@chakra-ui/react";
import { Sidebar } from "@/components/custom/Sidebar";
import { Header } from "@/components/custom/Header";

export const metadata: Metadata = {
  title: "Dashboard - Dreasury",
  description: "Your dashboard",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" h="100vh" overflow="hidden" bg="bg.default">
      <Sidebar />

      <Flex direction="column" flex="1" w="0" minW="0">
        <Header />

        <ScrollArea.Root flex="1">
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <Box p={6}>{children}</Box>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </Flex>
    </Flex>
  );
}

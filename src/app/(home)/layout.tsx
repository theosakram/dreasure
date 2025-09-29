import { Header } from "@/components/custom/Header";
import { Stack } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Dreasury",
  description: "Sign in to your account",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack gap="1rem" maxH="100vh" minH="100vh" bg="bg.default">
      <Header type="org" />
      {children}
    </Stack>
  );
}

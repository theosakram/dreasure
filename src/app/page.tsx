import { HomeFeatureCard } from "@/components/containers/home/HomeFeatureCard";
import { TrustIndicator } from "@/components/containers/home/TrustIndicator";
import { HomeWidget } from "@/components/widgets/home";
import { Box, HStack, For } from "@chakra-ui/react";
import {
  LuWallet,
  LuRefreshCw,
  LuShield,
  LuActivity,
  LuUsers,
  LuTrendingUp,
} from "react-icons/lu";

const features = [
  {
    icon: <LuWallet />,
    title: "Uang Kas",
    description:
      "Kelola kas harian organisasi dengan pencatatan transaksi yang akurat dan laporan real-time",
    isPrimary: true,
  },
  {
    icon: <LuRefreshCw />,
    title: "Dana Bergulir",
    description:
      "Sistem pinjaman dengan manajemen cicilan dan notifikasi otomatis",
  },
];

const indicators = [
  { icon: <LuShield />, label: "Aman & Terpercaya" },
  { icon: <LuActivity />, label: "Real-time" },
  { icon: <LuUsers />, label: "Multi-user" },
  { icon: <LuTrendingUp />, label: "Analytics" },
];

export default function Home() {
  return (
    <HomeWidget>
      <HomeWidget.Header>
        <HStack gap={6} wrap="wrap" justify="center" pt={1}>
          <For each={indicators}>
            {(item) => (
              <TrustIndicator
                key={item.label}
                icon={item.icon}
                label={item.label}
              />
            )}
          </For>
        </HStack>
      </HomeWidget.Header>

      <HomeWidget.Body>
        <For each={features}>
          {(feature) => (
            <Box
              flex="1"
              maxW={{ base: "full", xl: "360px" }}
              key={feature.title}
            >
              <HomeFeatureCard
                href="/login"
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isPrimary={feature.isPrimary}
              />
            </Box>
          )}
        </For>
      </HomeWidget.Body>
    </HomeWidget>
  );
}

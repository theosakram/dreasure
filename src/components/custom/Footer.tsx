import { Box, Text } from "@chakra-ui/react";

type FooterProps = {
  appName?: string;
  year?: number;
  technologies?: string[];
};

export const Footer = ({
  appName = "Dreasure",
  year = new Date().getFullYear(),
  technologies = ["Next.js", "Chakra UI v3", "Supabase"],
}: FooterProps) => {
  return (
    <Box
      bg="bg"
      borderTopWidth="1px"
      borderColor="border.muted"
      p={4}
      textAlign="center"
    >
      <Text textStyle="sm" color="fg.muted">
        © {year} {appName}. Built with {technologies.join(", ")}.
      </Text>
    </Box>
  );
};

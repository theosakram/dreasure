import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  linkProps?: LinkProps;
};

export const CustomLink = ({ href, children, linkProps }: CustomLinkProps) => {
  return (
    <ChakraLink asChild textDecor="none" {...linkProps}>
      <NextLink href={href} prefetch>
        {children}
      </NextLink>
    </ChakraLink>
  );
};

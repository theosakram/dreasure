import { ScrollArea } from "@chakra-ui/react";

type ScrollProps = {
  children: React.ReactNode;
  scrollMaxH?: string | number;
};

export const Scroll = ({ children, scrollMaxH }: ScrollProps) => {
  return (
    <ScrollArea.Root maxH={scrollMaxH}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb bg="border.emphasized" borderRadius="sm" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};

import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  body: ReactNode;
  footer?: ReactNode;
};

export const Modal = (props: ModalProps) => {
  return (
    <Dialog.Root
      lazyMount
      open={props.open}
      onOpenChange={(e) => props.setOpen(e.open)}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {props.title && (
              <Dialog.Header>
                <Dialog.Title>{props.title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>{props.body}</Dialog.Body>
            {props.footer && (
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
            )}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

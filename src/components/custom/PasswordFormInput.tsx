import {
  Input,
  Icon,
  IconButton,
  InputGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLockLine, RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { FormField } from "./FormFIeld";

type PasswordFormInputProps = {
  label?: string;
  isRequired?: boolean;
};

export const PasswordFormInput = ({
  label = "",
  isRequired = true,
}: PasswordFormInputProps) => {
  const { open, onToggle } = useDisclosure();

  return (
    <FormField<string> name="password" label={label} isRequired={isRequired}>
      {({ input }) => (
        <InputGroup
          startElement={
            <Icon color="fg.muted">
              <RiLockLine />
            </Icon>
          }
          endElement={
            <IconButton
              variant="ghost"
              size="sm"
              onClick={onToggle}
              aria-label={open ? "Hide password" : "Show password"}
            >
              <Icon>{open ? <RiEyeOffLine /> : <RiEyeLine />}</Icon>
            </IconButton>
          }
        >
          <Input
            {...input}
            type={open ? "text" : "password"}
            placeholder="Masukkan kata sandi..."
            size="md"
          />
        </InputGroup>
      )}
    </FormField>
  );
};

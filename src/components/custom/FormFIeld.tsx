import { Field } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Field as FinalFormField, FieldRenderProps } from "react-final-form";

export type FormFieldProps<T> = {
  name: string;
  label?: ReactNode;
  helperText?: ReactNode;
  children: (fieldProps: FieldRenderProps<T, HTMLElement>) => ReactNode;
  isRequired?: boolean;
  readonly?: boolean;
  isLabelCentered?: boolean;
  labelSize?: "xs" | "sm" | "md" | "lg";
  fontWeight?: string;
};

export const FormField = <T,>({
  name,
  label,
  helperText,
  children,
  isRequired,
  readonly,
  isLabelCentered,
  labelSize,
  fontWeight,
}: FormFieldProps<T>) => {
  return (
    <FinalFormField<T> name={name}>
      {({ input, meta }) => {
        const showError = meta.touched && meta.error;

        return (
          <Field.Root
            required={isRequired}
            invalid={showError}
            disabled={readonly}
          >
            {label && (
              <Field.Label
                textStyle={labelSize || "sm"}
                color="fg"
                textAlign={isLabelCentered ? "center" : undefined}
                fontWeight={fontWeight || "semibold"}
              >
                {label}
                {isRequired && <Field.RequiredIndicator />}
              </Field.Label>
            )}
            {children({ input, meta })}
            {helperText && !showError && (
              <Field.HelperText>{helperText}</Field.HelperText>
            )}
            {showError && <Field.ErrorText>{meta.error}</Field.ErrorText>}
          </Field.Root>
        );
      }}
    </FinalFormField>
  );
};

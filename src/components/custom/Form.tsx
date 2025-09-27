import { formValidation } from "@/utils/helpers/formValidation";
import { Form as FinalForm } from "react-final-form";
import { ZodType } from "zod";

import { FormRenderProps } from "react-final-form";
import { FormApi } from "final-form";

type FormProps<T> = {
  onSubmit: (values: T, form: FormApi<T, Partial<T>>) => void;
  children: (method: FormRenderProps<T>) => React.ReactNode;
  schema?: ZodType<T>;
  initialValues?: Partial<T>;
};

export const Form = <T extends Record<string, unknown>>(
  props: FormProps<T>,
) => {
  return (
    <FinalForm<T>
      initialValues={props.initialValues}
      validate={
        props.schema
          ? (values) => formValidation(props.schema!, values)
          : undefined
      }
      onSubmit={props.onSubmit}
      render={(method) => props.children(method)}
    />
  );
};

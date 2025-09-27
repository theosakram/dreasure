import { ZodType } from "zod";

export const formValidation = <T>(schema: ZodType<T>, values: Partial<T>) => {
  if (!values || Object.keys(values).length === 0) {
    return {};
  }

  const result = schema.safeParse(values);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Validation errors:", result.error.issues);
    }

    return result.error.issues.reduce((acc, issue) => {
      const fieldName = issue.path.join(".");
      acc[fieldName] = issue.message;
      return acc;
    }, {} as Record<string, string>);
  }

  return {};
};

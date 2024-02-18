import { ZodIssue } from "zod";

export const handleZodFormErrors = <T>(
  form: any,
  errors: unknown,
) => {
  const zodErrors = errors as ZodIssue[];
  for (const issue of zodErrors) {
    const fieldName = issue.path[0] as T;
    const errorMessage = issue.message;
    form.setError(fieldName, { message: errorMessage });
  }
}
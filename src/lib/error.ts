import { ZodIssue } from "zod";

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
  } else if (typeof error === "string") {
    message = error
  } else {
    message = "Something went wrong"
  }

  return message
}

export const handleZodFormErrors = <T>(
  form: any,
  zodErrors: ZodIssue[],
) => {
  for (const issue of zodErrors) {
    const fieldName = issue.path[0] as T;
    const errorMessage = issue.message;
    form.setError(fieldName, { message: errorMessage });
  }
}
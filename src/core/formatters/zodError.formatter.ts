import { ZodError } from "zod";

export function formatZodErrors(error: ZodError) {
  const newErrors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    if (issue.path.length > 0) {
      newErrors[issue.path[0]] = issue.message;
    }
  });
  return newErrors;
}

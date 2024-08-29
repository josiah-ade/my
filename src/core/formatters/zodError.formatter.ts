import { ZodError } from "zod";

export function formatZodErrors(error: ZodError, keyIndex = 0) {
  const newErrors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    if (issue.path.length > 0) {
      newErrors[issue.path[keyIndex]] = issue.message;
    }
  });
  return newErrors;
}

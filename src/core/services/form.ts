import { ICreateFormField, IFormList } from "@/typings/interface/form";
import { z, ZodType, ZodTypeAny } from "zod";

export function getFormLink(form: IFormList) {
  return `${window.location.origin}/form/${form.link}`;
}

const fieldTypeSchemas: Record<string, ZodType> = {
  text: z.string(),
  tel: z.string().regex(/^\d*$/, { message: "input must be a number" }),
  email: z.string().email({ message: "Invalid email address" }),
};

export function getFormSchema(fields: ICreateFormField[]) {
  const fieldSchemas: ZodTypeAny[] = [];
  fields.forEach((field) => {
    const baseSchema = fieldTypeSchemas[field.type] || z.string();

    fieldSchemas.push(
      z.object({
        fieldId: z.string(),
        value: baseSchema.refine((value) => !field.is_required || value.length > 0, { message: "Input is required" }),
      })
    );
  });
  return z.object({
    formId: z.string(),
    fields: z.tuple(fieldSchemas as [ZodTypeAny]),
  });
}

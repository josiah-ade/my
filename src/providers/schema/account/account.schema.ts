import { isValidPhoneNumber } from "@/core/validators/phone.validator";
import { z } from "zod";

export const CreateAccountSchema = z.object({
  phoneNumber:  z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  description: z.union([z.string(), z.literal("")]).optional(),
});

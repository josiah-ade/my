import { isValidPhoneNumber } from "@/core/validators/phone.validator";
import { z } from "zod";

export const ContactSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  contactPhoneNumber: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  contactEmail: z.union([z.string().email("Invalid email address"), z.literal("")]).optional(),
});

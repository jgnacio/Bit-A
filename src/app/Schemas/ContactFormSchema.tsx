import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  contactType: z.enum(["telegram", "email", "phoneNumber", "whatsapp"]),
  contact: z.discriminatedUnion("contactType", [
    z.object({
      contactType: z.literal("telegram"),
      contact: z
        .string()
        .regex(
          /^@[a-zA-Z0-9_]{4,}$/,
          "El usuario de Telegram debe comenzar con @ y tener al menos 4 caracteres"
        ),
    }),
    z.object({
      contactType: z.literal("email"),
      contact: z.string().email("Formato de email inválido"),
    }),
    z.object({
      contactType: z.literal("phoneNumber"),
      contact: z
        .string()
        .regex(
          /^(\+?[1-9]\d{0,2})?[- ]?\d{6,10}$/,
          "Número de teléfono inválido"
        ),
    }),
    z.object({
      contactType: z.literal("whatsapp"),
      contact: z
        .string()
        .regex(
          /^(\+?[1-9]\d{0,2})?[- ]?\d{6,10}$/,
          "Número de WhatsApp inválido"
        ),
    }),
  ]),
});
export type FormContactType = z.infer<typeof contactSchema>;

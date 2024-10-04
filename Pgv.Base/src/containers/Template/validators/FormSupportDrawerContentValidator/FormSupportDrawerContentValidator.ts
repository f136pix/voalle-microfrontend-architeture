import i18n from "lib/i18n"
import { z } from "zod"
const { t } = i18n

export const FormSupportDrawerContentValidatorSchema = z.object({
  id: z.coerce.number().int().optional(),
  code: z.coerce
    .number({
      invalid_type_error: t("insignia.validator.code.number"),
    })
    .int()
    .min(1, t("insignia.validator.code.min1")),
  title: z.string().min(1, t("insignia.validator.title.min1")),
  description: z.string().min(1, t("insignia.validator.description.min1")),
  whatsapp: z.boolean().default(false),
  cellphone: z.boolean().default(false),
  email: z.boolean().default(false),
  insignia: z.object({
    icon: z
      .string({
        required_error: t("insignia.validator.insigniaIcon.min1"),
        invalid_type_error: t("insignia.validator.insigniaIcon.min1"),
      })
      .min(1, t("insignia.validator.insigniaIcon.min1")),
    color: z
      .string({
        required_error: t("insignia.validator.insigniaColor.min1"),
        invalid_type_error: t("insignia.validator.insigniaColor.min1"),
      })
      .min(1, t("insignia.validator.insigniaColor.min1")),
  }),
})

export type FormSupportDrawerContent = z.infer<
  typeof FormSupportDrawerContentValidatorSchema
>

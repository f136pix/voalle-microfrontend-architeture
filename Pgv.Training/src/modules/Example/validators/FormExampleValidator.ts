import i18n from "lib/i18n"
import { z } from "zod"
const { t } = i18n

export const FormExampleValidatorSchema = z.object({
  id: z.coerce.number().int().optional(),
  hash: z.string().optional(),
  code: z
    .string()
    .min(1, t("examples.validator.code.min1"))
    .regex(/^\d+$/, t("examples.validator.code.number")),
  title: z.string().min(1, t("examples.validator.title.min1")),
  description: z.string().optional(),
  active: z.boolean().optional(),
})

export type FormExampleValidator = z.infer<typeof FormExampleValidatorSchema>

import { z } from "zod"
import i18n from "lib/i18n"
const { t } = i18n

export const FormLoginValidatorSchema = z.object({
  username: z
    .string()
    .min(1, t("login.validator.username.min1"))
    .regex(
      /^[a-zA-Z0-9._%+-]+(?:@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/,
      t("login.validator.username.regex")
    )
    .min(6, t("login.validator.username.min6")),
  password: z
    .string()
    .min(1, t("login.validator.password.min1"))
    .min(6, t("login.validator.password.min6")),
})

export type FormLoginValidator = z.infer<typeof FormLoginValidatorSchema>

import i18n from "../../../lib/i18n.ts"
import { z } from "zod"
const { t } = i18n

export const FormExampleValidator = z.object({
    id: z.coerce.number().int().optional(),
    hash: z.string().optional(),
    code: z
        .string()
        .min(1, t("examples.validator.code.min1")),
    title: z.string().min(1, t("examples.validator.title.min1")),
    description: z.string().optional(),
    active: z.boolean().default(true)
})

export type FormExampleValidator = z.infer<typeof FormExampleValidator>
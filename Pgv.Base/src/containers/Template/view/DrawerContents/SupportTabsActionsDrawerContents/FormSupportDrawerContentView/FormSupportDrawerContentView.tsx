import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { LoadingBrand, Switch, TextField } from "pgv-lib/ui/components"
import { DrawerContent } from "pgv-lib/ui/drawer"
import { Box } from "pgv-lib/ui/material"

import { Container } from "./FormSupportDrawerContentView.styles"
import { FormSupportDrawerFooterView } from "./FormSupportDrawerFooterView/FormSupportDrawerFooterView"
import { FormSupportDrawerHeaderView } from "./FormSupportDrawerHeaderView/FormSupportDrawerHeaderView"
import { useFormSupportDrawerContentViewController } from "./useFormSupportDrawerContentViewController"

interface FormSupportDrawerContentViewProps {
  id?: number | string
  pageTitle: string
}

export const FormSupportDrawerContentView: React.FC<
  FormSupportDrawerContentViewProps
> = ({ id }) => {
  const { t } = useTranslation()
  const { onSubmit, getForm, loading, formId } =
    useFormSupportDrawerContentViewController(id)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = getForm()

  return (
    <>
      <FormSupportDrawerHeaderView id={id} />
      <DrawerContent>
        <Container>
          {loading && <LoadingBrand backgroundOpacity={0.5} />}
          <form id={formId} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                fullWidth
                inputProps={{ "data-testid": "code" }}
                label={t("support.form.code.label")}
                placeholder={t("support.form.code.placeholder")}
                size="small"
                error={!!errors.code}
                helperText={errors.code ? errors.code?.message : ""}
                {...register("code", { required: true })}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                inputProps={{ "data-testid": "title" }}
                label={t("support.form.title.label")}
                placeholder={t("support.form.title.placeholder")}
                size="small"
                error={!!errors.title}
                helperText={errors.title ? errors.title?.message : ""}
                {...register("title")}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField
                multiline
                fullWidth
                rows={3}
                inputProps={{ "data-testid": "description" }}
                label={t("support.form.description.label")}
                placeholder={t("support.form.description.placeholder")}
                size="small"
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description?.message : ""
                }
                {...register("description")}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Controller
                control={control}
                name="whatsapp"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    checked={value}
                    onChange={onChange}
                    data-testid="whatsapp"
                    size="medium"
                    label={t("support.form.whatsapp.label")}
                  />
                )}
              />
              <Controller
                control={control}
                name="cellphone"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    checked={value}
                    onChange={onChange}
                    data-testid="cellphone"
                    size="medium"
                    label={t("support.form.cellphone.label")}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    checked={value}
                    onChange={onChange}
                    data-testid="email"
                    size="medium"
                    label={t("support.form.email.label")}
                  />
                )}
              />
            </Box>
          </form>
        </Container>
      </DrawerContent>
      <FormSupportDrawerFooterView loading={loading} formId={formId} id={id} />
    </>
  )
}

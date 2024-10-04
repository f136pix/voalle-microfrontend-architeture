import { Controller } from "react-hook-form"

import { Button, LoadingBrand, Switch, TextField } from "pgv-lib/ui/components"
import { DrawerContent, DrawerFooter } from "pgv-lib/ui/drawer"
import { Box, Stack, Typography } from "pgv-lib/ui/material"

import { useFormExampleViewController } from "./useFormExampleViewController"

export interface FormExampleViewState {
  id?: string | number
}

export const FormExampleView: React.FC<FormExampleViewState> = ({ id }) => {
  const { getForm, onSubmit, closeDrawer, formId, t, loading, title } =
    useFormExampleViewController({ id })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = getForm()

  return (
    <>
      <DrawerContent>
        <Typography variant="h6">{title}</Typography>
        {loading && <LoadingBrand backgroundOpacity={0.5} />}
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
          <Box mt={3}>
            <TextField
              fullWidth
              label={t("examples.form.code.label")}
              placeholder={t("examples.form.code.placeholder")}
              size="small"
              error={!!errors.code}
              helperText={errors.code ? errors.code?.message : ""}
              {...register("code")}
            />
          </Box>
          <Box mt={3}>
            <TextField
              fullWidth
              label={t("examples.form.title.label")}
              placeholder={t("examples.form.title.placeholder")}
              size="small"
              error={!!errors.title}
              helperText={errors.title ? errors.title?.message : ""}
              {...register("title")}
            />
          </Box>
          <Box mt={3}>
            <TextField
              multiline
              fullWidth
              rows={3}
              label={t("examples.form.description.label")}
              placeholder={t("examples.form.description.placeholder")}
              size="small"
              error={!!errors.description}
              helperText={errors.description ? errors.description?.message : ""}
              {...register("description")}
            />
          </Box>
          <Box mt={3}>
            <Controller
              control={control}
              name="active"
              defaultValue={id ? undefined : true}
              render={({ field: { onChange, value } }) => (
                <Switch
                  checked={value}
                  onChange={onChange}
                  size="medium"
                  label={t("examples.form.active.label")}
                />
              )}
            />
          </Box>
        </form>
      </DrawerContent>
      <DrawerFooter>
        <Stack useFlexGap spacing={3} direction="row">
          <Button
            title={t("common.label.close")}
            variant="outlined"
            color="error"
            onClick={closeDrawer}
          >
            {t("common.label.close")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            loading={loading}
            type="submit"
            form={formId}
          >
            {title}
          </Button>
        </Stack>
      </DrawerFooter>
    </>
  )
}

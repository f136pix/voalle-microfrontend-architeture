import { Box, InputAdornment } from "pgv-lib/ui/material"
import {
  Button,
  LoadingBrand,
  IconButton,
  TextField,
} from "pgv-lib/ui/components"
import { VisibilityOff, Visibility } from "pgv-lib/ui/icons"
import { useTranslation } from "react-i18next"
import { Container } from "./FormLoginView.styles"
import { useFormLoginViewController } from "./useFormLoginViewController"

import { BaseTextFieldProps } from "@mui/material"

export interface Props extends BaseTextFieldProps {
  label?: string
  htmlFor?: string
}

const FormLoginView = () => {
  const { t } = useTranslation()
  const { onSubmit, getForm, loading, showPassword, toggleShowPassword } =
    useFormLoginViewController()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = getForm()

  return (
    <Container>
      {loading && <LoadingBrand backgroundOpacity={0.5} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 4 }}>
          <TextField
            inputProps={{ "data-testid": "username" }}
            label={t("login.username.label")}
            placeholder={t("login.username.placeholder")}
            fullWidth
            size="small"
            error={!!errors.username}
            helperText={errors.username ? errors.username?.message : ""}
            {...register("username")}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            inputProps={{ "data-testid": "password" }}
            label={t("login.password.label")}
            placeholder={t("login.password.placeholder")}
            fullWidth
            size="small"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={toggleShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    icon={showPassword ? VisibilityOff : Visibility}
                  />
                </InputAdornment>
              ),
            }}
            {...register("password")}
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" fullWidth type="submit" loading={loading}>
            {t("login.singIn.title")}
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default FormLoginView

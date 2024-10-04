import { useFormLoginViewModel } from "../../viewmodel/useFormLoginViewModel"

export const useFormLoginViewController = () => {
  const { onSubmit, getForm, loading, toggleShowPassword, showPassword } =
    useFormLoginViewModel()
  return { onSubmit, getForm, loading, toggleShowPassword, showPassword }
}

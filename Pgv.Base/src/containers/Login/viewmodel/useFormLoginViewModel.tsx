import { useState } from "react"
import {
  FormLoginBusiness,
  useFormLoginBusiness,
} from "../business/useFormLoginBusiness"
import { FormLoginValidator } from "../validators/FormLoginValidator/FormLoginValidator"

interface FormLoginViewModelInterface
  extends Omit<FormLoginBusiness, "setLoading"> {
  loading: boolean
  showPassword: boolean
  toggleShowPassword: () => void
}

export const useFormLoginViewModel = (): FormLoginViewModelInterface => {
  const { onSubmit: onSubmitModel, loading, getForm } = useFormLoginBusiness()
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (postData: FormLoginValidator) => {
    await onSubmitModel(postData)
  }

  return {
    onSubmit,
    getForm,
    loading,
    showPassword,
    toggleShowPassword,
  }
}

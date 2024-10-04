import { UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuthStore from "services/auth/auth"
import {
  FormLoginValidatorSchema,
  FormLoginValidator,
} from "../validators/FormLoginValidator/FormLoginValidator"
import { create } from "zustand"

interface FormLoginStore {
  loading: boolean
  setLoading: (value: boolean) => void
  getForm: () => UseFormReturn<FormLoginValidator>
  setForm: (form: UseFormReturn<FormLoginValidator>) => void
}

const useStore = create<FormLoginStore>((set) => {
  const setLoading = (value: boolean) => set(() => ({ loading: value }))

  let form: UseFormReturn<FormLoginValidator>
  const setForm = (formData: UseFormReturn<FormLoginValidator>) => {
    if (!form) form = formData
  }

  const getForm = (): UseFormReturn<FormLoginValidator> => form

  return {
    loading: false,
    setLoading,
    setForm,
    getForm,
  }
})

export interface FormLoginBusiness extends Omit<FormLoginStore, "setForm"> {
  onSubmit: (postData: FormLoginValidator) => Promise<any>
}

export const useFormLoginBusiness = () => {
  const { login } = useAuthStore()
  const { loading, setLoading, getForm, setForm } = useStore()
  const form = useForm<FormLoginValidator>({
    resolver: zodResolver(FormLoginValidatorSchema),
  })
  setForm(form)

  async function onSubmit(postData: FormLoginValidator) {
    setLoading(true)
    try {
      const response = await login(postData)
      setLoading(false)
      return response
    } catch (error: any) {
      setLoading(false)
      if (
        typeof error?.message === "string" &&
        ["9", "90", "91", "92", "93", "94"].includes(error?.status)
      ) {
        if (["90", "92", "94"].includes(error?.status)) {
          getForm().setError("username", {
            message: error.message,
          })
        } else if (error?.status === "93") {
          getForm().setError("username", {
            message: "",
          })
          getForm().setError("password", {
            message: error.message,
          })
        } else {
          getForm().setError("password", {
            message: error.message,
          })
        }
      }
      return error
    }
  }

  return {
    getForm,
    loading,
    setLoading,
    onSubmit,
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, useForm } from "react-hook-form"

import { populateForm as populateFormPgv } from "pgv-lib/functions"
import { FormStoreBase } from "pgv-lib/patterns"
import { v4 as uuidv4 } from "uuid"
import { create } from "zustand"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  getSupport,
  postSupport,
  putSupport,
} from "../../../../services/TabsActionsServices/SupportTabsActionsServices/SupportTabsActionsServices"
import {
  FormSupportDrawerContentValidatorSchema,
  FormSupportDrawerContent,
} from "../../../../validators/FormSupportDrawerContentValidator/FormSupportDrawerContentValidator"

interface FormSupportDrawerContentStore
  extends FormStoreBase<FormSupportDrawerContent> {
  populateForm: (id: string | number) => Promise<void>
}

const useStore = create<FormSupportDrawerContentStore>((set) => {
  const setLoading = (value: boolean) => set(() => ({ loading: value }))

  const formId = uuidv4()

  let form: UseFormReturn<FormSupportDrawerContent>
  const setForm = (formData: UseFormReturn<FormSupportDrawerContent>) => {
    form = formData
  }

  const getForm = (): UseFormReturn<FormSupportDrawerContent> => form

  const populateForm = async (id: string | number) => {
    try {
      setLoading(true)
      const response = await getSupport(id)
      if (response) {
        populateFormPgv(form, FormSupportDrawerContentValidatorSchema, response)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  async function onSubmit(postData: FormSupportDrawerContent) {
    try {
      setLoading(true)
      let request = putSupport
      if (!postData.id) {
        request = postSupport
      }
      const response = await request(postData)
      if (!postData.id) {
        form.reset()
      }
      setLoading(false)
      return response
    } catch (error: any) {
      setLoading(false)
      return error
    }
  }

  return {
    formId,
    loading: false,
    setLoading,
    onSubmit,
    populateForm,
    setForm,
    getForm,
  }
})

export const useFormSupportDrawerContentBusiness = () => {
  const { onSubmit, loading, getForm, setForm, formId, populateForm } =
    useStore()

  const form = useForm<FormSupportDrawerContent>({
    resolver: zodResolver(FormSupportDrawerContentValidatorSchema),
  })

  setForm(form)

  return {
    onSubmit,
    formId,
    loading,
    populateForm,
    setForm,
    getForm,
  }
}

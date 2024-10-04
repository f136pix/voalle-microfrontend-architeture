/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, useForm } from "react-hook-form"

import { populateForm as populateFormPgv } from "pgv-lib/functions"
import { FormStoreBase } from "pgv-lib/patterns"
import { v4 as uuidv4 } from "uuid"
import { create } from "zustand"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  getCrmFormById,
  postCrmForms,
  putCrmForms,
} from "../services/ExampleServices"
import {
  FormExampleValidator,
  FormExampleValidatorSchema,
} from "../validators/FormExampleValidator"

interface FormExampleStore extends FormStoreBase<FormExampleValidator> {}

const useStore = create<FormExampleStore>((set) => {
  const setLoading = (value: boolean) => set(() => ({ loading: value }))

  const formId = uuidv4()

  let form: UseFormReturn<FormExampleValidator>
  const setForm = (formData: UseFormReturn<FormExampleValidator>) => {
    form = formData
  }

  const getForm = (): UseFormReturn<FormExampleValidator> => form

  const onSubmit = async (postData: FormExampleValidator) => {
    try {
      setLoading(true)

      let request = postCrmForms

      if (postData?.id) request = putCrmForms

      const response = await request(postData)

      form.reset()
      setLoading(false)
      return response
    } catch (error: any) {
      setLoading(false)
      return error
    }
  }

  const populateForm = async (id: string | number) => {
    try {
      setLoading(true)
      const { response } = await getCrmFormById({ id })
      if (response) {
        populateFormPgv(form, FormExampleValidatorSchema, response)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return {
    formId,
    loading: false,
    setLoading,
    onSubmit,
    setForm,
    getForm,
    populateForm,
  }
})

export const useFormExampleBusiness = () => {
  const { onSubmit, loading, getForm, setForm, formId, populateForm } =
    useStore()

  const form = useForm<FormExampleValidator>({
    resolver: zodResolver(FormExampleValidatorSchema),
  })

  setForm(form)

  return {
    onSubmit,
    formId,
    loading,
    setForm,
    getForm,
    populateForm,
  }
}

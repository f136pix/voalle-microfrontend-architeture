/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { FormExampleValidator } from "modules/Example/validators/FormExampleValidator"
import { useFormExampleViewModel } from "modules/Example/viewmodel/useFormExampleViewModel"
import { useDrawer } from "pgv-lib/ui/drawer"

import { FormExampleViewState } from "./FormExampleView"

export const useFormExampleViewController = ({ id }: FormExampleViewState) => {
  const {
    onSubmit: onSubmitViewModel,
    getForm,
    loading,
    formId,
    refreshDatagridData,
    populateForm,
  } = useFormExampleViewModel()

  const { closeDrawer } = useDrawer()

  const { t } = useTranslation()

  const title = id
    ? t("examples.form.update.title")
    : t("examples.form.create.title")

  const onSubmit = async (postData: FormExampleValidator) => {
    try {
      await onSubmitViewModel(postData)
      refreshDatagridData()
      closeDrawer()
    } catch (error: any) {
      /* empty */
    }
  }

  useEffect(() => {
    if (id && populateForm) {
      populateForm(id)
    }
  }, [id])

  return {
    t,
    getForm,
    loading,
    formId,
    onSubmit,
    closeDrawer,
    title,
  }
}

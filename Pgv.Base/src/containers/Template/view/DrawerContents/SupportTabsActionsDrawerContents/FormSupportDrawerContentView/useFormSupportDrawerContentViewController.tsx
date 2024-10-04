import { useEffect } from "react"
import { useWatch } from "react-hook-form"

import { useDrawer } from "pgv-lib/ui/drawer"

import { useFormSupportDrawerContentViewModel } from "../../../../viewmodel/TabsActionsViewModel/SupportTabsActionsViewModel/useFormSupportDrawerContentViewModel"

export const useFormSupportDrawerContentViewController = (
  id?: string | number
) => {
  const { closeDrawer } = useDrawer()

  const { onSubmit, getForm, loading, formId, populateForm } =
    useFormSupportDrawerContentViewModel()

  const { control } = getForm()

  const formValues = useWatch({
    control,
  })

  useEffect(() => {
    if (id) {
      populateForm(id)
    }
  }, [id])

  return {
    closeDrawer,
    onSubmit,
    getForm,
    loading,
    formId,
    formValues,
  }
}

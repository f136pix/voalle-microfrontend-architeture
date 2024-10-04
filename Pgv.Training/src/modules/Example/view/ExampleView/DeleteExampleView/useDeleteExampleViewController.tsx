import { useTranslation } from "react-i18next"

import { useDeleteExampleViewModel } from "modules/Example/viewmodel/useDeleteExampleViewModel"
import { useDialog } from "pgv-lib/ui/dialog"

export const useDeleteExampleViewController = () => {
  const { closeDialog } = useDialog()

  const { t } = useTranslation()

  const { loading, onDelete, fetchData } = useDeleteExampleViewModel()

  const deleteCrmForm = async (id: number) => {
    await onDelete(id)
    await closeDialog()
    fetchData()
  }

  return {
    loading,
    closeDialog,
    deleteCrmForm,
    t,
  }
}

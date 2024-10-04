import { useExampleBusiness } from "../business/useExampleBusiness"
import { useFormExampleBusiness } from "../business/useFormExampleBusiness"

export const useFormExampleViewModel = () => {
  const { onSubmit, loading, getForm, formId, populateForm } =
    useFormExampleBusiness()
  const { fetchData } = useExampleBusiness()

  return {
    onSubmit,
    getForm,
    loading,
    formId,
    refreshDatagridData: fetchData,
    populateForm,
  }
}

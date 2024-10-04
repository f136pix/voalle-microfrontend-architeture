import { useDeleteExampleBusiness } from "../business/useDeleteExampleBusiness"
import { useExampleBusiness } from "../business/useExampleBusiness"

export const useDeleteExampleViewModel = () => {
  const { loading, onDelete } = useDeleteExampleBusiness()
  const { fetchData } = useExampleBusiness()

  return {
    loading,
    onDelete,
    fetchData,
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"

import { deleteCrmForms } from "../services/ExampleServices"

interface DeleteExampleStore {
  onDelete: (id: string | number) => Promise<void>
  loading: boolean
}

export const useStore = create<DeleteExampleStore>((set) => {
  const setLoading = (loading: boolean) => set(() => ({ loading }))

  const onDelete = async (id: string | number) => {
    try {
      setLoading(true)
      const response = await deleteCrmForms({ id })
      setLoading(false)
      return response
    } catch (error: any) {
      setLoading(false)
      return error
    }
  }

  return {
    onDelete,
    loading: false,
  }
})

export const useDeleteExampleBusiness = () => {
  const { loading, onDelete } = useStore()

  return {
    loading,
    onDelete,
  }
}

import {
  getRoutineGuideFeedback,
  setRoutineGuideFeedback,
} from "containers/Template/services/TabsActionsServices/RoutineGuideTabsActionsServices/RoutineGuideTabsActionsServices"
import { RoutineGuideResponseType } from "containers/Template/types/TabsActionsTypes/RoutineGuideTabsActionsTypes"
import useAuthStore from "services/auth/auth"
import { create } from "zustand"

interface UseStoreProps {
  data?: RoutineGuideResponseType
  setFeedback: (menuId: number | string, feedback: boolean) => void
  loading?: boolean
  loadingSetFeedback?: boolean
  fetchData: (menuId: number | string) => Promise<void>
}

const useStore = create<UseStoreProps>((set) => {
  const setLoading = (loading: boolean) => set(() => ({ loading }))
  const setLoadingSetFeedback = (loadingSetFeedback: boolean) =>
    set(() => ({ loadingSetFeedback }))

  const fetchData = async (menuId: number | string) => {
    try {
      setLoading(true)
      const { response } = await getRoutineGuideFeedback(
        useAuthStore.getState().getUserId(),
        menuId
      )
      if (response?.data) {
        set(() => ({ data: response.data }))
      }
      setLoading(false)
    } catch (error) {
      set(() => ({ data: {} }))
      setLoading(false)
    }
  }

  const setFeedback = async (menuId: number | string, feedback: boolean) => {
    try {
      setLoadingSetFeedback(true)
      const { response } = await setRoutineGuideFeedback(
        useAuthStore.getState().getUserId(),
        menuId,
        feedback
      )
      if (response?.data) {
        set(() => ({ data: response.data }))
      }
      setLoadingSetFeedback(false)
    } catch (error) {
      setLoadingSetFeedback(false)
    }
  }

  return {
    data: {},
    loading: false,
    loadingSetFeedback: false,
    fetchData,
    setFeedback,
  }
})

export const useProcessGuideTabsActionsBusiness = () => {
  const { data, fetchData, setFeedback, loading, loadingSetFeedback } =
    useStore()

  return {
    data,
    fetchData,
    setFeedback,
    loading,
    loadingSetFeedback,
  }
}

import { useRoutineGuideTabsActionsBusiness } from "containers/Template/business/TabsActionsBusiness/RoutineGuideTabsActionsBusiness/useRoutineGuideTabsActionsBusiness"

export const useRoutineGuideTabsActionsViewModel = () => {
  const { data, fetchData, setFeedback, loading, loadingSetFeedback } =
    useRoutineGuideTabsActionsBusiness()

  return {
    data,
    fetchData,
    setFeedback,
    loading,
    loadingSetFeedback,
  }
}

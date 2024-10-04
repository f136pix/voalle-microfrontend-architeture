import { useProcessGuideTabsActionsBusiness } from "containers/Template/business/TabsActionsBusiness/ProcessGuideTabsActionsBusiness/useProcessGuideTabsActionsBusiness"

export const useProcessGuideTabsActionsViewModel = () => {
  const { data, fetchData, setFeedback, loading, loadingSetFeedback } =
    useProcessGuideTabsActionsBusiness()

  return {
    data,
    fetchData,
    setFeedback,
    loading,
    loadingSetFeedback,
  }
}

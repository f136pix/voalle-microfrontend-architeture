import { useProcessGuideTabsActionsViewModel } from "containers/Template/viewmodel/TabsActionsViewModel/ProcessGuideTabsActionsViewModel/useProcessGuideTabsActionsViewModel"
import { useEffect } from "react"

export const useProcessGuideTabsActionsViewController = (
  menuId: number | string,
  withFeedback: boolean
) => {
  const { data, fetchData, setFeedback, loading, loadingSetFeedback } =
    useProcessGuideTabsActionsViewModel()

  useEffect(() => {
    if (withFeedback && fetchData) fetchData(menuId)
  }, [])

  return { data, setFeedback, loading, loadingSetFeedback }
}

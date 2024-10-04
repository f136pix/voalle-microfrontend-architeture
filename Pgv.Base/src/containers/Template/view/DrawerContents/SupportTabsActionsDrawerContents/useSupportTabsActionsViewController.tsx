import { useEffect } from "react"

import { useRoutineGuideTabsActionsViewModel } from "containers/Template/viewmodel/TabsActionsViewModel/RoutineGuideTabsActionsViewModel/useRoutineGuideTabsActionsViewModel"

export const useRoutineGuideTabsActionsViewController = (
  menuId: number | string,
  withFeedback: boolean
) => {
  const { data, fetchData, setFeedback, loading, loadingSetFeedback } =
    useRoutineGuideTabsActionsViewModel()

  useEffect(() => {
    if (withFeedback && fetchData) fetchData(menuId)
  }, [])

  return { data, setFeedback, loading, loadingSetFeedback }
}

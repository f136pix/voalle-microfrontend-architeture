import { FavoriteTabsActionsCard } from "containers/Template/components/TabsActionsCards/FavoriteTabsActionsCard/FavoriteTabsActionsCard"
import { DefaultOperationProcessTabsActionsCard } from "containers/Template/components/TabsActionsCards/DefaultOperationProcessTabsActionsCard/DefaultOperationProcessTabsActionsCard"
import { RoutineGuideTabsActionsCard } from "containers/Template/components/TabsActionsCards/RoutineGuideTabsActionsCard/RoutineGuideTabsActionsCard"
import { ProcessGuideTabsActionsCard } from "containers/Template/components/TabsActionsCards/ProcessGuideTabsActionsCard/ProcessGuideTabsActionsCard"
import { UnivoalleTabsActionsCard } from "containers/Template/components/TabsActionsCards/UnivoalleTabsActionsCard/UnivoalleTabsActionsCard"
import { SupportTabsActionsCard } from "containers/Template/components/TabsActionsCards/SupportTabsActionsCard/SupportTabsActionsCard"
import { TabActionsRoutineOptions } from "containers/Template/components/TabActionRoutineOptions/TabActionsRoutineOptions"

import { useTabActionsRoutineOptionsViewController } from "./useTabActionsRoutineOptionsViewController"

const TabActionsRoutineOptionsView = () => {
  const { open, setOpen } = useTabActionsRoutineOptionsViewController()

  return (
    <TabActionsRoutineOptions open={open} setOpen={setOpen}>
      <FavoriteTabsActionsCard onClick={() => setOpen(false)} />
      <DefaultOperationProcessTabsActionsCard onClick={() => setOpen(false)} />
      <RoutineGuideTabsActionsCard
        menuId={10}
        withFeedback
        onClick={() => setOpen(false)}
        drawerComponent={
          <>
            <p>RoutineGuideTabsActionsCard</p>
          </>
        }
      />
      <ProcessGuideTabsActionsCard
        menuId={10}
        withFeedback
        onClick={() => setOpen(false)}
        drawerComponent={<>ProcessGuideTabsActionsCard</>}
      />
      <UnivoalleTabsActionsCard onClick={() => setOpen(false)} />
      <SupportTabsActionsCard
        menuId={12}
        pageTitle=""
        onClick={() => setOpen(false)}
      />
    </TabActionsRoutineOptions>
  )
}

export default TabActionsRoutineOptionsView

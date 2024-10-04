import { TabsTemplate } from "pgv-lib/ui/components"

import { useTabsViewController } from "./useTabsViewController"
import TabActionRoutineOptionsView from "./ActionsTabsView/TabActionRoutineOptionsView/TabActionsRoutineOptionsView"
import TabActionPabxView from "./ActionsTabsView/TabActionPabxView/TabActionPabxView"
import { Stack } from "pgv-lib/ui/material"

const TabsView = () => {
  const { tabsWorkspace } = useTabsViewController()

  return (
    <>
      <TabsTemplate
        tabsProps={{
          tabs: tabsWorkspace,
          tabsActions: (
            <Stack useFlexGap spacing={2} direction="row">
              <TabActionPabxView />
              <TabActionRoutineOptionsView />
            </Stack>
          ),
        }}
      />
    </>
  )
}

export default TabsView

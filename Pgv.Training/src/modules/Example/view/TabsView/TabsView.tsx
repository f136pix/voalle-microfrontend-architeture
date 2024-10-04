import React from "react"

import { TabsTemplate } from "pgv-lib/ui/components"

import { useTabsViewController } from "./useTabsViewController"

export const TabsView: React.FC = () => {
  const { tabs } = useTabsViewController()

  return (
    <TabsTemplate
      tabsProps={{
        tabs,
      }}
    />
  )
}

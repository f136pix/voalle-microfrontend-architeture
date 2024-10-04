import useTabsViewController from "./useTabsViewController.tsx"
import {TabsTemplate} from "pgv-lib/ui/components"
import React from "react"

export const TabsView: React.FC = () => {
    const { tabs } = useTabsViewController()

    return (
        // <> </>
        <TabsTemplate
            tabsProps={{
            tabs
            }}
        >
        </TabsTemplate>
    )
}
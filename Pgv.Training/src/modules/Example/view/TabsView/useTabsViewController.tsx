import i18n from "lib/i18n"
import { TabsProps } from "pgv-lib/ui/components"
import { theme } from "pgv-lib/ui/themes"

import { ExampleView } from "../ExampleView/ExampleView"

const { t } = i18n

export const useTabsViewController = () => {
  const tabs: TabsProps["tabs"] = [
    {
      tabContent: t("examples.tab.title"),
      panelContent: <ExampleView />,
      tabTextActiveColor: theme.palette.primary.contrastText,
      tabTextColor: theme.palette.primary.contrastText,
      tabIndicatorColor: theme.palette.accent.crm,
      hash: "example",
    },
  ]
  return {
    tabs,
  }
}

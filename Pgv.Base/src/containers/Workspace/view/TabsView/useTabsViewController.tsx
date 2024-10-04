import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { theme } from "pgv-lib/ui/themes"
import { TabControlsProps } from "pgv-lib/ui/components"

import WidgetsTabContentView from "./WidgetsTabContentView/WidgetsTabContentView"
import ActivitiesTabContentView from "./ActivitiesTabContentView/ActivitiesTabContentView"
import EmailTabContentView from "./EmailTabContentView/EmailTabContentView"
import WelcomeView from "../WelcomeView/WelcomeView"

export const useTabsViewController = () => {
  const { t } = useTranslation()

  const tabsWorkspace: Array<TabControlsProps> = useMemo(
    () => [
      {
        tabContent: t("workspace.tabs.widgets.title"),
        tabTextColor: theme.palette.primary.contrastText,
        tabIndicatorColor: theme.palette.primary.contrastText,
        tabTextActiveColor: theme.palette.primary.contrastText,
        panelContent: <WidgetsTabContentView />,
        hash: "widgets",
        height: "240px",
        headerContent: <WelcomeView />,
        negativeNavHeight: "78px",
      },
      {
        tabContent: t("workspace.tabs.activities.title"),
        tabTextColor: theme.palette.primary.contrastText,
        tabIndicatorColor: theme.palette.primary.contrastText,
        tabTextActiveColor: theme.palette.primary.contrastText,
        panelContent: <ActivitiesTabContentView />,
        hash: "activities",
      },
      {
        tabContent: t("workspace.tabs.email.title"),
        tabTextColor: theme.palette.primary.contrastText,
        tabIndicatorColor: theme.palette.primary.contrastText,
        tabTextActiveColor: theme.palette.primary.contrastText,
        panelContent: <EmailTabContentView />,
        hash: "email",
      },
    ],
    []
  )

  return {
    tabsWorkspace,
  }
}

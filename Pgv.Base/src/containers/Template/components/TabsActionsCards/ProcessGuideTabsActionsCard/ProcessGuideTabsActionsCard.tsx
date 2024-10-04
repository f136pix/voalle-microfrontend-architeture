import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { TabsActionsCardStyled } from "./ProcessGuideTabsActionsCard.styles"
import {
  DrawerContent,
  DrawerHeaderTemplate,
  DrawerHeaderTemplateProps,
  useDrawer,
} from "pgv-lib/ui/drawer"
import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"
import { ProcessGuideTabsActionsView } from "containers/Template/view/TabsActionsView/ProcessGuideTabsActionsView/ProcessGuideTabsActionsView"

export interface ProcessGuideTabsActionsCardProps
  extends TabsActionsCardsProps {
  drawerHeader?: DrawerHeaderTemplateProps
  drawerComponent: JSX.Element
  menuId: number | string
  withFeedback?: boolean
}

export const ProcessGuideTabsActionsCard: React.FC<
  ProcessGuideTabsActionsCardProps
> = ({
  drawerHeader,
  drawerComponent,
  menuId,
  withFeedback = false,
  onClick,
  ...props
}) => {
  const { t } = useTranslation()
  const { openDrawer } = useDrawer()

  const Component = useMemo(() => {
    return (
      <>
        {drawerHeader && <DrawerHeaderTemplate {...drawerHeader} />}
        <DrawerContent>
          <ProcessGuideTabsActionsView
            menuId={menuId}
            content={drawerComponent}
            withFeedback={withFeedback}
          />
        </DrawerContent>
      </>
    )
  }, [drawerHeader, drawerComponent, menuId])

  const handleOnClick = () => {
    if (onClick) onClick()
    openDrawer({
      drawerContent: Component,
    })
  }

  return (
    <TabsActionsCardStyled
      title={t("header.tabsActionsCard.processGuide.title")}
      description={t("header.tabsActionsCard.processGuide.description")}
      icon="PaperBookmarkOutlinedPgv"
      {...props}
      onClick={handleOnClick}
    />
  )
}

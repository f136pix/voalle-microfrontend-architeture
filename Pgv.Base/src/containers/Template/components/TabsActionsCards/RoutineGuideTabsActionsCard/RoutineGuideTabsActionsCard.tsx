import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { TabsActionsCardStyled } from "./RoutineGuideTabsActionsCard.styles"
import {
  DrawerContent,
  DrawerHeaderTemplate,
  DrawerHeaderTemplateProps,
  useDrawer,
} from "pgv-lib/ui/drawer"
import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"
import { RoutineGuideTabsActionsView } from "containers/Template/view/TabsActionsView/RoutineGuideTabsActionsView/RoutineGuideTabsActionsView"

export interface RoutineGuideTabsActionsCardProps
  extends TabsActionsCardsProps {
  drawerHeader?: DrawerHeaderTemplateProps
  drawerComponent: JSX.Element
  menuId: number | string
  withFeedback?: boolean
}

export const RoutineGuideTabsActionsCard: React.FC<
  RoutineGuideTabsActionsCardProps
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
          <RoutineGuideTabsActionsView
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
      title={t("header.tabsActionsCard.routineGuide.title")}
      description={t("header.tabsActionsCard.routineGuide.description")}
      icon="GridViewOutlinedPgv"
      {...props}
      onClick={handleOnClick}
    />
  )
}

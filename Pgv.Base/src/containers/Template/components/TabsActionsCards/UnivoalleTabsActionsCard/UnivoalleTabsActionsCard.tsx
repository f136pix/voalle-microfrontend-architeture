import React from "react"
import { useTranslation } from "react-i18next"

import { TabsActionsCardStyled } from "./UnivoalleTabsActionsCard.styles"
import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"

export interface UnivoalleTabsActionsCardProps extends TabsActionsCardsProps {}

export const UnivoalleTabsActionsCard: React.FC<
  UnivoalleTabsActionsCardProps
> = ({ onClick, ...props }) => {
  const { t } = useTranslation()

  const handleOnclick = () => {
    if (onClick) onClick()
    window.open("https://universidadevoalle.com.br", "_blank")
  }

  return (
    <TabsActionsCardStyled
      title={t("header.tabsActionsCard.Univoalle.title")}
      description={t("header.tabsActionsCard.Univoalle.description")}
      icon="UnivoallePgv"
      onClick={handleOnclick}
      {...props}
    />
  )
}

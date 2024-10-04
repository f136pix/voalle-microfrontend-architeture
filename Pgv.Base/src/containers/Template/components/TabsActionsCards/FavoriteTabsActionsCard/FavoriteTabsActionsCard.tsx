import React from "react"
import { useTranslation } from "react-i18next"

import { TabsActionsCardStyled } from "./FavoriteTabsActionsCard.styles"
import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"

export interface FavoriteTabsActionsCardProps extends TabsActionsCardsProps {}

export const FavoriteTabsActionsCard: React.FC<
  FavoriteTabsActionsCardProps
> = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <TabsActionsCardStyled
      title={t("header.tabsActionsCard.favorite.title")}
      description={t("header.tabsActionsCard.favorite.description")}
      icon="StarOutline"
      {...props}
    />
  )
}

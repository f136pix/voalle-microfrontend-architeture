import React from "react"
import { useTranslation } from "react-i18next"

import { TabsActionsCardStyled } from "./DefaultOperationProcessTabsActionsCard.styles"
import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"

export interface DefaultOperationProcessTabsActionsCardProps
  extends TabsActionsCardsProps {}

export const DefaultOperationProcessTabsActionsCard: React.FC<
  DefaultOperationProcessTabsActionsCardProps
> = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <TabsActionsCardStyled
      title={t("header.tabsActionsCard.defaultOperationProcess.title")}
      description={t(
        "header.tabsActionsCard.defaultOperationProcess.description"
      )}
      icon="BookOpeningOutlinedPgv"
      {...props}
    />
  )
}

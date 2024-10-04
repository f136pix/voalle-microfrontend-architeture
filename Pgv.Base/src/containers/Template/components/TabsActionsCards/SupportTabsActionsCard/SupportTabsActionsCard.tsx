import React from "react"
import { Trans, useTranslation } from "react-i18next"

import { useDrawer } from "pgv-lib/ui/drawer"
import useAuthStore from "services/auth/auth"

import { TabsActionsCardStyled } from "./SupportTabsActionsCard.styles"
import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"
import { useNavigate } from "react-router-dom"
import { FormSupportDrawerContentView } from "containers/Template/view/DrawerContents/SupportTabsActionsDrawerContents/FormSupportDrawerContentView/FormSupportDrawerContentView"

export interface SupportTabsActionsCardProps extends TabsActionsCardsProps {
  menuId: number | string
  pageTitle: string
}

export const SupportTabsActionsCard: React.FC<SupportTabsActionsCardProps> = ({
  onClick,
  pageTitle = "",
  ...props
}) => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const { isAdmin } = useAuthStore()
  const { openDrawer } = useDrawer()

  const handleOnClick = () => {
    if (onClick) onClick()

    if (isAdmin()) {
      openDrawer({
        drawerContent: <FormSupportDrawerContentView pageTitle={pageTitle} />,
      })
      return
    }

    navigate("/support#called-support")
  }

  if (isAdmin()) {
    return (
      <TabsActionsCardStyled
        className="asupport"
        titleTypographyProps={{
          fontSize: "1rem",
        }}
        descriptionTypographyProps={{
          fontSize: "0.875rem",
        }}
        title={
          <Trans i18nKey="header.tabsActionsCard.adminSupport.title">
            Access our support <strong>24 hours</strong> a day.
          </Trans>
        }
        description={
          <Trans i18nKey="header.tabsActionsCard.adminSupport.description">
            Voalle <strong>Group Support</strong>
          </Trans>
        }
        {...props}
        onClick={handleOnClick}
      />
    )
  }

  return (
    <TabsActionsCardStyled
      title={t("header.tabsActionsCard.support.title")}
      description={t("header.tabsActionsCard.support.description")}
      icon="HeadsetMicOutlined"
      {...props}
      onClick={handleOnClick}
    />
  )
}

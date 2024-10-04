import styled from "pgv-lib/ui/emotion/styled"
import { TabsActionsCard } from "pgv-lib/ui/components"

import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"

import BgCardAdminSupportTabsAction from "assets/bg-card-support-tabs-action.png"
import { theme } from "pgv-lib/ui/themes"

export const TabsActionsCardStyled = styled(
  TabsActionsCard
)<TabsActionsCardsProps>`
  background-color: #f5f7fa;
  width: 330px;
  user-select: none;
  ${({ onClick }) => onClick && "cursor: pointer;"}

  &.asupport {
    background: url(${BgCardAdminSupportTabsAction});
    padding-left: 90px !important;
    background-size: cover;
    background-position: center;

    & .MuiCardHeader-title,
    & .MuiCardHeader-subheader {
      color: ${theme.palette.common.white};
    }
  }
`

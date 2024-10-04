import styled from "pgv-lib/ui/emotion/styled"
import { TabsActionsCard } from "pgv-lib/ui/components"

import { TabsActionsCardsProps } from "../TabsActionsCardsInterface"

export const TabsActionsCardStyled = styled(
  TabsActionsCard
)<TabsActionsCardsProps>`
  background-color: #f5f7fa;
  width: 330px;
  user-select: none;
  ${({ onClick }) => onClick && "cursor: pointer;"}
`

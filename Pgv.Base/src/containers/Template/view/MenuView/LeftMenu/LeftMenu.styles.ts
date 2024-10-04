import styled from "pgv-lib/ui/emotion/styled"
import {
  ListItemButton as ListItemButtonMUI,
  ListItemIcon as ListItemIconMUI,
  css,
} from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

interface ListItemButtonProps {
  theme?: typeof theme
}

export const ListItemButton = styled(ListItemButtonMUI)<ListItemButtonProps>`
  padding-top: 2px !important;
  padding-bottom: 2px !important;

  span {
    font-weight: 400 !important;
  }

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.palette.primary.dark} !important;
      color: ${theme.palette.primary.contrastText} !important;

      svg {
        color: ${theme.palette.primary.contrastText};
      }
    `}
`

interface ListItemIconProps {
  theme?: typeof theme
  selected?: boolean
}

export const ListItemIcon = styled(ListItemIconMUI)<ListItemIconProps>`
  color: ${({ theme }) => `${theme.palette.grey[400]} !important`};
`

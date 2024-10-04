import styled from "pgv-lib/ui/emotion/styled"
import {
  Card as CardComponent,
  CardContent as CardContentComponent,
} from "pgv-lib/ui/components"
import { theme } from "pgv-lib/ui/themes"

export const Card = styled(CardComponent)`
  height: fit-content;
  max-width: 310px;
  :hover {
    box-shadow: inset 0px 0px 0px 2px ${theme.palette.primary.dark};
  }
`

export const CardContent = styled(CardContentComponent)`
  display: flex;
  column-gap: 5px;

  .icon {
    display: flex;
    margin-top: 2px;
  }

  .description {
    display: flex;
    flex-direction: column;
  }
`

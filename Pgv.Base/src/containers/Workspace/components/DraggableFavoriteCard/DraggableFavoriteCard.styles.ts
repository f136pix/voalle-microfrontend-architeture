import styled from "pgv-lib/ui/emotion/styled"
import {
  Card as CardComponent,
  CardContent as CardContentComponent,
} from "pgv-lib/ui/components"

export const Card = styled(CardComponent)``

export const CardContent = styled(CardContentComponent)`
  display: flex;
  column-gap: 5px;
  padding: 22px 15px !important;
  align-items: center;

  .icon {
    display: flex;
    padding: 0;
    height: fit-content;
    &.drag {
      cursor: move;
      margin-right: 10px;
      margin-left: -5px;
    }
    &.star {
      color: #eabe4f;
    }
    &:hover {
      background: none;
    }
  }

  .description {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

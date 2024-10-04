import { Popper as PopperMUI } from "pgv-lib/ui/components"
import styled from "pgv-lib/ui/emotion/styled"
import { theme } from "pgv-lib/ui/themes"

export const Popper = styled(PopperMUI)`
  .MuiPaper-root {
    box-shadow: none !important;
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.background.default};
  }
  .MuiPopper-arrow {
    &::after {
      box-shadow: none !important;
      background-color: ${theme.palette.primary.main};
    }
  }

  .popper-content {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    max-width: 600px;

    > p {
      cursor: pointer;
      :hover {
        opacity: 0.8;
      }
    }
  }
`

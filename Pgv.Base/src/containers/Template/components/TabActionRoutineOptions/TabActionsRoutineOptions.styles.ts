import { Popper } from "pgv-lib/ui/components"
import styled from "pgv-lib/ui/emotion/styled"

export const Container = styled.div``

export const StyledPopper = styled(Popper)`
  .popper-content {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    max-width: 740px;
    max-height: 350px;
    padding: 16px;
    overflow-y: auto;
  }
`

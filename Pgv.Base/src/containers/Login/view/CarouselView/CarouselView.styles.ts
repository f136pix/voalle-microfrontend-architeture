import styled from "pgv-lib/ui/emotion/styled"

import { theme } from "pgv-lib/ui/themes"

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  padding: ${theme.spacing(2)};

  .carousel-container {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
`

import styled from "pgv-lib/ui/emotion/styled"
import {
  Box as BoxMUI,
  Card as CardComponent,
  CardContent as CardContentComponent,
} from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

export const Container = styled.div`
  padding: 32px;
`
export const ContainerTitle = styled(BoxMUI)`
  margin-bottom: 32px;
`
export const BoxTitle = styled(BoxMUI)`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const BoxModules = styled(BoxMUI)`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  overflow-y: auto;
  height: auto;
  max-height: 50vh;
  position: relative;
`

export const Card = styled(CardComponent)`
  cursor: pointer;
  height: fit-content;
  max-width: 310px;
  :hover {
    box-shadow: inset 0px 0px 0px 2px ${theme.palette.primary.dark};
  }
`
export const CardContent = styled(CardContentComponent)`
  padding: 12px !important;
`
export const ResultSubTitle = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;

  .result-subtitle-text {
    font-size: 14px;
  }
`

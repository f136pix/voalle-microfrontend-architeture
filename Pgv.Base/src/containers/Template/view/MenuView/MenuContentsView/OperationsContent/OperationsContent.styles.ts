import styled from "pgv-lib/ui/emotion/styled"
import { Box as BoxMUI } from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

export const Container = styled.div`
  display: flex;
  gap: 48px;
  padding: 32px;
  justify-content: space-between;

  .left-box,
  .right-box {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .left-box {
    flex: 1 70%;
  }

  .right-box {
    flex: 1 30%;
  }

  .learn-more-link {
    text-decoration: none;
    color: ${theme.palette.text.primary};

    > div > p {
      font-weight: 500;
    }
  }
`

export const BoxTitle = styled(BoxMUI)`
  margin-bottom: 32px;
`
interface BoxModules {
  loading?: boolean
}
export const BoxModules = styled(BoxMUI, {
  shouldForwardProp: (propName: string) => propName !== "loading",
})<BoxModules>`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  overflow-y: auto;
  height: ${({ loading }) => (loading ? `50vh` : `auto`)};
  max-height: 50vh;
  position: relative;
`

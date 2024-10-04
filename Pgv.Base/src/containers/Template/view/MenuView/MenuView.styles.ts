import styled from "pgv-lib/ui/emotion/styled"
import { theme } from "pgv-lib/ui/themes"

export const Navbar = styled.nav`
  display: flex;
  margin-left: 40px;
  height: 40px;
  justify-content: space-between;
  z-index: 1;
  position: fixed;
  width: calc(100vw - 40px);

  .logo-client,
  .logo-erp {
    display: flex;
    margin-inline: 25px;
  }

  .right-box,
  .left-box {
    display: flex;
    align-items: center;
    margin-inline: 25px;
    img {
      width: 115px;
    }
  }
`

interface ContainerProps {
  heightNav?: string
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: 0;
  z-index: -1;
  height: 100vh;
  width: calc(100vw - 40px);
  background-color: ${theme.palette.grey[100]};
`

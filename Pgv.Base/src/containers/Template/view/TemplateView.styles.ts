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
  align-items: center;
  background: linear-gradient(90deg, #2b4159 0%, #13283c 50%, #355371 100%);


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
  }

  .left-box {
    column-gap: 32px;
    align-items: center;
    color: ${theme.palette.primary.contrastText};
    img {
      width: 70px;
    }
    .MuiTypography-root {
      margin-top: 15px;
      line-height: 1;
    }
  }

  .right-box {
    img {
      width: 115px;
    }
    .navbar-buttons .MuiButtonBase-root {
      color: ${theme.palette.primary.contrastText};
    }
  }
`

export const ContainerTemplate = styled.div`
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

export const Content = styled.div`
  display: flex;
  height: calc(100vh - 40px);
  bottom: 0;
  position: absolute;
  width: 100%;
`

import styled from "pgv-lib/ui/emotion/styled"
import { Fade } from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

export const MenuContent = styled(Fade)`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10001;
  color: ${theme.palette.grey[900]} !important;

  .header-content {
    display: flex;
    width: 100%;
    background-color: ${theme.palette.background.default} !important;
    height: 72vh;
    position: relative;
  }

  .header-blur {
    flex: 1;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
  }

  .left-menu {
    display: flex;
    flex-direction: column;
    background-color: #f7f9fb !important;
    min-width: 278px;
    padding: 16px;
    padding-right: 0;
    padding-top: 32px;
    gap: 6px;
    .navbar-scrollable {
      width: 200px;
      overflow-y: auto;
      align-self: flex-end;
    }
    .menu-bottom-fixed {
      margin-top: auto;
      padding-inline: 16px;
    }
  }

  .right-menu {
    width: 100%;
    background: linear-gradient(90deg, #ffffff 40%, #dde8f2 100%);
  }
`

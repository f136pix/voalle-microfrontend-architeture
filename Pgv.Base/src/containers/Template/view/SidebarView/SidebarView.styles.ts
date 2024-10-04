import styled from "pgv-lib/ui/emotion/styled"
import { Badge, Button } from "pgv-lib/ui/material"

export const SidebarBox = styled.div`
  z-index: 2;
  width: 40px;
  height: 100vh;
  background-color: ${(props: any) => props.theme.palette.common.white};
  position: fixed;
`

export const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
  padding: 16px 6px;
  flex-direction: column;
  row-gap: 10px;
`

interface HeaderButtonProps {
  isOpen: boolean
}

export const HeaderButton = styled(Button, {
  shouldForwardProp: (propName: string) => propName !== "isOpen",
})<HeaderButtonProps>`
  display: flex;
  min-width: 40px !important;
  width: 40px !important;
  min-height: 40px !important;
  height: 40px !important;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 0;
  background: red;
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 0 !important;
  background: ${(props: any) =>
    props.isOpen ? `#F7F9FB !important` : `#2B4159 !important`};
  color: ${(props: any) => `${props.theme.palette.grey[400]} !important`};
  cursor: pointer;
`

export const StyledBadge = styled(Badge)(({ online, theme }: any) => ({
  "& .MuiBadge-badge": {
    width: 10,
    height: 10,
    backgroundColor: online
      ? theme.palette.success.main
      : theme.palette.error.main,
    color: online ? theme.palette.success.main : theme.palette.error.main,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: online && "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))

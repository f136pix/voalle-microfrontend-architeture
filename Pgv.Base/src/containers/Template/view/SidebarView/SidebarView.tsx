import React from "react"
import { Container, SidebarBox } from "./SidebarView.styles"
import { Avatar } from "pgv-lib/ui/material"
import Menu from "../MenuView/MenuView"
import { useSidebarViewController } from "./useSidebarViewController"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactElement | string
}

const Sidebar = ({ children }: Props) => {
  const { userAvatar } = useSidebarViewController()

  return (
    <SidebarBox aria-label="sidebar user">
      <Menu />
      <Container>
        {/* <StyledBadge
          online={online}
          variant="dot"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        > */}
        <Avatar sx={{ width: 30, height: 30 }} src={userAvatar} />
        {/* </StyledBadge> */}
        {children}
      </Container>
    </SidebarBox>
  )
}

export default Sidebar

import React from "react"
import { IconButton } from "pgv-lib/ui/components"
import { ErpVoalleWhiteLogoSVG } from "pgv-lib/ui/logos"
import { Box, Divider, Stack, Typography } from "pgv-lib/ui/material"
import ClientLogoSVG from "assets/logo_cliente.svg"
import { ExportComponentsWrapperProvider } from "providers/ExportComponentsWrapperProvider/ExportComponentsWrapperProvider"
import Sidebar from "./SidebarView/SidebarView"
import { ContainerTemplate, Content, Navbar } from "./TemplateView.styles"
import { useTemplateViewController } from "./useTemplateViewController"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactElement | string
}

const TemplateView = ({ children }: Props) => {
  const { pageTitle } = useTemplateViewController()

  return (
    <ExportComponentsWrapperProvider>
      <Sidebar />
      <Navbar>
        <Box className="left-box">
          <img src={ClientLogoSVG} />
          <Typography variant="body2">{pageTitle}</Typography>
        </Box>
        <Box className="right-box">
          <Stack
            useFlexGap
            spacing={4}
            direction="row"
            className="navbar-buttons"
            divider={
              <Divider
                flexItem
                variant="middle"
                orientation="vertical"
                sx={{ bgcolor: "primary.contrastText" }}
              />
            }
          >
            <Box component="span">
              <IconButton
                centerRipple
                size="small"
                icon="KeyboardVoiceOutlined"
              />
              <IconButton centerRipple icon="DataLossPreventionPgv" />
            </Box>
            <Box component="span">
              <IconButton centerRipple icon="ImportContactsPgv" />
              <IconButton centerRipple size="small" icon="Notifications" />
            </Box>
            <img src={ErpVoalleWhiteLogoSVG} />
          </Stack>
        </Box>
      </Navbar>
      <ContainerTemplate>
        <Content>{children}</Content>
      </ContainerTemplate>
    </ExportComponentsWrapperProvider>
  )
}

export default TemplateView

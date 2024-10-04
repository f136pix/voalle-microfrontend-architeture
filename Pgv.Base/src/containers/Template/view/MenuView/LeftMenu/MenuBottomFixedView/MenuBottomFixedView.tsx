import { List, ListItemIcon, ListItemText } from "pgv-lib/ui/material"

import { useTranslation } from "react-i18next"
import { ListItemButton } from "../LeftMenu.styles"
import { FiberNew, Logout, WidgetsOutlined } from "pgv-lib/ui/icons"
import { useMenuBottomFixedViewController } from "./useMenuBottomFixedViewController"

export const MenuBottomFixed = () => {
  const { t } = useTranslation()
  const { systemLogout, goToWorkspace } = useMenuBottomFixedViewController()

  return (
    <>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton>
          <ListItemIcon>
            <WidgetsOutlined />
          </ListItemIcon>
          <ListItemText
            primary={t("header.menu.item.workspaceTitle")}
            sx={{ marginLeft: "-22px" }}
            onClick={goToWorkspace}
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FiberNew />
          </ListItemIcon>
          <ListItemText
            primary={t("header.menu.item.newsTitle")}
            sx={{ marginLeft: "-22px" }}
          />
        </ListItemButton>
        <ListItemButton onClick={systemLogout} sx={{ marginTop: 3 }}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary={t("login.singOut.title")}
            sx={{ marginLeft: "-22px" }}
            onClick={systemLogout}
          />
        </ListItemButton>
      </List>
    </>
  )
}

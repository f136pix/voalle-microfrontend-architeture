import { List, ListItemText, Box } from "pgv-lib/ui/material"
import { InputSearch } from "pgv-lib/ui/components"
import { ListItemButton } from "./LeftMenu.styles"
import { menuList } from "../../../shared/utils/menus"
import { User } from "./UserView/UserView"
import { useMenuViewController } from "../useMenuViewController"
import { MenuBottomFixed } from "./MenuBottomFixedView/MenuBottomFixedView"
import { MenuListKeyType } from "containers/Template/types/MenuTypes"

export const LeftMenu = () => {
  const {
    userAvatar,
    setSelectedMenu,
    selectedMenu,
    searchValue,
    setSearchValue,
  } = useMenuViewController()

  return (
    <div className="left-menu">
      <User userAvatar={userAvatar} />
      <Box sx={{ alignSelf: "flex-end" }}>
        <InputSearch
          label=""
          sx={{ width: "200px", paddingRight: 3 }}
          value={searchValue}
          onChange={setSearchValue}
          withDebounce={false}
        />
      </Box>
      <List
        component="nav"
        className="navbar-scrollable"
        aria-labelledby="nested-list-subheader"
      >
        {Object.keys(menuList).map((key: string) => {
          const keyAux: MenuListKeyType = key as MenuListKeyType
          return (
            <ListItemButton
              key={key}
              onClick={() => setSelectedMenu(keyAux)}
              selected={key === selectedMenu}
            >
              <ListItemText primary={menuList[keyAux].name} />
            </ListItemButton>
          )
        })}
      </List>
      <Box className="menu-bottom-fixed">
        <MenuBottomFixed />
      </Box>
    </div>
  )
}

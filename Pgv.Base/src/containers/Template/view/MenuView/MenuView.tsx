import { Menu as MenuIcon } from "pgv-lib/ui/icons"
import MenuContainer from "./MenuContainerView/MenuContainerView"
import { HeaderButton } from "../SidebarView/SidebarView.styles"
import { useMenuViewController } from "./useMenuViewController"

const Menu = () => {
  const { isOpen, toggleOpen } = useMenuViewController(true)

  return (
    <>
      <HeaderButton isOpen={isOpen} onClick={toggleOpen}>
        <MenuIcon />
      </HeaderButton>
      <MenuContainer />
    </>
  )
}

export default Menu

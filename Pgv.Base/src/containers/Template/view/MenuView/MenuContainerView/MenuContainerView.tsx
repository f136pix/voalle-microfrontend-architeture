import { LeftMenu } from "../LeftMenu/LeftMenu"
import { MenuContents } from "../MenuContentsView/MenuContentsView"
import { MenuContent } from "./MenuContainerView.styles"
import { useMenuViewController } from "../useMenuViewController"

const MenuContainer = () => {
  const {
    isOpen,
    closeMenu,
    selectedMenu,
    loading,
    menuData,
    searchValue,
    voalleStoreData,
    encryptPhpRoute,
    loadingEncryptPhpRoute,
  } = useMenuViewController()

  return (
    <MenuContent in={isOpen}>
      <div>
        <div className="header-content">
          <LeftMenu />
          <div className="right-menu">
            <MenuContents
              selectedMenu={selectedMenu}
              closeMenu={closeMenu}
              loading={loading}
              menuData={menuData}
              searchValue={searchValue}
              voalleStoreData={voalleStoreData}
              encryptPhpRoute={encryptPhpRoute}
              loadingEncryptPhpRoute={loadingEncryptPhpRoute}
            />
          </div>
        </div>
        <div className="header-blur" onClick={closeMenu} />
      </div>
    </MenuContent>
  )
}

export default MenuContainer

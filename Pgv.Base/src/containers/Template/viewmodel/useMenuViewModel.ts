import useAuthStore from "services/auth/auth"
import { useMenuBusiness } from "../business/useMenuBusiness"

export const useMenuViewModel = () => {
  const {
    setIsOpen,
    isOpen,
    selectedMenu,
    setSelectedMenu,
    loading,
    fetchMenus,
    menuData,
    searchValue,
    setSearchValue,
    fetchVoalleStores,
    voalleStoreData,
    loadingEncryptPhpRoute,
    encryptPhpRoute,
  } = useMenuBusiness()
  const { getUserAvatar } = useAuthStore()

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setSelectedMenu("cadastros")
  }

  const closeMenu = () => {
    setIsOpen(false)
    setSelectedMenu("cadastros")
  }

  return {
    isOpen,
    getUserAvatar,
    selectedMenu,
    loading,
    menuData,
    setSelectedMenu,
    closeMenu,
    toggleOpen,
    fetchMenus,
    searchValue,
    setSearchValue,
    fetchVoalleStores,
    voalleStoreData,
    loadingEncryptPhpRoute,
    encryptPhpRoute,
  }
}

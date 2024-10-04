import { useEffect, useState } from "react"
import { useMenuViewModel } from "containers/Template/viewmodel/useMenuViewModel"
import useAuthStore from "services/auth/auth"

export const useMenuViewController = (withFetch = false) => {
  const {
    isOpen,
    selectedMenu,
    getUserAvatar,
    setSelectedMenu,
    toggleOpen,
    closeMenu,
    fetchMenus,
    menuData,
    loading,
    searchValue,
    setSearchValue,
    fetchVoalleStores,
    voalleStoreData,
    encryptPhpRoute,
    loadingEncryptPhpRoute,
  } = useMenuViewModel()

  const [userAvatar, setUserAvatar] = useState("")
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated() && withFetch && !menuData && !loading) {
      fetchMenus()
    }
    if (isAuthenticated() && withFetch && !voalleStoreData) {
      fetchVoalleStores()
    }
  }, [isAuthenticated])

  useEffect(() => {
    getUserAvatar()
      .then((avatar) => setUserAvatar(avatar))
      .catch((e: any) => {
        throw e
      })
  }, [])

  return {
    isOpen,
    userAvatar,
    selectedMenu,
    setSelectedMenu,
    closeMenu,
    toggleOpen,
    menuData,
    loading,
    searchValue,
    setSearchValue,
    voalleStoreData,
    encryptPhpRoute,
    loadingEncryptPhpRoute,
  }
}

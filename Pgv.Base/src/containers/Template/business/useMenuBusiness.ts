/* eslint-disable no-console */
import { create } from "zustand"
import { MenuListKeyType } from "../types/MenuTypes"
import {
  MenuResponseType,
  VoaleStoreResponseType,
} from "../types/MenuResponseTypes"
import {
  getMenus,
  getVoalleStore,
  postEncryptPhpRoute,
} from "../services/MenuServices"

interface MenuState {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  selectedMenu: MenuListKeyType
  setSelectedMenu: (value: MenuListKeyType) => void
  menuData?: MenuResponseType
  fetchMenus: () => Promise<void>
  encryptPhpRoute: (path: string) => Promise<string>
  voalleStoreData?: VoaleStoreResponseType[]
  fetchVoalleStores: () => Promise<void>
  loading: boolean
  loadingEncryptPhpRoute: boolean
  searchValue: string
  setSearchValue: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const useMenuStore = create<MenuState>((set) => {
  const setLoading = (loading: boolean) => set(() => ({ loading }))
  const setLoadingEncryptPhpRoute = (loadingEncryptPhpRoute: boolean) =>
    set(() => ({ loadingEncryptPhpRoute }))
  const setIsOpen = (isOpen: boolean) => set(() => ({ isOpen }))
  const setSelectedMenu = (selectedMenu: MenuListKeyType) =>
    set(() => ({ selectedMenu }))

  const setSearchValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => set(() => ({ searchValue: event.target.value }))

  const fetchMenus = async () => {
    try {
      setLoading(true)
      const { response } = await getMenus()
      if (response?.data) {
        set(() => ({ menuData: response.data }))
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const fetchVoalleStores = async () => {
    try {
      const { response } = await getVoalleStore()
      if (response?.data) {
        set(() => ({ voalleStoreData: response.data }))
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const encryptPhpRoute = async (path: string) => {
    try {
      setLoadingEncryptPhpRoute(true)
      const { response } = await postEncryptPhpRoute({
        path,
      })
      setLoadingEncryptPhpRoute(false)
      if (response?.url) {
        return response.url
      }
      return ""
    } catch (error) {
      setLoadingEncryptPhpRoute(false)
      return ""
    }
  }

  return {
    isOpen: false,
    selectedMenu: "cadastros",
    loading: false,
    loadingEncryptPhpRoute: false,
    setIsOpen,
    setSelectedMenu,
    fetchMenus,
    menuData: undefined,
    fetchVoalleStores,
    voalleStoreData: undefined,
    searchValue: "",
    setSearchValue,
    encryptPhpRoute,
  }
})

export const useMenuBusiness = () => {
  const {
    isOpen,
    setIsOpen,
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
  } = useMenuStore()

  return {
    isOpen,
    selectedMenu,
    loading,
    menuData,
    setSelectedMenu,
    setIsOpen,
    fetchMenus,
    searchValue,
    setSearchValue,
    fetchVoalleStores,
    voalleStoreData,
    loadingEncryptPhpRoute,
    encryptPhpRoute,
  }
}

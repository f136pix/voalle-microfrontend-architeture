import { MenuListType } from "containers/Template/types/MenuTypes"
import { menuList } from "../../../shared/utils/menus"
import {
  MenuResponseType,
  VoaleStoreResponseType,
} from "containers/Template/types/MenuResponseTypes"
import { SearchContent } from "./SearchContent/SearchContent"

interface Props {
  selectedMenu: keyof MenuListType
  closeMenu: () => void
  menuData?: MenuResponseType
  loading?: boolean
  searchValue?: string
  voalleStoreData?: VoaleStoreResponseType[]
  loadingEncryptPhpRoute: boolean
  encryptPhpRoute: (path: string) => Promise<string>
}

export const MenuContents = ({
  selectedMenu,
  closeMenu,
  menuData,
  loading,
  searchValue,
  voalleStoreData,
  encryptPhpRoute,
  loadingEncryptPhpRoute,
}: Props) => {
  const ContentModules = menuList[selectedMenu].content

  return (
    <div>
      {searchValue ? (
        <SearchContent
          menuData={menuData}
          loading={loading}
          searchValue={searchValue}
        />
      ) : (
        <ContentModules
          closeMenu={closeMenu}
          menuData={menuData}
          loading={loading}
          voalleStoreData={voalleStoreData}
          encryptPhpRoute={encryptPhpRoute}
          loadingEncryptPhpRoute={loadingEncryptPhpRoute}
        />
      )}
    </div>
  )
}

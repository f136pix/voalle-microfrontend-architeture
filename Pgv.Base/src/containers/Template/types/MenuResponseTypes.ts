import { IconsNameType } from "pgv-lib/ui/icons"
import { MenuListKeyType } from "./MenuTypes"

export interface MenuResponseModuleType {
  title: string
  description: string
  icon: IconsNameType
  iconColor: string
  segment: MenuListKeyType
  slug: string
  path: string
  isExternalMenu: boolean
}
export interface MenuResponseValuesType {
  title: string
  moduleSlug: string
  path: string
  isExternalMenu: boolean
}

export interface MenuResponseType {
  modules: MenuResponseModuleType[]
  values?: MenuResponseValuesType[]
}

export interface VoaleStoreResponseType {
  img: string
  title: string
  link: string
}

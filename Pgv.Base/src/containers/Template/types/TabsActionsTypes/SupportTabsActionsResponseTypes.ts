import { IconsNameType } from "pgv-lib/ui/icons"

export interface SupportTabsActionsResponseTypes {
  id: number
  code: number | string
  title: string
  description: string
  insignia: {
    icon: IconsNameType
    color: string
  }
  active: boolean
}

import { useState } from "react"
import {
  MenuResponseModuleType,
  MenuResponseType,
  MenuResponseValuesType,
} from "containers/Template/types/MenuResponseTypes"
import { MenuListKeyType } from "containers/Template/types/MenuTypes"

interface ReturnGetOperationsMenus extends MenuResponseModuleType {
  values?: MenuResponseValuesType[]
}

export const useModuleCardPopperController = ({
  segment,
  encryptPhpRoute,
}: {
  segment: MenuListKeyType
  encryptPhpRoute: (path: string) => Promise<string>
}) => {
  const [open, setOpen] = useState<boolean[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [anchorsEl, setAnchorsEl] = useState<any[]>([])

  const getOperationsMenus = (menuData?: MenuResponseType) => {
    if (menuData) {
      const menus: ReturnGetOperationsMenus[] = menuData.modules.filter(
        (mod) => mod.segment === segment
      )
      const menusWithValues: ReturnGetOperationsMenus[] = menus.map((mod) => {
        mod["values"] = menuData.values?.filter(
          (val) => val.moduleSlug === mod.slug
        )
        return mod
      })
      return menusWithValues
    } else {
      return []
    }
  }

  const handleSetOpen = (event: React.MouseEvent<HTMLElement>, i: number) => {
    const openAux = [...open]
    openAux[i] = openAux[i] ? !openAux[i] : true
    openAux.forEach((val, j) => {
      let valAux = val
      if (j !== i) {
        valAux = false
        val = valAux
      }
    })
    const anchorsElAux = [...anchorsEl]
    anchorsElAux[i] = event.currentTarget
    setAnchorsEl(anchorsElAux)
    setOpen(openAux)
  }
  const handleOnBlur = (i: number) => {
    const openAux = [...open]
    openAux[i] = false
    setOpen(openAux)
  }

  const handleOpenExternalRoute = (path: string) => {
    encryptPhpRoute(path)
      .then((res) => {
        // window.open(res, "_blank")
        window.open(`/php?url=${res}`, "_self")
        return res
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e))
  }

  return {
    handleSetOpen,
    open,
    anchorsEl,
    getOperationsMenus,
    handleOnBlur,
    handleOpenExternalRoute,
  }
}

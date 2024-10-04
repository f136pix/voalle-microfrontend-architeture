import { useTranslation } from "react-i18next"
import { SearchContentProps } from "./SearchContent"
import { MenuResponseValuesType } from "containers/Template/types/MenuResponseTypes"
import { IconsNameType } from "pgv-lib/ui/icons"
import { menuList } from "containers/Template/shared/utils/menus"

interface SearchResult {
  title: string
  subTitle: {
    icon?: IconsNameType
    iconColor: string
    text: string
  }
  path: string
}

export const useSearchContentController = ({
  searchValue,
  menuData,
}: SearchContentProps) => {
  const { t } = useTranslation()

  const getSubTitle = (value: MenuResponseValuesType) => {
    const subTitle: SearchResult["subTitle"] = {
      iconColor: "#000",
      text: "",
    }
    const module = menuData?.modules.find(
      (mod) => mod.slug === value.moduleSlug
    )
    if (module) {
      subTitle.icon = module.icon
      subTitle.iconColor = module.iconColor
      subTitle.text = `${module.title} > ${menuList[module.segment].name}`
    }

    return subTitle
  }

  const getResults = (): SearchResult[] => {
    const results: SearchResult[] = []
    menuData?.values?.forEach((value) => {
      if (
        value.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      ) {
        results.push({
          title: value.title,
          path: value.path,
          subTitle: getSubTitle(value),
        })
      }
    })

    return results
  }

  const results: SearchResult[] = getResults()

  return { t, results }
}

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { useExampleViewModel } from "modules/Example/viewmodel/useExampleViewModel"
import { onAdvancedFilter as onAdvancedFilterPgv } from "pgv-lib/functions"
import { DatagridParamsFilterType } from "pgv-lib/patterns"

const initialFilters: DatagridParamsFilterType = {
  Connector: "Or",
  Values: [
    {
      Operation: "Contains",
      PropertyName: "code",
      Value: "",
    },
    {
      Operation: "Contains",
      PropertyName: "title",
      Value: "",
    },
    {
      Operation: "Contains",
      PropertyName: "description",
      Value: "",
    },
  ],
}

export const useDatagridFilterViewController = () => {
  const { t } = useTranslation()
  const { setAdvancedFilter, advancedFilter } = useExampleViewModel()

  const filtersCount = advancedFilter.Values.length

  const [internalFilters, setInternalFilters] =
    useState<DatagridParamsFilterType>(
      advancedFilter.Values.length > 0 ? advancedFilter : initialFilters
    )

  const [open, setOpen] = useState<boolean>(false)

  const resetFilters = () => {
    setOpen(false)
    setInternalFilters(initialFilters)
    setAdvancedFilter({ ...advancedFilter, Values: [] })
  }

  const handleSetFilters = () => {
    setAdvancedFilter({ ...internalFilters })
    setOpen(false)
  }

  const toggleOpen = () => {
    if (open) {
      setInternalFilters(
        advancedFilter?.Values?.length > 0 ? advancedFilter : initialFilters
      )
    }
    setOpen(!open)
  }

  const handleOnChange = (
    index: number,
    value: string | boolean | number | null
  ) => {
    const formattedFilter = onAdvancedFilterPgv(index, value, internalFilters)
    setInternalFilters({ ...formattedFilter })
  }

  useEffect(() => {
    return () => {
      setAdvancedFilter({ ...advancedFilter, Values: [] })
    }
  }, [])

  return {
    internalFilters,
    handleOnChange,
    handleSetFilters,
    resetFilters,
    open,
    toggleOpen,
    filtersCount,
    t,
  }
}

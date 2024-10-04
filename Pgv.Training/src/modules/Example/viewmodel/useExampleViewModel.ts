import {
  onParamOrdering,
  onParamsSearch as onParamsSearchPgv,
} from "pgv-lib/functions"
import { DatagridColDef } from "pgv-lib/ui/components"

import { GridSortModel } from "@mui/x-data-grid"

import { useExampleBusiness } from "../business/useExampleBusiness"

export const useExampleViewModel = () => {
  const {
    loading,
    fetchData,
    onPageChange,
    page,
    params,
    setParams,
    values,
    advancedFilter,
    setAdvancedFilter,
    setSearchFilter,
  } = useExampleBusiness()

  const onSortModelChange = (filter: GridSortModel) => {
    const formattedParam = onParamOrdering(filter)
    setParams(formattedParam)
  }

  const onParamsSearch = (
    value: string,
    columns: readonly DatagridColDef[]
  ) => {
    const formattedParam = onParamsSearchPgv(value, columns)
    if (formattedParam) {
      setSearchFilter(formattedParam)
    }
  }

  return {
    loading,
    fetchData,
    page,
    params,
    values,
    onSortModelChange,
    onPageChange,
    onParamsSearch,
    setAdvancedFilter,
    advancedFilter,
  }
}

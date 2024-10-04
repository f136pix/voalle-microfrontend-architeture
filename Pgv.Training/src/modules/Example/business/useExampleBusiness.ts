import {
  setDatagridAdvancedFilter,
  setDatagridSearchFilter,
} from "pgv-lib/functions"
import {
  DatagridParamsFilterType,
  DatagridParamsType,
  DatagridRequestReturnType,
  DatagridStoreBase,
} from "pgv-lib/patterns"
import { create } from "zustand"

import { getCrmForms } from "../services/ExampleServices"
import { CrmFormsResponseDataType } from "../types/CrmFormsResponseType"

interface UseStore
  extends DatagridStoreBase<
    DatagridRequestReturnType<CrmFormsResponseDataType>["response"]
  > {
  searchFilter: DatagridParamsFilterType
  setSearchFilter: (filter: DatagridParamsFilterType) => void
  advancedFilter: DatagridParamsFilterType
  setAdvancedFilter: (filter: DatagridParamsFilterType) => void
}

const defaultParams: DatagridParamsType = {
  PageSize: 10,
}

const defaultValues = {
  data: [],
  totalPages: 0,
  totalRecords: 0,
}

const defaultInitialFilters: DatagridParamsFilterType = {
  Connector: "Or",
  Values: [],
}

const useStore = create<UseStore>((set, get) => {
  const setLoading = (loading: boolean) => set(() => ({ loading }))

  const setParams = (params: Partial<DatagridParamsType>) => {
    set((state) => ({ params: { ...state.params, ...params } }))
  }

  const setSearchFilter = (filter: DatagridParamsFilterType) => {
    setDatagridSearchFilter<UseStore>(filter, set, get)
  }

  const setAdvancedFilter = (filter: DatagridParamsFilterType) => {
    setDatagridAdvancedFilter<UseStore>(filter, set, get)
  }

  const onPageChange = (page: number) => {
    set(() => ({ page }))
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const params = { ...get().params, Page: get().page + 1 }
      const { response } = await getCrmForms(params)
      set(() => ({ values: response }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      set(() => ({ values: defaultValues }))
    }
  }

  return {
    loading: false,
    page: 0,
    values: defaultValues,
    params: defaultParams,
    searchFilter: { ...defaultInitialFilters },
    advancedFilter: { ...defaultInitialFilters },
    setSearchFilter,
    setAdvancedFilter,
    fetchData,
    setParams,
    onPageChange,
  }
})

export const useExampleBusiness = () => {
  const {
    fetchData,
    loading,
    onPageChange,
    page,
    params,
    setParams,
    values,
    advancedFilter,
    searchFilter,
    setAdvancedFilter,
    setSearchFilter,
  } = useStore()

  return {
    fetchData,
    loading,
    onPageChange,
    page,
    params,
    setParams,
    values,
    advancedFilter,
    searchFilter,
    setAdvancedFilter,
    setSearchFilter,
  }
}

import {create} from "zustand"
import {
    DatagridParamsFilterType,
    DatagridParamsType,
    DatagridRequestReturnType,
    DatagridStoreBase
} from "pgv-lib/patterns"
import {CrmFormsResponseDataType} from "../types/CrmFormsResponseType.ts"
import {setDatagridAdvancedFilter, setDatagridSearchFilter} from "pgv-lib/functions"
import {getCrmForms} from "../service/exampleServices.ts"

interface UseStore extends DatagridStoreBase<
    DatagridRequestReturnType<CrmFormsResponseDataType>["response"]
> {
    // Overrides not optional args
    searchFilter: DatagridParamsFilterType
    setSearchFilter: (filter: DatagridParamsFilterType) => void
    advancedFilter: DatagridParamsFilterType
    setAdvancedFilter: (filter: DatagridParamsFilterType) => void
}

// type UseStore = & DatagridStoreBase

const defaultParams: DatagridParamsType = {
    PageSize: 6
}

const defaultValues: DatagridRequestReturnType["response"] = {
    data: [],
    totalPages: 0,
    totalRecords: 0
}

const defaultInitialFilters: DatagridParamsFilterType = {
    Connector: "Or",
    Values: []
}


const useStore = create<UseStore>((set, get) => {
    const setLoading = (loading: boolean) => set(() => ({loading: loading}))

    const setParams = (params: Partial<DatagridParamsType>) => {
        set((state) => ({params: {...state.params, ...params}}))
    }
    const setSearchFilter = (filter: DatagridParamsFilterType) => {
        setDatagridSearchFilter<UseStore>(filter, set, get)
    }
    const setAdvancedFilter = (filter: DatagridParamsFilterType) => {
        setDatagridAdvancedFilter<UseStore>(filter, set, get)
    }

    const onPageChange = (page: number) => {
        set(() => ({page: page}))
    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const params = {...get().params, Page: get().page + 1}
            const {response} = await getCrmForms(params)
            set(() => ({values: response}))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            set(() => ({values: defaultValues}))
        }
    }

    return {
        loading: false,
        page: 0,
        values: defaultValues,
        params: defaultParams,
        searchFilter: {...defaultInitialFilters},
        advancedFilter: {...defaultInitialFilters},
        setSearchFilter,
        setAdvancedFilter,
        fetchData,
        setParams,
        onPageChange
    }
})

export const useExampleBusines = () => {
    // Simply passing values from store ahead since there is no embedded business rules
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
        setSearchFilter
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
        setSearchFilter
    }
}
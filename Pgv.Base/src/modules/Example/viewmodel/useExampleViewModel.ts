import {useExampleBusines} from "../business/useExampleBusines.ts"
import {GridSortModel} from "@mui/x-data-grid"
import {onParamOrdering, onParamsSearch as onParamsSearchLib} from "pgv-lib/functions"
import {DatagridColDef} from "pgv-lib/ui/components"

export const useExampleViewModel = () => {

    const {
        fetchData,
        loading,
        onPageChange,
        page,
        params,
        setParams,
        values,
        advancedFilter,
        setAdvancedFilter,
        setSearchFilter
    } = useExampleBusines()

    // Handles sort changes
    const onSortModelChange = (filter: GridSortModel) => {
        const formattedParam = onParamOrdering(filter)
        setParams(formattedParam)
    }

    // Handle search params
    const onParamsSearch = (
        value: string,
        columns: readonly DatagridColDef[]
    ) => {
        const formattedParams = onParamsSearchLib(value, columns)
        if (formattedParams) {
            setSearchFilter(formattedParams)
        }
    }

    return {
        loading,
        fetchData,
        page,
        params,
        values,
        onPageChange,
        onSortModelChange,
        onParamsSearch,
        setAdvancedFilter,
        advancedFilter,
    }
}
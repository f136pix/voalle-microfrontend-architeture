import {useEffect, useState} from "react"
import {useExampleViewModel} from "../../../viewmodel/useExampleViewModel.ts"
import {DatagridParamsFilterType} from "pgv-lib/patterns"
import {onAdvancedFilter} from "pgv-lib/functions"
import {useTranslation} from "react-i18next";

const initialFilters: DatagridParamsFilterType = {
    Connector: "Or",
    Values: [{
        Operation: "Contains",
        PropertyName: "code",
        Value: ""
    }, {
        Operation: "Contains",
        PropertyName: "title",
        Value: ""

    }, {
        Operation: "Contains",
        PropertyName: "description",
        Value: ""
    }]
}


function UseDatagridFilterViewController() {
    const {setAdvancedFilter, advancedFilter} = useExampleViewModel()

    const { t } = useTranslation()

    const filtersCount = advancedFilter.Values.length

    const [internalFilters, setInternalFilters] =
        useState<DatagridParamsFilterType>(
            advancedFilter.Values.length > 0 ? advancedFilter : initialFilters)

    const [open, setOpen] = useState<boolean>(false)

    const resetFilters = () => {
        setOpen(false)
        setInternalFilters(initialFilters)
        setAdvancedFilter({...advancedFilter, Values: []})
    }

    const handleSetFilter = () => {
        setAdvancedFilter({...internalFilters})
        setOpen(false)
    }

    const toggleOpen = () => {
        if (open) {
            setInternalFilters(
                advancedFilter.Values.length > 0 ? advancedFilter : initialFilters
            )
        }
        setOpen(!open)
    }

    const handleOnChange = (
        index: number,
        value: string | boolean | number | null
    ) => {
        const formattedFilter = onAdvancedFilter(index, value, internalFilters)
        setInternalFilters({...formattedFilter})
    }

    useEffect(() => {
        return () => {
            setAdvancedFilter({...advancedFilter, Values: []})
        }
    }, [])


    return {
        internalFilters,
        handleOnChange,
        handleSetFilter,
        resetFilters,
        open,
        toggleOpen,
        filtersCount,
        t
    }
}

export default UseDatagridFilterViewController
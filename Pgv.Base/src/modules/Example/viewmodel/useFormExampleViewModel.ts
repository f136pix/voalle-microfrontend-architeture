import {useFormExampleBusiness} from "../business/useFormExampleBusiness.ts"
import {useExampleBusines} from "../business/useExampleBusines.ts"

export const useFormExampleViewModel = () => {
    const {onSubmit, loading, getForm, formId, populateForm} = useFormExampleBusiness()
    const {fetchData} = useExampleBusines()

    return {
        onSubmit,
        loading,
        getForm,
        formId,
        fetchData,
        populateForm,
        refreshDataGridData: fetchData
    }
}
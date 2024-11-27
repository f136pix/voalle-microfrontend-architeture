import {useFormExampleViewModel} from "../../viewmodel/useFormExampleViewModel.ts"
import {useDrawer} from "pgv-lib/ui/drawer"
import {useTranslation} from "react-i18next"
import {FormExampleValidator} from "../../validators/FormExampleValidator.ts"
import {FormExampleViewState} from "./FormExampleView.tsx"
import {useEffect} from "react"

export const useFormExampleViewController = ({id} :  FormExampleViewState) => {
    const {
        onSubmit : onSubmitViewModel,
        getForm,
        loading,
        formId,
        refreshDataGridData,
        populateForm
    } = useFormExampleViewModel()

    const { closeDrawer } = useDrawer()
    const { t } = useTranslation()

    const onSubmit = async (postData: FormExampleValidator) =>{
        try {
            await onSubmitViewModel(postData)
            refreshDataGridData()
            closeDrawer()
        } catch (error: any) {
        // Empty
        }
    }

    useEffect(() => {
        if(id && populateForm) {
            populateForm(id)
        }

    }, [id])

    return {
        t,
        getForm,
        loading,
        formId,
        onSubmit,
        closeDrawer
    }
}
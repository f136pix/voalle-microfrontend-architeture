import {FormStoreBase} from "pgv-lib/patterns"
import {FormExampleValidator} from "../validators/FormExampleValidator.ts"
import {create} from "zustand"
import {v4 as uuidv4} from "uuid"
import {useForm, UseFormReturn} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {getCrmFormById, postCrmForms, putCrmForms} from "../service/exampleServices.ts"
import {populateForm as populateFormPgv} from "pgv-lib/functions"

interface FormExampleStore extends FormStoreBase<FormExampleValidator> {
}

const useStore = create<FormExampleStore>((set) => {
    const setLoading = (value: boolean) => set(() => ({loading: value}))

    const formId = uuidv4()

    let form: UseFormReturn<FormExampleValidator>

    const setForm = (formData: UseFormReturn<FormExampleValidator>) => {
        form = formData
    }

    const getForm = (): UseFormReturn<FormExampleValidator> => form

    const onSubmit = async (postData: FormExampleValidator) => {
        try {
            (setLoading(true))
            let request = postCrmForms

            // Caso esteja vindo um ID(update), realizamos o put
            if (postData?.id) request = putCrmForms
            
            const response = await request(postData)
            form.reset()
            setLoading(false)
            return response
        } catch (error: any) {
            setLoading(false)
            return error
        }
    }

    const populateForm = async (id: string | number) => {
        try {
            // Populating the form with the selected item ID
            setLoading(true)

            const {response} = await getCrmFormById(id)
            if (response) {
                populateFormPgv(form, FormExampleValidator, response)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return {
        formId,
        loading: false,
        setLoading,
        onSubmit,
        setForm,
        getForm,
        populateForm
    }
})

export const useFormExampleBusiness = () => {
    const {onSubmit, loading, getForm, setForm, formId, populateForm} = useStore()

    const form = useForm<FormExampleValidator>({
        resolver: zodResolver(FormExampleValidator)
    })

    setForm(form)

    return {
        onSubmit,
        loading,
        getForm,
        setForm,
        formId,
        populateForm
    }
}
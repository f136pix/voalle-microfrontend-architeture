import { useFormSupportDrawerContentBusiness } from "containers/Template/business/TabsActionsBusiness/SupportTabsActionsBusiness/FormSupportDrawerContentBusiness/useFormSupportDrawerContentBusiness"
import { FormSupportDrawerContent } from "containers/Template/validators/FormSupportDrawerContentValidator/FormSupportDrawerContentValidator"

export const useFormSupportDrawerContentViewModel = () => {
  const {
    onSubmit: onSubmitModel,
    loading,
    getForm,
    formId,
    populateForm,
  } = useFormSupportDrawerContentBusiness()

  const onSubmit = async (postData: FormSupportDrawerContent) => {
    await onSubmitModel(postData)
  }

  return {
    loading,
    onSubmit,
    getForm,
    formId,
    populateForm,
  }
}

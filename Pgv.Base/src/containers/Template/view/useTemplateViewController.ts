import { useTemplateViewModel } from "../viewmodel/useTemplateViewModel"

export const useTemplateViewController = () => {
  const { pageTitle, setPageTitle } =
    useTemplateViewModel()

  return {
    pageTitle,
    setPageTitle,
  }
}

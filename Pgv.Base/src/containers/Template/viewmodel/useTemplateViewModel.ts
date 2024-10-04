import { useTemplateBusiness } from "../business/useTemplateBusiness"

export interface TemplateViewModelInterface {
  pageTitle: string
  setPageTitle: (value: string) => void
}

export const useTemplateViewModel = (): TemplateViewModelInterface => {
  const { pageTitle, setPageTitle } = useTemplateBusiness()

  return {
    pageTitle,
    setPageTitle,
  }
}

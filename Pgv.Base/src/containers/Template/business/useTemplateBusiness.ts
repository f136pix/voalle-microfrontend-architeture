import { create } from "zustand"

interface TemplateState {
  pageTitle: string
  setPageTitle: (value: string) => void
}

const useTemplateStore = create<TemplateState>((set) => {
  const setPageTitle = (pageTitle: string) => set(() => ({ pageTitle }))

  return {
    pageTitle: "",
    setPageTitle,
  }
})

export const useTemplateBusiness = () => {
  const { pageTitle, setPageTitle } = useTemplateStore()

  return {
    pageTitle,
    setPageTitle,
  }
}

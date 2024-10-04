import { useEffect } from "react"

import { useTemplateController } from "hooks/useTemplateController"

export const useFormSupportDrawerHeaderViewController = () => {
  const { pageTitle, setPageTitle } = useTemplateController()

  useEffect(() => {
    setPageTitle("Cadastro/CRM")
    return () => {
      setPageTitle("")
    }
  }, [])

  return { pageTitle }
}

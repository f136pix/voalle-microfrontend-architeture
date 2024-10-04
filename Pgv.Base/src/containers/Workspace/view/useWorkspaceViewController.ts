import { useEffect } from "react"
import { useTemplateViewController } from "../../Template/view/useTemplateViewController"

export const useWorkspaceViewController = () => {
  const { pageTitle, setPageTitle } =
    useTemplateViewController()

  useEffect(() => {
    setPageTitle("Workspace")
    return () => {
      setPageTitle("")
    }
  }, [])

  return { pageTitle }
}

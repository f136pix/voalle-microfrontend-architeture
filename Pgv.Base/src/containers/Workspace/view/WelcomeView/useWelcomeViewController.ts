import { useMemo } from "react"
import { useWelcomeViewModel } from "containers/Workspace/viewmodel/useWelcomeViewModel"

export const useWelcomeViewController = () => {
  const { getPersonName } = useWelcomeViewModel()

  const personName: string = useMemo(() => getPersonName(), [])

  return { personName }
}

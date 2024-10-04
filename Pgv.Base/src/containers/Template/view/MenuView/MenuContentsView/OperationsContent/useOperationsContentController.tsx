import { useTranslation } from "react-i18next"

export const useOperationsContentController = () => {
  const { t } = useTranslation()

  return {
    t,
  }
}

import { useState } from "react"
import { useTranslation } from "react-i18next"

export const useRegistrationsContentController = () => {
  const [voalleStoreSelected, setVoalleStoreSelected] = useState(0)
  const { t } = useTranslation()
  return {
    t,
    voalleStoreSelected,
    setVoalleStoreSelected,
  }
}

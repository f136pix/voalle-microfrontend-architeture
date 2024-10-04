import { useCarouselViewModel } from "../../viewmodel/useCarouselViewModel"
import { useEffect } from "react"

export const useCarouselViewController = () => {
  const { fetchData, slides, loading } = useCarouselViewModel()

  useEffect(() => {
    fetchData()
  }, [])

  return { slides, loading }
}

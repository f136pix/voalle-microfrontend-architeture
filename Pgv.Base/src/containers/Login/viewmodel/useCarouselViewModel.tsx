import { useCarouselBusiness } from "../business/useCarouselBusiness"
import { SlideType } from "../shared/types/CarouselTypes/SlideType"

export const useCarouselViewModel = () => {
  const carouselStore = useCarouselBusiness()
  const { slides, loading } = carouselStore

  const fetchData = async () => {
    await carouselStore.fetchData()
  }

  const setSlides = async (slides: Array<SlideType>) => {
    carouselStore.setSlides(slides)
  }

  return { fetchData, setSlides, slides, loading }
}

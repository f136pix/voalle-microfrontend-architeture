import { create } from "zustand"
import { getSlidesService } from "../services/CarouselServices"
import { SlideType } from "../shared/types/CarouselTypes/SlideType"

interface CarouselStore {
  slides: Array<SlideType>
  setSlides: (slides: Array<SlideType>) => void
  loading: boolean
  setLoading: (value: boolean) => void
}

const useStore = create<CarouselStore>()((set) => {
  const setSlides = (slides: Array<SlideType>) => set(() => ({ slides }))
  const setLoading = (loading: boolean) => set(() => ({ loading }))

  return {
    slides: [],
    loading: false,
    setSlides,
    setLoading,
  }
})

export interface CarouselBusiness extends CarouselStore {
  fetchData: () => Promise<void>
}

export const useCarouselBusiness = (): CarouselBusiness => {
  const { loading, setLoading, setSlides, slides } = useStore()

  const fetchData = async (): Promise<void> => {
    setLoading(true)
    const { data } = await getSlidesService()
    setSlides(data)
    setLoading(false)
  }

  return { fetchData, loading, setLoading, setSlides, slides }
}

import { Carousel } from "pgv-lib/ui/components"
import { Container } from "./CarouselView.styles"
import { useCarouselViewController } from "./useCarouselViewController"

const CarouselView = () => {
  const { loading, slides } = useCarouselViewController()

  return (
    <Container>
      <div className="carousel-container">
        <Carousel
          loading={loading}
          slides={slides.map((slide) => (
            <img key={slide} src={slide} />
          ))}
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          autoplay={{ delay: 8000 }}
        />
      </div>
    </Container>
  )
}

export default CarouselView

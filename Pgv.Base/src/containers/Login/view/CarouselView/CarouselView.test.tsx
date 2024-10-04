import "@testing-library/jest-dom/extend-expect"
import { screen, render } from "@testing-library/react"

import CarouselView from "./CarouselView"
import * as carouselViewController from "./useCarouselViewController"

export const mockCarouselViewController =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carouselViewController as jest.MockedFunction<any>

export const contentUseCarouselViewController = {
  loading: false,
  slides: ["http://img1.com/", "http://img2.com/"],
}

describe("CarouselView", () => {
  beforeEach(() => {
    jest
      .spyOn(mockCarouselViewController, "useCarouselViewController")
      .mockImplementation(() => ({ ...contentUseCarouselViewController }))
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it("cerrectly render", async () => {
    render(<CarouselView />)
    const imgs: HTMLImageElement[] = screen.queryAllByRole("img")
    expect(imgs).toHaveLength(contentUseCarouselViewController.slides.length)

    imgs.forEach((img: HTMLImageElement) => {
      expect(
        contentUseCarouselViewController.slides.includes(img.src)
      ).toBeTruthy()
    })
  })

  it("should render without slides", async () => {
    jest
      .spyOn(mockCarouselViewController, "useCarouselViewController")
      .mockImplementation(() => ({
        ...contentUseCarouselViewController,
        slides: [],
      }))
    render(<CarouselView />)

    const imgs: HTMLImageElement[] = screen.queryAllByRole("img")
    expect(imgs).toHaveLength(0)
  })

  it("should render loading", async () => {
    jest
      .spyOn(mockCarouselViewController, "useCarouselViewController")
      .mockImplementation(() => ({
        ...contentUseCarouselViewController,
        loading: true,
      }))
    render(<CarouselView />)

    const loading: HTMLImageElement[] = screen.queryAllByRole("progressbar")
    expect(loading).toHaveLength(1)
  })
})

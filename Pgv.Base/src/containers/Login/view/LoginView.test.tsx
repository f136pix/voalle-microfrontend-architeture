import "@testing-library/jest-dom/extend-expect"
import { screen, render } from "@testing-library/react"

import LoginView from "./LoginView"
import {
  mockFormLoginViewController,
  contentUseFormLoginViewController,
} from "./FormLoginView/FormLoginView.test"
import {
  mockCarouselViewController,
  contentUseCarouselViewController,
} from "./CarouselView/CarouselView.test"

describe("Login Main", () => {
  beforeEach(() => {
    jest
      .spyOn(mockFormLoginViewController, "useFormLoginViewController")
      .mockImplementation(() => ({ ...contentUseFormLoginViewController }))

    jest
      .spyOn(mockCarouselViewController, "useCarouselViewController")
      .mockImplementation(() => ({ ...contentUseCarouselViewController }))
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it("cerrectly render", async () => {
    render(<LoginView />)
    const username = await screen.findByText("login.username.label")
    expect(username).toBeInTheDocument()
    const password = await screen.findByText("login.password.label")
    expect(password).toBeInTheDocument()
    const buttonSingIn = await screen.findByText("login.singIn.title")
    expect(buttonSingIn).toBeInTheDocument()

    const imgs: HTMLImageElement[] = screen.queryAllByRole("img")
    expect(imgs).toHaveLength(
      contentUseCarouselViewController.slides.length + 2
    )
  })
})

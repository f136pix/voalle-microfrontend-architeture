import "@testing-library/jest-dom/extend-expect"
import { screen, render } from "@testing-library/react"

import FormLoginView from "./FormLoginView"
import i18n from "lib/i18n"
const { t } = i18n
import * as formLoginViewController from "./useFormLoginViewController"

export const mockFormLoginViewController =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formLoginViewController as jest.MockedFunction<any>

export const contentUseFormLoginViewController = {
  loading: false,
  showPassword: false,
  onSubmit: () => {},
  toggleShowPassword: () => {},
  getForm: () => ({
    register: () => {},
    handleSubmit: () => {},
    formState: {
      errors: {
        password: { message: t("login.validator.loginError") },
      },
    },
  }),
}

describe("FormLoginView", () => {
  beforeEach(() => {
    jest
      .spyOn(mockFormLoginViewController, "useFormLoginViewController")
      .mockImplementation(() => ({ ...contentUseFormLoginViewController }))
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it("cerrectly render", async () => {
    render(<FormLoginView />)
    const username = await screen.findByText("login.username.label")
    expect(username).toBeInTheDocument()
    const password = await screen.findByText("login.password.label")
    expect(password).toBeInTheDocument()
    const buttonSingIn = await screen.findByText("login.singIn.title")
    expect(buttonSingIn).toBeInTheDocument()
  })

  it("should render with required fields error", async () => {
    jest
      .spyOn(mockFormLoginViewController, "useFormLoginViewController")
      .mockImplementation(() => ({
        ...contentUseFormLoginViewController,
        getForm: () => ({
          ...contentUseFormLoginViewController.getForm(),
          formState: {
            errors: {
              username: { message: t("login.validator.username.min1") },
              password: { message: t("login.validator.password.min1") },
            },
          },
        }),
      }))
    render(<FormLoginView />)

    const usernameError = await screen.findByText(
      t("login.validator.username.min1")
    )
    expect(usernameError).toBeInTheDocument()
    const passwordError = await screen.findByText(
      t("login.validator.password.min1")
    )
    expect(passwordError).toBeInTheDocument()
  })
  it("should render with invalid username error", async () => {
    jest
      .spyOn(mockFormLoginViewController, "useFormLoginViewController")
      .mockImplementation(() => ({
        ...contentUseFormLoginViewController,
        getForm: () => ({
          ...contentUseFormLoginViewController.getForm(),
          formState: {
            errors: {
              username: { message: t("login.validator.username.regex") },
            },
          },
        }),
      }))
    render(<FormLoginView />)

    const usernameError = await screen.findByText(
      t("login.validator.username.regex")
    )
    expect(usernameError).toBeInTheDocument()
  })

  it("should render with invalid username or passwaord", async () => {
    jest
      .spyOn(mockFormLoginViewController, "useFormLoginViewController")
      .mockImplementation(() => ({
        ...contentUseFormLoginViewController,
        getForm: () => ({
          ...contentUseFormLoginViewController.getForm(),
          formState: {
            errors: {
              password: { message: t("login.validator.loginError") },
            },
          },
        }),
      }))
    render(<FormLoginView />)

    const messageError = await screen.findByText(
      t("login.validator.loginError")
    )
    expect(messageError).toBeInTheDocument()
  })
})

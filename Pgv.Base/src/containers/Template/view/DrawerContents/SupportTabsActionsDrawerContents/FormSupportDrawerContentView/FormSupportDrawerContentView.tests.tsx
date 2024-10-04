import "@testing-library/jest-dom/extend-expect"
// import i18n from "lib/i18n"
// const { t } = i18n

import { screen, render } from "@testing-library/react"

import { FormSupportDrawerContentView } from "./FormSupportDrawerContentView"
import {
  contentUseFormSupportDrawerFooterViewController,
  mockUseFormSupportDrawerFooterViewController,
} from "./FormSupportDrawerFooterView/FormSupportDrawerFooterView.test"
import {
  contentUseFormSupportDrawerHeaderViewController,
  mockUseFormSupportDrawerHeaderViewController,
} from "./FormSupportDrawerHeaderView/FormSupportDrawerHeaderView.test"
import * as useFormSupportDrawerContentViewController from "./useFormSupportDrawerContentViewController"

export const mockUseFormSupportDrawerContentViewController =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormSupportDrawerContentViewController as jest.MockedFunction<any>

const formValuesSupport = {
  id: 1,
  code: 1,
  active: true,
  title: "Title",
  description: "Description",
  insignia: {
    icon: "Plus",
    color: "#000000",
  },
}

export const contentUseFormSupportDrawerContentViewController = {
  formId: "1",
  loading: false,
  formValues: formValuesSupport,
  onSubmit: () => {},
  getForm: () => ({
    control: () => ({}),
    register: () => {},
    handleSubmit: () => {},
    formState: {
      errors: {},
    },
  }),
}

const formSupportDrawerContentViewProps = {
  id: undefined,
  pageTitle: "title",
}

jest.mock(
  "pgv-mfe-base/UseTemplateController",
  () => ({
    useTemplateController: () => ({
      ...contentUseFormSupportDrawerHeaderViewController,
    }),
  }),
  { virtual: true }
)

describe("FormSupportDrawerContentView", () => {
  beforeEach(() => {
    jest
      .spyOn(
        mockUseFormSupportDrawerHeaderViewController,
        "useFormSupportDrawerHeaderViewController"
      )
      .mockImplementation(() => ({
        ...contentUseFormSupportDrawerHeaderViewController,
      }))
    jest
      .spyOn(
        mockUseFormSupportDrawerContentViewController,
        "useFormSupportDrawerContentViewController"
      )
      .mockImplementation(() => ({
        ...contentUseFormSupportDrawerContentViewController,
      }))
    jest
      .spyOn(
        mockUseFormSupportDrawerFooterViewController,
        "useFormSupportDrawerFooterViewController"
      )
      .mockImplementation(() => ({
        ...contentUseFormSupportDrawerFooterViewController,
      }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("correctly render", async () => {
    render(
      <FormSupportDrawerContentView {...formSupportDrawerContentViewProps} />
    )

    screen.debug()

    // const codeSupportLabel = await screen.findByText(
    //   "insignia.form.code.label"
    // )
    // expect(codeSupportLabel).toBeInTheDocument()

    // const titleSupportLabel = await screen.findByText(
    //   "insignia.form.title.label"
    // )
    // expect(titleSupportLabel).toBeInTheDocument()
  })

  // it("should render with loading", async () => {
  //   jest
  //     .spyOn(
  //       mockUseFormSupportDrawerContentViewController,
  //       "useFormSupportDrawerContentViewController"
  //     )
  //     .mockImplementation(() => ({
  //       ...contentUseFormSupportDrawerContentViewController,
  //       loading: true,
  //     }))

  //   render(
  //     <FormSupportDrawerContentView {...formSupportDrawerContentViewProps} />
  //   )

  //   const loading = screen.queryByRole("progressbar")
  //   expect(loading).toBeInTheDocument()
  // })

  // it("should render required fields error", async () => {
  //   jest
  //     .spyOn(
  //       mockUseFormSupportDrawerContentViewController,
  //       "useFormSupportDrawerContentViewController"
  //     )
  //     .mockImplementation(() => ({
  //       ...contentUseFormSupportDrawerContentViewController,
  //       getForm: () => ({
  //         ...contentUseFormSupportDrawerContentViewController.getForm(),
  //         formState: {
  //           errors: {
  //             code: { message: t("insignia.validator.code.min1") },
  //             title: { message: t("insignia.validator.title.min1") },
  //             description: {
  //               message: t("insignia.validator.description.min1"),
  //             },
  //             insignia: {
  //               icon: { message: t("insignia.validator.insigniaIcon.min1") },
  //               color: {
  //                 message: t("insignia.validator.insigniaColor.min1"),
  //               },
  //             },
  //           },
  //         },
  //       }),
  //     }))

  //   render(
  //     <FormSupportDrawerContentView {...formSupportDrawerContentViewProps} />
  //   )

  //   const codeMessageError = await screen.findByText(
  //     t("insignia.validator.code.min1")
  //   )
  //   const titleMessageError = await screen.findByText(
  //     t("insignia.validator.title.min1")
  //   )
  //   const descriptionMessageError = await screen.findByText(
  //     t("insignia.validator.description.min1")
  //   )
  //   const insigniaIconMessageError = await screen.findByText(
  //     t("insignia.validator.insigniaIcon.min1")
  //   )
  //   const insigniaColorMessageError = await screen.findByText(
  //     t("insignia.validator.insigniaColor.min1")
  //   )

  //   expect(codeMessageError).toBeInTheDocument()
  //   expect(titleMessageError).toBeInTheDocument()
  //   expect(descriptionMessageError).toBeInTheDocument()
  //   expect(insigniaIconMessageError).toBeInTheDocument()
  //   expect(insigniaColorMessageError).toBeInTheDocument()
  // })

  // it("should render with invalid code error", async () => {
  //   jest
  //     .spyOn(
  //       mockUseFormSupportDrawerContentViewController,
  //       "useFormSupportDrawerContentViewController"
  //     )
  //     .mockImplementation(() => ({
  //       ...contentUseFormSupportDrawerContentViewController,
  //       getForm: () => ({
  //         ...contentUseFormSupportDrawerContentViewController.getForm(),
  //         formState: {
  //           errors: {
  //             code: { message: t("insignia.validator.code.number") },
  //           },
  //         },
  //       }),
  //     }))

  //   render(
  //     <FormSupportDrawerContentView {...formSupportDrawerContentViewProps} />
  //   )

  //   const codeMessageError = await screen.findByText(
  //     t("insignia.validator.code.number")
  //   )

  //   expect(codeMessageError).toBeInTheDocument()
  // })
})

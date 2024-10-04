import "@testing-library/jest-dom/extend-expect"

import { screen, render } from "@testing-library/react"

import {
  FormSupportDrawerHeaderView,
  FormSupportDrawerHeaderViewProps,
} from "./FormSupportDrawerHeaderView"
import * as useFormSupportDrawerHeaderViewController from "./useFormSupportDrawerHeaderViewController"

export const mockUseFormSupportDrawerHeaderViewController =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormSupportDrawerHeaderViewController as jest.MockedFunction<any>

export const contentUseFormSupportDrawerHeaderViewController = {
  pageTitle: "Page Title",
}

const formSupportDrawerHeaderViewProps: FormSupportDrawerHeaderViewProps = {
  id: undefined,
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

describe("FormSupportDrawerHeaderView", () => {
  beforeEach(() => {
    jest
      .spyOn(
        mockUseFormSupportDrawerHeaderViewController,
        "useFormSupportDrawerHeaderViewController"
      )
      .mockImplementation(() => ({
        ...contentUseFormSupportDrawerHeaderViewController,
      }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("correctly render create insignia", async () => {
    render(
      <FormSupportDrawerHeaderView {...formSupportDrawerHeaderViewProps} />
    )

    const titleDrawer = screen.queryByText(
      "crmMenus.registrations.registrationsTabContent.insignia.form.titleDrawer"
    )
    expect(titleDrawer).toBeInTheDocument()

    const descriptionDrawer = screen.queryByText(
      "crmMenus.registrations.registrationsTabContent.insignia.form.descriptionDrawer"
    )
    expect(descriptionDrawer).toBeInTheDocument()
  })

  it("correctly render edit insignia", async () => {
    render(
      <FormSupportDrawerHeaderView
        {...formSupportDrawerHeaderViewProps}
        id="1"
      />
    )

    const titleDrawer = screen.queryByText(
      "crmMenus.registrations.registrationsTabContent.insignia.form.titleEditDrawer"
    )
    expect(titleDrawer).toBeInTheDocument()

    const descriptionDrawer = screen.queryByText(
      "crmMenus.registrations.registrationsTabContent.insignia.form.descriptionEditDrawer"
    )
    expect(descriptionDrawer).toBeInTheDocument()
  })
})

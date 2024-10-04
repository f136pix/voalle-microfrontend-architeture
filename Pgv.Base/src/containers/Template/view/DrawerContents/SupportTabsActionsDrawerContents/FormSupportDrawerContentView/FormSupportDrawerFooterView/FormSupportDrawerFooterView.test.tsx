import "@testing-library/jest-dom/extend-expect"
import { useDrawer } from "pgv-lib/ui/drawer"

import { screen, render, renderHook } from "@testing-library/react"

import {
  FormSupportDrawerFooterProps,
  FormSupportDrawerFooterView,
} from "./FormSupportDrawerFooterView"
import * as useFormSupportDrawerFooterViewController from "./useFormSupportDrawerFooterViewController"

export const mockUseFormSupportDrawerFooterViewController =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormSupportDrawerFooterViewController as jest.MockedFunction<any>

export const contentUseFormSupportDrawerFooterViewController = {
  closeDrawer: () => {},
}

const formSupportDrawerFooterViewProps: FormSupportDrawerFooterProps = {
  id: undefined,
  formId: "11111",
  loading: false,
}

describe("UseFormSupportDrawerFooterViewController", () => {
  beforeEach(() => {
    jest
      .mock(
        "pgv-lib/ui/drawer",
        () => ({
          useDrawer: () => ({
            ...contentUseFormSupportDrawerFooterViewController,
          }),
        }),
        { virtual: true }
      )
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

  it("should return the attributes", async () => {
    const { result } = renderHook(useDrawer)
    expect(result.current).toHaveProperty("closeDrawer")
  })
})

describe("FormSupportDrawerFooterView", () => {
  beforeEach(() => {
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

  it("correctly render create insignia", async () => {
    render(
      <FormSupportDrawerFooterView {...formSupportDrawerFooterViewProps} />
    )

    const cancelButton = screen.queryByText("common.label.close")
    expect(cancelButton).toBeInTheDocument()
    const confirmButton = screen.queryByText(
      "crmMenus.registrations.registrationsTabContent.insignia.form.createLabel"
    )
    expect(confirmButton).toBeInTheDocument()
  })

  it("correctly render edit insignia", async () => {
    render(
      <FormSupportDrawerFooterView
        {...formSupportDrawerFooterViewProps}
        id="1"
      />
    )

    const cancelButton = screen.queryByText("common.label.close")
    expect(cancelButton).toBeInTheDocument()
    const confirmButton = screen.queryByText(
      "crmMenus.registrations.registrationsTabContent.insignia.form.editLabel"
    )
    expect(confirmButton).toBeInTheDocument()
  })

  it("should close drawer on close", async () => {
    const closeDrawer = jest.spyOn(
      contentUseFormSupportDrawerFooterViewController,
      "closeDrawer"
    )

    render(
      <FormSupportDrawerFooterView {...formSupportDrawerFooterViewProps} />
    )

    const cancelButton = await screen.findByText("common.label.close")
    cancelButton.click()
    expect(closeDrawer).toHaveBeenCalled()
  })
})

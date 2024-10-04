import "@testing-library/jest-dom/extend-expect"

import { renderHook } from "@testing-library/react"

import { useFormSupportDrawerContentBusiness } from "./useFormSupportDrawerContentBusiness"

export const contentUseFormSupportDrawerContentBusiness = {
  formId: "1",
  loading: false,
  setForm: () => {},
  getForm: () => {},
  onSubmit: () => {},
  populateForm: () => {},
}

describe("UseFormSupportDrawerContentBusiness", () => {
  it("should return the attributes", () => {
    const { result } = renderHook(useFormSupportDrawerContentBusiness)
    expect(result.current).toHaveProperty("formId")
    expect(result.current).toHaveProperty("loading")
    expect(result.current).toHaveProperty("setForm")
    expect(result.current).toHaveProperty("getForm")
    expect(result.current).toHaveProperty("onSubmit")
    expect(result.current).toHaveProperty("populateForm")
  })
})

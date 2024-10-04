import { toQueryParams } from "pgv-lib/functions"
import { DatagridParamsType, DatagridRequestReturnType } from "pgv-lib/patterns"
import { get, post, put, del } from "pgv-mfe-base/Requests"

import { CrmFormsResponseDataType } from "../types/CrmFormsResponseType"
import { FormExampleValidator } from "../validators/FormExampleValidator"

export const getCrmForms = async (
  params: DatagridParamsType
): Promise<DatagridRequestReturnType<CrmFormsResponseDataType>> => {
  const { body } = await get({
    endpoint: `Crm/CrmForms?${toQueryParams(params, [])}`,
    snackbarOptions: {
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    },
  })

  if (!body.success) {
    throw body
  }

  return body
}

export const postCrmForms = async (controls: FormExampleValidator) => {
  const { body } = await post({
    endpoint: "CRM/CrmForms",
    data: controls,
  })

  if (!body.success) {
    throw body
  }

  return body
}

export const putCrmForms = async (controls: FormExampleValidator) => {
  const { id } = controls
  const { body } = await put({
    endpoint: `CRM/CrmForms/${id}`,
    data: controls,
  })

  if (!body.success) {
    throw body
  }

  return body
}

export const getCrmFormById = async ({
  id,
}: {
  id: string | number
}): Promise<{ response: CrmFormsResponseDataType }> => {
  const { body } = await get({
    endpoint: `CRM/CrmForms/${id}`,
  })

  if (!body.success) {
    throw body
  }

  return body
}

export const deleteCrmForms = async ({ id }: { id: string | number }) => {
  const { body } = await del({
    endpoint: `CRM/CrmForms/${id}`,
  })

  if (!body.success) {
    throw body
  }

  return body
}

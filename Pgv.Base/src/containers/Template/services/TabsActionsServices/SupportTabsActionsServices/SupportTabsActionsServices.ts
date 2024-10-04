// import { get } from "pgv-mfe-base/Requests"

// import { toQueryParams } from "pgv-lib/functions"
import { DatagridParamsType, DatagridRequestReturnType } from "pgv-lib/patterns"
import { openSnackbar } from "pgv-lib/ui/snackbar"

import { SupportTabsActionsResponseTypes } from "../../../types/TabsActionsTypes/SupportTabsActionsResponseTypes"
import { FormSupportDrawerContent } from "../../../validators/FormSupportDrawerContentValidator/FormSupportDrawerContentValidator"
import { insigniasResponse } from "./SupportTabsActionsServicesMock"
import { onFilterValuesMock } from "./mockUtils"

export const getSupports = async (
  params: DatagridParamsType
): Promise<DatagridRequestReturnType<SupportTabsActionsResponseTypes>> => {
  //TODO Sera feito posteriormente as rotas
  // const {body} = await get({
  //   endpoint: `Projects/Attendance/GetWaitingAssignmentsPaged?${toQueryParams(params, [])}`,
  //   snackbarOptions: {
  //     anchorOrigin: {
  //       horizontal: "right",
  //       vertical: "top"
  //     }
  //   }
  // })

  // if (!body.success) {
  //   throw body
  // }
  const values = onFilterValuesMock(insigniasResponse, params)

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          data: values,
          totalPages: 0,
          totalRecords: insigniasResponse.length,
        },
      })
    }, 500)
  )
}

export const getSupport = async (
  id: string | number
): Promise<SupportTabsActionsResponseTypes | null> => {
  //TODO Sera feito posteriormente as rotas

  const insignia = insigniasResponse.find((insignia) => insignia.id === id)

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(insignia || null)
    }, 500)
  )
}

export const postSupport = async (
  data: Omit<FormSupportDrawerContent, "id">
): Promise<void> => {
  //TODO Sera feito posteriormente as rotas
  console.log(data)

  return new Promise((resolve) =>
    setTimeout(() => {
      openSnackbar("Insígnia criada com sucesso!", {
        variant: "success",
        copyButton: false,
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      })
      resolve()
    }, 1000)
  )
}

export const putSupport = async (
  data: FormSupportDrawerContent
): Promise<void> => {
  //TODO Sera feito posteriormente as rotas
  console.log(data)

  return new Promise((resolve) =>
    setTimeout(() => {
      openSnackbar("Insígnia editada com sucesso!", {
        variant: "success",
        copyButton: false,
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      })
      resolve()
    }, 1000)
  )
}

export const deleteSupport = async (id: string | number): Promise<void> => {
  //TODO Sera feito posteriormente as rotas
  const insignia = insigniasResponse.find((insignia) => insignia.id === id)

  console.log(insignia)

  return new Promise((resolve) =>
    setTimeout(() => {
      openSnackbar("Insígnia excluída com sucesso!", {
        variant: "success",
        copyButton: false,
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      })
      resolve()
    }, 1000)
  )
}

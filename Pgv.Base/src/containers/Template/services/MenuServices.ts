// import { toQueryParams } from "pgv-lib/functions"
// import { get, post } from "services/requests/requests"
import {
  MenuResponseType,
  VoaleStoreResponseType,
} from "../types/MenuResponseTypes"
import { MenuServicesMock, voaleStoreMock } from "./MenuServicesMock"

export const getMenus = async (): Promise<{
  response: { data: MenuResponseType }
}> => {
  // const { body } = await get({
  //   endpoint: `menus/getusermenus`,
  //   showMessages: false,
  // })

  // if (!body.success) {
  //   throw body
  // }

  // return body

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          data: MenuServicesMock,
        },
      })
    }, 500)
  )
}

export const getVoalleStore = async (): Promise<{
  response: { data: VoaleStoreResponseType[] }
}> => {
  // const { body } = await get({
  //   endpoint: `rota/`,
  //   showMessages: false,
  // })

  // if (!body.success) {
  //   throw body
  // }

  // return body
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          data: voaleStoreMock,
        },
      })
    }, 500)
  )
}

export const postEncryptPhpRoute = async ({
  path,
}: {
  path: string
}): Promise<{
  response: { url: string }
}> => {
  // const { body } = await post({
  //   endpoint: `encryptphproute`,
  //   showMessages: false,
  //   data: {
  //     path,
  //     userId,
  //     personId,
  //   },
  // })

  // if (!body.success) {
  //   throw body
  // }

  // return body

  if (!path) console.warn("")

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          url: "http://synsuite.local/restricted/gv?hash=9%2FaNgekKI%2Bvh7zJ5IKpp0kREPkOKZNOavkxrfoNSUVwDapOvtgEDr6gZQwfrOKx%2F8vBPDHe5wQYR71NoqIrnZTZSTZ8UbcHZq1OXMGsCxhSvm7H0jI%2BMbiOVF1WP4dBMHmbOdy58x0OEr3GxHxR41WyXFO%2FpbmA8M9zx0TcdAunjcwfMakc4pBusviWJdGYqlepBVgBYWLY1oadrvFeuBNHA7yX8Ko1toI1q%2F6rPFHkFh3f9THeLrcj55w6txYZu9qgAYTjKZrkO4wf21VjV0w%3D%3D",
        },
      })
    }, 500)
  )
}

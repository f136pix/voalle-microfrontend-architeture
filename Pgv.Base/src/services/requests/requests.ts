/* eslint-disable @typescript-eslint/no-explicit-any */
import forEach from "lodash/forEach"
import getL from "lodash/get"
import isEmpty from "lodash/isEmpty"
import size from "lodash/size"
import toLower from "lodash/toLower"

import * as HttpService from "services/http/http"

import {
  OpenSnackbarOptionsProps,
  SnackbarKey,
  closeSnackbar,
  openSnackbar,
} from "pgv-lib/ui/snackbar"
import useAuthStore from "services/auth/auth"

import i18n from "lib/i18n"

const { t } = i18n

function getUrl({
  endpoint = "",
  apiVersion = 1,
  protocol = "http",
  port = true,
}: {
  endpoint: string
  apiVersion?: number | boolean
  protocol?: string
  port?: number | boolean
}) {
  const host = useAuthStore.getState().host
  let url = ""

  if (host.split("://").length > 1) {
    // host já tem protocolo concatenado
    url = host
  } else {
    url = `${protocol}://${host}`
  }

  if (isEmpty(host.split(":")[2]) && port) {
    if (typeof port === "boolean") {
      port = 45701
    }

    // se o host não possuir porta na string, e tiver porta setada
    url += `:${port}`
  }

  if (apiVersion) {
    url = `${url}/api/v${apiVersion}`
  }

  return `${url}/${endpoint}`
}

function getHeaders({ headers = {}, guest = false }) {
  if (!guest && useAuthStore.getState().isAuthenticated()) {
    headers = {
      ...headers,
      Authorization: `Bearer ${useAuthStore.getState().token()}`,
    }
  }
  return {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    ...headers,
  }
}

/**
 * @name typeReturnMessage
 * @description Lista contendo os tipos de mensagens que devem ser exibidas na snackbar
 * Só irá exibir quando a propriedade showMessages estiver true
 */
const typeReturnMessage = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
}

interface RequestProps {
  endpoint: string
  data?: object | string
  headers?: object
  apiVersion?: number | boolean
  protocol?: string
  port?: number | boolean
  fetchOptions?: object
  guest?: boolean
  serializeConfig?: object
  json?: any
  showSnackbarProcessing?: boolean
  showModalMessages?: boolean
  showMessages?: boolean
  snackbarOptions?: OpenSnackbarOptionsProps
  signal?: any
  showMessagesTypes?: any
}

async function request(
  service: any,
  {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    serializeConfig,
    json,
    showSnackbarProcessing = false,
    showModalMessages = false,
    showMessages = true,
    snackbarOptions = {},
    signal = null,
    showMessagesTypes = [
      typeReturnMessage.ERROR,
      typeReturnMessage.SUCCESS,
      typeReturnMessage.WARNING,
    ],
  }: RequestProps
) {
  let snackbarProcessing: SnackbarKey

  const stopSnack = () => {
    if (showSnackbarProcessing) {
      setTimeout(() => closeSnackbar(snackbarProcessing), 500)
    }
  }

  const checkMessages = (response: any) => {
    const { body } = response

    const { messages, success } = body

    if (success !== undefined) {
      if (showMessages) {
        if (showModalMessages && size(messages) > 1) {
          // mostra o modal de notificações
          // initModalMessages(showModalMessages, messages)
        } else if (!isEmpty(messages)) {
          // mostra snackbars de resposta se tiver pelo menos uma mensagem vinda da API
          forEach(messages, (content) => {
            const { type, message, code } = content
            const typeLower: OpenSnackbarOptionsProps["variant"] =
              type && type?.toLowerCase() ? type.toLowerCase() : undefined

            // Se o tipo não foi solicitado para ser exibido, deve ignorar a mensagem em questão
            if (!!typeLower && !showMessagesTypes.includes(toLower(type))) {
              return
            }

            if (code) {
              openSnackbar(`#${code}: ${message}`, {
                ...snackbarOptions,
                variant: typeLower,
              })
            } else {
              openSnackbar(`${message}`, {
                ...snackbarOptions,
                variant: typeLower,
              })
            }
          })
        }
      }

      if (!success && !guest) {
        throw body
      }
    }
  }

  try {
    /*
     * caso a rota seja autenticada e o usuário está logado mas seu token já expirou,
     * pegamos um novo token com a API para prosseguir com a solicitação original
     * */
    if (
      !guest &&
      useAuthStore.getState().isAuthenticated() &&
      useAuthStore.getState().hasExpired()
    ) {
      await useAuthStore.getState().refreshToken()
    }

    const methodOptions = {
      endpoint: getUrl({
        endpoint,
        apiVersion,
        protocol,
        port,
      }),
      headers: getHeaders({
        headers,
        guest,
      }),
      data,
      fetchOptions,
      serializeConfig,
      json,
      signal,
    }

    const method = getL(service, "name", "get")

    if (showSnackbarProcessing) {
      if (method === "get") {
        setTimeout(() => {
          snackbarProcessing = openSnackbar(t("http.processing"), {
            variant: "info",
            persist: true,
            preventDuplicate: true,
            ...snackbarOptions,
          })
        }, 500)
      } else {
        setTimeout(() => {
          snackbarProcessing = openSnackbar(t("http.working"), {
            variant: "info",
            persist: true,
            preventDuplicate: true,
            ...snackbarOptions,
          })
        }, 20000)
      }
    }

    const response = await service(methodOptions)
    stopSnack()

    if (response) {
      checkMessages(response)
    }

    return response
  } catch (e: any) {
    stopSnack()
    // logout user if status = not authorized
    if (e.status === 401) {
      if (process.env.NODE_ENV !== "development") {
        useAuthStore.getState().logout()
      }
    }
    const response = await e.json()

    if (response) {
      checkMessages({ body: response })
    }

    throw response
  }
}

async function get({
  endpoint,
  data,
  headers,
  apiVersion,
  protocol,
  port,
  fetchOptions,
  guest,
  serializeConfig,
  json,
  showSnackbarProcessing,
  showModalMessages,
  showMessages,
  snackbarOptions,
  signal,
  showMessagesTypes,
}: RequestProps) {
  return request(HttpService.get, {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    serializeConfig,
    json,
    showSnackbarProcessing,
    showModalMessages,
    showMessages,
    snackbarOptions,
    signal,
    showMessagesTypes,
  })
}

async function post({
  endpoint,
  data,
  headers,
  apiVersion,
  protocol,
  port,
  fetchOptions,
  guest,
  json,
  showSnackbarProcessing,
  showModalMessages,
  showMessages,
  snackbarOptions,
  showMessagesTypes,
}: RequestProps) {
  return request(HttpService.post, {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    json,
    showSnackbarProcessing,
    showModalMessages,
    showMessages,
    snackbarOptions,
    showMessagesTypes,
  })
}

async function put({
  endpoint,
  data,
  headers,
  apiVersion,
  protocol,
  port,
  fetchOptions,
  guest,
  json,
  showSnackbarProcessing,
  showMessages,
  showModalMessages,
  snackbarOptions,
  showMessagesTypes,
}: RequestProps) {
  return request(HttpService.put, {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    json,
    showSnackbarProcessing,
    showModalMessages,
    showMessages,
    snackbarOptions,
    showMessagesTypes,
  })
}

async function patch({
  endpoint,
  data,
  headers,
  apiVersion,
  protocol,
  port,
  fetchOptions,
  guest,
  json,
  showSnackbarProcessing,
  showModalMessages,
  snackbarOptions,
  showMessagesTypes,
}: RequestProps) {
  return request(HttpService.patch, {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    json,
    showSnackbarProcessing,
    showModalMessages,
    snackbarOptions,
    showMessagesTypes,
  })
}

async function del({
  endpoint,
  data,
  headers,
  apiVersion,
  protocol,
  port,
  fetchOptions,
  guest,
  json,
  showSnackbarProcessing,
  showModalMessages,
  snackbarOptions,
  showMessagesTypes,
}: RequestProps) {
  return request(HttpService.del, {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    json,
    showSnackbarProcessing,
    showModalMessages,
    snackbarOptions,
    showMessagesTypes,
  })
}

async function down(methodConfig: any, method: any = get) {
  return HttpService.down(methodConfig, method)
}

export { get, post, put, patch, del, down, typeReturnMessage }

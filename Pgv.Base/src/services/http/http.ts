/* eslint-disable no-console */
/* eslint-disable promise/no-nesting */
import download from "downloadjs"
import getLodash from "lodash/get"
import isEmpty from "lodash/isEmpty"
import isObject from "lodash/isObject"
import replace from "lodash/replace"
import set from "lodash/set"
import split from "lodash/split"
import trim from "lodash/trim"
import print from "print-js"

import { blobToBase64, serialize } from "pgv-lib/functions"
import { openSnackbar, closeSnackbar as closeSnack } from "pgv-lib/ui/snackbar"
import i18n from "lib/i18n"

const { t } = i18n

export interface RequestProps {
  domain?: string
  method?: string
  endpoint?: string
  data?: BodyInit
  headers?: HeadersInit
  protocol?: string
  port?: number
  fetchOptions?: object
  json?: boolean
  signal?: null
  apiVersion?: boolean
  guest?: boolean
}

function getUrl({ domain = "", endpoint = "", protocol = "", port = 0 }) {
  let url = ""
  if (protocol) {
    url = `${protocol}://`
  }
  if (domain) {
    url += domain
  }
  if (port) {
    url = `${url}:${port}`
  }

  return `${url}${endpoint}`
}

function getConfig({
  method = "",
  data,
  headers = {},
  fetchOptions = {},
}: {
  method?: string
  data?: BodyInit
  headers?: HeadersInit
  fetchOptions?: object
}): RequestInit {
  return {
    method,
    headers: !isEmpty(headers) ? headers : {},
    body: !isEmpty(data) ? data : undefined,
    ...fetchOptions,
  }
}

async function request({
  domain,
  method,
  endpoint,
  data,
  headers,
  protocol,
  port,
  fetchOptions,
  json = true,
  signal = null,
}: RequestProps) {
  const url = getUrl({
    domain,
    endpoint,
    protocol,
    port,
  })
  const config = getConfig({
    method,
    data,
    headers,
    fetchOptions,
  })

  if (signal !== null) {
    set(config, "signal", signal)
  }

  const response = await fetch(url, config)

  if (response.ok) {
    let { body } = response
    if (json) {
      try {
        body = await response.json()
      } catch (e) {
        console.log("body response isn't a valid json")
      }
    }
    return {
      response,
      status: response.status,
      headers: response.headers,
      body,
    }
  }
  throw response
}

interface GetProps extends Partial<RequestProps> {
  serializeConfig?: { clean: boolean }
}

async function get({
  domain,
  endpoint,
  data,
  headers,
  protocol,
  port,
  fetchOptions,
  json = true,
  signal = null,
  serializeConfig = { clean: false },
}: GetProps) {
  if (data) {
    endpoint += `?${serialize(data, serializeConfig)}`
  }
  return request({
    domain,
    fetchOptions,
    method: "GET",
    endpoint,
    data: undefined,
    headers,
    protocol,
    port,
    json,
    signal,
  })
}

async function post({
  domain,
  endpoint,
  data,
  headers,
  protocol,
  port,
  fetchOptions,
  json = true,
}: RequestProps) {
  if (isObject(data)) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: "POST",
    endpoint,
    data,
    headers,
    protocol,
    port,
    json,
  })
}

async function put({
  domain,
  endpoint,
  data,
  headers,
  protocol,
  port,
  fetchOptions,
  json,
}: RequestProps) {
  if (data) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: "PUT",
    endpoint,
    data,
    headers,
    protocol,
    port,
    json,
  })
}

async function patch({
  domain,
  endpoint,
  data,
  headers,
  protocol,
  port,
  fetchOptions,
  json,
}: RequestProps) {
  if (data) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: "PATCH",
    endpoint,
    data,
    headers,
    protocol,
    port,
    json,
  })
}

async function del({
  domain,
  endpoint,
  data,
  headers,
  protocol,
  port,
  fetchOptions,
  json,
}: RequestProps) {
  if (data) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: "DELETE",
    endpoint,
    data,
    headers,
    protocol,
    port,
    json,
  })
}

async function down(
  methodConfig: { instantPrintResult?: boolean } = {
    instantPrintResult: false,
  },
  method = get
) {
  const snackbar = openSnackbar(t("http.downWait"), {
    variant: "info",
    persist: true,
    preventDuplicate: true,
  })

  const closeSnackbar = () => {
    if (!isEmpty(snackbar)) {
      closeSnack(snackbar)
    }
  }

  const { instantPrintResult } = methodConfig
  delete methodConfig.instantPrintResult

  method({
    ...methodConfig,
    json: false,
  })
    .then(({ response }) => {
      // eslint-disable-next-line promise/always-return
      try {
        const contentType = response.headers.get("content-type") || ""
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let filename: any = response.headers.get("content-disposition")
        filename = split(filename, ";")
        filename = split(getLodash(filename, "[1]"), "filename=")
        filename = split(getLodash(filename, "[1]"), ";")
        filename = getLodash(filename, "[0]")
        filename = trim(filename)
        // eslint-disable-next-line promise/catch-or-return
        response
          .blob()
          .then((blob: Blob) => {
            instantPrintResult
              ? blobToBase64(blob).then((b64String) =>
                  print({
                    printable: b64String,
                    type: "pdf",
                    base64: true,
                  })
                )
              : download(
                  blob,
                  replace(filename, /[|&;$%@"<>()+,]/g, ""),
                  contentType
                )
            return true
          })
          .finally(() => closeSnackbar())
      } catch (e) {
        closeSnackbar()
        console.error("download failed", e)
        throw e
      }
    })
    .catch(() => {
      closeSnackbar()
      openSnackbar(t("http.downError"), {
        variant: "error",
        autoHideDuration: 5000,
      })
    })
}

export { get, post, put, patch, del, down }

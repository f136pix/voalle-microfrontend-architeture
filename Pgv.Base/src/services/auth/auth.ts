/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode as jwt } from "jwt-decode"
import { find, toString } from "lodash"
import lodashGet from "lodash/get"
import isEmpty from "lodash/isEmpty"
import split from "lodash/split"
import md5 from "md5"
import moment from "moment/moment"
import sha1 from "sha1"

import { serialize, toQueryParams } from "pgv-lib/functions"

import { post } from "services/requests/requests"
import { create, StateCreator } from "zustand"

import i18n from "lib/i18n"
import { avatarBase64 } from "./userAvatarMock"

const { t } = i18n

interface Guest {
  accessToken: string | null
  refreshToken: string | null
  expiresAt?: number | null
  host?: string
  syndata?: string
}

interface SaveTokens extends Guest {
  expiresIn: number | null
}

interface LoginPortal {
  cpf: string
  syndata: string
}

interface LoginAdm {
  username: string
  password: string
}

interface CompanyResponseLoginAdm {
  system_path: string
  name_database: string
  host_database: string
}

interface ResponseLoginAdm {
  company: CompanyResponseLoginAdm
}

interface Login extends LoginAdm {
  syndata: string
}

export interface AuthStoreState {
  host: string
  guest: Guest
  done: boolean
  auth: Guest
  loading: boolean
  syndata?: string
  setLoading: (val: boolean) => void
  saveHost: (host: string) => void
  saveSyndata: (syndata: string) => void
  finishLoad: () => void
  saveTokens: (val: SaveTokens) => void
  mockLogin: (
    host: string,
    username: string,
    password: string,
    syndata: string
  ) => Promise<void>
  loginAdm: (credentials: LoginAdm) => Promise<ResponseLoginAdm>
  loginPortal: (credentials: LoginPortal) => Promise<void>
  login: (credentials: Login | any, scope?: string) => Promise<void>
  refreshToken: () => Promise<void>
  authRequest: ({ data }: any) => Promise<void>
  logout: () => void
  hasExpired: () => boolean
  hasModule: (moduleId: number) => void
  token: () => string | null
  isAuthenticated: () => boolean
  getPersonName: () => string
  getPersonEmail: () => string
  getUsername: () => string
  getUserId: () => string | number
  getPersonId: () => string | number
  getProfileId: () => string | number
  getPlaceId: () => string | number
  getUserAvatar: () => Promise<string>
  getOmnichannel: () => object
  isAdmin: () => boolean
  isOmniDesk: () => boolean
  getOmniServer: () => string
  getAuthLocalStorage: () => Guest
  setAuthLocalStorage: (auth: Guest | string) => void
  populateAuthStore: () => void
}

const host = ""

export const baseAuthStore: StateCreator<AuthStoreState> = (set, get) => {
  const saveHost = (host: string) => set(() => ({ host }))

  const saveSyndata = (syndata: string) => set(() => ({ syndata }))

  const setLoading = (val: boolean) => {
    set(() => ({ loading: val }))
  }

  const saveTokens = ({
    accessToken,
    refreshToken,
    expiresIn,
    expiresAt,
    host,
    syndata,
  }: SaveTokens) => {
    // forçamos que o momento de expiracao seja 5 minutos antes do periodo que a API informa
    // ou, caso o valor vindo da API seja menor do que 5 minutos, usamos esse valor como referencia
    if (isEmpty(expiresAt)) {
      const interval = Math.min(
        Math.abs((expiresIn || 0) - 300),
        expiresIn || 0
      )
      expiresAt = +moment().add(interval, "seconds")
    }

    set((state) => ({
      auth: {
        ...state.auth,
        accessToken,
        refreshToken,
        expiresAt,
        host,
        syndata,
      },
    }))
    setAuthLocalStorage(get().auth)
  }

  const mockLogin = async (
    host: string,
    username: string,
    password: string,
    syndata: string
  ) => {
    /*
     * caso estejamos em ambiente de desenvolvimento
     * autenticamos com usuario, senha e syndata definidos no env
     * */
    console.log("ATTENTION!! Your login was injected from .env definitions")
    get().saveHost(host)

    if (!get().isAuthenticated() || get().hasExpired()) {
      const data = {
        grant_type: "password",
        scope: "syngw synpaygw offline_access",
        username,
        password,
        syndata,
      }

      await get().authRequest({ data })
    }

    get().finishLoad()
  }

  const loginAdm = async (credentials: LoginAdm) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { username, password } = credentials
      const pass = sha1(
        `${process.env.REACT_APP_SALT_PASS_LOGIN_ADM}${password}`
      )
      const token = sha1(username + pass + moment().format("YYYY-MM-DD HH"))
      const params = {
        "data[login]": username,
        "data[token]": token,
      }

      get().saveHost(`${process.env.REACT_APP_ADM_SYNSUITE}`)

      const { body } = await post({
        endpoint: "users/valida",
        data: toQueryParams(params),
        port: false,
        apiVersion: false,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      validateStatusLoginAdm(body.status)

      return body
    } catch (e: any) {
      throw e
    }
  }

  const validateStatusLoginAdm = (status: number) => {
    switch (String(status)) {
      case "1":
        return true
      case "9":
        throw {
          status: "9",
          message: t("login.adm.code9"),
        }
      case "90":
        throw {
          status: "902",
          message: t("login.adm.code90"),
        }
      case "91":
        throw {
          status: "91",
          message: t("login.adm.code91"),
        }
      case "92":
        throw {
          status: "92",
          message: t("login.adm.code92"),
        }
      case "93":
        throw {
          status: "93",
          message: t("login.adm.code93"),
        }
      case "94":
        throw {
          status: "94",
          message: t("login.adm.code94"),
        }
      default:
        throw {
          status: "502",
          message: t("login.adm.noConnectServer"),
        }
    }
  }

  const login = async (
    credentials: Login,
    scope = "syngw synpaygw offline_access"
  ) => {
    try {
      const { username, password } = credentials
      if (!username || !password) {
        throw new Error("login action need an Username and Password.")
      } else {
        const { company } = await get().loginAdm({
          username,
          password,
        })

        const part1 = btoa("235879f298db12ef6dea03b5ade3d4fd")
        const part2 = btoa(
          JSON.stringify({
            SynDb: company.name_database,
            SynHost: company.host_database,
          })
        )
        const part3 = btoa("e8d235b94c9b43fd8709d266c010c70e")

        const syndata = btoa(`${part1}:${btoa(part2)}:${part3}`)

        const data = {
          scope,
          syndata,
          username: username,
          password: sha1(
            `${process.env.REACT_APP_SALT_PASS_LOGIN_ADM}${password}`
          ),
          grant_type: "password",
        }

        get().saveSyndata(syndata)
        get().saveHost(company.system_path.slice(0, -1))

        await get().authRequest({ data })
      }
    } catch (e) {
      get().setLoading(false)
      throw e
    }
  }

  const loginPortal = async (credentials: LoginPortal) => {
    try {
      const { cpf, syndata } = credentials
      if (!cpf || !syndata) {
        throw new Error("login action need an CPF or CNPJ")
      } else {
        const data = {
          mode: "portal",
          grant_type: "password",
          scope: "syngw synpaygw offline_access",
          password: md5(`portal${moment().format("YYYYMMDD")}`),
          username: "portal",
          cpf,
          syndata,
        }
        await get().authRequest({ data })
      }
    } catch (e) {
      get().setLoading(false)
      throw e
    }
  }

  const refreshToken = async () => {
    try {
      const data = {
        grant_type: "refresh_token",
        refresh_token: get().auth.refreshToken,
      }
      get().setLoading(true)
      await get().authRequest({
        data,
      })
    } catch (e) {
      get().setLoading(false)
      throw e
    }
  }

  const authRequest = async ({ data }: any) => {
    data = {
      ...data,
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
    }
    get().setLoading(true)
    const response = await post({
      endpoint: "connect/token",
      apiVersion: false,
      port: 45700,
      guest: true, // significa que nao precisa enviar o accessToken nessa rota
      data: serialize(data, { clean: true }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const {
      body: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      },
    }: any = response

    get().saveTokens({
      accessToken,
      refreshToken,
      expiresIn,
      host: get().host,
      syndata: data.syndata,
    })
    get().setLoading(false)
  }

  const hasExpired = () => {
    const authLocalStorage: Guest = getAuthLocalStorage()
    if (!authLocalStorage.expiresAt) {
      return true
    }

    if (!get().auth) {
      set(() => ({ auth: { ...authLocalStorage } }))
    }

    const now = moment()

    return now.isSameOrAfter(authLocalStorage.expiresAt)
  }

  const isAuthenticated = () => {
    const authLocalStorage: Guest = getAuthLocalStorage()
    if (!authLocalStorage) {
      return false
    }
    if (!get().auth.accessToken) {
      set(() => ({ auth: { ...authLocalStorage } }))
    }
    return true
  }

  const getPersonName = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "personname", "")
  }
  const getPersonEmail = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "personemail", "")
  }
  const getUsername = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "login", "")
  }
  const getUserId = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "id", "")
  }
  const getPersonId = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "personid", "")
  }
  const getProfileId = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "profileid", "")
  }
  const getPlaceId = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    return lodashGet(keys, "placeid", "")
  }

  const isAdmin = () => {
    return getProfileId() === "1"
  }

  const getUserAvatar = async () => {
    const sessionAvatar = sessionStorage.getItem("avatar")
    if (get().isAuthenticated() && !sessionAvatar) {
      // const { body } = await getRequest({
      //   // TODO alterar futuramente para uma rota existente
      //   endpoint: `rota/?id=${get().getUserId()}`,
      //   showMessages: false,
      // })
      // if (!body.success) {
      //   throw body
      // }
      // return body.response.data
      sessionStorage.setItem("avatar", avatarBase64)
      return avatarBase64
    }

    if (sessionAvatar) return sessionAvatar

    return ""
  }

  const getOmnichannel = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    const livechatAgent = lodashGet(keys, "livechatagent", {})

    if (livechatAgent !== "True") {
      return {}
    }

    const omnichannel: any = lodashGet(keys, "omnichannel", {})

    if (isEmpty(omnichannel)) {
      return {}
    }

    return JSON.parse(omnichannel)
  }
  const isOmniDesk = () => {
    const keys = jwt(`${get().auth.accessToken}`)
    const isOmni: any = lodashGet(keys, "isOmni", "False")

    if (isOmni === "True") {
      return true
    }

    return false
  }
  const getOmniServer = () => {
    return `${get().host}:45704`
  }

  const hasModule = (moduleId: number) => {
    const keys = jwt(`${get().auth.accessToken}`)
    const modules = split(lodashGet(keys, "modules", ""), ",")
    const hasModule = find(modules, (o) => o === toString(moduleId))
    return !isEmpty(hasModule)
  }

  const populateAuthStore = () => {
    if (get().isAuthenticated() && !get().hasExpired()) {
      const authLocalStorage = get().getAuthLocalStorage()
      if (authLocalStorage?.host) {
        get().saveHost(authLocalStorage.host)
      }

      if (authLocalStorage?.syndata) {
        get().saveSyndata(authLocalStorage.syndata)
      }
    }
  }

  const getAuthLocalStorage = () => {
    const auth = localStorage.getItem("auth")
    if (!auth) {
      return null
    }
    return JSON.parse(auth)
  }

  const setAuthLocalStorage = (auth: Guest | string) => {
    localStorage.setItem("auth", JSON.stringify(auth))
  }

  const logout = () => {
    set((state) => ({ auth: { ...state.guest } }))
    localStorage.removeItem("auth")
    sessionStorage.removeItem("avatar")
  }

  return {
    host,
    guest: {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    },
    done: false,
    auth: {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    },
    loading: false,
    setLoading,
    finishLoad: () => set(() => ({ done: true })),
    logout,
    token: () => get().auth.accessToken,
    saveHost,
    saveSyndata,
    saveTokens,
    mockLogin,
    loginAdm,
    loginPortal,
    login,
    refreshToken,
    authRequest,
    hasExpired,
    hasModule,
    isAuthenticated,
    getPersonName,
    getPersonEmail,
    getUsername,
    getUserId,
    getPersonId,
    getProfileId,
    getPlaceId,
    getUserAvatar,
    getOmnichannel,
    isAdmin,
    isOmniDesk,
    getOmniServer,
    getAuthLocalStorage,
    setAuthLocalStorage,
    populateAuthStore,
  }
}

export const useAuthStore = create<AuthStoreState>((...a) => ({
  ...baseAuthStore(...a),
}))

export default useAuthStore

import i18n from "lib/i18n"

const { t } = i18n

import { RegistrationsContent } from "../../view/MenuView/MenuContentsView/RegistrationsContent/RegistrationsContent"
import { MenuListType } from "containers/Template/types/MenuTypes"
import { OperationsContent } from "containers/Template/view/MenuView/MenuContentsView/OperationsContent/OperationsContent"

export const menuList: MenuListType = {
  cadastros: {
    name: t("header.menu.item.registrationTitle"),
    slug: "Cadastros",
    content: RegistrationsContent,
  },
  operacoes: {
    name: t("header.menu.item.operationsTitle"),
    slug: "Operações",
    content: OperationsContent,
  },
  relatorios: {
    name: t("header.menu.item.reportsTitle"),
    slug: "reports",
    content: () => <div>{t("header.menu.item.reportsTitle")}</div>,
  },
  analises: {
    name: t("header.menu.item.analystsTitle"),
    slug: "analysts",
    content: () => <div>{t("header.menu.item.analystsTitle")}</div>,
  },
  utilitarios: {
    name: t("header.menu.item.utilitiesTitle"),
    slug: "utilities",
    content: () => <div>{t("header.menu.item.utilitiesTitle")}</div>,
  },
  integracoes: {
    name: t("header.menu.item.integrationsTitle"),
    slug: "integrations",
    content: () => <div>{t("header.menu.item.integrationsTitle")}</div>,
  },
  configuracoes: {
    name: t("header.menu.item.settingsTitle"),
    slug: "settings",
    content: () => <div>{t("header.menu.item.settingsTitle")}</div>,
  },
}

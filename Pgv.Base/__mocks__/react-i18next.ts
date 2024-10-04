// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactI18Next: any = jest.createMockFromModule("react-i18next")

reactI18Next.useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }
}
reactI18Next.initReactI18next = {
  type: "3rdParty",
  init: () => {},
}

module.exports = reactI18Next

export default {}

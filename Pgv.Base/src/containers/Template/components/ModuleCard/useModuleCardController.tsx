export const useModuleCardController = ({
  encryptPhpRoute,
}: {
  encryptPhpRoute?: (path: string) => Promise<string>
}) => {
  const handleOpenExternalRoute = (path: string) => {
    if (encryptPhpRoute) {
      encryptPhpRoute(path)
        .then((res) => {
          // window.open(res, "_blank")
          window.open(`/php?url=${res}`, "_self")
          return res
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e))
    }
  }

  return {
    handleOpenExternalRoute,
  }
}

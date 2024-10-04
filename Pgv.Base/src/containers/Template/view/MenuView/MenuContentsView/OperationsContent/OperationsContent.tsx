import { Trans } from "react-i18next"
import { Box, Typography } from "pgv-lib/ui/material"
import { BoxTitle, BoxModules, Container } from "./OperationsContent.styles"
import { useOperationsContentController } from "./useOperationsContentController"
import { MenuResponseType } from "containers/Template/types/MenuResponseTypes"
import { LoadingBrand } from "pgv-lib/ui/components"
import { ModuleCardPopper } from "containers/Template/components/ModuleCardPopper/ModuleCardPopper"
import UniVoalleCrm from "assets/uni_voalle_crm.png"
import UniVoalleSuite from "assets/uni_voalle_suite.png"
import { ArrowForward } from "pgv-lib/ui/icons"

export interface OperationsContentProps {
  menuData?: MenuResponseType
  loading?: boolean
  loadingEncryptPhpRoute: boolean
  encryptPhpRoute: (path: string) => Promise<string>
}

export const OperationsContent = ({
  menuData,
  loading,
  loadingEncryptPhpRoute,
  encryptPhpRoute,
}: OperationsContentProps) => {
  const { t } = useOperationsContentController()

  return (
    <Container>
      <Box className="left-box">
        <BoxTitle>
          <Typography variant="h4" fontWeight={300}>
            <Trans i18nKey="header.registrationsContent.title">
              Registrations by <strong>Modules</strong>
            </Trans>
          </Typography>
          <Typography>{t("header.registrationsContent.subTitle")}</Typography>
        </BoxTitle>
        <BoxModules loading={loading}>
          {loading && <LoadingBrand backgroundOpacity={0} />}
          {menuData && (
            <ModuleCardPopper
              menuData={menuData}
              segment="operacoes"
              encryptPhpRoute={encryptPhpRoute}
              loadingEncryptPhpRoute={loadingEncryptPhpRoute}
            />
          )}
        </BoxModules>
      </Box>

      <Box className="right-box">
        <BoxTitle>
          <Typography variant="h4" fontWeight={300}>
            <Trans i18nKey="header.uniVoalleContent.title">
              Uni<strong>Voalle</strong>
            </Trans>
          </Typography>
          <Typography>{t("header.uniVoalleContent.subTitle")}</Typography>
        </BoxTitle>
        <BoxModules>
          <Box width="100%">
            <Typography gutterBottom>
              {t("header.uniVoalleContent.description")}
            </Typography>
          </Box>
          <Box>
            <img src={UniVoalleCrm} width={350} />
            <a href={"#"} target="_blank" className="learn-more-link">
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography>
                  {t("header.uniVoalleContent.learnMore")}
                </Typography>
                <ArrowForward fontSize="small" />
              </Box>
            </a>
          </Box>
          <Box>
            <img src={UniVoalleSuite} width={350} />
            <a href={"#"} target="_blank" className="learn-more-link">
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography>
                  {t("header.uniVoalleContent.learnMore")}
                </Typography>
                <ArrowForward fontSize="small" />
              </Box>
            </a>
          </Box>
        </BoxModules>
      </Box>
    </Container>
  )
}

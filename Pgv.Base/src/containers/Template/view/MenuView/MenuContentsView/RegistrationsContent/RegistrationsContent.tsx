import { Trans } from "react-i18next"
import { Box, Link, Typography } from "pgv-lib/ui/material"
import { BoxTitle, BoxModules, Container } from "./RegistrationsContent.styles"
import { ModuleCard } from "../../../../components/ModuleCard/ModuleCard"
import * as Icons from "pgv-lib/ui/icons"
import { useRegistrationsContentController } from "./useRegistrationsContentController"
import {
  MenuResponseType,
  VoaleStoreResponseType,
} from "containers/Template/types/MenuResponseTypes"
import { Carousel, LoadingBrand } from "pgv-lib/ui/components"
import parse from "html-react-parser"

export interface RegistrationsContentProps {
  closeMenu: () => void
  menuData?: MenuResponseType
  loading?: boolean
  voalleStoreData?: VoaleStoreResponseType[]
  loadingEncryptPhpRoute: boolean
  encryptPhpRoute: (path: string) => Promise<string>
}

export const RegistrationsContent = ({
  closeMenu,
  menuData,
  loading,
  voalleStoreData,
  encryptPhpRoute,
}: RegistrationsContentProps) => {
  const { t, setVoalleStoreSelected, voalleStoreSelected } =
    useRegistrationsContentController()

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
          {menuData &&
            menuData.modules.map((module, index) => {
              if (module.segment === "cadastros") {
                const Icon = Icons[module.icon]
                return !module.isExternalMenu ? (
                  <Link
                    key={index}
                    href={module.path}
                    sx={{ textDecoration: "none" }}
                    color={"inherit"}
                  >
                    <ModuleCard
                      key={module.slug}
                      icon={<Icon sx={{ color: module.iconColor }} />}
                      title={parse(module.title)}
                      subTitle={parse(module.description)}
                      onClick={() => closeMenu()}
                      isExternalMenu={module.isExternalMenu}
                    />
                  </Link>
                ) : (
                  <ModuleCard
                    key={module.slug}
                    icon={<Icon sx={{ color: module.iconColor }} />}
                    title={parse(module.title)}
                    subTitle={parse(module.description)}
                    onClick={() => closeMenu()}
                    encryptPhpRoute={encryptPhpRoute}
                    isExternalMenu={module.isExternalMenu}
                  />
                )
              }
            })}
        </BoxModules>
      </Box>

      <Box className="right-box">
        <BoxTitle>
          <Typography variant="h4" fontWeight={300}>
            <Trans i18nKey="header.voalleStoreContent.title">
              Registrations by <strong>Modules</strong>
            </Trans>
          </Typography>
          <Typography>{t("header.voalleStoreContent.subTitle")}</Typography>
        </BoxTitle>
        <BoxModules>
          <Box width="100%">
            <Typography gutterBottom>
              {t("header.voalleStoreContent.description")}
            </Typography>
          </Box>
          <Box>
            <Box>
              {voalleStoreData &&
                voalleStoreData.map((data, i) => (
                  <Typography
                    key={i}
                    fontWeight={500}
                    gutterBottom
                    sx={{
                      textDecoration:
                        voalleStoreSelected === i ? "underline" : "none",
                    }}
                  >
                    {data.title}
                  </Typography>
                ))}
            </Box>
            <Box className="carousel-box">
              {voalleStoreData && (
                <Carousel
                  autoplay={{
                    delay: 7000,
                  }}
                  onSlideChange={(swipper) =>
                    setVoalleStoreSelected(swipper.activeIndex)
                  }
                  slides={voalleStoreData.map((data) => (
                    <img key={data.title} src={data.img} />
                  ))}
                />
              )}
            </Box>
            {voalleStoreData && (
              <a
                href={voalleStoreData[voalleStoreSelected].link}
                target="_blank"
                className="more-link"
              >
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Typography>{t("header.voalleStoreContent.more")}</Typography>
                  <Icons.ArrowForward fontSize="small" />
                </Box>
              </a>
            )}
          </Box>
        </BoxModules>
      </Box>
    </Container>
  )
}

import { MenuResponseType } from "containers/Template/types/MenuResponseTypes"
import {
  BoxModules,
  ContainerTitle,
  BoxTitle,
  Container,
  Card,
  CardContent,
  ResultSubTitle,
} from "./SearchContent.styles"
import { Link, Typography } from "pgv-lib/ui/material"
import { useSearchContentController } from "./useSearchContentController"
import * as Icons from "pgv-lib/ui/icons"
import { Search, Square } from "pgv-lib/ui/icons"
import { LoadingBrand } from "pgv-lib/ui/components"

export interface SearchContentProps {
  menuData?: MenuResponseType
  loading?: boolean
  searchValue: string
}

export const SearchContent: React.FC<SearchContentProps> = ({
  searchValue,
  loading,
  menuData,
}) => {
  const { t, results } = useSearchContentController({
    searchValue,
    loading,
    menuData,
  })
  return (
    <Container>
      <ContainerTitle>
        <BoxTitle>
          <Typography variant="h4" fontWeight={300}>
            {t("header.searchContent.title")}
          </Typography>
          <Search style={{ fontSize: "32px", marginTop: "4px" }} />
        </BoxTitle>
        <Typography>{t("header.searchContent.subTitle")}</Typography>
      </ContainerTitle>
      <BoxModules>
        {loading && <LoadingBrand backgroundOpacity={0} />}
        {menuData &&
          searchValue &&
          results.map((result) => {
            const Icon = result?.subTitle?.icon
              ? Icons[result.subTitle.icon]
              : Square
            return (
              <Card>
                <Link
                  href={result.path}
                  sx={{ textDecoration: "none" }}
                  color={"inherit"}
                >
                  <CardContent
                    sx={{ p: "6px", paddingBottom: "6px !important" }}
                  >
                    <Typography fontWeight={"500"}>{result.title}</Typography>
                    <ResultSubTitle>
                      <Icon
                        style={{
                          color: result.subTitle.iconColor,
                          fontSize: "20px",
                        }}
                      />
                      <div className="result-subtitle-text">
                        {result.subTitle.text}
                      </div>
                    </ResultSubTitle>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
      </BoxModules>
    </Container>
  )
}

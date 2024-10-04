import { Box, CardActionArea, Typography } from "pgv-lib/ui/material"
import { Card, CardContent } from "./ModuleCard.styles"
import { useModuleCardController } from "./useModuleCardController"

export interface ModuleCardProps {
  title: JSX.Element | JSX.Element[] | string
  subTitle: JSX.Element | JSX.Element[] | string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  icon?: JSX.Element | string
  id?: string
  isExternalMenu: boolean
  encryptPhpRoute?: (path: string) => Promise<string>
  path?: string
}

export const ModuleCard = ({
  icon,
  title,
  subTitle,
  onClick,
  id,
  isExternalMenu,
  encryptPhpRoute,
  path = "",
  ...props
}: ModuleCardProps) => {
  const { handleOpenExternalRoute } = useModuleCardController({
    encryptPhpRoute,
  })

  return (
    <Card
      onClick={(event) => {
        if (isExternalMenu) {
          handleOpenExternalRoute(path)
          if (onClick) onClick(event)
        } else {
          if (onClick) onClick(event)
        }
      }}
      variant="outlined"
      id={id}
      {...props}
    >
      <CardActionArea>
        <CardContent>
          <Box className="icon">{icon}</Box>
          <Box className="description">
            <Typography fontSize="18px" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {subTitle}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

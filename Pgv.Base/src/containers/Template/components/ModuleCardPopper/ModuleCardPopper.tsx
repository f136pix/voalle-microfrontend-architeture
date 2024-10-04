import { MenuListKeyType } from "containers/Template/types/MenuTypes"
import React from "react"
import { useModuleCardPopperController } from "./useModuleCardPopperController"
import { MenuResponseType } from "containers/Template/types/MenuResponseTypes"
import { ModuleCard } from "../ModuleCard/ModuleCard"
import { StyledPopper } from "../StyledPopper/StyledPopper"
import { PopperContent } from "pgv-lib/ui/components"
import { Link, Typography } from "pgv-lib/ui/material"
import parse from "html-react-parser"
import * as Icons from "pgv-lib/ui/icons"

export interface ModuleCardPopperProps {
  segment: MenuListKeyType
  menuData: MenuResponseType
  loadingEncryptPhpRoute: boolean
  encryptPhpRoute: (path: string) => Promise<string>
}

export const ModuleCardPopper: React.FC<ModuleCardPopperProps> = ({
  segment,
  menuData,
  loadingEncryptPhpRoute,
  encryptPhpRoute,
}) => {
  const {
    anchorsEl,
    getOperationsMenus,
    handleOnBlur,
    handleSetOpen,
    open,
    handleOpenExternalRoute,
  } = useModuleCardPopperController({
    segment,
    encryptPhpRoute,
  })

  return getOperationsMenus(menuData).map((module, i) => {
    if (module.segment === segment) {
      const Icon = Icons[module.icon]
      return (
        <div>
          <ModuleCard
            key={module.slug}
            icon={<Icon sx={{ color: module.iconColor }} />}
            title={parse(module.title)}
            subTitle={parse(module.description)}
            onClick={(event) => handleSetOpen(event, i)}
            isExternalMenu={false}
          />
          {module?.values && module.values.length > 0 && (
            <StyledPopper
              arrow
              open={open[i]}
              transition
              anchorEl={anchorsEl[i]}
              id={`module-card-itens-${i}`}
              onBlur={() => handleOnBlur(i)}
              style={{
                zIndex: 9999,
              }}
              flip={{ enabled: true }}
            >
              <PopperContent>
                <div className="popper-content">
                  {module?.values?.map((value) =>
                    !value.isExternalMenu ? (
                      <Typography key={value.title}>
                        <Link
                          href={value.path}
                          sx={{ textDecoration: "none" }}
                          color={"inherit"}
                        >
                          {value.title}
                        </Link>
                      </Typography>
                    ) : (
                      <Typography
                        key={value.title}
                        onClick={
                          loadingEncryptPhpRoute
                            ? () => {}
                            : () => handleOpenExternalRoute(value.path)
                        }
                      >
                        {value.title}
                      </Typography>
                    )
                  )}
                </div>
              </PopperContent>
            </StyledPopper>
          )}
        </div>
      )
    }
  })
}

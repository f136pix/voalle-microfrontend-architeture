import { Dispatch, SetStateAction } from "react"

import { IconButton } from "pgv-lib/ui/components"
import { Box } from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

import { useTabActionPabxController } from "./useTabActionPabxController"
import { StyledPopper } from "./TabActionPabx.styles"

export interface TabActionPabxProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const TabActionPabx: React.FC<TabActionPabxProps> = ({
  open,
  setOpen,
  children,
}) => {
  const {
    anchorTabsActionRef,
    handleOpenTabsActions,
    handleOnBlurTabsActions,
  } = useTabActionPabxController(setOpen)

  return (
    <>
      <div
        ref={anchorTabsActionRef}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <IconButton
          centerRipple
          icon="PabxTwoTonePgv"
          sx={{ color: theme.palette.primary.contrastText }}
          onClick={handleOpenTabsActions}
        />
      </div>

      <StyledPopper
        transition
        open={open}
        id="info-popper"
        placement="bottom-end"
        anchorEl={anchorTabsActionRef.current}
        preventOverflow={{
          enabled: true,
          altAxis: true,
        }}
        onBlur={handleOnBlurTabsActions}
      >
        <Box className="popper-content">{children}</Box>
      </StyledPopper>
    </>
  )
}

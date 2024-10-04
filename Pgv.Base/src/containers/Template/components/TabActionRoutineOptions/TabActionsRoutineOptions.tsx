import { Dispatch, SetStateAction } from "react"

import { IconButton } from "pgv-lib/ui/components"
import { Box } from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

import { StyledPopper } from "./TabActionsRoutineOptions.styles"
import { useTabActionsRoutineOptionsController } from "./useTabActionsRoutineOptionsController"

export interface TabActionsRoutineOptionsProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const TabActionsRoutineOptions: React.FC<
  TabActionsRoutineOptionsProps
> = ({ open, setOpen, children }) => {
  const {
    anchorTabsActionRef,
    handleOpenTabsActions,
    handleOnBlurTabsActions,
  } = useTabActionsRoutineOptionsController(setOpen)

  return (
    <>
      <div
        ref={anchorTabsActionRef}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <IconButton
          centerRipple
          icon="AppsPgv"
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

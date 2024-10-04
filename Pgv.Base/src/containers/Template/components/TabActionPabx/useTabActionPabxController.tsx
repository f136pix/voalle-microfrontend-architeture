import { Dispatch, SetStateAction, useRef } from "react"

export const useTabActionPabxController = (
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const anchorTabsActionRef = useRef(null)

  const handleOpenTabsActions = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleOnBlurTabsActions = () => {
    setOpen(false)
  }

  return {
    anchorTabsActionRef,
    handleOpenTabsActions,
    handleOnBlurTabsActions,
  }
}

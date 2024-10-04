import { useState } from "react"

export const useTabActionsRoutineOptionsViewController = () => {
  const [open, setOpen] = useState<boolean>(false)

  return {
    open,
    setOpen,
  }
}

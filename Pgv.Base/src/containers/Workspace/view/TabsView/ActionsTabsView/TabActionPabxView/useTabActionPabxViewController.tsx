import { useState } from "react"

export const useTabActionPabxViewController = () => {
  const [open, setOpen] = useState<boolean>(false)

  return {
    open,
    setOpen,
  }
}

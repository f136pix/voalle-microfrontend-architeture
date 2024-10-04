import { PopperProps } from "pgv-lib/ui/components"
import { Popper } from "./StyledPopper.styles"
import React from "react"

interface StyledPopperProps extends PopperProps {}

export const StyledPopper: React.FC<StyledPopperProps> = ({
  children,
  ...props
}) => {
  return (
    <Popper placement="bottom-start" {...props}>
      {children}
    </Popper>
  )
}

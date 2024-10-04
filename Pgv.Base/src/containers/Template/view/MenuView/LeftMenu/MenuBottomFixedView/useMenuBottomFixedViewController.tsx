import { useNavigate } from "react-router-dom"
import useAuthStore from "services/auth/auth"
import { useMenuViewModel } from "containers/Template/viewmodel/useMenuViewModel"

export const useMenuBottomFixedViewController = () => {
  const { logout } = useAuthStore()
  const { closeMenu } = useMenuViewModel()

  const systemLogout = () => {
    closeMenu()
    logout()
  }

  const navigate = useNavigate()

  const goToWorkspace = () => {
    closeMenu()
    navigate("/")
  }

  return {
    goToWorkspace,
    systemLogout,
    navigate,
  }
}

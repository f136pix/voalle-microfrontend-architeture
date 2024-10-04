import useAuthStore from "services/auth/auth"

interface WelcomeViewModelInterface {
  getPersonName: () => string
}

export const useFavoritesViewModel = (): WelcomeViewModelInterface => {
  const { getPersonName } = useAuthStore()

  return { getPersonName }
}

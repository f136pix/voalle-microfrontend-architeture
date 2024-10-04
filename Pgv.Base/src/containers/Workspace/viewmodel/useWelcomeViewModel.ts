import useAuthStore from "services/auth/auth"

interface WelcomeViewModelInterface {
  getPersonName: () => string
}

export const useWelcomeViewModel = (): WelcomeViewModelInterface => {
  const { getPersonName } = useAuthStore()

  return { getPersonName }
}

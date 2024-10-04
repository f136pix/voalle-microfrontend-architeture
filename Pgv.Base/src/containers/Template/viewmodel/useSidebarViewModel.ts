import useAuthStore from "services/auth/auth"

export const useSidebarViewModel = () => {
  const { getUserAvatar } = useAuthStore()

  return {
    getUserAvatar,
  }
}

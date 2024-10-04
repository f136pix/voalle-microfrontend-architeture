import { useEffect, useState } from "react"
import { useSidebarViewModel } from "../../viewmodel/useSidebarViewModel"

export const useSidebarViewController = () => {
  const { getUserAvatar } = useSidebarViewModel()

  const [userAvatar, setUserAvatar] = useState("")

  useEffect(() => {
    getUserAvatar()
      .then((avatar) => setUserAvatar(avatar))
      .catch((e: any) => {
        throw e
      })
  }, [])

  return { userAvatar }
}

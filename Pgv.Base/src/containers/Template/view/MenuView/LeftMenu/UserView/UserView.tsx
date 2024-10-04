import { Avatar, Typography } from "pgv-lib/ui/material"
import { useAuthStore } from "services/auth/auth"

import { AvatarInfo, Container } from "./UserView.styles"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export const User = ({ userAvatar }: { userAvatar: string }) => {
  const { getPersonName } = useAuthStore()
  const { t } = useTranslation()

  const name = useMemo(() => {
    const nameSplit = getPersonName().split(" ")
    return `${nameSplit[0]} ${nameSplit[nameSplit.length - 1]}`
  }, [getPersonName])

  return (
    <>
      <Container onClick={() => {}}>
        <Avatar sx={{ width: 48, height: 48 }} src={userAvatar} />
        <AvatarInfo>
          <Typography variant="body2" lineHeight={0.8}>
            {t("header.user.welcome")}
          </Typography>
          <Typography fontWeight="bold" variant="body1">
            {name}
          </Typography>
          {/* <StatusUser>
            <Badge color="success" variant="dot" />
            <Typography variant="body2">Online</Typography>
          </StatusUser> */}
        </AvatarInfo>
      </Container>
    </>
  )
}

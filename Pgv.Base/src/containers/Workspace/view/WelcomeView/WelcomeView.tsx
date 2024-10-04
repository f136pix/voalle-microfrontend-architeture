import { Typography } from "pgv-lib/ui/material"
import { Trans } from "react-i18next"
import { useWelcomeViewController } from "./useWelcomeViewController"
import { Container } from "./WelcomeView.styles"
import WorkspaceHandIcon from "assets/workspace_hand.png"

const WelcomeView = () => {
  const { personName } = useWelcomeViewController()

  return (
    <Container>
      <Typography variant="h5" color="primary.contrastText">
        <Trans i18nKey="workspace.welcome.title" values={{ personName }}>
          Welcome, <span style={{ fontWeight: 500 }}></span>
        </Trans>
      </Typography>
      <img src={WorkspaceHandIcon} />
    </Container>
  )
}

export default WelcomeView

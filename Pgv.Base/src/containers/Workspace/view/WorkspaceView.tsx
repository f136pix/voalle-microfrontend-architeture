import TabsView from "./TabsView/TabsView"
import { Container } from "./WorkspaceView.styles"
import { useWorkspaceViewController } from "./useWorkspaceViewController"

export const WorkspaceView = () => {
  useWorkspaceViewController()

  return (
    <Container>
      <TabsView />
    </Container>
  )
}

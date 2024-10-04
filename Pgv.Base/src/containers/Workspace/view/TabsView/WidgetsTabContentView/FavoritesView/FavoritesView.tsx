import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader } from "pgv-lib/ui/components"
import { useFavoritesViewController } from "./useFavoritesViewController"
import DragList from "containers/Workspace/components/DragList/DragList"

const FavoritesView = () => {
  const { t } = useTranslation()
  const { draggableList, handleSort } = useFavoritesViewController()

  return (
    <Card>
      <CardHeader
        title={t("workspace.tabs.widgets.favorites.title")}
        titleTypographyProps={{ variant: "body1", fontWeight: "bold" }}
        sx={{ borderBottom: 1, borderColor: "divider", height: "44px" }}
      />
      <CardContent>
        <DragList onDragEnd={handleSort} dragList={draggableList} />
      </CardContent>
    </Card>
  )
}

export default FavoritesView

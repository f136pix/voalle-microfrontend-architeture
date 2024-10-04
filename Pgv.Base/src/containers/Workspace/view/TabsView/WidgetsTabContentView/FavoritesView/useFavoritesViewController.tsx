import { useState } from "react"
import { useFavoritesViewModel } from "containers/Workspace/viewmodel/useFavoritesViewModel"
import {
  DraggableFavoriteCard,
  DraggableFavoriteCardProps,
} from "containers/Workspace/components/DraggableFavoriteCard/DraggableFavoriteCard"
import { DragContentProps } from "containers/Workspace/components/DragList/DragList"

export const useFavoritesViewController = () => {
  useFavoritesViewModel()

  const [draggableList, setDraggableList] = useState<
    DragContentProps<DraggableFavoriteCardProps>[]
  >([
    {
      draggableId: "fav-1",
      Component: DraggableFavoriteCard,
      componentProps: {
        title: "Operações > CRM >",
        subTitle: "Dashboard Operacional",
      },
    },
    {
      draggableId: "fav-2",
      Component: DraggableFavoriteCard,
      componentProps: {
        title: "Title2",
        subTitle: "descrição",
      },
    },
    {
      draggableId: "fav-3",
      Component: DraggableFavoriteCard,
      componentProps: {
        title: "Title3",
        subTitle: "descrição",
      },
    },
  ])

  const handleSort = (
    dragList: DragContentProps<DraggableFavoriteCardProps>[]
  ) => {
    setDraggableList(dragList)
  }

  return { draggableList, handleSort }
}

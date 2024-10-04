import React from "react"
import {
  DragDropContext,
  DraggableProps,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  OnDragEndResponder,
} from "react-beautiful-dnd"
import { BoxStyled } from "./DragList.styles"

export interface DragContentProps<T extends DraggableProps = any> {
  draggableId: string
  Component: React.FC<T>
  componentProps: Partial<T>
}

export interface DragListProps {
  onDragEnd: (value: any[]) => void
  dragList: DragContentProps[]
}

const DragList = ({ dragList, onDragEnd }: DragListProps) => {
  const handleSort: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return
    }

    const draggableItemsAux = [...dragList]
    const [draggedItemContent] = draggableItemsAux.splice(
      result.source.index,
      1
    )

    draggableItemsAux.splice(result.destination.index, 0, draggedItemContent)
    onDragEnd(draggableItemsAux)
  }

  return (
    <DragDropContext onDragEnd={handleSort}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <BoxStyled ref={provided.innerRef} {...provided.droppableProps}>
            {dragList.map(
              ({ Component, componentProps, draggableId }, index) => {
                return (
                  <Component
                    index={index}
                    key={draggableId}
                    draggableId={draggableId}
                    {...componentProps}
                    isDragging={snapshot.isDraggingOver}
                  />
                )
              }
            )}
            {provided.placeholder}
          </BoxStyled>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragList

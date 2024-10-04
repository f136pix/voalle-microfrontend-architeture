import {
  Draggable,
  DraggableProps,
  DraggableProvided,
} from "react-beautiful-dnd"
import { IconButton } from "pgv-lib/ui/components"
import { Box, Typography } from "pgv-lib/ui/material"
import { Card, CardContent } from "./DraggableFavoriteCard.styles"

export interface DraggableFavoriteCardProps extends DraggableProps {
  title: string
  subTitle: JSX.Element | string
}

export const DraggableFavoriteCard: React.FC<DraggableFavoriteCardProps> = ({
  title,
  subTitle,
  draggableId,
  index = 0,
}) => {
  return (
    <Draggable key={index} index={index} draggableId={draggableId}>
      {(providedDrag: DraggableProvided) => (
        <div ref={providedDrag.innerRef} {...providedDrag.draggableProps}>
          <Card variant="outlined">
            <CardContent>
              <IconButton
                disableRipple
                icon="DragIndicator"
                className="icon drag"
                tooltip="Arraste para cima/baixo"
                {...providedDrag.dragHandleProps}
              />
              <Box className="description">
                <Typography fontSize="18px">{title}</Typography>
                <Typography variant="body2" fontWeight={300}>
                  {subTitle}
                </Typography>
              </Box>
              <IconButton
                disableRipple
                icon="Star"
                className="icon star"
                tooltip="Desfavoritar"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}

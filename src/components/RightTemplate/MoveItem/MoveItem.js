import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const MoveItem = ({ type, id, index, moveCard, childrenFunc, ...ownProps }) => {
  const dragRef = useRef(null)
  const dropRef = useRef(null)
  const [toTop, setToTop] = useState(false)
  const [{ isOver }, drop] = useDrop({
    accept: type,
    hover (item, monitor) {
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      setToTop(dragIndex > hoverIndex)
    },
    drop(item, monitor) {
      if (!dragRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dragRef.current.getBoundingClientRect()
      // Get vertical middle
      /* eslint-disable */
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return
      // }
      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return
      // }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })
  /* eslint-disable */
  const [{ isDragging }, drag, previewDrag] = useDrag({
    item: { type: type, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(dropRef))
  // drag(dragRef)
  // drag(drop(dragRef))

  return (
    childrenFunc({dragRef, dropRef, previewDrag, index, isOver, toTop, ...ownProps})
  )
}
export default MoveItem

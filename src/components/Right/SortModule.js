import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const SortModule = ({ data, type, id, index, moveCard, sortPageComponent, children, parentIndex }) => {
  const dragRef = useRef(null)
  const dropRef = useRef(null)
  const [toTop, setToTop] = useState(false)
  let accept = type === 'CHILD' ? 'CHILD' + parentIndex : type
  const [{ isOver }, drop] = useDrop({
    accept: accept,
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
      console.log(item)
      console.log(parentIndex)
      sortPageComponent(dragIndex, hoverIndex, item, parentIndex)
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
    item: { type: accept, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(dropRef))
  drag(dragRef)
  // drag(drop(dragRef))

  const style = toTop ? {
    borderTop: isOver ? '2px solid #3F94FC': '2px solid rgba(0,0,0,0)'
  } : {
    borderBottom: isOver ? '2px solid #3F94FC': '2px solid rgba(0,0,0,0)'
  }
  console.log(type)
  return (
    <div ref={dropRef}>
      <div ref={previewDrag}  style={{...style}}  className="right-sort-module">
      <p ref={dragRef}>{ data.message }</p>
        {/* <span ref={dragRef} className="right-sort-module__item__content__target"></span>
        <span>{name}</span> */}
      {
        children && children
      }
      </div>
    </div>
    // childrenFunc({dragRef, dropRef, previewDrag, index, isOver, toTop, ...ownProps})
  )
}
export default SortModule

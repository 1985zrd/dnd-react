import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '@/utils/itemTypes'

function Item ({item, isDragging, connectDragSource, forbidDrag}) {
  const opacity = isDragging ? 0.4 : 1
  console.log(forbidDrag)
  return (
    <div
      ref={connectDragSource}
      style={{ opacity, cursor: 'move', lineHeight: '36px', borderBottom: '1px solid #e5e5e5' }}
      className="left_item"
    >{item.message}</div>
  )
  }
  
export default DragSource(
  props => {
    return ItemTypes[props.itemTypes]
  },
  {
    // canDrag: props => {console.log('props.forbidDrag', props.forbidDrag); return !props.forbidDrag},
    canDrag: props => !props.forbidDrag,
    beginDrag: (props, monitor, conponent) => {
      console.log('beginDrag------', props, monitor, conponent)
      return ({nameFlag: Item})
    },
    endDrag(props, monitor) {
      // const item = monitor.getItem()
      const dropResult = monitor.getDropResult()
      console.log('000000',dropResult, props)
      console.log(props.dragHandle)
      if (dropResult) {
        props.dragHandle(props.item)
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
      // props.setPage({leftToMiddleHoverIndex: undefined})
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Item)

import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '@/utils/itemTypes'

import PictureModule from 'components/PictureModule/PictureModule'

function Item ({item, forbidDrag, dragHandle, itemTypes, setPage}) {
  
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes[itemTypes],
      ...item
    },
    canDrag: () => !forbidDrag,
    end(props, monitor) {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        dragHandle(null, item)
      }

      setPage({leftToMiddleHoverIndex: undefined})
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const style = isDragging ? {
    border: '1px #3F94FC solid',
    opacity: 0.4
  } : {
    border: '1px transparent solid',
    opacity: 1
  }

  let dom = !forbidDrag ?
    <div onClick={(e) => dragHandle(e, item)}>
      <div ref={drag} style={{ ...style, cursor: 'move' }} className="source__box">

        <div className="source__box__hover"></div>

        <PictureModule item={item} />

      </div>
    </div> :
    <div className="source__box" onMouseDown={(e) => {
      e.preventDefault()
    }}>
        <PictureModule item={item} />
    </div>

  return dom
}

export default Item

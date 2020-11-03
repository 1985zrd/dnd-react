import React, { useImperativeHandle, useRef } from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import ItemTypes from '@/utils/itemTypes'

const Card = React.forwardRef(
  ({ leftToMiddleHoverIndex, clickActiveIndex, data, clickActiveChildIndex, index, parentIndex, clickHandle, children, componentName:Component,itemData, item, isDragging, toTop, isOver,connectDragSource, connectDropTarget, addChildHandle, copyComponentHandle,deleteComponentHandle }, ref) => {
    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)
    const opacity = isDragging ? 0.4 : 1
    const cursor = isDragging ? 'move' : 'pointer'
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }))

    // console.log('{clickActiveIndex === index} {clickActiveChildIndex === parentIndex}', clickActiveIndex , index,clickActiveChildIndex , parentIndex)
    // console.log('-------toTop-------', toTop)
    // console.log('-------isOver-------', isOver)


    let active, isChild = (parentIndex !== undefined)
    if (isChild) { // 说明该组件为子组件
      active =  clickActiveIndex === parentIndex && clickActiveChildIndex === index
    } else {
      active =  clickActiveIndex === index && clickActiveChildIndex === ''
    }

    let style = toTop ? {
      borderTop: isOver ? '2px solid #3F94FC': 'none'
    } : {
      borderBottom: isOver ? '2px solid #3F94FC': 'none'
    }
    // if (item.templateType === 'gongGe' && isChild) {
    //   style = toTop ? {
    //     borderLeft: isOver ? '2px solid #3F94FC': 'none'
    //   } : {
    //     borderRight: isOver ? '2px solid #3F94FC': 'none'
    //   }
    // }
    console.log(props.itemTypes)
    // console.log('item.templateType , isChild, parentIndex', item.templateType, isChild, parentIndex)
    return (
      <div style={{ ...style}}
        onClick={clickHandle && ((e) => clickHandle(e, index, parentIndex))}
        // className={'com__box'
        // + (item.templateType === 'gongGe' && isChild ? ' gong-ge__inline__box' : '')
        // + (isChild ? ' com__box--child' : '')
        // + (item.templateType === 'gongGe' && active ? ' com__box--child--active' : '')
        // }
      >
        {/*gong-ge__inline__box 是宫格模式宽度需要设置*/}
        {/*com__box--child 是子组件z-index需要设置和组件间距需要的margin*/}
        {/*com__box--child--active 是宫格模式选中的子组件z-index 应该与同级组件中的高*/}
        {props.itemTypes}11111111111
        <div ref={elementRef} className="drag__box" style={{ opacity, cursor }}>
          <p>{ data.message }</p>
          {children}
        </div>
      </div>
    )
  },
)

export default  DropTarget(
  // ItemTypes.MIDDLE_SORT,
  props => {
    // const itemTypes = props.itemTypes === 'CHILD' ? 'CHILD' + props.parentIndex : ItemTypes[props.itemTypes]
    return props.itemTypes
  },
  {
    hover(props, monitor, component) {
      if (!component) {
        return null
      }
      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index
      // console.log('dragIndex00000000000000000000hoverIndex', dragIndex, hoverIndex)
      //正常的排序功能
      if (!monitor.getItem().nameFlag) {
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        monitor.getItem().toTop = dragIndex > hoverIndex
        // console.log('monitor.getItem().toTop', monitor.getItem().toTop)

      } else {
        //判断左侧拖放到右侧位置
        const hoverIndex = props.index
        // console.log(hoverIndex)
        props.setPage({leftToMiddleHoverIndex: hoverIndex})
      }

    },
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      // console.log('component', component, component.decoratedRef.current.getNode())
      const node = component.decoratedRef.current.getNode()
      if (!node) {
        return null
      }

      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      // const hoverBoundingRect = node.getBoundingClientRect()
      // // Get vertical middle
      // /* eslint-disable */
      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // // Determine mouse position
      // const clientOffset = monitor.getClientOffset()
      // // Get pixels to the top
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
      props.moveCard(dragIndex, hoverIndex, props.parentIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    toTop: monitor.getItem() && monitor.getItem().toTop
  }),
)(
  DragSource(
    // ItemTypes.MIDDLE_SORT,
    props => {
      // const itemTypes = props.itemTypes === 'CHILD' ? 'CHILD' + props.parentIndex : ItemTypes[props.itemTypes]
      return props.itemTypes
    },
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(Card),
)
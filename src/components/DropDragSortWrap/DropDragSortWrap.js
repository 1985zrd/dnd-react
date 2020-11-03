import React, { useImperativeHandle, useRef, useState } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from '@/utils/itemTypes'
import './DropDragSortWrap.scss'
import ToolBar from 'components/centerTemplate/ToolBar/ToolBar'

export default function Card ({ itemTypes, id, leftToMiddleHoverIndex, clickActiveIndex, clickActiveChildIndex,setPage,moveCard, index, parentIndex, clickHandle, children, componentName:Component,itemData, item,connectDragSource, connectDropTarget, addChildHandle, copyComponentHandle,deleteComponentHandle }) {
  const dragRef = useRef(null)
  const [toTop, setToTop] = useState(false)
  const [{ isOver }, drop] = useDrop({
    accept: itemTypes,
    hover (item, monitor) {
      if (!dragRef.current) {
        return null
      }
      console.log(dragRef.current.getBoundingClientRect())
      console.log(monitor.getClientOffset())
      const dragIndex = monitor.getItem().index
      let hoverIndex = index
      console.log('dragIndex===', dragIndex)
      console.log('hoverIndex===', hoverIndex)
      console.log('index===', index)
      // console.log('dragIndex00000000000000000000hoverIndex', dragIndex, hoverIndex)
      //正常的排序功能
      if (!item.templateName) {
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        setToTop(dragIndex > hoverIndex)
        // monitor.getItem().toTop = dragIndex > hoverIndex
        // console.log('monitor.getItem().toTop', monitor.getItem().toTop)

      } else {
        //判断左侧拖放到右侧位置
        hoverIndex = index
        console.log(hoverIndex)
        setPage({leftToMiddleHoverIndex: hoverIndex})
      }
    },
    drop(item, monitor) {
      if (!dragRef.current) {
        return
      }
      // console.log('component', component, component.decoratedRef.current.getNode())
      // const node = dragRef.current.getNode()
      // if (!node) {
      //   return null
      // }

      const dragIndex = monitor.getItem().index
      const hoverIndex = index
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
      moveCard(dragIndex, hoverIndex, parentIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })
  /* eslint-disable */
  const [{ isDragging }, drag, previewDrag] = useDrag({
    item: { type: itemTypes, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(dragRef))
  
  // const elementRef = useRef(null)
  // connectDragSource(elementRef)
  // connectDropTarget(elementRef)
  const opacity = isDragging ? 0.4 : 1
  const cursor = isDragging ? 'move' : 'pointer'
  // useImperativeHandle(ref, () => ({
  //   getNode: () => elementRef.current,
  // }))

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
  if (item.templateType === 'gongGe' && isChild) {
    style = toTop ? {
      borderLeft: isOver ? '2px solid #3F94FC': 'none'
    } : {
      borderRight: isOver ? '2px solid #3F94FC': 'none'
    }
  }

  // console.log('item.templateType , isChild, parentIndex', item.templateType, isChild, parentIndex)
  return (
    <div style={{ ...style}}
      onClick={clickHandle && ((e) => clickHandle(e, index, parentIndex))}
      className={'com__box'
      + (item.templateType === 'gongGe' && isChild ? ' gong-ge__inline__box' : '')
      + (isChild ? ' com__box--child' : '')
      + (item.templateType === 'gongGe' && active ? ' com__box--child--active' : '')
      }>
      {/*gong-ge__inline__box 是宫格模式宽度需要设置*/}
      {/*com__box--child 是子组件z-index需要设置和组件间距需要的margin*/}
      {/*com__box--child--active 是宫格模式选中的子组件z-index 应该与同级组件中的高*/}
      <div ref={dragRef} className="drag__box" style={{ opacity, cursor }}>
        {
          active &&
          <ToolBar
            copyComponentHandle={copyComponentHandle}
            deleteComponentHandle={deleteComponentHandle}
            clickActiveChildIndex={clickActiveChildIndex}
            item={item}
            itemData={itemData}
            isChild={isChild}/>
        }

        {
          Component &&
          (<Component
            addChildHandle={addChildHandle}
            index={index}
            item={item}
            itemData={itemData}
          >
            {children}
          </Component>)
        }
      </div>
      {
        !isChild && leftToMiddleHoverIndex === index && <div className="com__box__inner-border"></div>
      }
    </div>
  )
}
// export default React.forwardRef(
//   ({ itemTypes, id, leftToMiddleHoverIndex, clickActiveIndex, clickActiveChildIndex,setPage,moveCard, index, parentIndex, clickHandle, children, componentName:Component,itemData, item,connectDragSource, connectDropTarget, addChildHandle, copyComponentHandle,deleteComponentHandle }, ref) => {
//     const dragRef = useRef(null)
//     const [toTop, setToTop] = useState(false)
//     const [{ isOver }, drop] = useDrop({
//       accept: itemTypes,
//       hover (item, monitor) {
//         if (!dragRef.current) {
//           return null
//         }
//         console.log(dragRef.current.getBoundingClientRect())
//         console.log(monitor.getClientOffset())
//         const dragIndex = monitor.getItem().index
//         const hoverIndex = index
//         console.log('dragIndex===', dragIndex)
//         console.log('hoverIndex===', hoverIndex)
//         console.log('index===', index)
//         // console.log('dragIndex00000000000000000000hoverIndex', dragIndex, hoverIndex)
//         //正常的排序功能
//         if (!item.templateName) {
//           // Don't replace items with themselves
//           if (dragIndex === hoverIndex) {
//             return
//           }
//           setToTop(dragIndex > hoverIndex)
//           // monitor.getItem().toTop = dragIndex > hoverIndex
//           // console.log('monitor.getItem().toTop', monitor.getItem().toTop)
  
//         } else {
//           //判断左侧拖放到右侧位置
//           const hoverIndex = index
//           console.log(hoverIndex)
//           setPage({leftToMiddleHoverIndex: hoverIndex})
//         }
//       },
//       drop(item, monitor) {
//         if (!dragRef.current) {
//           return
//         }
//         // console.log('component', component, component.decoratedRef.current.getNode())
//         // const node = dragRef.current.getNode()
//         // if (!node) {
//         //   return null
//         // }
  
//         const dragIndex = monitor.getItem().index
//         const hoverIndex = index
//         // Don't replace items with themselves
//         if (dragIndex === hoverIndex) {
//           return
//         }
//         // Determine rectangle on screen
//         // const hoverBoundingRect = node.getBoundingClientRect()
//         // // Get vertical middle
//         // /* eslint-disable */
//         // const hoverMiddleY =
//         //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//         // // Determine mouse position
//         // const clientOffset = monitor.getClientOffset()
//         // // Get pixels to the top
//         // const hoverClientY = clientOffset.y - hoverBoundingRect.top
//         // Only perform the move when the mouse has crossed half of the items height
//         // When dragging downwards, only move when the cursor is below 50%
//         // When dragging upwards, only move when the cursor is above 50%
//         // Dragging downwards
//         // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         //   return
//         // }
//         // // Dragging upwards
//         // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         //   return
//         // }
//         // Time to actually perform the action
//         moveCard(dragIndex, hoverIndex, parentIndex)
//         // Note: we're mutating the monitor item here!
//         // Generally it's better to avoid mutations,
//         // but it's good here for the sake of performance
//         // to avoid expensive index searches.
//         monitor.getItem().index = hoverIndex
//       },
//       collect: monitor => ({
//         isOver: monitor.isOver()
//       })
//     })
//     /* eslint-disable */
//     const [{ isDragging }, drag, previewDrag] = useDrag({
//       item: { type: itemTypes, id, index },
//       collect: monitor => ({
//         isDragging: monitor.isDragging(),
//       }),
//     })
//     drag(drop(dragRef))
    
//     // const elementRef = useRef(null)
//     // connectDragSource(elementRef)
//     // connectDropTarget(elementRef)
//     const opacity = isDragging ? 0.4 : 1
//     const cursor = isDragging ? 'move' : 'pointer'
//     useImperativeHandle(ref, () => ({
//       getNode: () => elementRef.current,
//     }))

//     // console.log('{clickActiveIndex === index} {clickActiveChildIndex === parentIndex}', clickActiveIndex , index,clickActiveChildIndex , parentIndex)
//     // console.log('-------toTop-------', toTop)
//     // console.log('-------isOver-------', isOver)


//     let active, isChild = (parentIndex !== undefined)
//     if (isChild) { // 说明该组件为子组件
//       active =  clickActiveIndex === parentIndex && clickActiveChildIndex === index
//     } else {
//       active =  clickActiveIndex === index && clickActiveChildIndex === ''
//     }

//     let style = toTop ? {
//       borderTop: isOver ? '2px solid #3F94FC': 'none'
//     } : {
//       borderBottom: isOver ? '2px solid #3F94FC': 'none'
//     }
//     if (item.templateType === 'gongGe' && isChild) {
//       style = toTop ? {
//         borderLeft: isOver ? '2px solid #3F94FC': 'none'
//       } : {
//         borderRight: isOver ? '2px solid #3F94FC': 'none'
//       }
//     }

//     // console.log('item.templateType , isChild, parentIndex', item.templateType, isChild, parentIndex)
//     return (
//       <div style={{ ...style}}
//         onClick={clickHandle && ((e) => clickHandle(e, index, parentIndex))}
//         className={'com__box'
//         + (item.templateType === 'gongGe' && isChild ? ' gong-ge__inline__box' : '')
//         + (isChild ? ' com__box--child' : '')
//         + (item.templateType === 'gongGe' && active ? ' com__box--child--active' : '')
//         }>
//         {/*gong-ge__inline__box 是宫格模式宽度需要设置*/}
//         {/*com__box--child 是子组件z-index需要设置和组件间距需要的margin*/}
//         {/*com__box--child--active 是宫格模式选中的子组件z-index 应该与同级组件中的高*/}
//         <div ref={dragRef} className="drag__box" style={{ opacity, cursor }}>
//           {
//             active &&
//             <ToolBar
//               copyComponentHandle={copyComponentHandle}
//               deleteComponentHandle={deleteComponentHandle}
//               clickActiveChildIndex={clickActiveChildIndex}
//               item={item}
//               itemData={itemData}
//               isChild={isChild}/>
//           }

//           {
//             Component &&
//             (<Component
//               addChildHandle={addChildHandle}
//               index={index}
//               item={item}
//               itemData={itemData}
//             >
//               {children}
//             </Component>)
//           }
//         </div>
//         {
//           !isChild && leftToMiddleHoverIndex === index && <div className="com__box__inner-border"></div>
//         }
//       </div>
//     )
//   },
// )

// export default  DropTarget(
//   // ItemTypes.MIDDLE_SORT,
//   props => {
//     // const itemTypes = props.itemTypes === 'CHILD' ? 'CHILD' + props.parentIndex : ItemTypes[props.itemTypes]
//     return props.itemTypes
//   },
//   {
//     hover(props, monitor, component) {
//       if (!component) {
//         return null
//       }
//       console.log(monitor.getItem())
//       const dragIndex = monitor.getItem().index
//       const hoverIndex = props.index
//       // console.log('dragIndex00000000000000000000hoverIndex', dragIndex, hoverIndex)
//       //正常的排序功能
//       if (!monitor.getItem().templateName) {
//         // Don't replace items with themselves
//         if (dragIndex === hoverIndex) {
//           return
//         }
//         monitor.getItem().toTop = dragIndex > hoverIndex
//         // console.log('monitor.getItem().toTop', monitor.getItem().toTop)

//       } else {
//         //判断左侧拖放到右侧位置
//         const hoverIndex = props.index
//         console.log(hoverIndex)
//         props.setPage({leftToMiddleHoverIndex: hoverIndex})
//       }

//     },
//     drop(props, monitor, component) {
//       if (!component) {
//         return
//       }
//       // console.log('component', component, component.decoratedRef.current.getNode())
//       const node = component.decoratedRef.current.getNode()
//       if (!node) {
//         return null
//       }

//       const dragIndex = monitor.getItem().index
//       const hoverIndex = props.index
//       // Don't replace items with themselves
//       if (dragIndex === hoverIndex) {
//         return
//       }
//       // Determine rectangle on screen
//       // const hoverBoundingRect = node.getBoundingClientRect()
//       // // Get vertical middle
//       // /* eslint-disable */
//       // const hoverMiddleY =
//       //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//       // // Determine mouse position
//       // const clientOffset = monitor.getClientOffset()
//       // // Get pixels to the top
//       // const hoverClientY = clientOffset.y - hoverBoundingRect.top
//       // Only perform the move when the mouse has crossed half of the items height
//       // When dragging downwards, only move when the cursor is below 50%
//       // When dragging upwards, only move when the cursor is above 50%
//       // Dragging downwards
//       // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//       //   return
//       // }
//       // // Dragging upwards
//       // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//       //   return
//       // }
//       // Time to actually perform the action
//       props.moveCard(dragIndex, hoverIndex, props.parentIndex)
//       // Note: we're mutating the monitor item here!
//       // Generally it's better to avoid mutations,
//       // but it's good here for the sake of performance
//       // to avoid expensive index searches.
//       monitor.getItem().index = hoverIndex
//     },
//   },
//   (connect, monitor) => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     toTop: monitor.getItem() && monitor.getItem().toTop
//   }),
// )(
//   DragSource(
//     // ItemTypes.MIDDLE_SORT,
//     props => {
//       // const itemTypes = props.itemTypes === 'CHILD' ? 'CHILD' + props.parentIndex : ItemTypes[props.itemTypes]
//       return props.itemTypes
//     },
//     {
//       beginDrag: props => ({
//         id: props.id,
//         index: props.index,
//       }),
//     },
//     (connect, monitor) => ({
//       connectDragSource: connect.dragSource(),
//       isDragging: monitor.isDragging(),
//     }),
//   )(Card),
// )
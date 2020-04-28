import React from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from '@/utils/itemTypes'

// import DragDropWrap from './DragDropWrap'
import SortModule from '../Right/SortModule'
import DropDragSortWrap from './DropDragSortWrap'

function Center ({connectDropTarget, sortPageComponent, data, itemTypes}) {
  // console.log(data)
  return (
    <div
      className="dnd_page_center"
      ref={connectDropTarget}
    >
      {Object.keys(data).map((key, index) => {
        return (
          <SortModule
            // type='CHILD'
            type={itemTypes}
            key={data[key].code}
            data={data[key]}
            id={data[key].code}
            index={index}
            sortPageComponent={sortPageComponent}
          >
            {
              data[key].child && data[key].child.map((child, i) => {
                return (<SortModule
                  type='CHILD'
                  key={child.code}
                  data={child}
                  id={child.code}
                  index={i}
                  parentIndex={index}
                  sortPageComponent={sortPageComponent}
                ></SortModule>)
              })
            }
          </SortModule>
          // <DragDropWrap
          //   itemTypes='CHILD'
          //   key={data[key].code}
          //   data={data[key]}
          //   // sortPageComponent={sortPageComponent}
          // >
          //   {/* <DragDropWrap
          //     itemTypes='CHILD'
          //     key={data[key].code}
          //     parentIndex={index}
          //     data={data[key]}
          //     sortPageComponent={sortPageComponent}
          //   ></DragDropWrap> */}
          // </DragDropWrap>
        )
      })}
    </div>
  )
}

// function Item ({item}) {
//   return (
//     <div>{ item.message }</div>
//   )
// }

export default DropTarget(
  props => {
    return ItemTypes[props.itemTypes]
  },
  {
    drop: () => ({name: 'Center'}),
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Center)
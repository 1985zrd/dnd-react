import React from 'react'
import SortModule from './SortModule'

function Right ({data, sortPageComponent}) {
  return (
    <div className="dnd_page_right">
      {Object.keys(data).map((key, index) => {
        return (
          <SortModule
            type={'MoveItem'}
            key={data[key].code}
            data={data[key]}
            id={data[key].code}
            index={index}
            sortPageComponent={sortPageComponent}
          ></SortModule>
        )
      })}
    </div>
  )
}

// function Item ({item}) {
//   return (
//     <div style={{ cursor: 'move', lineHeight: '36px', borderBottom: '1px solid #e5e5e5' }}>{ item.message }</div>
//   )
// }

export default Right
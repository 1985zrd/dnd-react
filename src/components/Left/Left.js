import React from 'react'
import SourceBox from './SouceBox'

function Left ({data, itemTypes, dragHandle, pageConponent }) {
  // console.log(props)
  return (
    <div className="dnd_page_left">
      {Object.keys(data).map(key => {
        // let forbidDrag = pageConponent.filter(component => {
        //   return data[key].code === component.code
        // }).length === 1
        let forbidDrag = false
        return (
          <SourceBox
            key={data[key].code}
            forbidDrag={forbidDrag}
            item={data[key]}
            itemTypes={itemTypes}
            dragHandle={dragHandle}
          ></SourceBox>
        )
      })}
    </div>
  )
}

export default Left

import React, { useState } from 'react'

import Left from '@/components/Left/Left'
import Right from '@/components/Right/Right'
import Center from '@/components/Center/Center'

import { DndProvider } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'

let tem = {
  img: {
    code: 1,
    message: '图片'
  },
  goods: {
    code: 2,
    message: '商品',
    child: [
      {
        code: 21,
        message: '商品-1',
      },
      {
        code: 22,
        message: '商品-2',
      }
    ]
  },
  info: {
    code: 3,
    message: '信息收集',
    child: [
      {
        code: 31,
        message: '信息-1',
      },
      {
        code: 32,
        message: '信息-2',
      }
    ]
  }
}

function Dnd () {
  let [pageConponent, setPageConponent] = useState([])

  const dragHandle = (item) => {
    setPageConponent([...pageConponent, item])
  }
  const sortPageComponent = (dragIndex, hoverIndex, item, parentIndex) => {
    if (item.type !== 'CARD' && item.type !== 'MoveItem') {
      let origin = JSON.parse(JSON.stringify(pageConponent[parentIndex]))
      let data = [...origin.child]
      let s = data.splice(dragIndex, 1)
      data.splice(hoverIndex, 0, ...s)
      origin.child = data
      console.log(data)
      let pageComponentCopy1 = [...pageConponent]
      pageComponentCopy1.splice(parentIndex, 1, origin)
      setPageConponent(pageComponentCopy1)
    } else {
      if(dragIndex === undefined || hoverIndex === undefined) {
        return
      }
      let pageComponentCopy = [...pageConponent]
      let cutItem = pageComponentCopy.splice(dragIndex, 1)
      pageComponentCopy.splice(hoverIndex, 0, ...cutItem)
      setPageConponent(pageComponentCopy)
    }
  }
  return (
    <div className="dnd_page">
      <DndProvider backend={HTML5Backend}>
        <Left 
          itemTypes="CARD"
          data={tem}
          pageConponent={pageConponent}
          dragHandle={dragHandle}
        />
        <Center 
          itemTypes="CARD"
          sortPageComponent={sortPageComponent}
          data={pageConponent}
        />
        <Right
          sortPageComponent={sortPageComponent}
          data={pageConponent}
        />
      </DndProvider>
    </div>
  )
}

export default Dnd

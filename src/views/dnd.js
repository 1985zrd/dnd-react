import React, { useState, useEffect } from 'react'

import Left from '@/components/Left/Left'
import Right from '@/components/RightTemplate/RightTemplate'
import Center from '@/components/Center/Center'

import {useDispatch, useMappedState} from 'redux-react-hook';
import { getAllTemplateInfo } from 'store/actions/create-page.js'

import componentsData from 'utils/template.js'

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

  // 从store中读取dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTemplateInfo())
  }, [dispatch])

  const dragHandle = (item) => {
    setPageConponent([...pageConponent, item])
  }
  // const sortPageComponent = (dragIndex, hoverIndex, item, parentIndex) => {
  //   if (item.type !== 'CARD' && item.type !== 'MoveItem') {
  //     let origin = JSON.parse(JSON.stringify(pageConponent[parentIndex]))
  //     let data = [...origin.child]
  //     let s = data.splice(dragIndex, 1)
  //     data.splice(hoverIndex, 0, ...s)
  //     origin.child = data
  //     console.log(data)
  //     let pageComponentCopy1 = [...pageConponent]
  //     pageComponentCopy1.splice(parentIndex, 1, origin)
  //     setPageConponent(pageComponentCopy1)
  //   } else {
  //     if(dragIndex === undefined || hoverIndex === undefined) {
  //       return
  //     }
  //     let pageComponentCopy = [...pageConponent]
  //     let cutItem = pageComponentCopy.splice(dragIndex, 1)
  //     pageComponentCopy.splice(hoverIndex, 0, ...cutItem)
  //     setPageConponent(pageComponentCopy)
  //   }
  // }
  return (
    <div className="create-page">
      <DndProvider backend={HTML5Backend}>
        <div className="create-page__wrap">
          <Left 
            itemTypes="CARD"
          />
          <Center 
            itemTypes="CARD"
          />
          <Right
          />
        </div>
      </DndProvider>
    </div>
  )
}

export default Dnd

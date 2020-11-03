import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import MoveItem from '../MoveItem/MoveItem'
import { cloneDeep } from 'lodash'
// import { setPageComponents } from 'store/actions/create-page.js'
import './SortModule.scss'
import {useDispatch, useMappedState} from 'redux-react-hook'
import { setPage, setPageComponents } from 'store/actions/create-page.js'

const childrenNode = (params) => {
  let {dragRef, dropRef, previewDrag, name, isOver, toTop} = params
  const style = toTop ? {
    borderTop: isOver ? '2px solid #3F94FC': '2px solid rgba(0,0,0,0)'
  } : {
    borderBottom: isOver ? '2px solid #3F94FC': '2px solid rgba(0,0,0,0)'
  }
  return (
    <div ref={dropRef}>
      <div ref={previewDrag}  style={{...style}} className="right-sort-module__item__content">
        <span ref={dragRef} className="right-sort-module__item__content__target"></span>
        <span>{name}</span>
      </div>
    </div>
  )
}

function renderCard (type, index, id, name, sortHandle, children) {
  return (
    <MoveItem
      type={type}
      key={id}
      index={index}
      id={id}
      name={name}
      moveCard={sortHandle}
      childrenFunc={children}
    />
  )
}

export default () => {
  const dispatch = useDispatch();
  const mapState = useCallback(state => ({
    createPage: state.createPage,
    allTemplates: state.createPage.allTemplates,
    pageComponents: state.createPage.pageComponents,
    page: state.createPage.page
  }), [])
  const {createPage, allTemplates, pageComponents, page} = useMappedState(mapState)
  // moveCard (dragIndex, hoverIndex) {
  //   let pageComponents = cloneDeep(this.props.pageComponents)
  //   let tmp = pageComponents[dragIndex] // 临时储存文件
  //   pageComponents.splice(dragIndex, 1) // 移除拖拽项
  //   pageComponents.splice(hoverIndex, 0, tmp) // 插入放置项
  //   this.props.setPageComponents(pageComponents)
  // }
    // const { pageComponents, sortHandle } = this.props
    const sortHandle = (dragIndex, hoverIndex) => {
      let pageComponentsCopy = cloneDeep(pageComponents)
      let tmp = pageComponentsCopy[dragIndex] // 临时储存文件
      pageComponentsCopy.splice(dragIndex, 1) // 移除拖拽项
      pageComponentsCopy.splice(hoverIndex, 0, tmp) // 插入放置项
      dispatch(setPageComponents(pageComponentsCopy))
    }
    return (
      <div className="right-sort-module">
        {
          pageComponents.map((item, index) => {
            let itemData = item.itemData
            let name = item.pageTemplateName || itemData.templateName
            return <div className="right-sort-module__item" key={itemData.createId}>
              {renderCard('MoveItem' , index, itemData.createId, name + '-' + itemData.templateOrder, sortHandle, childrenNode)}
            </div>
          })
        }
        {
          pageComponents.length === 0 &&
          <div className="right-template__empty-data">
            <div>请选择模块后再进行编辑操作</div>
          </div>
        }
      </div>
    )
}

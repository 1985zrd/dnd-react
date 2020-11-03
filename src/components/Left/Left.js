import React, { useCallback } from 'react'
import SourceBox from './SouceBox'
import { cloneDeep } from 'lodash'

import {useDispatch, useMappedState} from 'redux-react-hook'
import { setPage, setPageComponents } from 'store/actions/create-page.js'

import './left.scss'

function Left ({itemTypes }) {
  const dispatch = useDispatch();
  const setPageConfig = (opt) => {
    dispatch(setPage(opt))
  };

  const mapState = useCallback(state => ({
    createPage: state.createPage,
    allTemplates: state.createPage.allTemplates,
    pageComponents: state.createPage.pageComponents,
    page: state.createPage.page
  }), [])
  const {createPage, allTemplates, pageComponents, page} = useMappedState(mapState)
  console.log('createPage=====', createPage)

  // 左侧拖拽和点击添加事件
  const addPageComponents = (e, item) => {
    // e && e.stopPropagation()
    console.log(e)
    console.log(item)

    let { id: pageTemplateId, templateData: itemData, ...usefulItem } = item
    let templateOrderArr = [0], createIdArr = [-1]

    let parseData = typeof itemData === 'string' ? JSON.parse(itemData) : itemData
    parseData = cloneDeep(parseData)

    pageComponents.map((obj) => {
      obj = obj.itemData
      createIdArr.push(obj.createId)
      // console.log('item.templateType', item.templateType)
      if (obj.templateType === item.templateType) {
        templateOrderArr.push(obj.templateOrder)
      }
      return obj
    })

    let pageComponentsCopy = [...pageComponents]
    let newCom = {
      pageTemplateId: pageTemplateId,
      // itemData: JSON.parse(itemData),
      itemData: {
        // ...JSON.parse(JSON.stringify(this.props[item.templateType + 'Set'])),
        ...parseData,
        createId: Math.max(...createIdArr) + 1,
        templateOrder: Math.max(...templateOrderArr) + 1,
        ...usefulItem,
      }
    }

    // console.log('page.leftToMiddleHoverIndex', page.leftToMiddleHoverIndex)
    // 处理拖拽位置
    let {leftToMiddleHoverIndex} = page
    if (leftToMiddleHoverIndex !== undefined) {
      // 添加逻辑
      pageComponentsCopy.splice(leftToMiddleHoverIndex + 1, 0, newCom)
      dispatch(setPageComponents(pageComponentsCopy))
      // 选中新添加的元素
      // this.clickHandle(undefined, leftToMiddleHoverIndex + 1, undefined)
      // 清空hover的index值
      dispatch(setPage({
        leftToMiddleHoverIndex: undefined,
      }))
      // 滚动到添加的位置
      // this.goScrollTargetDom(leftToMiddleHoverIndex + 1)
    } else {
      // 点击添加逻辑
      pageComponentsCopy.push(newCom)
      dispatch(setPageComponents(pageComponentsCopy))
      // 选中新添加的元素
      // this.clickHandle(undefined, pageComponentsCopy.length - 1, undefined)
      // 滚动到添加的位置
      // this.goScrollTargetDom(pageComponentsCopy.length - 1)
    }

  };

  let Modules = allTemplates.map((item, index) => {
    let forbidDrag = false
    if (item.templateType === 'info') {
      for (let i in pageComponents) {
        if (pageComponents[i].itemData.templateType === 'info') {
          forbidDrag = true
        }
      }
    }
    return (
      <SourceBox
        forbidDrag={forbidDrag}
        itemTypes={itemTypes}
        key={index}
        index={index}
        item={item}
        dragHandle={addPageComponents}
        setPage={setPageConfig}
      />
    )
  })

  return (
    <div className="left-create-page">
      <div>模板：</div>
      {Modules}
    </div>
  )
}

export default Left

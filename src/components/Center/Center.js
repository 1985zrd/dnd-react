import React, {useCallback, useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from '@/utils/itemTypes'
import { cloneDeep } from 'lodash'

import DropDragSortWrap from 'components/DropDragSortWrap/DropDragSortWrap'

// 标题模块
import AppTitle from 'components/centerTemplate/AppTitle/AppTitle'

// 图片模块
import ImageModule from 'components/centerTemplate/ImageModule/ImageModule'
// 商品模块
import CommodityModule from 'components/centerTemplate/CommodityModule/CommodityModule'
import CommodityItemModule from 'components/centerTemplate/CommodityModule/CommodityItemModule/CommodityItemModule'
import CommodityGongGeItemModule from 'components/centerTemplate/CommodityModule/CommodityGongGeItemModule/CommodityGongGeItemModule'

// 优惠券模块
import CouponModule from 'components/centerTemplate/CouponModule/CouponModule'
import CouponItemModule from 'components/centerTemplate/CouponModule/CouponItemModule/CouponItemModule'
//手机信息模块
import InfoModule from 'components/centerTemplate/InfoModule/InfoModule'

import pageNo from 'assets/imgs/page-no.svg'

import {useDispatch, useMappedState} from 'redux-react-hook'
import { setPage, setPageComponents } from 'store/actions/create-page.js'

export default function Center ({itemTypes, connectDropTarget}) {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: ItemTypes[itemTypes],
    drop: () => ({name: 'Center'}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const style = {}
  const mapState = useCallback(state => ({
    allTemplates: state.createPage.allTemplates,
    page: state.createPage.page,
    pageComponents: state.createPage.pageComponents
  }), [])
  const {page, pageComponents, allTemplates} = useMappedState(mapState)
  let {appTitle, leftToMiddleHoverIndex, clickActiveChildIndex, isCheckChildCom, clickActiveIndex} = page

  let [symbol, setSymbol] = useState('')
  useEffect(() => {
    setSymbol(Date.now())
  }, [])

  const dispatch = useDispatch();
  const setPageConfig = (opt) => {
    dispatch(setPage(opt))
  };
  const sortPageComponents = (dragIndex, hoverIndex) => {
    if(dragIndex === undefined || hoverIndex === undefined) {
      return
    }
    // 如果选中的是父组件 记录移动前的 createId
    let hasClickCom = !isCheckChildCom
      && (dragIndex === clickActiveIndex || hoverIndex === clickActiveIndex)
    let createId = hasClickCom ? pageComponents[clickActiveIndex].itemData.createId : ''

    // 更换更改父组件顺序
    let pageComponentsCopy = [...pageComponents]
    let cutItem = pageComponentsCopy.splice(dragIndex, 1)
    pageComponentsCopy.splice(hoverIndex, 0, ...cutItem)
    dispatch(setPageComponents(pageComponentsCopy))

    // 如果选中的是父元素 更改选中的 clickActiveIndex
    if (hasClickCom) {
      let clickActiveIndexNew
      for (let i in pageComponentsCopy) {
        if (pageComponentsCopy[i].itemData.createId === createId) {
          clickActiveIndexNew = i / 1
          break
        }
      }
      dispatch(setPage({
        clickActiveIndex: clickActiveIndexNew,
      }))
    }
  }
  const childSortHandle = (dragIndex, hoverIndex, parentIndex) => {
    console.log(dragIndex, hoverIndex, parentIndex)
    let { clickActiveIndex, clickActiveChildIndex, isCheckChildCom } = page

    console.log('dragIndex, hoverIndex', dragIndex, hoverIndex)
    let pageComponentsCopy = [...pageComponents]
    let componentsTarget = pageComponentsCopy[parentIndex].itemData.components

    // 如果选中的是子元素 记录移动前的 createChildId
    let hasClickCom = isCheckChildCom
      && parentIndex === clickActiveIndex
      && (dragIndex === clickActiveChildIndex || hoverIndex === clickActiveChildIndex)
    let createChildId = hasClickCom ? componentsTarget[clickActiveChildIndex].createChildId : ''

    // 更改子组件顺序
    let cutItem = componentsTarget.splice(dragIndex, 1)
    componentsTarget.splice(hoverIndex, 0, ...cutItem)

    dispatch(setPageComponents(pageComponentsCopy))

    // 如果选中的是子元素 更改选中的 clickActiveChildIndex
    if (hasClickCom) {
      let clickActiveChildIndexNew
      for (let i in componentsTarget) {
        if (componentsTarget[i].createChildId === createChildId) {
          clickActiveChildIndexNew = i / 1
          // console.log('clickActiveChildIndex, clickActiveChildIndexNew', clickActiveChildIndex, clickActiveChildIndexNew)
          break
        }
      }

      dispatch(setPage({
        clickActiveChildIndex: clickActiveChildIndexNew
      }))
    }
  }
  const clickHandle = (e, Index, parentIndex) => {
    // console.log(e, Index, parentIndex)
    e && e.stopPropagation()
    // console.log('Index, parentIndex', Index, parentIndex)
    if (parentIndex !== undefined) {
      dispatch(setPage({
        clickActiveIndex: parentIndex,
        clickActiveChildIndex: Index,
        isCheckChildCom: true,
        activeKeyTabs: '2'
      }))
      // console.log('clickActiveIndex, clickActiveChildIndex', parentIndex, Index)
    } else {
      dispatch(setPage({
        clickActiveIndex: Index,
        clickActiveChildIndex: '',
        isCheckChildCom: false
      }))
      // console.log('clickActiveIndex, clickActiveChildIndex', Index, '')
    }
  }
  // 添加子组件
  const addChildHandle = (e, index, item) => {
    e && e.stopPropagation()
    let pageComponentsCopy = [...pageComponents]
    let newCom = [...pageComponentsCopy[index].itemData.components]
    //计算最大createChildId值
    let createChildIdArr = [-1]
    newCom.map((item) => createChildIdArr.push(item.createChildId))
    // let parseData = typeof itemData === 'string' ? JSON.parse(itemData) : itemData
    // add
    let currentModule = allTemplates.filter(template => template.templateType === item.templateType)
    let copyComponent = cloneDeep(currentModule[0].templateData.components[0])
    newCom.push({
      ...copyComponent,
      // ...this.props[item.templateType + 'Set'].components[0],
      createChildId: Math.max(...createChildIdArr) + 1
    }) // TODO
    pageComponentsCopy[index].itemData.components = newCom
    dispatch(setPageComponents(pageComponentsCopy))

    // 选中新添加的元素
    clickHandle(undefined, newCom.length - 1, index)
    // 滚动到添加的位置
    // this.goScrollTargetDom(index, newCom.length - 1)
  }
  // 组件复制
  const copyComponentHandle = (e) => {
    e && e.stopPropagation()
  }
  //组件的删除功能
  const deleteComponentHandle = (e) => {
    e && e.stopPropagation()
  }

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = '#D4E6FF'
  } else {
    backgroundColor = '#fff'
  }

  return (
    <div className="center-template">
      <div className="center-template__flex">
        <AppTitle
          appTitle={appTitle}
          setPage={setPageConfig}
        />
        <div ref={drop} style={{...style, backgroundColor}} className="center-template__flex__target">
          {
            pageComponents.map((item, index) => {
              item = item.itemData
              let componentName
              let componentChildName

              switch (item.templateType) {
                case 'img':
                  componentName = ImageModule
                  break
                case 'gongGe':
                  componentName = CommodityModule
                  componentChildName = CommodityGongGeItemModule
                  break
                case 'card':
                  componentName = CommodityModule
                  componentChildName = CommodityItemModule
                  break
                case 'coupon':
                  componentName = CouponModule
                  componentChildName = CouponItemModule
                  break
                case 'info':
                  componentName = InfoModule
                  break
                default:
                  componentName = ImageModule
              }
              let isUpdate = !isCheckChildCom && clickActiveIndex===index
              // console.log('isUpdate---------- out', isUpdate, this.state.symbol, isCheckChildCom)
              return (
                <DropDragSortWrap
                  itemTypes={ItemTypes[itemTypes]}
                  componentName={componentName}
                  key={item.createId + (isUpdate ? ' ' + symbol : '')}
                  index={index}
                  id={item.createId}
                  item={item}
                  itemData={item}
                  moveCard={sortPageComponents}
                  addChildHandle={addChildHandle}
                  copyComponentHandle={copyComponentHandle}
                  deleteComponentHandle={deleteComponentHandle}
                  clickHandle={clickHandle}
                  setPage={setPageConfig}
                  leftToMiddleHoverIndex={leftToMiddleHoverIndex}
                  clickActiveIndex={clickActiveIndex}
                  clickActiveChildIndex={clickActiveChildIndex}
                >

                  {
                    item.components && item.components.map((inner, i) => {
                      let isUpdate = isCheckChildCom ?
                        clickActiveIndex===index && clickActiveChildIndex=== i :
                        clickActiveIndex===index
                      // console.log('isUpdate----------', isUpdate, this.state.symbol, isCheckChildCom, item.components)
                      return (
                        <DropDragSortWrap
                          itemTypes={`CHILD${index}`}
                          componentName={componentChildName}
                          key={item.createId + ',' + inner.createChildId + (isUpdate ? ' ' + symbol :'')}
                          index={i}
                          parentIndex={index}
                          id={inner.createChildId}
                          itemData={item}
                          item={inner}
                          moveCard={childSortHandle}
                          copyComponentHandle={copyComponentHandle}
                          deleteComponentHandle={deleteComponentHandle}
                          clickHandle={clickHandle}
                          clickActiveIndex={clickActiveIndex}
                          clickActiveChildIndex={clickActiveChildIndex}
                        />
                      )
                    })
                  }

                </DropDragSortWrap>
              )
            })
          }
          {
            pageComponents.length === 0 &&
            !isActive &&
            <div className="center-template__flex__no">
              <img src={pageNo} alt=""/>
              <div className="text">请点选左侧相应模块进行页面编辑</div>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Tooltip } from 'antd';
import './ToolBar.scss'

export default (props) => {

  let { item, itemData, isChild, copyComponentHandle, deleteComponentHandle, clickActiveChildIndex } = props
  
  const [delCont, setDelCont] = useState(false)
  const [wenAble,setWenAble] = useState(false)

  const delContent = (
    <div className="del__content">
      确认删除？
      <span onClick={(e) => deleteComponentHandle(e)}>是</span>
      <span onClick={()=> setDelCont(!delCont)} >否</span>
    </div>
  )

  const { explain } = itemData
  const explainCont = (
      <dl>
        <dt className='explain--cont__title' style={{fontSize:16}}>{explain.title}</dt>
        <dd>
          {!(typeof(explain.content) === 'object')
            ? 
            <p className='explain--cont__subTitle'
            dangerouslySetInnerHTML={{__html: explain.content}} />
            : explain.content.map((item,index)=>(
              <dl key={index}>
                <dt className='explain--cont__subTitle'>{item.title}</dt>
                <dd dangerouslySetInnerHTML={{__html: item.content}}></dd>
              </dl>
            ))
          }
        </dd>
      </dl>
  )

  const fn = React.useCallback((e)=>{
    setWenAble(false)
    setDelCont(false)
    document.querySelector('.center-template').removeEventListener('scroll',fn)
  },[])

  React.useEffect(()=>{
    // 模拟componentWillUnmount
    return () => {
      document.querySelector('.center-template').removeEventListener('scroll',fn)
    }
  },[ fn ])
  
  // 解决toolBar没有点击消失的情况
  const scrollT = React.useCallback(()=>{
    document.querySelector('.center-template').addEventListener('scroll',fn)
  },[ fn ])

  const visibleToolbar = React.useCallback( val =>{
    // 需要判断传入的是不是true;
    if(val === true){
      setWenAble(!wenAble)
      setDelCont(false)
    } else {
      setDelCont(!delCont)
      setWenAble(false)
    }
    scrollT()
  },[ scrollT, delCont, wenAble ])

  return (
    <div className={'tool-bar__box' + (isChild ? ' child__border' : '')}>
      <Tooltip placement='right' title='移动'>
        <div className="tool-bar__box__sliderBar tool-bar__box__sliderBar--top1">

        </div>
      </Tooltip>
      {
        (
          (
            isChild && (
              ((item.templateType === 'card' || item.templateType === 'coupon') && itemData.components.length < 10)
              ||
              (item.templateType === 'gongGe' && itemData.components.length < 20)
            )
          )
          ||
          (!isChild && item.templateType !== 'info')
        )
        &&
        <Tooltip placement='right' title='复制'>
          <div className="tool-bar__box__sliderBar tool-bar__box__sliderBar--top2"
            onClick={(e) => copyComponentHandle(e)}>
          </div>
        </Tooltip>
      }

      {!isChild &&
        <Tooltip placement="right" 
          trigger='click' 
          overlayClassName='explain--cont' 
          title={explainCont}
          visible={wenAble}
          onClick={()=>visibleToolbar(true)}
        >
          <Tooltip placement="right" title='说明'>
            <div className="tool-bar__box__sliderBar tool-bar__box__sliderBar--top3">
            </div>
          </Tooltip>
        </Tooltip>
     }

      {
        clickActiveChildIndex === 0 && isChild && itemData.components.length === 1 ? '' :
          <Tooltip placement="right"
            title={delContent}
            visible={delCont}
            onClick={visibleToolbar}
          >
            <Tooltip placement='right' title='删除'>
              <div className="tool-bar__box__sliderBar tool-bar__box__sliderBar--top4">

              </div>
            </Tooltip>
          </Tooltip>
      }
    </div>
  )
}

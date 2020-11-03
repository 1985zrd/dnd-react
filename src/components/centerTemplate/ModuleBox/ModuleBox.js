import React from 'react'
import './ModuleBox.scss'

import Add from '../Add/Add'
import GongGeAdd from '../GongGeAdd/GongGeAdd'


export default (props) => {
  let {item, children, addChildHandle, index} = props
  // console.log(props, '值', 'item', item)
  let {
    mainTitleChecked,
    title,
    titleColor,
    titleSize,
    subTitleChecked,
    subtitle,
    subtitleColor,
    subtitleSize,
  } = item.titleSet
  
  return (
    <div className="module-box"
         style={{backgroundColor: item.pageTemplateBg}}
    >
      <div className="module-box__title"
           style={{
             display: mainTitleChecked === true ? 'block' : 'none',
             fontSize: titleSize + 'px',
             color: titleColor
           }}
      >{title || '主标题內容'}</div>
      <div className="module-box__details"
           style={{
             display: subTitleChecked === true ? 'block' : 'none',
             fontSize: subtitleSize + 'px',
             color: subtitleColor
           }}
      >{subtitle || '副标题内容'}</div>
      {children}

      {
        item.templateType === 'gongGe'
        && item.components.length < 20
        &&
        <GongGeAdd
          index={index}
          item={item}
          addChildHandle={addChildHandle}/>
      }

      {
        ((item.templateType === 'card' || item.templateType === 'coupon')
        && item.components.length < 10)
        &&
        <Add
          index={index}
          item={item}
          addChildHandle={addChildHandle}/>
      }
    </div>
  )
}
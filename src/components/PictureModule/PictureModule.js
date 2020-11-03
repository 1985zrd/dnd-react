import React from 'react'
import './PictureModule.scss'

export default function ModalTitle({item}) {
  let imgUrl = typeof item.templateData === 'string' ? JSON.parse(item.templateData) : item.templateData
  return (
    <div key="item" className="module">
      <img src={imgUrl.templateUrl} alt=""/>
      <div className="module__title">{item.templateName}</div>
    </div>
  )
}
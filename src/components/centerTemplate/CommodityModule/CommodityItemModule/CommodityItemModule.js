import React from 'react'
import './CommodityItemModule.scss'

import {Button} from 'antd'

export default function CommodityItemModule({item, itemData}) {
  let {
    btnColor,
    btnText,
    btnTextColor,
  } = itemData.btnSet
  
  let {
    bottomColor,
    commodityNameColor,
    marketPriceColor,
    salePriceColor,
    textColor,
  } = itemData.commoditySet

  // 销售价格
  let str = item.salePrice.split('.')
  let salePriceBefore = str[0] || '00'
  let salePriceAfter = str[0] ? (str[1] ? '.' + str[1].slice(0,2) : '') : '.00'

  // 市场价格
  let str2 = item.marketPrice.split('.')
  let marketPrice = str2[0] ? (str2[1] ? str2[0] + '.' + str2[1].slice(0,2) : str2[0]) : '00.00'

  return (
    <div key="item" className="commodity-module"
         style={{
           backgroundColor: bottomColor,
         }}
    >
      <div className="commodity-module__img">
        <img src={item.url || require('@/assets/imgs/product_default.svg')} alt=""/>
      </div>
      <div className="commodity-module__right">
        <div className="right__top">
          <div
            className="right__top__title"
            style={{
              color: commodityNameColor
            }}
          >{item.productName || '商品名称'}</div>
          <div
            className="right__top__description"
            style={{
              color: textColor
            }}
          >{item.productDes || '商品介绍'}</div>
        </div>
        <div className="commodity-module__right__price"
             style={{
               color: salePriceColor
             }}
        >¥
          <span className="price-higher">
            {salePriceBefore}
            </span>
          {salePriceAfter}
          <span
          className="price-delete"
          style={{
            color: marketPriceColor
          }}
        >¥{marketPrice}
        </span>
        </div>
        <Button
          type="primary"
          className="commodity-module__right__btn"
          style={{
            backgroundColor: btnColor,
            color: btnTextColor
          }}
        >{btnText || '立即购买'}</Button>
      </div>
    </div>
  )
}
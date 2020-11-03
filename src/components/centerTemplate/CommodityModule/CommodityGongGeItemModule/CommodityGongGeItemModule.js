import React from 'react'
import './CommodityGongGeItemModule.scss'

import { Button } from 'antd'

export default function CommodityGongGeItemModule({ item, itemData }) {
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
  let marketPriceBefore = str[0] || '00'
  let marketPriceAfter = str[0] ? (str[1] ? '.' + str[1].slice(0,2) : '') : '.00'

  // 市场价格
  let str2 = item.marketPrice.split('.')
  let marketPrice = str2[0] ? (str2[1] ? str2[0] + '.' + str2[1].slice(0,2) : str2[0]) : '00.00'

  return (
      <div
        style={{
          backgroundColor: bottomColor,
        }}
        key="item"
        className="gong-ge-module" >
        <div className="gong-ge-module__img">
          <img src={item.url || require('@/assets/imgs/product_default.svg')} alt=""/>
        </div>
        <div className="gong-ge-module__desc">
          <div className="gong-ge-module__desc__title"
               style={{
                 color: commodityNameColor
               }}>
            {item.productName || '商品名称'}
          </div>
          <div className="gong-ge-module__desc__description"
               style={{
                 color: textColor
               }}>
            {item.productDes || '商品介绍'}
          </div>
          <div className="gong-ge-module__desc__price"
               style={{
                 color: salePriceColor
               }}>
            ¥
            <span className="price-higher">
            {marketPriceBefore}
            </span>
            {marketPriceAfter}
            <span className="price-delete"
                  style={{
                    color: marketPriceColor
                  }}>¥
            {marketPrice}
            </span>
          </div>
          <Button
            style={{
              backgroundColor: btnColor,
              color: btnTextColor
            }}
            type="primary"
            className="gong-ge-module__desc__btn">
            {btnText || '立即购买'}
          </Button>
        </div>
      </div>
  )
}
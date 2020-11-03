import React, {Component} from 'react'

import './CouponItemModule.scss'


class CommodityItem extends Component {
  
  render() {
    
    let {couponDes, couponName} = this.props.item
    let {btnSet, couponSet} = this.props.itemData
    
    return (
      <div className="coupon-item"
           style={{backgroundColor: couponSet.bottomColor}}
      >
        <div className="coupon-item__name"
             style={{
               color: couponSet.couponNameColor
             }}
        >
          {couponName || '优惠券名称'}
        </div>
        <div className="coupon-item__desc">
          <span className="coupon-item__desc__dateline"
                style={{
                  color: couponSet.textColor
                }}
          >
            {couponDes || '优惠券介绍'}
          </span>
        </div>
        {
          btnSet.isReceive === true ?
            <div className="coupon-item__btn"
                 style={{
                   backgroundColor: btnSet.btnColor,
                   color: btnSet.btnTextColor
                 }}
            >
              {btnSet.btnText || '立即领取'}
            </div> :
            <div className="coupon-item__btn"
                 style={{
                   backgroundColor: btnSet.getBtnColor,
                   color: btnSet.getBtnTextColor
                 }}
            >
              {btnSet.getBtnText || '已领取'}
            </div>
        }
      
      </div>
    )
  }
}


export default CommodityItem
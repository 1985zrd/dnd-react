import React, {Component} from 'react'
import {Input, Button} from 'antd'

// import {
//   getCoupon,
// } from 'api/create-page'


import './CouponDeploySingle.scss'

const {TextArea} = Input;


class CouponDeploySingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      couponChecked: true,
    }
  }
  
  
  componentWillMount() {
  
  }
  
  
  handleInput = (e) => {
    this.UpdateInput(e.target.name, e.target.value)
  }
  
  /*更新input 值*/
  UpdateInput(name, value) {
    let {pageComponents, clickActiveIndex, setPageComponents, clickActiveChildIndex} = this.props
    let pageData = pageComponents
    if(name === 'couponName') value = value.slice(0,12)
    if (name === 'couponBatch'){
      pageData[clickActiveIndex].itemData.components[clickActiveChildIndex][name] = value
      pageData[clickActiveIndex].itemData.components[clickActiveChildIndex].couponName = ''
      pageData[clickActiveIndex].itemData.components[clickActiveChildIndex].couponDes = ''
      setPageComponents(pageData)
    }else {
      pageData[clickActiveIndex].itemData.components[clickActiveChildIndex][name] = value
      setPageComponents(pageData)
    }
  }
  
  showAllocation(item) {
    if (item === 'coupon') {
      this.setState({
        couponChecked: !this.state.couponChecked
      })
    }
  }
  
  
  async getCoupon() {
    // let {pageComponents, clickActiveIndex, clickActiveChildIndex} = this.props
    // let couponBatch = pageComponents[clickActiveIndex].itemData.components[clickActiveChildIndex].couponBatch
    // if (couponBatch.length > 0 && couponBatch !== '') {
    //   let res = await getCoupon(couponBatch.trim())
    //   if (res && res.data) {
    //     let {batch,couponName,couponDesc} =  res.data
    //     if (batch !== '') {
    //       this.UpdateInput('couponBatch', batch)
    //     }
    //     if (couponName !== '') {
    //       this.UpdateInput('couponName', couponName)
    //     }
    //     if (couponDesc !== '') {
    //       this.UpdateInput('couponDes', couponDesc)
    //     }
    //   }
    // }
  }
  
  
  render() {
    
    let {
      couponBatch,  //批次
      couponName,   //优惠券名称
      couponDes,    //优惠券介绍
    } = this.props.currentPageData
    
    
    let {couponChecked} = this.state
    
    return (
      <div className="coupon-one">
        <div className="coupon-one__title flex color"
          onClick={() => this.showAllocation('coupon')}
        >
          <div className="title-style">单个优惠券设置</div>
          <img
            className="coupon-deploy__title__icon"
            src={couponChecked ? require('@/assets/imgs/common/dropDown.svg') : require('@/assets/imgs/common/dropUp.svg')}
            alt="icon"
          />
        </div>
        {
          couponChecked ?
            <>
            <div className="coupon-one__title flex">
              <div>优惠券批次<span className="num">({couponBatch.length}/10)</span></div>
            </div>
            <div className="flex coupon-one__title">
              <Input
                name="couponBatch"
                className="coupon-one__title__input"
                value={couponBatch}
                placeholder="请填写对应的优惠券批次"
                maxLength={10}
                onChange={this.handleInput}
              />
              <Button
                className="coupon-one__title__btn"
                onClick={this.getCoupon.bind(this)}
              >获取</Button>
            </div>
            
            <div className="coupon-one__title flex">
              <div>优惠券名称<span className="num">({couponName.length}/12)</span></div>
            </div>
            <div className="flex coupon-one__title">
              <Input
                name="couponName"
                className="coupon-one__title__input"
                value={couponName}
                placeholder="请输入优惠券名称"
                maxLength={12}
                onChange={this.handleInput}
              />
            </div>
            
            <div className="coupon-one__title flex">
              <div>优惠券描述<span className="num">({couponDes.length}/16)</span></div>
            </div>
            <div className="coupon-one__wrap">
              <TextArea
                name="couponDes"
                className="coupon-one__wrap__text-area"
                value={couponDes}
                placeholder="请输入优惠券描述"
                maxLength={16}
                onChange={this.handleInput}
              />
            </div>
            </> : ''
        }
      </div>
    )
  }
}


export default CouponDeploySingle

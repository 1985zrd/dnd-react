import React, {Component} from 'react'
import ColorSelection from 'containers/ColorSelection/ColorSelection'


class CouponSet extends Component {
  
  state = {
    couponChecked: true,
  }
  
  
  componentWillMount() {
  
  }
  
  showAllocation(item) {
    if (item === 'couponChecked') {
      this.setState({
        couponChecked: !this.state.couponChecked
      })
    }
  }
  
  
  render() {
    
    let {pageComponents, clickActiveIndex, clickActiveChildIndex, setPageComponents} = this.props
    let {couponChecked} = this.state
    
    let {
      couponNameColor,//优惠券名称颜色
      textColor,//文字描述颜色
      bottomColor,//底部颜色
    } = this.props.couponSet
    
    return (
      <>
      <div className="coupon-deploy__title flex wrap-padding"
        onClick={() => this.showAllocation('couponChecked')}
      >
        <div className="title-style">整体优惠券设置</div>
        <img
          className="coupon-deploy__title__icon"
            src={couponChecked ? require('@/assets/imgs/common/dropDown.svg') : require('@/assets/imgs/common/dropUp.svg')}
          alt="icon"
        />
      </div>
      {
        couponChecked ?
          <div className="title-set">
            <div className="title-set__title flex">
              <div className="title-style">优惠券名称颜色</div>
              <ColorSelection
                color={couponNameColor}
                Key={'couponNameColor'}
                module={'coupon'}
                pageComponents={pageComponents}
                clickActiveIndex={clickActiveIndex}
                clickActiveChildIndex={clickActiveChildIndex}
                setPageComponents={setPageComponents}
              />
            </div>
            <div className="title-set__title flex">
              <div className="title-style">文字描述颜色</div>
              <ColorSelection
                color={textColor}
                Key={'textColor'}
                module={'coupon'}
                pageComponents={pageComponents}
                clickActiveIndex={clickActiveIndex}
                clickActiveChildIndex={clickActiveChildIndex}
                setPageComponents={setPageComponents}
              />
            </div>
            <div className="title-set__title flex">
              <div className="title-style">底部颜色</div>
              <ColorSelection
                color={bottomColor}
                Key={'bottomColor'}
                module={'coupon'}
                pageComponents={pageComponents}
                clickActiveIndex={clickActiveIndex}
                clickActiveChildIndex={clickActiveChildIndex}
                setPageComponents={setPageComponents}
              />
            </div>
          </div>
          : ''
      }
      </>
    )
  }
}


export default CouponSet
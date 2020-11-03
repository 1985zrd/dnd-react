import React, {Component} from 'react'
import ColorSelection from 'containers/ColorSelection/ColorSelection'


class CommoditySet extends Component {
  
  state = {
    commodityChecked: true,
  }
  
  
  showAllocation(item) {
    if (item === 'commodityChecked') {
      this.setState({
        commodityChecked: !this.state.commodityChecked
      })
    }
  }
  
  
  render() {
    
    let {pageComponents, clickActiveIndex, clickActiveChildIndex, setPageComponents} = this.props
    let {commodityChecked} = this.state
    
    let {
      commodityNameColor,//商品名称颜色
      textColor,//商品描述颜色
      salePriceColor,//销售价格颜色
      marketPriceColor,//市场价格颜色
      bottomColor,//底部颜色
    } = this.props.commoditySet
    
    return (
      <>
      <div className="coupon-deploy__title flex wrap-padding"
        onClick={() => this.showAllocation('commodityChecked')}
      >
        <div className="title-style">整体商品设置</div>
        <img
          className="coupon-deploy__title__icon"
          src={commodityChecked ? require('@/assets/imgs/common/dropDown.svg') : require('@/assets/imgs/common/dropUp.svg')}
          alt="icon"
        />
      </div>
      {
        commodityChecked ?
          <div className="title-set">
            <div className="title-set__title flex">
              <div className="title-style">商品名称颜色</div>
              <ColorSelection
                color={commodityNameColor}
                Key={'commodityNameColor'}
                module={'commodity'}
                pageComponents={pageComponents}
                clickActiveIndex={clickActiveIndex}
                clickActiveChildIndex={clickActiveChildIndex}
                setPageComponents={setPageComponents}
              />
            </div>
            <div className="title-set__title flex">
              <div className="title-style">商品描述颜色</div>
              <ColorSelection
                color={textColor}
                Key={'textColor'}
                module={'commodity'}
                pageComponents={pageComponents}
                clickActiveIndex={clickActiveIndex}
                clickActiveChildIndex={clickActiveChildIndex}
                setPageComponents={setPageComponents}
              />
            </div>
            <div className="title-set__title flex">
              <div className="title-style">销售价格颜色</div>
              <ColorSelection
                color={salePriceColor}
                Key={'salePriceColor'}
                module={'commodity'}
                pageComponents={pageComponents}
                clickActiveIndex={clickActiveIndex}
                clickActiveChildIndex={clickActiveChildIndex}
                setPageComponents={setPageComponents}
              />
            </div>
            <div className="title-set__title flex">
              <div className="title-style">市场价格颜色</div>
              <ColorSelection
                color={marketPriceColor}
                Key={'marketPriceColor'}
                module={'commodity'}
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
                module={'commodity'}
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


export default CommoditySet
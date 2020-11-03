import React, {Component} from 'react'

// import TitleSet from './TitleSet/TitleSet'
import TitleSet from '../Common/TitleSet/TitleSet'
import CouponSet from './CouponSet/CouponSet'
import ButtonSet from './ButtonSet/ButtonSet'
import ColorSelection from 'containers/ColorSelection/ColorSelection'

import './CouponDeploy.scss'

class CouponDeploy extends Component {
  
  componentWillMount() {
  
  }
  
  
  render() {
    let {pageComponents, currentPageData, clickActiveIndex, clickActiveChildIndex, setPageComponents} = this.props
    
    let {pageTemplateBg, titleSet, couponSet, btnSet} = currentPageData
    
    
    return (
      <div className="coupon-deploy">
        <div className="title-set__title title-set flex">
          <div className="title-style">模块背景</div>
          <ColorSelection
            color={pageTemplateBg}
            module={'模块背景'}
            Key={'pageTemplateBg'}
            pageComponents={pageComponents}
            clickActiveIndex={clickActiveIndex}
            clickActiveChildIndex={clickActiveChildIndex}
            setPageComponents={setPageComponents}
          />
        </div>
        <TitleSet
          titleSet={titleSet}
          
          pageComponents={pageComponents}
          clickActiveIndex={clickActiveIndex}
          clickActiveChildIndex={clickActiveChildIndex}
          setPageComponents={setPageComponents}
        />
        <CouponSet
          couponSet={couponSet}
          pageComponents={pageComponents}
          clickActiveIndex={clickActiveIndex}
          clickActiveChildIndex={clickActiveChildIndex}
          setPageComponents={setPageComponents}
        />
        <ButtonSet
          btnSet={btnSet}
          pageComponents={pageComponents}
          clickActiveIndex={clickActiveIndex}
          clickActiveChildIndex={clickActiveChildIndex}
          setPageComponents={setPageComponents}
        />
      </div>
    )
  }
}


export default CouponDeploy
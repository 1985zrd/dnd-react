import React, {Component} from 'react'

import TitleSet from '../Common/TitleSet/TitleSet'
import InfoSet from './InfoSet/InfoSet'
import ButtonSet from '../Common/ButtonSet/ButtonSet'
import ColorSelection from 'containers/ColorSelection/ColorSelection'




class Info extends Component {
  
  render() {
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props

    let currentPageData = pageComponents[clickActiveIndex].itemData

    let {pageTemplateBg, titleSet, btnSet} = currentPageData
    
    
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
            setPageComponents={setPageComponents}
          />
        </div>
        <TitleSet
          titleSet={titleSet}
          pageComponents={pageComponents}
          clickActiveIndex={clickActiveIndex}
          setPageComponents={setPageComponents}
        />
        <InfoSet
          pageComponents={pageComponents}
          clickActiveIndex={clickActiveIndex}
          setPageComponents={setPageComponents}
        />
        <ButtonSet
          btnSet={btnSet}
          pageComponents={pageComponents}
          clickActiveIndex={clickActiveIndex}
          setPageComponents={setPageComponents}
        />
      </div>
    )
  }
}


export default Info
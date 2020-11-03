import React, {Component} from 'react'
import './AllDeploy.scss'


import CouponDeploy from '../CouponDeploy/CouponDeploy'  //优惠券整体配置
import CouponDeploySingle from '../CouponDeploy/CouponDeploySingle/CouponDeploySingle'  //单优惠券配置
import Commodity from '../Commodity/Commodity'  //单品整体配置
import CommodityItem from '../Commodity/CommodityItem/CommodityItem'  //单品子配置
import ImageOptions from '../ImageOptions/ImageOptions'
import Info from '../Info/Info'  //收集信息配置


class AllDeploy extends Component {

  state = {
    currentTemplate: '',   // 当前页配置模板
  }

  componentWillMount() {
    this.disposeDate()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.page !== this.props.page) {
      this.disposeDate()
    }
  }

  /*这个方法判断当前页面当前配置对象的值*/
  disposeDate = () => {
    let {clickActiveIndex, clickActiveChildIndex, pageComponents, isCheckChildCom} = this.props
    if (clickActiveIndex !== '' && !isCheckChildCom) {
      this.setState({
        currentPageData: pageComponents[clickActiveIndex].itemData,
        currentTemplate: pageComponents[clickActiveIndex].itemData.templateType,
      })
    }else if (clickActiveIndex !== '' && clickActiveChildIndex !== '' && isCheckChildCom) {
      this.setState({
        currentPageData: pageComponents[clickActiveIndex].itemData.components[clickActiveChildIndex],
        currentTemplate: pageComponents[clickActiveIndex].itemData.templateType,
      })
    }
  }

  render() {

    let {clickActiveIndex, clickActiveChildIndex, pageComponents, setPageComponents, page} = this.props

    let {currentPageData, currentTemplate} = this.state
    // console.log('当前数据：',this.state.currentPageData,'类型：',this.state.currentTemplate,'子：',isCheckChildCom)

    return (

      <div>
        {
          currentTemplate === 'coupon' && currentPageData.components &&
          <CouponDeploy
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            clickActiveIndex={clickActiveIndex}
            clickActiveChildIndex={clickActiveChildIndex}
            currentPageData={currentPageData}
          />
        }
        {
          currentTemplate === 'coupon' && !currentPageData.components &&
          <CouponDeploySingle
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            clickActiveIndex={clickActiveIndex}
            clickActiveChildIndex={clickActiveChildIndex}
            currentPageData={currentPageData}
          />
        }

        {
          (currentTemplate === 'card' || currentTemplate === 'gongGe') && currentPageData.components &&
          <Commodity
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            clickActiveIndex={clickActiveIndex}
            clickActiveChildIndex={clickActiveChildIndex}
            currentPageData={currentPageData}
          />
        }

        {
          (currentTemplate === 'card' || currentTemplate === 'gongGe') && !currentPageData.components &&
          <CommodityItem
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            clickActiveIndex={clickActiveIndex}
            clickActiveChildIndex={clickActiveChildIndex}
            currentPageData={currentPageData}
          />
        }

        {
          currentTemplate === 'img' && !currentPageData.components &&
          <ImageOptions
            key={clickActiveIndex}
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            clickActiveIndex={clickActiveIndex}
            clickActiveChildIndex={clickActiveChildIndex}
            page={page}
          />
        }

        {
          currentTemplate === 'info' &&
          <Info
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            clickActiveIndex={clickActiveIndex}
            currentPageData={currentPageData}
          />
        }

      </div>

    )
  }
}


export default AllDeploy
import React, {Component} from 'react'
import {Input, Button } from 'antd';
import UploadPicture from '../../UploadPicture/UploadPicture'

// import {
//   getProduct,
// } from 'api/create-page'

import './CommodityItem.scss'

const {TextArea} = Input;

class CouponDeploySingle extends Component {

  state = {
    clearMessage: false,   // 清空图片错误信息
  }

  handleInput = (e) => {
    this.UpdateInput(e.target.name, e.target.value)
  }

  handleProductCodeInput = (e) => {
    this.UpdateInput(e.target.name, e.target.value)
    this.UpdateInput('isGetProductInfo', false)
    this.UpdateInput('productName', '')
    this.UpdateInput('productDes', '')
    this.UpdateInput('salePrice', '')
    this.UpdateInput('marketPrice', '')
    this.UpdateInput('url', '')
    this.UpdateInput('smallImage', '')
    this.setState({
      clearMessage: true
    })
}

  /*更新input 值*/
  UpdateInput(name, value) {
    // 限制位数
    if(name === 'salePrice') value = value.slice(0,8)
    if(name === 'marketPrice') value = value.slice(0,8)

    let {pageComponents, clickActiveIndex, setPageComponents, clickActiveChildIndex} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.components[clickActiveChildIndex][name] = value
    setPageComponents(pageData)
  }

  async getProducts() {
    // let {pageComponents, clickActiveIndex, clickActiveChildIndex} = this.props
    // let productCode = pageComponents[clickActiveIndex].itemData.components[clickActiveChildIndex].productCode
    // if (productCode.length > 0 && productCode !== '') {
    //   let res = await getProduct(encodeURIComponent(productCode.trim()))
    //   // console.log(res.data, '结果', productCode.trim())
    //   if (res && res.data) {
    //     this.setState({
    //       clearMessage: false
    //     })
    //     this.UpdateInput('isGetProductInfo', true)
        
    //     let {code, goodsName, goodsDesc, marketPrice, price, smallImage, goodsCategory} = res.data
        
    //     if (code !== '') {
    //       this.UpdateInput('productCode', code)
    //     }
    //     if (goodsName !== '') {
    //       this.UpdateInput('productName', goodsName)
    //     }
    //     if (goodsDesc !== '') {
    //       this.UpdateInput('productDes', goodsDesc)
    //     }
    //     if (price !== '') {
    //       this.UpdateInput('salePrice', price)
    //     }
    //     if (marketPrice !== '') {
    //       this.UpdateInput('marketPrice', marketPrice)
    //     }
    //     if (smallImage !== '') {
    //       this.UpdateInput('url', smallImage)
    //     }
    //     if (goodsCategory !== '') {
    //       this.UpdateInput('type', goodsCategory)
    //     }
    //   }
    // }
  }
  
  uploadImg = (img) => {
    this.UpdateInput('url', img)
  }

  render() {
    
    let {
      productCode,   //商品编码
      productName,//优惠券名称
      productDes,//商品介绍
      salePrice,//销售价格
      marketPrice,//市场价格
      url,
      isGetProductInfo,
      // templateType
    } = this.props.currentPageData

    return (
      <div className="commodity-item">
        <div className="commodity-item__title flex">
          <div className="title-style">商品编码<span className="num">({productCode.length}/15)</span></div>
        </div>
        <div className="commodity-item__content flex">
          <Input
            name="productCode"
            className="commodity-item__content__input"
            value={productCode}
            placeholder="请填写商品对应系统的编码"
            maxLength={15}
            onChange={this.handleProductCodeInput}
          />
          <Button
            className="commodity-item__content__btn"
            onClick={this.getProducts.bind(this)}
          >获取</Button>
        </div>

        <UploadPicture
          clearMessage={this.state.clearMessage}
          disabled={!isGetProductInfo}
          imageUrl={url}
          uploadHnadle={this.uploadImg}
        />
        
        <div className="commodity-item__content">
          <div className="commodity-item__content__waring">温馨提示：请上传宽度不超过 750px 的图片，大小为2M以内</div>
        </div>
        <div className="commodity-item__title flex">
          {/*<div className="title-style">商品名称<span className="num">({productName.length}/{templateType === 'card' ? 22 : 9})</span></div>*/}
          <div className="title-style">商品名称</div>
        </div>
        <div className="commodity-item__content flex">
          <Input
            name="productName"
            value={productName}
            placeholder="商品名称"
            onChange={this.handleInput}
          />
        </div>
        <div className="commodity-item__title flex">
          <div className="title-style">商品描述</div>
        </div>
        <div className="commodity-item__wrap">
              <TextArea
                name="productDes"
                className="commodity-item__wrap__text-area"
                value={productDes}
                placeholder="商品描述"
                onChange={this.handleInput}
              />
        </div>
        <div className="commodity-item__title flex">
          <div className="title-style">销售价格<span className="num">({salePrice.length}/8)</span></div>
        </div>
        <div className="commodity-item__content flex">
          <Input
            type="number"
            name="salePrice"
            value={salePrice}
            placeholder="0.00"
            maxLength={8}
            onChange={this.handleInput}
          />
        </div>
        <div className="commodity-item__title flex">
          <div className="title-style">市场价格<span className="num">({marketPrice.length}/8)</span></div>
        </div>
        <div className="commodity-item__content flex">
          <Input
            type="number"
            name="marketPrice"
            value={marketPrice}
            placeholder="0.00"
            maxLength={8}
            onChange={this.handleInput}
          />
        </div>
      </div>
    )
  }
}


export default CouponDeploySingle
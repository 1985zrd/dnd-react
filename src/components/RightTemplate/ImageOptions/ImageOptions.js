import React, { Component } from 'react'
import { Upload, Button, Select, Input, message } from 'antd'
import { cloneDeep } from 'lodash'
import './ImageOptions.scss'
import { debounce } from 'lodash'

// import { fileUpload, getProduct, getCoupon } from 'api/create-page.js'

const { Option } = Select
const { TextArea } = Input

class ImageOptions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showError: false,
      commodityMessage: '',
      commodity: {},
      coupon: []
    }
  }
  componentWillMount () {
    const { pageComponents, clickActiveIndex } = this.props
    const coupon = Object.assign([] , pageComponents[clickActiveIndex]['itemData']['coupon'])
    const commodity = Object.assign({} , pageComponents[clickActiveIndex]['itemData']['commodity'])
    this.setState({
      commodity: commodity,
      coupon: coupon
    })
  }
  async uploadChange (e) {
    // const w = await this.checkPictureHeight(e.file)
    // this.setState({
    //   showError: false
    // })
    // let limit = 1024 * 1024 * 2
    // if (e.file.size > limit || w > 750) {
    //   message.error('图片超过大小')
    //   this.setState({
    //     showError: true
    //   })
    //   return
    // }
    // const formDate = new FormData()
    // formDate.append('file', e.file)
    // const res = await fileUpload(formDate)
    // if (res.code === 200 && res.data) {
    //   this.savePageComponents('url', res.data)
    // } else {
    //   message.error(res.msg)
    // }
  }
  checkPictureHeight (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) { 
        var data = e.target.result
        const image = new Image()
        image.onload = function () {
          var w = image.width
          resolve(w)
        }
        image.src= data
      }  
    })
  }
  selectChange (e) {
    this.savePageComponents('mode', e)
  }
  inputChange (e) {
    debounce(this.savePageComponents, 500).call(this, e.target.name, e.target.value)
  }
  productCodeChange (e) {
    this.setState({
      commodity: {...this.state.commodity, code: e.target.value},
      commodityMessage: ''
    })
  }
  async getProductHandler () {
    // if(!this.state.commodity.code) {
    //   return message.info('请填写商品对应系统的编码')
    // }
    // const res = await getProduct(this.state.commodity.code)
    // if (res.code && res.code === 200 && res.data) {
    //   let commodity = {...res.data, type: res.data.goodsCategory}
    //   this.savePageComponents('commodity', commodity)
    //   this.setState({
    //     commodity: commodity
    //   })
    // } else {
    //   this.setState({
    //     commodity: {},
    //     commodityMessage: res.msg
    //   })
    //   this.savePageComponents('commodity', {})
    // }
  }
  batchCodeChange (index, e) {
    let coupon = cloneDeep(this.state.coupon)
    coupon[index]['batch'] = e.target.value
    this.setState({
      coupon: coupon
    })
  }
  async getCouponHandler (index) {
    // let coupon = cloneDeep(this.state.coupon)
    // let batch = ''
    // if (coupon[index] && coupon[index]['batch']) {
    //   batch = coupon[index]['batch']
    // }
    // if (!batch) {
    //   message.error('请输入优惠券批次')
    //   return
    // }
    // const res = await getCoupon(batch)
    // if (res.code === 200 && res.data) {
    //   coupon[index] = Object.assign({}, res.data)
    //   coupon[index]['batch'] = batch
    //   this.setState({
    //     coupon: coupon
    //   })
    //   this.savePageComponents('coupon', coupon)
    // }
  }
  addCouponHandler () {
    let coupon = [...this.state.coupon]
    coupon.push({
      'batch': '',
      'couponName': ''
    })
    this.setState({
      coupon: coupon
    })
  }
  
  delCouponHandler (index) {
    let coupon = cloneDeep(this.state.coupon)
    coupon.splice(index, 1)
    this.setState({
      coupon: coupon
    })
    this.savePageComponents('coupon', coupon)
  }

  savePageComponents (key, value) {
    const { setPageComponents, pageComponents, clickActiveIndex } = this.props
    let components = cloneDeep(pageComponents)
    components[clickActiveIndex]['itemData'][key] = value
    setPageComponents(components)
  }
  render () {
    const { pageComponents, clickActiveIndex, page } = this.props
    let { showError, commodityMessage, commodity, coupon } = this.state
    const url = pageComponents[clickActiveIndex]['itemData']['url']
    const mode = pageComponents[clickActiveIndex]['itemData']['mode']
    const jumpUrl = pageComponents[clickActiveIndex]['itemData']['jumpUrl']
    if (!coupon.length) {
      coupon[0] = {
        'batch': '',
        'couponName': ''
      }
    }
    return (
      <div className="image-options">
        <div className="image-options__rows">
          <span>图片</span>
          <div>
            {
              url ? <img className="image-options__imgs" src={url} alt="图片" /> : <span className="image-options__noImgs"></span>
            }
            
            <Upload
              accept=".jpg,.jpeg,.png,.gif,.bmp"
              fileList={[]}
              customRequest={this.uploadChange.bind(this)}
            >
              <Button>{url ? '替换 ' : '上传 '}</Button>
            </Upload>
          </div>
        </div>
        <p className="image-options__tips">温馨提示：请上传宽度为 750px 的图片，大小为2M 以内</p>
        {
          showError ? <p className="image-options__error">图片超过大小</p> : ''
        }
        <div className="image-options__select">
          <p>跳转类型</p>
          <Select value={mode} style={{ width: 120 }} onChange={this.selectChange.bind(this)} placeholder="
请选择">
            <Option value="1">无跳转</Option>
            <Option value="2">跳转到固定链接</Option>
            <Option value="3" disabled={page.appType !== 'TJB_PUSH' && page.appType !== 'APP_PUSH'}>跳转到商品详情</Option>
            <Option value="4" disabled={page.appType !== 'TJB_PUSH' && page.appType !== 'APP_PUSH'}>领取优惠券</Option>
          </Select>
        </div>
        {
          mode === '2' ? (
            <div className="image-options__setting">
              <p className="image-options__setting__title">跳转地址</p>
              <Input name="jumpUrl" defaultValue={jumpUrl} onChange={this.inputChange.bind(this)} placeholder="请输入跳转地址" />
              {/* {
                jumpUrl.length <= 0 ? <p className="image-options__error">请输入跳转地址</p> : ''
              } */}
            </div>
          ) : ''
        }
        
        {
          mode === '3' ? (
            <div className="image-options__setting">
              <p className="image-options__setting__title">商品编码</p>
              <div className="image-options__rows">
                <Input defaultValue={commodity.code} onChange={this.productCodeChange.bind(this)} placeholder="请填写商品对应系统的编码" />
                <Button onClick={this.getProductHandler.bind(this)}>获取 </Button>
              </div>
              {
                commodityMessage ? <p className="image-options__commodity__message">{ commodityMessage }</p> : ''
              }
              <p className="image-options__setting__title">商品名称</p>
              <div>
                <Input value={commodity.goodsName} disabled={true} placeholder="" />
              </div>
              <p className="image-options__setting__title">商品描述</p>
              <div>
                <TextArea value={commodity.goodsDesc} disabled={true} rows={4} placeholder="" />
              </div>
              <p className="image-options__setting__title">销售价格</p>
              <div>
                <Input value={commodity.price} disabled={true} placeholder="" />
              </div>
              <p className="image-options__setting__title">市场价格</p>
              <div>
                <Input value={commodity.marketPrice} disabled={true} placeholder="" />
              </div>
            </div>
          ) : ''
        }
        
        {
          mode === '4' ? (
            <div className="image-options__setting">
              {
                coupon.map((item, index) => {
                  let num = index + 1
                  return (
                    <div key={num}>

                      <p className="image-options__setting__title">优惠券批次<span>（{num}/10）</span>
                         { coupon.length <= 1 ? '' : <i onClick={this.delCouponHandler.bind(this, index)}></i>}
                      </p>

                      <div className="image-options__rows">
                        <Input value={item.batch} onChange={this.batchCodeChange.bind(this, index)} placeholder="请填写对应的优惠券批次" />
                        <Button onClick={this.getCouponHandler.bind(this, index)}>获取 </Button>
                      </div>
                      <div className="image-options__setting__disable">
                        <Input value={item.couponName} disabled={true} placeholder="" />
                      </div>
                    </div>
                  )
                })
              }
              {
                coupon.length < 10 ? (
                  <div className="image-options__add__coupon">
                    <Button onClick={this.addCouponHandler.bind(this)} icon="plus">添加优惠券</Button>
                  </div>
                ) : ''
              }
            </div>
          ) : ''
        }
        
      </div>
    )
  }
}

export default ImageOptions

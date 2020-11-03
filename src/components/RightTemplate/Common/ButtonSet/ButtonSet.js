import React, {PureComponent} from 'react'
import {Input} from 'antd'

import ColorSelection from 'containers/ColorSelection/ColorSelection'

import './ButtonSet.scss'


class ButtonSet extends PureComponent {
  
  state = {
    outerBtnChecked: true
  }
  
  
  handleInput = (e) => {
    /* console.log('235',e.target.name,e.target.value)*/
    this.UpdateInput(e.target.name, e.target.value)
  }
  
  /*更新input 值*/
  UpdateInput(name, value) {
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.btnSet[name] = value
    setPageComponents(pageData)
  }
  
  showAllocation(item) {
    if (item === 'outerBtnChecked') {
      this.setState({
        outerBtnChecked: !this.state.outerBtnChecked
      })
    } else if (item === 'btnChecked') {
      this.UpdateSwitch(item)
    }
  }

  /*更新开关*/
  UpdateSwitch(item) {
    /*console.log(item,'标题')*/
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.btnSet[item] = !pageData[clickActiveIndex].itemData.btnSet[item]
    setPageComponents(pageData)
  }
  
  render() {
    let {pageComponents, clickActiveIndex, clickActiveChildIndex, setPageComponents} = this.props
    let {outerBtnChecked} = this.state

    if (!this.props.btnSet) {
      return null
    }

    let {
      // btnChecked, // 开关
      btnText,//立即领取
      btnTextColor,//文字颜色
      btnColor,//按钮颜色
    } = this.props.btnSet

    return (
      <>
      <div className="coupon-deploy__title flex wrap-padding"
        onClick={() => this.showAllocation('outerBtnChecked')}
      >
        <div className="title-style">按钮设置</div>
        <img
          className="coupon-deploy__title__icon"
          src={outerBtnChecked ? require('@/assets/imgs/common/dropDown.svg') : require('@/assets/imgs/common/dropUp.svg')}
          alt="icon"
        />
      </div>
      {
        outerBtnChecked ?
          <>
          <div className="title-switch flex wrap-padding">
            <div>按钮文字<span className="num">({btnText.length}/6)</span></div>
            {/*<Switch
              defaultChecked
              onClick={() => this.showAllocation('btnChecked')}
            />*/}
          </div>
          {
            // btnChecked ?
              <div className="title-set btn-wrap">
                <Input
                  name="btnText"
                  className="title-set__input"
                  value={btnText}
                  placeholder={pageComponents[clickActiveIndex].itemData.templateType === 'info' ? '立即提交' : '立即购买'}
                  maxLength={6}
                  onChange={this.handleInput}
                />
                <div className="title-set__title flex">
                  <div className="title-style">文字颜色</div>
                  <ColorSelection
                    color={btnTextColor}
                    Key={'btnTextColor'}
                    module={'btn'}
                    pageComponents={pageComponents}
                    clickActiveIndex={clickActiveIndex}
                    clickActiveChildIndex={clickActiveChildIndex}
                    setPageComponents={setPageComponents}
                  />
                </div>
                <div className="title-set__title flex">
                  <div className="title-style">按钮颜色</div>
                  <ColorSelection
                    color={btnColor}
                    Key={'btnColor'}
                    module={'btn'}
                    pageComponents={pageComponents}
                    clickActiveIndex={clickActiveIndex}
                    clickActiveChildIndex={clickActiveChildIndex}
                    setPageComponents={setPageComponents}
                  />
                </div>
              </div>
            // : ''
          }
          </> : ''
      }
      </>
    )
  }
}


export default ButtonSet
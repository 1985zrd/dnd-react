import React, {Component} from 'react'
import {Switch, Input, Tabs} from 'antd'

import ColorSelection from 'containers/ColorSelection/ColorSelection'

import './ButtonSet.scss'

const {TabPane} = Tabs;


class ButtonSet extends Component {
  
  state = {
    outerBtnChecked: true,
    key: '1',
  }
  
  
  componentWillMount() {
    let {isReceive} = this.props.btnSet
    let key = isReceive ?  '1' : '2'
    this.setState({key})
  }
  
  handleInput = (e) => {
    /*console.log('235',e.target.name,e.target.value)*/
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
    } else if (item === 'btnChecked' || item === 'getBtnChecked') {
      this.UpdateSwitch(item)
    }
  }
  
  
  /*更新开关*/
  UpdateSwitch(item) {
    /* console.log(item,'标题')*/
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.btnSet[item] = !pageData[clickActiveIndex].itemData.btnSet[item]
    setPageComponents(pageData)
  }
  
  onChange(key) {
    this.setState({
      key
    })
    this.UpdateSwitch('isReceive')
  }
  
  render() {
    let {pageComponents, clickActiveIndex, clickActiveChildIndex, setPageComponents} = this.props
    let {outerBtnChecked} = this.state
    
    let {
      btnChecked, // 开关
      btnText,//立即领取
      btnTextColor,//文字颜色
      btnColor,//按钮颜色
      getBtnChecked,   // 开关
      getBtnText,//已领取
      getBtnTextColor,//已领取文字颜色
      getBtnColor,//已领取按钮颜色
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
          <div>
            <Tabs
              defaultActiveKey={this.state.key}
              className="tab-pane"
              onChange={(key) => this.onChange(key)}
            >
              <TabPane tab="默认样式" key="1">
                <div className="title-switch flex wrap-padding">
                  <div>按钮文字<span className="num">({btnText.length}/6)</span></div>
                  <Switch
                    defaultChecked={btnChecked}
                    onClick={() => this.showAllocation('btnChecked')}
                  />
                </div>
                {
                  btnChecked ?
                    <div className="title-set btn-wrap">
                      <Input
                        name="btnText"
                        className="title-set__input"
                        value={btnText}
                        placeholder="立即领取"
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
                    </div> : ''
                }
              </TabPane>
              <TabPane tab="已领取样式" key="2">
                <div className="title-switch flex wrap-padding">
                  <div>按钮文字<span className="num">({btnText.length}/6)</span></div>
                  <Switch
                    defaultChecked={getBtnChecked}
                    onClick={() => this.showAllocation('getBtnChecked')}
                  />
                </div>
                {
                  getBtnChecked ?
                    <div className="title-set btn-wrap">
                      <Input
                        name="getBtnText"
                        className="title-set__input"
                        value={getBtnText}
                        placeholder="已领取"
                        maxLength={6}
                        onChange={this.handleInput}
                      />
                      <div className="title-set__title flex">
                        <div className="title-style">文字颜色</div>
                        <ColorSelection
                          color={getBtnTextColor}
                          Key={'getBtnTextColor'}
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
                          color={getBtnColor}
                          Key={'getBtnColor'}
                          module={'btn'}
                          pageComponents={pageComponents}
                          clickActiveIndex={clickActiveIndex}
                          clickActiveChildIndex={clickActiveChildIndex}
                          setPageComponents={setPageComponents}
                        />
                      </div>
                    </div> : ''
                }
              </TabPane>
            </Tabs>
          </div> : ''
      }
      </>
    )
  }
}


export default ButtonSet
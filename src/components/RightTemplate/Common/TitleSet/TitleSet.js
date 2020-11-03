import React, {Component} from 'react'
import {Switch, Input} from 'antd'

import ColorSelection from 'containers/ColorSelection/ColorSelection'
import SelectSize from 'containers/SelectSize/SelectSize'

const {TextArea} = Input;

class TitleSet extends Component {
  
  state = {
    titleChecked: true
  }
  
  componentWillMount() {
  }
  
  handleInput = (e) => {
    /*console.log('235',e.target.name,e.target.value)*/
    this.UpdateInput(e.target.name, e.target.value)
  }
  
  
  showAllocation(item) {
    /* console.log(item,'开关')*/
    if (item === 'titleChecked') {
      this.setState({
        titleChecked: !this.state.titleChecked
      })
    } else if (item === 'mainTitleChecked' || item === 'subTitleChecked') {
      this.UpdateSwitch(item)
    }
  }
  
  /*更新开关*/
  UpdateSwitch(item) {
    /*console.log(item,'标题')*/
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.titleSet[item] = !pageData[clickActiveIndex].itemData.titleSet[item]
    setPageComponents(pageData)
  }
  
  
  /*更新input 值*/
  UpdateInput(name, value) {
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.titleSet[name] = value
    setPageComponents(pageData)
  }
  
  
  render() {
    let {pageComponents, clickActiveIndex, clickActiveChildIndex, setPageComponents} = this.props
    let {titleChecked} = this.state
    /* console.log(this.props.titleSet.mainTitleChecked,'13456789')*/

    if (!this.props.titleSet) {
      return null
    }

    let {
      mainTitleChecked, //主标题开关
      title, //主标题内容
      titleColor, //主标题颜色
      subTitleChecked, //副标题开关
      subtitle, //副标题内容
      subtitleColor,//副标题颜色
      titleSize, //
      subtitleSize // 副标题字号
    } = this.props.titleSet
    
    return (
      <>
      <div className="coupon-deploy__title flex wrap-padding"
        onClick={() => this.showAllocation('titleChecked')}
      >
        <div className="title-style">标题设置</div>
        <img
          className="coupon-deploy__title__icon"
          src={titleChecked ? require('@/assets/imgs/common/dropDown.svg') : require('@/assets/imgs/common/dropUp.svg')}
          alt="icon"
        />
      </div>
      {
        titleChecked ?
          <>
          <div className="title-switch flex wrap-padding">
            <div>主标题<span className="num">({title.length}/15)</span></div>
            <Switch
              defaultChecked={mainTitleChecked}
              onClick={() => this.showAllocation('mainTitleChecked')}
            />
          </div>
          {
            mainTitleChecked ?
              <div className="title-set">
                <Input
                  name="title"
                  className="title-set__input"
                  value={title}
                  placeholder="主标题内容"
                  maxLength={15}
                  onChange={this.handleInput}
                />
                <div className="title-set__title flex">
                  <div className="title-style">主标题颜色</div>
                  <ColorSelection
                    color={titleColor}
                    Key={'titleColor'}
                    module={'title'}
                    pageComponents={pageComponents}
                    clickActiveIndex={clickActiveIndex}
                    clickActiveChildIndex={clickActiveChildIndex}
                    setPageComponents={setPageComponents}
                  />
                </div>
                <div className="title-set__title flex">
                  <div className="title-style">主标题字号</div>
                  <SelectSize
                    defaultArray={[36,38]}
                    defaultValue={titleSize}
                    module={'title'}
                    Key={'titleSize'}
                    pageComponents={pageComponents}
                    clickActiveIndex={clickActiveIndex}
                    clickActiveChildIndex={clickActiveChildIndex}
                    setPageComponents={setPageComponents}
                  />
                </div>
              </div> : ''
          }
          <div className="title-switch flex wrap-padding">
            <div>副标题<span className="num">({subtitle.length}/100)</span></div>
            <Switch
              defaultChecked={subTitleChecked}
              onClick={() => this.showAllocation('subTitleChecked')}
            />
          </div>
          {
            subTitleChecked ?
              <div className="title-set">
              <TextArea
                name="subtitle"
                className="title-set__text-area"
                value={subtitle}
                placeholder="副标题内容"
                maxLength={100}
                onChange={this.handleInput}
              />
                <div className="title-set__title flex">
                  <div className="title-style">副标题颜色</div>
                  <ColorSelection
                    color={subtitleColor}
                    Key={'subtitleColor'}
                    module={'title'}
                    pageComponents={pageComponents}
                    clickActiveIndex={clickActiveIndex}
                    clickActiveChildIndex={clickActiveChildIndex}
                    setPageComponents={setPageComponents}
                  />
                </div>
                <div className="title-set__title flex">
                  <div className="title-style">副标题字号</div>
                  <SelectSize
                    defaultArray={[28,30]}
                    module={'title'}
                    Key={'subtitleSize'}
                    defaultValue={subtitleSize}
                    pageComponents={pageComponents}
                    clickActiveIndex={clickActiveIndex}
                    clickActiveChildIndex={clickActiveChildIndex}
                    setPageComponents={setPageComponents}
                  />
                </div>
              </div> : ''
          }
          </> : ''
      }
      </>
    )
  }
}


export default TitleSet
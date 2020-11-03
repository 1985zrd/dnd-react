import React, {Component} from 'react'
import {Input} from 'antd';
import MyColorPicker from './MyColorPicker/MyColorPicker'

import './ColorSelection.scss'


class ColorSelection extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      defaultColor: props.color,
      color: props.color,
      key: props.Key,
      displayColorPicker: "none",
    };
  }

  // 关闭颜色框的事件
  fn = (e) =>{
    // 如果没有e.path这个对象,  火狐浏览器没有这个对象;
    if(!e.path){
      document.body.removeEventListener('click',this.fn)
      return
    }
    // 关闭颜色选框的条件;
    let flag = e.path.some(item=>{
      // return item.className === 'color__selection' || item.className === 'color-wrap__input__btn'
      return item.className === 'color__selection' || item.className === 'color-wrap'
    })
    if(!flag){
      this.setState({displayColorPicker: 'none'})
      document.body.removeEventListener('click',this.fn)
    }
  }

  handleClick = e => {
    document.body.addEventListener('click',this.fn)
    let {displayColorPicker} = this.state;
    displayColorPicker = displayColorPicker === "none" ? "block" : "none";
    this.setState({displayColorPicker})
    this.handleChange(this.props.color, {hex:this.props.color})
  }
  
  // 修改之后的颜色选择框
  handleChange = (defaultColor,obj) => {
    let color = obj.hex;
    this.setState({color,defaultColor})
    this.update(color)
  }
  
  // handleInput = (e) => {
  //   let color = e.target.value
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  //   this.update(color)
  // }
  
  
  /*更新数据
  * commodity  商品模块
  * coupon    优惠券模块
  * */
  update(item) {
    /* console.log(item)*/
    let {pageComponents, clickActiveIndex, clickActiveChildIndex, setPageComponents, Key, module} = this.props
    let pageData = pageComponents
    if (module === '模块背景') {
      pageData[clickActiveIndex].itemData[Key] = item
      setPageComponents(pageData)
    } else if (module === 'subModule') {
      /* console.log(pageData[clickActiveIndex].itemData[Key],'title')*/
      pageData[clickActiveIndex].itemData.components[clickActiveChildIndex][Key] = item
      setPageComponents(pageData)
    } else if (module === 'title') {
      /* console.log(pageData[clickActiveIndex].itemData[Key],'title')*/
      pageData[clickActiveIndex].itemData.titleSet[Key] = item
      setPageComponents(pageData)
    } else if (module === 'coupon') {
      /*console.log(pageData[clickActiveIndex].itemData[Key],'coupon')*/
      pageData[clickActiveIndex].itemData.couponSet[Key] = item
      setPageComponents(pageData)
    } else if (module === 'commodity') {
      /* console.log(pageData[clickActiveIndex].itemData[Key],'commodity')*/
      pageData[clickActiveIndex].itemData.commoditySet[Key] = item
      setPageComponents(pageData)
    } else if (module === 'btn') {
      /*console.log(pageData[clickActiveIndex].itemData[Key],'btn')*/
      pageData[clickActiveIndex].itemData.btnSet[Key] = item
      setPageComponents(pageData)
    }
  }
  
  render() {
    
    let {color, displayColorPicker} = this.state
    return (
      <div className="color-wrap" unselectable="on">
        
        <Input
          unselectable="on"
          name="color"
          className="color-wrap__input"
          value={color.toUpperCase()}
          onClick={this.handleClick}
          readOnly
          maxLength={7}
          suffix={
            <div
              style={{backgroundColor: color}}
              className="color-wrap__input__btn"
              onClick={this.handleClick}
            />
          }
        />
        {displayColorPicker === "block" ?
          <div className="color-wrap__location">
            <MyColorPicker 
              color={this.state.defaultColor} 
              changeColor={this.handleChange}
              defaultColorArr={["#2A2827","#494847","#83817F","#C4C2C0","#FFFFFF","#FF8833","#FF584A"]}
            />
          </div>
          : null
        }
      
      </div>
    )
  }
}


export default ColorSelection
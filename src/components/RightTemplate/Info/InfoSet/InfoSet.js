import React, {Component} from 'react'
import SwitchInputSet from './SwitchInputSet/SwitchInputSet'
import MoveItem from '../../MoveItem/MoveItem'
import { cloneDeep } from 'lodash'




class InfoSet extends Component {
  
  state = {
    infoChecked: true,
  }

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.itemSet !== this.props.itemSet) {
  //
  //   }
  // }

  
  showAllocation(item) {
    if (item === 'infoChecked') {
      this.setState({
        infoChecked: !this.state.infoChecked
      })
    }
  }

  childrenFunc = (params) => {
    let {dragRef, dropRef, previewDrag, item, index, isOver, toTop} = params
    const style = toTop ? {
      borderTop: isOver ? '2px solid #3F94FC': 'none'
    } : {
      borderBottom: isOver ? '2px solid #3F94FC': 'none'
    }

    return  <SwitchInputSet
      style={{...style}}
      dragRef={dragRef}
      dropRef={dropRef}
      previewDrag={previewDrag}
      item={item}
      index={index}
      inputHandle={this.inputHandle}
      switchHandle={this.switchHandle}
    />
}

  /*更新input 值*/
  inputHandle = (e, index) => {
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.itemSet[index].value = e.target.value
    setPageComponents(pageData)
  }

  /*更新开关*/
  switchHandle = (index) => {
    /*console.log(item,'标题')*/
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageData = pageComponents
    pageData[clickActiveIndex].itemData.itemSet[index].check = !pageData[clickActiveIndex].itemData.itemSet[index].check
    setPageComponents(pageData)
  }

  /*排序功能*/
  moveCard = (dragIndex, hoverIndex) => {
    console.log('dragIndex, hoverIndex', dragIndex, hoverIndex)
    let {pageComponents, clickActiveIndex, setPageComponents} = this.props
    let pageComponentsCopy = cloneDeep(pageComponents)
    let com = pageComponentsCopy[clickActiveIndex].itemData.itemSet
    let tmp = com[dragIndex] // 临时储存文件
    com.splice(dragIndex, 1) // 移除拖拽项
    com.splice(hoverIndex, 0, tmp) // 插入放置项
    setPageComponents(pageComponentsCopy)
  }
  
  render() {
    let {pageComponents, clickActiveIndex} = this.props
    let itemSet = pageComponents[clickActiveIndex].itemData.itemSet
    let {infoChecked} = this.state

    // console.log('itemSet-----------------', itemSet)
    
    return (
      <>
      <div className="coupon-deploy__title flex wrap-padding"
        onClick={() => this.showAllocation('infoChecked')}
      >
        <div className="title-style">整体商品设置</div>
        <img
          className="coupon-deploy__title__icon"
          src={infoChecked ? require('@/assets/imgs/common/dropDown.svg') : require('@/assets/imgs/common/dropUp.svg')}
          alt="icon"
        />
      </div>
      {
        infoChecked ?
          <div>
            {
              itemSet && itemSet.map((item, index) => {
                return (
                <MoveItem
                  type='info'
                  key={item.name}
                  index={index}
                  id={item.name}
                  name={item.name}
                  item={item}
                  moveCard={this.moveCard}
                  childrenFunc={this.childrenFunc}
                >
                </MoveItem>
                )
              })
            }
          </div>
          : ''
      }
      </>
    )
  }
}


export default InfoSet
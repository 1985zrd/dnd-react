import React, { Component } from 'react'
import { Switch, Input } from 'antd'
import './SwitchInputSet.scss'

class SwitchInputSet extends Component {


  render() {
    let { item, index, switchHandle, inputHandle, dragRef, dropRef, previewDrag, style } = this.props

    return (
      <div ref={dropRef}  style={{...style}}>
        <div ref={previewDrag}>
          <div className="title-switch flex wrap-padding drag__title">
            <div>
              <span
               ref={dragRef}
               className="drag__title__target">
              </span>
              {item.title}
              <span className="num">({item.value.length}/{item.maxLength})</span>
            </div>
            {
              item.check !== undefined &&
              <Switch
                defaultChecked={item.check}
                onClick={() => switchHandle(index)}
              />
            }
          </div>
          {
            (item.check !== false) ?
              <div className="title-set">
                <Input
                  className="title-set__input"
                  name={item.name}
                  value={item.value}
                  placeholder={item.placeholder}
                  maxLength={item.maxLength}
                  onChange={(e) => inputHandle(e, index)}
                />
              </div> : null
          }
        </div>
      </div>
    )
  }
}


export default SwitchInputSet
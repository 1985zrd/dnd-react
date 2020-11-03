import React, { Component } from 'react'
import './InfoModule.scss'
import ModuleBox from '../ModuleBox/ModuleBox'
import { Button } from 'antd'

class InfoModule extends Component {

  render() {
    let { item } = this.props
    let {
      btnText,
      btnTextColor,
      btnColor,
    } = item.btnSet
    return (
      <ModuleBox {...this.props}>
        <div className="info-module">
          <div className="info-module__form">
            {
              item.itemSet && item.itemSet.map((inner) => {
                let html = ''
                if (inner.name === 'infoPhone') {
                  html = <div className="border--half" key={inner.name}>
                    <div className="info-module__item border--half">
                      <span>{inner.value || inner.placeholder}</span>
                    </div>
                    <div className="info-module__item border--half capture">
                      <span>图形验证码</span>
                      <img
                        className="info-module__item__capture"
                        src={require('@/assets/imgs/code.jpg')} alt="图形验证码"/>
                    </div>
                    <div className="info-module__item">
                      <span>短信验证码</span>
                      <span className="info-module__item__link">获取短信验证码</span>
                    </div>
                    </div>
                }

                if(inner.check) {
                  if (inner.name === 'infoName' || inner.name === 'infoIdCard') {
                    html =
                      (
                        <div className="info-module__item border--half" key={inner.name}>
                          <span>{inner.value || inner.placeholder}</span>
                        </div>
                      )
                  }

                  if (inner.name === 'infoSex' || inner.name === 'infoArea') {
                    html =
                      (
                        <div className="info-module__item border--half" key={inner.name}>
                          <span>{inner.value || inner.placeholder}</span>
                          <img src={require('@/assets/imgs/arrow-right.svg')} alt=""/>
                        </div>
                      )
                  }

                  if (inner.name === 'infoAddress') {
                    html =
                      (
                        <div className="info-module__item border--half info-module__item--textarea" key={inner.name}>
                          <span>{inner.value || inner.placeholder}</span>
                          <span className="flex-end">0/50</span>
                        </div>
                      )
                  }

                }

                return html
              })
            }

          </div>

          <Button
            type="primary"
            className="info-module__btn"
            style={{
              backgroundColor: btnColor,
              color: btnTextColor
            }}
          >{btnText || '立即提交'}</Button>

        </div>
      </ModuleBox>
    )
  }
}

export default InfoModule

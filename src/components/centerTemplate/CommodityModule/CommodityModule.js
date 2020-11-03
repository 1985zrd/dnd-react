import React, { Component } from 'react'
import {} from 'antd'

import './CommodityModule.scss'

import ModuleBox from '../ModuleBox/ModuleBox'


class CommodityItem extends Component {


  componentWillMount() {

  }


  render() {
    let {children, ...props} = this.props
    return (
      <ModuleBox {...props}>
        {children}
      </ModuleBox>
    )
  }
}


export default CommodityItem
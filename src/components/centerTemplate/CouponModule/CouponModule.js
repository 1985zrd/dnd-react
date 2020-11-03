import React, {Component} from 'react'
import {} from 'antd'


import ModuleBox from '../ModuleBox/ModuleBox'


class CouponModule extends Component {
  
  render() {
    
    let {children, ...props} = this.props
    
    return (
      <>
      <ModuleBox {...props}>
        {children}
      </ModuleBox>
      </>
    )
  }
}


export default CouponModule
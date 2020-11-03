import React, {Component} from 'react'
import './Add.scss'

import add from 'assets/imgs/add.svg'


class Add extends Component {
  
  render() {
    let {addChildHandle, index, item} = this.props
    return (
      <div className="commodity-add"
           onClick={(e)=> {addChildHandle(e, index, item)}}>
        <img src={add} alt=""/>
      </div>
    )
  }
}


export default Add
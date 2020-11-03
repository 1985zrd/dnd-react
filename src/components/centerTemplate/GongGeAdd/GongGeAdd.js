import React, {Component} from 'react'
import './GongGeAdd.scss'

import add from 'assets/imgs/add.svg'


class Add extends Component {
  
  componentWillMount() {
  
  }
  
  render() {
    let {addChildHandle, index, item} = this.props
    return (
      <div className="gong-ge-module gong-ge-add"
           onClick={(e)=> {addChildHandle(e, index, item)}}>
        <img src={add} alt=""/>
      </div>
    )
  }
}


export default Add
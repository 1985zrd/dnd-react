import React, {Component} from 'react'
import {Input} from 'antd';

class ImageModule extends Component {
  
  
  handleInput = (e) => {
    this.UpdateInput(e.target.value)
  }
  
  
  /*更新input 值*/
  UpdateInput(value) {
    let {setPage} = this.props
    setPage({
      appTitle: value
    })
  }
  
  
  render() {
    let {appTitle} = this.props
    return (
      <>
      <Input
        className="page-title"
        placeholder="编辑页面名称"
        value={appTitle}
        maxLength={20}
        onChange={this.handleInput}
      />
      </>
    )
  }
}


export default ImageModule
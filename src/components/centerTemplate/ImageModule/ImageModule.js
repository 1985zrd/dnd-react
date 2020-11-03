import React, {Component} from 'react'

import './ImageModule.scss'

class ImageModule extends Component {
  
  render() {
    let {item, children} = this.props
    return (
      <div className="image-module">
        <img src={(item && (item.url || item.templateUrl))} alt=""/>
        {children}
      </div>
    )
  }
}

export default ImageModule

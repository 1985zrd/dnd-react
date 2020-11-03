import React, {Component} from 'react'
import {Select, Input} from 'antd'

import './SelectSize.scss'

const {Option} = Select

class SelectSize extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      allTemplates: props.defaultArray,
      key: props.Key,
    };
  }

  handleInput = (e) => {
    this.update(e.target.value)
  }
  
  /*更新数据
 *     字号大小
 * */
  update(item) {
    console.log(item)
    let {pageComponents, clickActiveIndex, setPageComponents, Key, module} = this.props
    let pageData = pageComponents
    // console.log(Key, module, 'title')
    if (module === 'title') {
      pageData[clickActiveIndex].itemData.titleSet[Key] = item
      setPageComponents(pageData)
    }
  }
  
  
  render() {
    let {allTemplates} = this.state
    let {defaultValue} = this.props
    
    let options = allTemplates.map((item, index) => {
      return (
        <Option key={index} value={item}>
          {item}
        </Option>
      )
    })
    
    
    return (
      <div className="select">
        <Input
          name="title"
          className="select--input"
          defaultValue={defaultValue}
          value={defaultValue}
          placeholder={defaultValue}
          maxLength={2}
          onChange={this.handleInput}
        />
        <Select
          showSearch
          className="select__fontSize"
          style={{width: 100}}
          value={defaultValue}
          onChange={(value) => {
            this.update(value)
          }}
        >
          {options}
        </Select>
      </div>
    
    )
  }
}


export default SelectSize
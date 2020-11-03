import React from "react";
import { CustomPicker } from "react-color";
import {
  Hue,
  Saturation,
  EditableInput
} from "react-color/lib/components/common/";
import "./MyColorPicker.scss";

// 自定义指针;
function CustomPointerHue() {
  return <div className="color__selection__hue-modal__custom-pointer" />
}

function CustomPointerSaturation() {
  return <div className="color__selection__sa-modal__custom-pointer" />
}

class MyColorPicker extends React.Component {

  handleChange = val => {
    setTimeout(()=>{
      this.props.changeColor(val, this.props);
    },0)
    this.props.changeColor(val, this.props);
  };

  render() {
    const inputStyles = {
      input: {
        outline: '#ff8833',
        border: "1px solid #E1E0DF",
        width: "100%",
        paddingLeft: "3px",
        marginBottom: "8px"
      },
      label: {
        display: "none"
      }
    };
    return (
      <div className="color__selection"
        // style={{
        //   position: 'relative',
        //   top: '-287px'
        // }}
      >
        <div className="color__selection__top">
          <div className="color__selection__sa-modal">
            <Saturation
              {...this.props}
              pointer={CustomPointerSaturation}
              onChange={this.handleChange}
            />
          </div>
          <div className="color__selection__hue-modal">
            <Hue
              {...this.props}
              pointer={CustomPointerHue}
              onChange={this.handleChange}
              direction="vertical"
            />
          </div>
        </div>
        <div>
          <EditableInput
            style={inputStyles}
            value={this.props.hex}
            label="hex"
            onChange={this.handleChange}
          />
        </div>
        <div className="color__selection__square">
          {this.props.defaultColorArr.map((hex,index)=>(
            <span 
              key={index}
              className='color__selection__square__items'
              style={{
                background:hex,
                boxShadow: this.props.hex === hex.toLowerCase() ?
                `rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset,${hex} 0px 0px 4px`
                : 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset'
              }}
              onClick={()=>this.handleChange({hex})}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CustomPicker(MyColorPicker);

import React from 'react'
import { Upload } from 'antd';

// import { getCurrentEnv } from 'utils'
// import { globalConfig } from '@/config'

import './UploadPicture.scss'




class Avatar extends React.Component {
  state = {
    // loading: false,
    // disabled: false,
    // imageUrl: '',
    // fileList: [1],
    message: ''
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.clearMessage !== this.props.clearMessage) {
      this.setState({
        message: ''
      })
    }
  }

  beforeUpload = (file) => {
    // this.setState({
    //   loading: true
    // })

    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   this.setState({
    //     message: ''
    //   })
    //   message.error('You can only upload JPG/PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.setState({
        message: '图片大小超过2M'
      })
    }

    let _this = this

    // return isLt2M && isWidthLt750
    return isLt2M && (
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            // 创建image对象
            var image = new Image()
            image.src = reader.result
            // 获取图片宽高
            image.onload = function () {
              // console.log("宽度为：", this.width, "高度为：", this.height)
              if (this.width <= 750) {
                resolve(file)
                // console.log('=====reader.result======', reader.result)
              } else {
                _this.setState({
                  // loading: false,
                  message: '图片宽度超过 750px'
                })
                reject()
              }
            }

          });
          reader.readAsDataURL(file);
        })
      )
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log('info------', )
      this.props.uploadHnadle(info.file.response.data)
      this.setState({
        // imageUrl,
        // loading: false,
        message: ''
      })
    }
  };

  render() {
    let { disabled, imageUrl } = this.props
    const { message } = this.state
    // let url = globalConfig.host[getCurrentEnv()] + '/pageTemplate/fileUpload'
    let url = ''
    let headers = { Authorization: localStorage.getItem('ik_2c_operation_platform_token') }
    
    const uploadButton = (
      <div>
        {
          disabled
            ? <div className="ant-upload-text"> 上传 </div>
            : <div className="ant-upload-text"> 替换</div>
        }
      </div>
    )
    return (
      <>
      <div className="commodity-item__content flex">
        <div className="title-style">图片</div>
        <div className="right-btn">
          <div className="upload">
            {(disabled || !imageUrl) ? <div className="upload__emptyData"/> : <img className="upload__img" src={imageUrl} alt='上传' />}
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={url}
              disabled={disabled}
              headers={headers}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {uploadButton}
            </Upload>
          </div>
        </div>
      </div>

      <div className="upload__tip">
        {message}
      </div>
      </>
    );
  }
}

export default Avatar
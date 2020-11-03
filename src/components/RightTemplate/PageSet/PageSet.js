import React, { Component } from 'react'
import { Input, Switch, Modal } from 'antd';

import './PageSet.scss'

import warn from 'assets/imgs/common/warn.svg'
import ikangDownload from 'assets/imgs/common/ikang_download.svg'
import tjbDownload from 'assets/imgs/common/tijianbao_download.svg'

const { TextArea } = Input;

class PageSet extends Component {

  state = {
    visible: false, //弹框
  }

  componentDidMount() {
    let { setPage, appType } = this.props
    setPage({
      appType
    })
  }

  handleInput = (e) => {
    let { value, name } = e.target
    this.props.setPage({
      [name]: value,
      [name + 'Error']: !value.length || this.props.page.pageTitleOld === value
    })
  }

  switchHandle = () => {
    let { setPage, page } = this.props
    setPage({
      appConfOpen: page.appConfOpen / 1 === 0 ? 1 : 0,
    })
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  render() {

    let {
      // pageTitleOld,
      pageTitle, pageContent,
      pageTitleError, pageContentError, pageTitleErrorMes, pageContentErrorMes,
      appPopTitle, appPopSubtitle, appConfOpen,
      appPopTitleError, appPopSubtitleError, appPopTitleErrorMes, appPopSubtitleErrorMes,
      appType,

    } = this.props.page

    return (
      <div className="page-set">
        <div className="page-set__title">
          <div className="page-set__title__switch">
            <div> 页面标题<span className="num">({pageTitle.length}/20)</span></div>
          </div>
          <div className={pageTitleError ? 'page-set__input--error' : ''}>
            <Input
              name="pageTitle"
              className="page-set__title__input"
              value={pageTitle}
              placeholder="主标题内容"
              maxLength={20}
              onChange={this.handleInput}
            />
            {
              pageTitleError &&
              <div className="page-set__input__mes">
                {pageTitleErrorMes || '请输入页面标题'}
              </div>
            }
          </div>

          <div className="page-set__title__switch">
            <div> 页面用途<span className="num">({pageContent.length}/30)</span></div>
          </div>

          <div className={pageContentError ? 'page-set__input--error' : ''}>
             <TextArea
               name="pageContent"
               className="page-set__title__text-area"
               value={pageContent}
               placeholder="页面用途"
               maxLength={30}
               onChange={this.handleInput}
             />
            {
              pageContentError &&
              <div className="page-set__input__mes">
                {pageContentErrorMes || '请输入页面用途'}
              </div>
            }
          </div>

          {
            (appType === 'TJB_PUSH' || appType === 'APP_PUSH') &&
            <div className="page-set__title__switch">
              <div>推广APP <img className="icon" src={warn} onClick={this.showModal} alt="icon" /></div>
              <Switch
                defaultChecked={appConfOpen / 1 === 1}
                onClick={this.switchHandle}
              />
            </div>
          }

          {
            appConfOpen / 1 === 1 ?
              <>
              <div className="page-set__title__switch">
                <div>推广主标题<span className="num">({appPopTitle.length}/10)</span></div>
              </div>
              <div className={appPopTitleError ? 'page-set__input--error' : ''}>
                <Input
                  name="appPopTitle"
                  className="page-set__title__input"
                  value={appPopTitle}
                  placeholder="推广主标题"
                  maxLength={10}
                  onChange={this.handleInput}
                />
                {
                  appPopTitleError &&
                  <div className="page-set__input__mes">
                    {appPopTitleErrorMes || '请输入推广主标题'}
                  </div>
                }
              </div>

              <div className="page-set__title__switch">
                <div>推广副标题 <span className="num">({appPopSubtitle.length}/20)</span></div>
              </div>
              <div className={appPopSubtitleError ? 'page-set__input--error' : ''}>
                <Input
                  name="appPopSubtitle"
                  className="page-set__title__input"
                  value={appPopSubtitle}
                  placeholder="推广副标题"
                  maxLength={20}
                  onChange={this.handleInput}
                />
                {
                  appPopSubtitleError &&
                  <div className="page-set__input__mes">
                    {appPopSubtitleErrorMes || '请输入推广副标题'}
                  </div>
                }
              </div>

              </>
              : ''
          }

        </div>

        <div>
          <Modal
            className="page-set__modal"
            title="推广App"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <p className="page-set__modal__p">“推广APP”功能为在“非APP”内的广告页面会展示出推广的内容栏。</p>
            <p className="page-set__modal__p">如下图所示，点击立即下载后会跳转到下载页面：</p>
            <div className="page-set__modal--down">
              <div className="page-set__modal--down--text">
                <div className="page-set__modal--down--text--title">
                  {appPopTitle || '推广主标题'}
                </div>
                <div className="page-set__modal--down--text--subtitle">
                  {appPopSubtitle || '推广副标题'}
                </div>
              </div>
              {
                appType === 'APP_PUSH' &&
                <img className="page-set__modal__img" src={ikangDownload} alt=""/>
              }
              {
                appType === 'TJB_PUSH' &&
                <img className="page-set__modal__img" src={tjbDownload} alt=""/>
              }
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}


export default PageSet
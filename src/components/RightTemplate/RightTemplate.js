import React, { Component, useCallback } from 'react'
import { connect } from 'react-redux'
// import { Prompt } from 'react-router-dom'
import { Button, message, Modal, Tabs } from 'antd';
// import { globalConfig } from '@/config'

import './RightTemplate.scss'

import AllDeploy from './AllDeploy/AllDeploy' //所有配置
import PageSet from './PageSet/PageSet'

import SortModule from './SortModule/SortModule'

import {useDispatch, useMappedState} from 'redux-react-hook'
import { setPage, setPageComponents } from 'store/actions/create-page.js'

// import { addActivityPages, editActivityPages, qrEditPreview } from 'api/create-page.js'
// import { setSiderMenu } from 'store/actions/siderMenu'

const {TabPane} = Tabs;

const RightTemplate = () => {
  
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     preViewImg: '',
  //     preViewUrl: '',
  //     showCancelModal: false,
  //     showSaveModal: false,
  //     canGo: false,
  //     height: '0px', // 设置height值
  //     hasScrollFn: false
  //   }
  // }

  const dispatch = useDispatch();
  const mapState = useCallback(state => ({
    createPage: state.createPage,
    allTemplates: state.createPage.allTemplates,
    pageComponents: state.createPage.pageComponents,
    page: state.createPage.page
  }), [])
  const {createPage, allTemplates, pageComponents, page} = useMappedState(mapState)
  
  const changeTabHandle = activeKey => {
    // console.log('activeKey', activeKey, typeof activeKey)
    dispatch(setPage({
      activeKeyTabs: activeKey
    }))

    if (activeKey === '2') {
      // this.handleScrollFn()
    }
  }
  
  const preView = async () => {
    // const res = await qrEditPreview({
    //   components: this.props.createPage.pageComponents,
    //   page: this.props.createPage.page
    // })
    // if (res.code === 200) {
    //   this.setState({
    //     preViewImg: res.data.qrContent,
    //     preViewUrl: res.data.qrUrl
    //   })

    //   this.props.setPage({
    //     pageUrl: res.data.qrUrl
    //   })
    // }
  }
  
  // const handleRQCancel () {
  //   this.setState({
  //     preViewImg: ''
  //   })
  // }
  
  // cancelShowHandler (isShow) {
  //   this.setState({
  //     showCancelModal: isShow
  //   })
  // }
  
  // hideSaveHandler () {
  //   this.setState({
  //     showSaveModal: false
  //   })
  // }

  // handlePrompt (location) {
  //   if (location.pathname === '/login') {
  //     // 如果是令牌失效之后，要跳转到登录页面，则直接跳转login
  //     return true
  //   }
  //   let self = this
  //   if (!this.state.canGo) {
  //     Modal.confirm({
  //       title: '您是否要放弃此次编辑？',
  //       content: <p><span className="base-modal__content__color">放弃后已编辑或修改的信息不予保存</span>，您还要继续吗？</p>,
  //       okText: '继续',
  //       centered: true,
  //       cancelText: '取消',
  //       onOk () {
  //         // self.setState(
  //         //   {
  //         //     canGo: true
  //         //   },
  //         //   () => {
  //         //     globalConfig.history.push({
  //         //       pathname: location.pathname
  //         //     })
  //         //   }
  //         // )
  //       },
  //       onCancel () {
  //         self.props.handleSelectMenu(2, 8) // 这里写死的值，后期可能会有麻烦...
  //       }
  //     })
  //   }
  //   return this.state.canGo
  // }
  
  // // 返回列表页
  // backup () {
  //   // this.setState(
  //   //   {
  //   //     canGo: true
  //   //   },
  //   //   () => {
  //   //     globalConfig.history.push({
  //   //       // pathname: `/page-activity/page-activity`,
  //   //       pathname: `/activity-management/page-activity`
  //   //     })
  //   //   }
  //   // )
  // }
  
  // async savePageHandler (type = 'commit') {
  //   let {page} = this.props
  //   let {appConfOpen} = page
  //   // console.log(appConfOpen)
  //   let verifyArr = appConfOpen === 1
  //     ? ['pageTitle', 'pageContent', 'appPopTitle', 'appPopSubtitle','appTitle']
  //     : ['pageTitle', 'pageContent','appTitle']
    
  //   let flag = this.verifyBeforeSave(verifyArr)
  //   //  保存逻辑
  //   if (flag) {
  //     if (type === 'commit') {
  //       this.setState({
  //         showSaveModal: true
  //       })
  //     } else {
  //       this.savePageData()
  //     }
  //   }
  // }
  
  // verifyBeforeSave = (fields) => {
  //   let obj = {} // 存储需要更新的字段
  //   for (let field of fields) {
  //     if (!this.props.page[field]) {
  //       obj[field + 'Error'] = true
  //     }
  //     if (!this.props.page[field] && field === 'appTitle') {
  //       message.error('请输入页面名称')
  //     }
  //   }
  //   let flag = Object.keys(obj).length
  //   if (flag) {
  //     let {setPage, activeKeyTabs} = this.props
  //     if (activeKeyTabs !== '1') {
  //       obj.activeKeyTabs = '1'
  //     }
  //     setPage(obj)
  //   }
    
  //   return !flag
  // }
  
  // async savePageData (type) {
  //   // let {page, pageComponents, setPage} = this.props
  //   // // console.log(page,'page')
  //   // let res, params = {
  //   //   page: JSON.parse(JSON.stringify(page)),
  //   //   components: JSON.parse(JSON.stringify(pageComponents))
  //   // }
  //   // // eslint-disable-next-line array-callback-return
  //   // params.components.map((item) => {
  //   //   item.itemData = JSON.stringify(item.itemData)
  //   // })
  //   // if (page.id) {
  //   //   res = await editActivityPages(params)
  //   // } else {
  //   //   res = await addActivityPages(params)
  //   //   if (res.code === 2000) {
  //   //     setPage({
  //   //       pageTitleError: true,
  //   //       pageTitleErrorMes: '页面标题不能重复',
  //   //       pageTitleOld: page.pageTitle
  //   //     })
  //   //   } else {
  //   //     setPage({
  //   //       id: res.data,
  //   //       pageTitleOld: ''
  //   //     })
  //   //   }
  //   // }
  //   // if (type === 'commit') {
  //   //   this.hideSaveHandler()
  //   //   if(res.code !== 2000) {
  //   //     message.info(res.msg)
  //   //   }
  //   //   res.code === 200 && this.backup()
  //   // } else {
  //   //   res.code === 200 ? message.info('保存成功') : message.error(res.msg)
  //   // }
  // }
  
  // copyUrl (url) {
  //   let textArea = document.createElement('textarea')
  //   textArea.value = url
  //   document.body.appendChild(textArea)
  //   textArea.select()
  //   document.execCommand('copy')
  //   document.body.removeChild(textArea)
  //   message.success('复制成功,现在可以去粘贴了')
  // }

  // componentDidMount() {
  //   setTimeout(()=>{
  //     let height = parseInt(document.querySelector('main').style.height) - 132 + 'px'
  //     this.setState({height})

  //     this.handleScrollFn()
  //   })
  // }

  // componentWillUnmount() {
  //   this.rightScrollDom.removeEventListener('scroll',this.scrollFn)
  // }

  // // 右侧监听滚动事件
  // handleScrollFn = () => {
  //   setTimeout(() => {
  //     let rightScrollDom = document.querySelectorAll('.ant-tabs-tabpane')[1].querySelector('.right-template__wrap')
  //     // console.log('handleScrollFn', this.state.hasScrollFn, rightScrollDom )

  //     if (rightScrollDom && !this.state.hasScrollFn) {
  //       this.setState({
  //         hasScrollFn: true
  //       })
  //       this.rightScrollDom = rightScrollDom
  //       rightScrollDom.addEventListener('scroll', this.scrollFn)
  //     }
  //   })
  // }

  // scrollFn = () => {
  //   let ndList = document.body.childNodes
  //   for (let domItem of ndList) {
  //     if (domItem.nodeName === 'DIV' && domItem.className === "relativeGuy") {
  //       this.afterScrollTop = this.rightScrollDom.scrollTop
  //       domItem.style.top = `${this.beforeScrollTop - this.afterScrollTop}px`
  //     }
  //     else if (domItem.nodeName === 'DIV' && domItem.style.cssText === "position: absolute; top: 0px; left: 0px; width: 100%;") {
  //       domItem.className = 'relativeGuy'
  //       domItem.style.top = '0'

  //       this.beforeScrollTop = this.rightScrollDom.scrollTop
  //     }
  //   }
  // }

    const sortHandle = () => {}
    let { clickActiveIndex, clickActiveChildIndex, appType } = page
    // let { preViewImg, showCancelModal, showSaveModal, height } = this.state
    
    let preViewImg = ''
    let preViewUrl = ''
    let showCancelModal = false
    let showSaveModal = false
    let canGo = false
    let height = '600px' // 设置height值
    let hasScrollFn = false
    let showPreViewModal = preViewImg ? true : false
    return (
      <div className="right-template">
        <div className="right-template__btns">
          <Button >预览</Button>
          <Button >取消</Button>
          <Button >保存</Button>
          <Button  type="primary">提交</Button>
        </div>
        <Tabs
          onChange={changeTabHandle}
          defaultActiveKey="2"
          activeKey={page.activeKeyTabs}>
          <TabPane tab="页面设置" key="1">
            <div className="right-template__wrap"
            style={{height}}
            >
              <PageSet
                appType={appType}
                setPage={setPage}
                page={page}/>
            </div>
          </TabPane>
          <TabPane tab="模版属性" key="2">
            <div className='right-template__wrap'
            style={{height}}
            >
              {
                clickActiveIndex === '' &&
                <div className="right-template__empty-data">
                  <div>请选择模块后再进行编辑操作</div>
                </div>
              }
              {
                clickActiveIndex !== '' &&
                <AllDeploy
                className='fdsajklfdjsk'
                  pageComponents={pageComponents}
                  setPageComponents={setPageComponents}
                  clickActiveIndex={clickActiveIndex}
                  clickActiveChildIndex={clickActiveChildIndex}
                  isCheckChildCom={page.isCheckChildCom}
                  page={page}
                />
              }
            </div>
          </TabPane>
          <TabPane tab="模块顺序" key="3">
            <div className='right-template__wrap'
            style={{height}}
            >
              <SortModule
                sortHandle={sortHandle}/>
            </div>
          </TabPane>
        </Tabs>
        <Modal
          visible={showPreViewModal}
          title={[
            <div className='preview__title' key='1'>
              <strong>页面预览</strong>
              <span className='sub--title'>{createPage.page.pageTitle ? createPage.page.pageTitle : '手机扫码预览'}</span>
            </div>
          ]}
          centered={true}
          footer={null}
        >
          <div className="qr__preview set-padding-b">
            <img className='qr__preview__img' src={preViewImg} alt="二维码"/>
            <p>请用手机扫描二维码进行页面预览</p>
            {/* {preViewUrl ? <p><span>{preViewUrl}</span><span onClick={this.copyUrl.bind(this, preViewUrl)} className="copy-btn">复制</span></p> : ''} */}
          </div>
        </Modal>
        <Modal
          wrapClassName="base-modal"
          width="500px"
          visible={showCancelModal}
          closable={false}
          centered={true}
          footer={null}
        >
          <div className="base-modal-wrap">
            <h3 className="base-modal__title">
              {/* <Icon type="question-circle" /> */}
              <span>您是否要放弃此次编辑？</span>
            </h3>
            <div className="base-modal__content">
              <p><span className="base-modal__content__color">放弃后已编辑或修改的信息不予保存</span>，您还要继续吗？</p>
            </div>
            <div className="base-modal__footer">
              <Button >取消</Button>
              <Button  type="primary" style={{'marginLeft': '10px'}}>继续</Button>
            </div>
          </div>
        </Modal>
        <Modal
          wrapClassName="base-modal"
          width="500px"
          visible={showSaveModal}
          closable={false}
          centered={true}
          footer={null}
        >
          <div className="base-modal-wrap">
            <h3 className="base-modal__title">
              {/* <Icon type="question-circle" /> */}
              <span>您是否确定提交此次操作？</span>
            </h3>
            <div className="base-modal__content">
              <p><span className="base-modal__content__color">系统将保存您此次的编辑内容并返回到列表页面（数据置为“草稿”状态）</span>，您还要继续吗？</p>
            </div>
            <div className="base-modal__footer">
              <Button >取消</Button>
              <Button  type="primary" style={{'marginLeft': '10px'}}>继续</Button>
            </div>
          </div>
        </Modal>
        {/* <Prompt message={(location) => this.handlePrompt(location)}/> */}
      </div>
    )
}

const handleSelectMenu = (dispatch, currentOpenKeys, currentSelectedKeys) => {
  currentOpenKeys = [String(currentOpenKeys)]
  currentSelectedKeys = [String(currentSelectedKeys)]
  // dispatch(setSiderMenu(currentOpenKeys, currentSelectedKeys))
}

const mapStateToProps = state => {
  return {
    createPage: state.createPage
  }
}
function mapDispatchToProps (dispatch) {
  return {
    setPage: (page) => dispatch(setPage(page)),
    handleSelectMenu: (currentOpenKeys, currentSelectedKeys) =>
      handleSelectMenu(dispatch, currentOpenKeys, currentSelectedKeys)
  }
}

export default RightTemplate

import * as types from 'store/action-types'

const initialState = {
  allTemplates: [],
  pageComponents: [],
  page: {
    clickActiveIndex: '', // 正在修改的外层index
    clickActiveChildIndex: '', // 正在修改的子组件内层index
    isCheckChildCom: false, // 是否是选择的子组件
    leftToMiddleHoverIndex: undefined, // 左侧拖拽到右侧的时候hover的index值
    activeKeyTabs: '1', // tabs 当前激活 tab 面板的 key  编辑默认2 区域为1
    // pageTitleOld: '', // 用于比较标题重复时，记录上次重复的值
    appTitle: '',  // 页面标题1
    appConfOpen: 0, // 是否开启推广0：关闭；1：打开
    appPopSubtitle: '', // 推广副标题
    appPopTitle: '', // 推广主标题
    pageTitle: '', // 页面标题2
    pageContent: '', // 活动页面内容及用途介绍
    id: '', // 页面ID
    pageStatus: '', // 页面状态，0：草稿，1下架，2上架
    appType: '', // app推广的类型
    pageUrl: '', // 页面链接
  },
  // params: { // 存入接口的数据示例
  //   pageComponents:{
  //     id: '',
  //     pageTemplateId: 1, //  模板ID
  //     itemData: {
  //
  //       templateName: '图片模块', //  模板名字   需要动态处理的数据
  //       templateOrder: 1, // 每个模块模块名称 顺序值
  //       createId: 1, // 所有组件的创建 顺序值
  //       templateType: 'img', // 拖拽类型
  //       templateDesc: '介绍', // 介绍
  //
  //
  //       pageTemplateBg: '#EDF3FB', //  模块背景
  //       titleSet:{
  //         mainTitleChecked: true, //主标题开关
  //         title: '', //主标题内容
  //         titleColor: '#3F5788', //主标题颜色
  //         titleSize: '16px',
  //         subTitleChecked:true, //副标题开关
  //         subtitle: '', //副标题内容
  //         subtitleColor: '#3F5788',//副标题颜色
  //         subtitleSize: '12px',//副标题字号
  //       },
  //       couponSet:{
  //         couponNameColor: '#FFFFFF',//优惠券名称颜色
  //         textColor: '#FFFFFF',//文字描述颜色
  //         bottomColor: '#FF584A',//底部颜色
  //       },
  //       btnSet:{
  //         isReceive:true,    // 是否领取
  //         btnChecked:true,   // 开关
  //         btnText: '立即领取',//立即领取
  //         btnTextColor: '#000000',//文字颜色
  //         btnColor: '#FFFFFF',//按钮颜色
  //         getBtnChecked:true,   // 开关
  //         getBtnText: '已领取',//已领取
  //         getBtnTextColor: '#C4C2C0',//已领取文字颜色
  //         getBtnColor: '#FFFFFF',//已领取按钮颜色
  //       },
  //       components: [
  //         {
  //           createChildId: 0,
  //           templateType: 'coupon',
  //           couponBatch: '',//批次
  //           couponName: '',//优惠券名称
  //           couponDes: '',//优惠券介绍
  //           url: 'http://pic129.nipic.com/file/20170508/5490866_204222328000_2.jpg' // test
  //         }
  //       ]
  //     }
  //   },
  //   page: {
  //     appConfOpen: 0, // 是否开启推广0：关闭；1：打开
  //     appPopSubtitle: '', // 推广副标题
  //     appPopTitle: '', //推广主标题
  //     pageTitle: '', // 页面标题
  //     pageContent: '', // 活动页面内容及用途介绍
  //     id: '', // 页面ID
  //     pageStatus: '', // 页面状态，0：草稿，1下架，2上架
  //     appType: '', // app推广的类型
  //   }
  // }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.ALL_TEMPLATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case types.SET_TEMPLATE_DATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case types.SET_PAGE_COMPONENTS: {
      return {
        ...state,
        pageComponents: [...action.payload]
        // pageConfigArr: JSON.parse(JSON.stringify(action.payload))
      }
    }
    case types.SET_PAGE: {
      return {
        ...state,
        page: {
          ...state.page,
          ...action.payload
        }
      }
    }
    case types.CLEAR_TEMPLATE_DATE: {
      return {
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}

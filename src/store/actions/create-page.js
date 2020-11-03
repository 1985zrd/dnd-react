import * as types from 'store/action-types'


import template, { templateData } from 'utils/template.js'

/**
 * 通过模块名称 模糊进行检索
 * @param data
 */
export const getAllTemplateInfo = data => async dispatch => {
  // let res = await getAllTemplate(data || '')
  // if (res) {
  //   if (res.code === 200) {
  //     res.data.forEach(item => {
  //       item.templateData = template[item.templateType + 'Set']
  //     })
  //     dispatch({
  //       type: types.ALL_TEMPLATE,
  //       payload: {
  //         allTemplates: res.data
  //       }
  //     })
  //   }
  // }
  templateData.forEach(item => {
    item.templateData = template[item.templateType + 'Set']
  })
  dispatch({
    type: types.ALL_TEMPLATE,
    payload: {
      allTemplates: templateData
    }
  })
}

export const setPageComponents = arr => dispatch => {
  return dispatch({
    type: types.SET_PAGE_COMPONENTS,
    payload: arr
  })

  // return new Promise(resolve => {
  //   resolve({ code: 200 })
  // })
}
export const setPage = obj => dispatch => {
  return dispatch({
    type: types.SET_PAGE,
    payload: obj
  })

  // return new Promise(resolve => {
  //   resolve({ code: 200 })
  // })
}

/**
 * 保存页面模板所有信息
 * @param data
 */
export const saveTemplateDate = data => dispatch => {
  dispatch({
    type: types.SET_TEMPLATE_DATE,
    payload: {
      components: data
    }
  });
};


export const cleanTemplateDate = () => dispatch => {
  dispatch({
    type: types.CLEAR_TEMPLATE_DATE
  })
}

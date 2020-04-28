/**
 *
 * @param {*} str
 * 传入'a=b&c=d' => {a: 'b', c: 'd'}
 */
export const formatSearch = function (str) {
  let o = {}
  let reg = /(\w+)=(\w+)/gi
  let match
  while ((match = reg.exec(str))) {
    o[match[1]] = match[2]
  }
  return o
}


/**
 *
 * @param {*} data
 * '1' => 'string'  1 => 'number'
 */
export function getType (data) { // 类型判断，返回字符串
  const reg = /\s(\w+)\]/g
  const result = reg.exec(Object.prototype.toString.call(data))
  return result && result[1] ? result[1].toLowerCase() : ''
}

/**
 * 设置html字体大小
 */
export const setFontSize = function () {
  function getWdith () {
    let myWidth = 0
    if (typeof (window.innerWidth) === 'number') {
      myWidth = window.innerWidth
    } else if (document.documentElement && (document.documentElement.clientWidth)) {
      myWidth = document.documentElement.clientWidth
    } else if (document.body && (document.body.clientWidth)) {
      myWidth = document.body.clientWidth
    }
    return parseInt(myWidth)
  }
  
  let screenWidth = window.screen.width > getWdith() ? getWdith() : window.screen.width
  
  if (screenWidth >= 768) {
    screenWidth = 768
  }
  document.documentElement.style.fontSize = screenWidth / (375 / 40) + 'px'
}

/**
 * 得到一个小数.前的数据
 */
export function dealNumBefore (item) {
  let str = item + '';
  return parseInt(str.split('.'));
}

/**
 * 得到一个小数.后的数据
 */
export function dealNumAfter (item) {
  let str = item + '';
  return '.' + str.substr(str.indexOf(".") + 1, 2);
}


const s4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function uuid () {
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
}

/**
 * 生成模拟的设备ID
 */
export function setUUID () {
  if (window.localStorage.getItem('uuid')) {
    return
  }
  window.localStorage.setItem('uuid', uuid())
}

/*
* 修改产品的type
* 后台返回type：
* ---爱康：1体检产品，2挂号产品，0齿科，4门诊产品，5体检，
* 6现场采血类基因，7居家自采样基因商品，8个性化体检基础套餐，11waston，
* 12 检后，13疫苗，  14健康优选预约，15健康优选快递，18问卷；（0,5,6,7,11,13,14,15，）
*
* ---体检宝h5：1体检产品，2挂号产品，0齿科，4门诊产品，5体检，
* 6现场采血类基因，7居家自采样基因商品，8个性化体检基础套餐，11waston，
* 12 检后，13疫苗，  20健康甄选，21糖筛产品（0,1,5,6,7,8,11,13,20,21）
*
* 前端现有type:
* 爱康h5：1无卡体检，2无卡齿科，3基因居家，20健康优选快递(3),5基因采血，6疫苗，7watson,
* 体检宝h5：1无卡体检，2无卡齿科，3基因居家，5基因采血，6疫苗，7watson，20健康甄选(实物)
* */
export function typeConvert(item) {
  switch (item) {
    case 0:item = 2;break;
    case 5:
    case 8:item = 1;break;
    case 15: 
    case 7:item = 3;break;
    case 6:
    case 14:item = 5;break;
    case 11:item = 7;break;
    case 13:item = 6;break;
    case 20:item = 20;break;
    default: item = 1;
  }
  return item;
}
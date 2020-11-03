import templateCouponUrl from 'assets/imgs/template_coupon.jpg'
import templateCardUrl from 'assets/imgs/template_card.jpg'
import templateImgUrl from 'assets/imgs/template_img.jpg'
import templateGongGeUrl from 'assets/imgs/template_gongGe.jpg'
import templateInfoUrl from 'assets/imgs/template_info.jpg'

export const templateData = [
  {
    id: 1,
    templateCode: "1",
    templateData: "",
    templateDesc: "图片模块描述",
    templateName: "图片模块(支持商品\优惠券)",
    templateType: "img"
  },
  {
    id: 2,
    templateCode: "2",
    templateData: "",
    templateDesc: "商品宫格描述",
    templateName: "商品宫格",
    templateType: "gongGe"
  },
  {
    id: 3,
    templateCode: "2",
    templateData: "",
    templateDesc: "商品卡片模块描述",
    templateName: "商品卡片模块",
    templateType: "card",
  },
  {
    id: 4,
    templateCode: "2",
    templateData: "",
    templateDesc: "优惠券列表模块描述",
    templateName: "优惠券列表模块",
    templateType: "coupon"
  },
  {
    id: 5,
    templateCode: "1",
    templateData: "",
    templateDesc: "收集信息描述",
    templateName: "收集信息",
    templateType: "info"
  }
]

export default {
  couponSet: {
    explain: {
      title: '优惠券列表模块帮助说明：',
      content: '本模块多用于优惠券库存有限，需要用户领取所需优惠券的场景；若优惠券礼包的形式建议使用图片模块-领取优惠券'
    },
    templateUrl: templateCouponUrl, // test
    pageTemplateBg: '#EDF3FB', // 模块背景
    titleSet: {
      mainTitleChecked: true, // 主标题开关
      title: '', //主标题内容
      titleColor: '#3F5788', // 主标题颜色
      titleSize: '16',
      subTitleChecked: true, // 副标题开关
      subtitle: '', // 副标题内容
      subtitleColor: '#3F5788', // 副标题颜色
      subtitleSize: '12', // 副标题字号
    },
    couponSet: {
      couponNameColor: '#FFFFFF', // 优惠券名称颜色
      textColor: '#FFFFFF', // 文字描述颜色
      bottomColor: '#FF584A', // 底部颜色
    },
    btnSet: {
      isReceive: true, // 是否领取
      btnChecked: true, // 开关
      btnText: '立即领取', // 立即领取
      btnTextColor: '#000000', // 文字颜色
      btnColor: '#FFFFFF', // 按钮颜色
      getBtnChecked: true, // 开关
      getBtnText: '已领取', // 已领取
      getBtnTextColor: '#C4C2C0', // 已领取文字颜色
      getBtnColor: '#FFFFFF', // 已领取按钮颜色
    },
    components: [
      {
        createChildId: 0,
        templateType: 'coupon',
        couponBatch: '', // 批次
        couponName: '', // 优惠券名称
        couponDes: '', // 优惠券介绍
        // url: 'http://pic129.nipic.com/file/20170508/5490866_204222328000_2.jpg' // test
      }
    ]
  },
  cardSet: {
    explain: {
      title: '商品卡片模块帮助说明：',
      content: [
        {
          title: '一、上传图片要求',
          content: '1.1 图片需上传宽度不超过 750px，高度不限<br />1.2 图片限制大小约为 2M 以内'
        },
        {
          title: '二、模块用途',
          content: '本模块多用于重点宣传的商品，点击商品按钮可跳转至指定的商品详情'
        }
      ]
    },
    templateUrl: templateCardUrl,
    pageTemplateBg: '#ADCEAF', // 模块背景
    titleSet: {
      mainTitleChecked: true, // 主标题开关
      title: '', // 主标题内容
      titleColor: '#FFFFFF', // 主标题颜色
      titleSize: '16', // 主标题字号
      subTitleChecked: true, // 副标题开关
      subtitle: '', // 副标题内容
      subtitleColor: '#FFFFFF', // 副标题颜色
      subtitleSize: '12', // 副标题字号
    },
    commoditySet: {
      commodityNameColor: '#2A2827', // 商品名称颜色
      textColor: '#83817F', // 商品描述颜色
      salePriceColor: '#FD9238', // 销售价格颜色
      marketPriceColor: '#A3A3A3', // 市场价格颜色
      bottomColor: '#FFFFFF', // 底部颜色
    },
    btnSet: {
      btnChecked: true, // 开关
      btnText: '', // 立即购买
      btnTextColor: '#FFFFFF', // 文字颜色
      btnColor: '#FF8833', // 按钮颜色
    },
    components: [
      {
        createChildId: 0,
        templateType: 'card',
        productCode: '', // 商品编码
        productName: '', // 商品名称
        productDes: '', // 商品描述
        salePrice: '', // 销售价格
        marketPrice: '', // 市场价格
        type: '', // 商品类型
        url: '', // 商品图片
        isGetProductInfo: false
      }
    ]
  },
  imgSet: {
    explain: {
      title: '图片模块帮助说明：',
      content: [{
        title: '一、上传图片要求',
        content: '1.1 图片需上传宽度不超过 750px，高度不限<br />1.2 图片限制大小约为 2M 以内'
      },
      {
        title: '二、模块包含功能',
        content: '2.1 无跳转形式，可用于基本宣传使用<br />2.2 跳到到固定链接，交互为点击对应图片即可跳转到指定的外部页面<br />2.3 跳转到商品详情，点击图片后可跳转到对应的商品详情页面<br />2.4 领取优惠券，点击图片领取绑定的优惠券（支持多张优惠券）'
      }
      ]
    },
    templateUrl: templateImgUrl,
    url: '', // 图片地址
    mode: undefined, // 跳转类型 默认为空，'1'无跳转， '2'跳转到固定地址， '3'跳转到商品详情， '4'领取优惠券
    jumpUrl: '', // 固定跳转地址
    coupon: [ // 优惠券列表
      {
        batch: "", // 优惠劵批次
        couponDesc: "", // 优惠劵描述
        couponName: "" // 优惠劵名称
      }
    ],
    commodity: { // 商品详情
      code: "", // 商品编码
      goodsCategory: 0, // 商品类型
      goodsDesc: "", // 商品描述
      goodsName: "", // 商品名称
      image: "", // 商品图片
      marketPrice: "", // 市场价格
      price: "", // 销售价格
      smallImage: "" // 商品缩略图
    }
  },
  gongGeSet: {
    explain: {
      title: '商品宫格模块帮助说明：',
      content: [{
        title: '一、上传图片要求',
        content: '1.1 图片需上传宽度不超过 750px，高度不限<br />1.2 图片限制大小约为 2M 以内'
      }, {
        title: '二、模块用途',
        content: '本模块多用于多组商品使用，点击商品按钮可跳转至指定的商品详情'
      }
      ]
    },
    templateUrl: templateGongGeUrl,
    pageTemplateBg: '#ADCEAF', //  模块背景
    titleSet: {
      mainTitleChecked: true, //主标题开关
      title: '', // 主标题内容
      titleColor: '#FFFFFF', // 主标题颜色
      titleSize: '16',
      subTitleChecked: true, // 副标题开关
      subtitle: '', // 副标题内容
      subtitleColor: '#FFFFFF', // 副标题颜色
      subtitleSize: '12', // 副标题字号
    },
    commoditySet: {
      commodityNameColor: '#2A2827', // 商品名称颜色
      textColor: '#83817F', // 商品描述颜色
      salePriceColor: '#FD9238', // 销售价格颜色
      marketPriceColor: '#A3A3A3', // 市场价格颜色
      bottomColor: '#FFFFFF', // 底部颜色
    },
    btnSet: {
      btnChecked: true, // 开关
      btnText: '', // 立即购买
      btnTextColor: '#FFFFFF', // 文字颜色
      btnColor: '#FF8833', // 按钮颜色
    },
    components: [
      {
        createChildId: 0,
        templateType: 'gongGe',
        productCode: '', // 商品编码
        productName: '', // 商品名称
        productDes: '', // 商品介绍
        salePrice: '', // 销售价格
        marketPrice: '', // 市场价格
        type: '', // 商品类型
        url: '',
        isGetProductInfo: false
      }
    ]
  },
  infoSet: {
    explain: {
      title: '信息收集模块帮助说明：',
      content: '本模块多用于收集用户的活动信息，可用于的场景为报名、签到、邮寄奖品等等，可收集的信息如下<br />1、参加活动用户的手机号码<br /> 2、用户的姓名 <br /> 3、用户的性别 <br /> 4、身份证号码 <br /> 5、需要用户填写的区域 <br /> 6、用户所在的详细地址'
    },
    templateUrl: templateInfoUrl,
    pageTemplateBg: '#ADCEAF', // 模块背景
    titleSet: {
      mainTitleChecked: true, // 主标题开关
      title: '', // 主标题内容
      titleColor: '#ffffff', // 主标题颜色
      titleSize: '16',
      subTitleChecked: true, // 副标题开关
      subtitle: '', // 副标题内容
      subtitleColor: '#ffffff', // 副标题颜色
      subtitleSize: '12', // 副标题字号
    },
    itemSet: [
      {
        name: 'infoPhone',
        maxLength: 15,
        title: '手机',
        placeholder: '请填写手机号码',
        value: ''
      },
      {
        name: 'infoName',
        check: false,
        maxLength: 15,
        title: '姓名',
        placeholder: '请填写您的姓名',
        value: ''
      },
      {
        name: 'infoIdCard',
        check: false,
        maxLength: 15,
        title: '证件',
        placeholder: '请填写您的身份证号码',
        value: '',
      },
      {
        name: 'infoSex',
        check: false,
        maxLength: 15,
        title: '性别',
        placeholder: '请选择您的性别',
        value: '',
      },
      {
        name: 'infoArea',
        check: false,
        maxLength: 15,
        title: '地区',
        placeholder: '请选择您所在地区',
        value: '',
      },
      {
        name: 'infoAddress',
        check: false,
        maxLength: 15,
        title: '详细地址',
        placeholder: '请填写详细地址(街道、楼牌号)',
        value: '',
      },
    ],
    btnSet: {
      btnText: '立即提交', // 立即提交
      btnTextColor: '#494847', // 文字颜色
      btnColor: '#FFFFFF', // 按钮颜色
    },
  }
}

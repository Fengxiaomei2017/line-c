import axios from 'axios'
import store from '@/store/index'
import router from '@/router/'

var qs = require('qs')

// axios 配置
// axios.defaults.baseURL = 'http://www.daxi51.com'
// axios.defaults.baseURL = 'http://jeef8w.natappfree.cc'
// axios.defaults.baseURL = 'http://g9u6pz.natappfree.cc'
axios.defaults.baseURL = 'http://120.55.49.68:8085/'
// axios.defaults.baseURL = 'http://172.10.6.46:8085'

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          store.commit('LOGIN_OUT')
          router.replace({
            path: 'login',
            query: {path: router.currentRoute.fullPath}
          })
      }
    }
  }
)

export const register = (phoneNum, password, validateCode) => axios.post('/user/register', qs.stringify({
  phoneNum,
  password,
  validateCode
}))
/**
 用户登录
 */

/**
 用户动态登录
 */
export const loginByCode = (phoneNum, validateCode) => axios.get('/user/loginByCode', {
  params: {
    phoneNum,
    validateCode
  }
})
/**
 用户微信登录
 */
/**
 * 退出登录
 */
export const loginOut = () => axios.post('')
/**
 * 获取验证码
 * params:{phoneNum:用户电话}
 */
export const identifyCode = (phoneNumber) => axios.post('/user/sendRegisterCode', qs.stringify({phoneNumber}))
/**
 * 获取用户信息
 * params:{token:用户token}
 */
export const getUserInfo = (token) => axios.post('/user/info', qs.stringify({token}))

/**
 * 获取修改密码验证码
 * params:{phoneNum:用户电话}
 */
export const sendUpdatePasswordCode = (phoneNum) => axios.post('/user/sendUpdatePasswordCode', qs.stringify({phoneNum}))
/**
 *获取动态密码
 */
export const sendLoginCode = (phoneNum) => axios.get('/user/sendLoginCode', {params: {phoneNum}})

//
// 1.微信授权登陆user/wxLogin(code)
export const wxLogin = (code) => axios.post('/user/wxLogin', qs.stringify({code}))
// 2.账号密码登录user/login(phoneNum,password)
export const login = (phoneNum, password) => axios.get('/user/login', {params: {phoneNum, password}})
// export const phoneNumLogin = (phoneNum,password) => axios.post('/user/login', qs.stringify({code}))

// 3发送动态密码user/sendLoginCode(phoneNumber)

// 3动态密码登录user/loginByCode(phoneNumber,validateCode)
//
//
//
// 4注册验证码user/sendRegisterCode(phoneNumber)
// 4.账号密码注册user/register(phoneNum,validateCode,password)
//
// 5.发送短信修改验证码user/sendUpdatePasswordCode(phoneNumber)
// 5.短信修改密码user/updatePassword（phoneNum,verificationCode,password）
/**
 * 获取线路列表
 * @param pageNum
 * @param pageSize
 * @param days
 * @param orderBy
 * @param orderDesc
 * @returns {*|void}
 */
export const getRoadList = (pageNum, pageSize, days, type, theme, orderBy, orderDesc) => axios.post('/productBaseInfo/listProductInfo', qs.stringify({
  pageNum, pageSize, days, type, theme, orderBy, orderDesc
}))

// pageNum,pageSize,days,type,theme,orderBy,orderDesc
export const getRoadListAndParam = ( pageNum, pageSize, days, type, theme, orderBy, orderDesc) => {
  return axios.all([getRoadList(pageNum, pageSize, days, type, theme, orderBy, orderDesc), axios.get('productBaseInfo/getProductListScreenParam')])
}

/**
 * 获取商品详情
 * @param productId
 * @returns{AxiosPromise}
 */
export const getProductById = (productId) => axios.post('/productBaseInfo/getProductDetail', qs.stringify({
  productId,
}))
/**
 * 获取商品预订日历信息
 * @param、productId
 * @returns{AxiosPromise}Date
 */
export const getProductDateById = (productId) => axios.post('/goodsSkuInfo/listSku', qs.stringify({
  productId,
}))

/**
 * 获取订单列表
 * @param、userId 用户
 * @param、orderState 0为全部
 * @param、pageNumber
 * @param、pageSize
 * @returns{AxiosPromise}/orderBaseInfo/fetchBuyerOrder?userId=1&orderState=0&pageNumber=1&pageSize=20
 */
export const getOrderList = (userId, orderState, pageNumber, pageSize) => axios.post('/orderBaseInfo/fetchBuyerOrder', qs.stringify({
  userId,
  orderState,
  pageNumber,
  pageSize,
}))
/**
 * 新建订单
 * http://xixing.s1.natapp.cc/orderBaseInfo/createOrder?stockGoodsId=927ad32bcd174bec96d8997c1f5500d7&adult=2&child=0&orderMoney=300&buyerId=1&contactPerson=cxy&contactPhone=13882149136
 * post
 */
export const createOrder = (stockGoodsId, adult, child, orderMoney, buyerId, contactPerson, contactPhone) => axios.post('/orderBaseInfo/createOrder', qs.stringify({
  stockGoodsId, adult, child, orderMoney, buyerId, contactPerson, contactPhone
}))
/**
 * 支付订单
 * @param orderNo
 * @returns {AxiosPromise}
 */
export const payOrder = (orderNo) => axios.post('/orderBaseInfo/pay', qs.stringify({
  orderNo
}))

export const getOrderDetail = (userId, orderNo) => axios.post('/orderBaseInfo/fetchBuyerOrderItem', qs.stringify({
  userId,
  orderNo
}))

// 取消订单
export const cancelOrder = (userId, orderNo) => axios.post('/orderBaseInfo/buyerCancel', qs.stringify({
  userId,
  orderNo
}))

//申请退款
export const refundOrder = (userId, orderNo, reason) => axios.post('/orderBaseInfo/refundApply', qs.stringify({
  userId,
  orderNo,
  reason
}))
/**
 * 获取用户评论
 * params:{shopId:酒店ID}
 */
export const getComments = (shopId, pageSize = 10) => axios.post('/hotel-web/evaluate/searchEvaluate', qs.stringify({
  shopId,
  pageSize
}))

/**
 * 根据订单ID判断订单是否支付完成
 * post
 */
export const orderIfPay = (orderNum) => axios.post('/hotel-web/order/queryPayState', qs.stringify({orderNum}))
/**
 * 根据订单ID获取订单详情
 * post
 */
export const cancelOrderByUser = (orderId) => axios.post('/hotel-web/order/buyerCancelNotPay', qs.stringify({orderId}))
/**
 * 微信支付接口 独立浏览器
 */

export const wxForward = (orderNo) => axios.post('/orderBaseInfo/h5Pay', qs.stringify({
  orderNo
}))
/**
 * 微信支付接口 微信公众号
 */
export const wxJSAPIPay = (service, orderNum, orderId, orderName, orderMoney) => axios.post('/hotel-web/pay/wxJSAPIPay', qs.stringify({
  service, orderNum, orderId, orderName, orderMoney
}))
/**
 * 发表评论
 */
export const addComment = (evaluate) => axios.post('/productEvaluate/insertEvaluate', evaluate)
/**
 *图片删除
 */
export const deleteImg = (url) => axios.get('http://www.daxi51.com/hotel-web/upload/del', {params: {url}})
/**
 * 用户修改密码
 * */
export const updatePassword = (phoneNum, verificationCode, password) => axios.post('/user/updatePassword', qs.stringify({
  phoneNum,
  verificationCode,
  password
}))

/**
 *获取退款说明
 */
export const getBack = (id, hotelId) => axios.post('hotel-web/hotelGoods/toView1', qs.stringify({id, hotelId}))

/**
 *获取退款说明
 */
export const sentUrgeOrder = (orderNo) => axios.post('/orderBaseInfo/urgeOrder', qs.stringify({orderNo}))

const SET_USER = 'SET_USER'
const SET_TOKEN = 'SET_TOKEN'
const SET_CODE = 'SET_CODE'
const LOGIN_OUT = 'LOGIN_OUT'
const SET_FILTER_KEY = 'SET_FILTER_KEY'
const HOTEL_ID = 'HOTEL_ID'
const GOODS_ID = 'GOODS_ID'
const LIST_SCROLL_TOP = 'LIST_SCROLL_TOP'
const PAY_FINISH = 'PAY_FINISH'
const ORDER_BACK = 'ORDER_BACK'

// import {setStore, removeStore} from '@/config/mUtils'

export default {
  // 设置当前登录用户 属性名为变量就需要[]
  [SET_USER] (state, lineUser) {
    state.lineUser = {...lineUser}
    // setStore('lineUser', lineUser)
  },
  // 设置token
  [SET_TOKEN] (state, token) {
    state.token = token
    // setStore('token', token)
  },
  // 设置code
  [SET_CODE] (state, code) {
    state.code = code
    // setStore('code', code)
  },
  // hotelId
  [HOTEL_ID] (state, hotelId) {
    state.hotelId = hotelId
  },
  // goodsId
  [GOODS_ID] (state, goodsId) {
    state.goodsId = goodsId
  },
  [LIST_SCROLL_TOP] (state, listScrollTop) {
    state.listScrollTop = listScrollTop
  },
  [PAY_FINISH] (state, payFinish) {
    state.payFinish = {...payFinish}
  },
  [ORDER_BACK] (state, orderBack) {
    state.orderBack = orderBack
  },
  // 退出登录
  [LOGIN_OUT] (state) {
    state.token = ''
    state.lineUser = {}
    state.code = ''
    state.hotelId = ''
    state.goodsId = ''
    state.minStock = ''
    state.listScrollTop = ''
    state.payFinish = {}
    // removeStore('token')
    // removeStore('lineUser')
    // removeStore('code')
    // removeStore('payFinish')
  },
  // 筛选字段
  [SET_FILTER_KEY] (state, filterKey) {
    Object.assign(state.filterKey, filterKey)
  }
}

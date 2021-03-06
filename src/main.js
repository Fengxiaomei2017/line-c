// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import AMap from 'vue-amap'

import MintUI from 'mint-ui'
// import {MessageBox, Indicator} from 'mint-ui'

import 'bootstrap/dist/css/bootstrap.css'
import 'mint-ui/lib/style.css'

Vue.use(require('vue-wechat-title'))
Vue.use(MintUI)
Vue.use(AMap)

AMap.initAMapApiLoader({
  // key: '5419a975d506dd307fdcaab4c067d55b',
  key: 'fdf9ebd423f7ce1631c0a9e9e5745fe1',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.lineUser.id) {
      next()
    } else {
      let ua = navigator.userAgent.toLowerCase()
      let result = ua.match(/MicroMessenger/i) || ''
      // alert(result);
      if (result) {
        if (result.join(',') === 'micromessenger') {
          let wxJSAPIAppId = 'wx93a4e8ff7be8feb9'
          let nextPage = to.name
          // let wxJSAPIRedirectUrl = `http://www.daxi51.com/lineC/#/wxLogin?nextPage=${nextPage}`
          let wxJSAPIRedirectUrl = `http://www.daxi51.com/#/wxLogin?nextPage=${nextPage}`
          let encodedWSJSAPIRedirectUrl = encodeURIComponent(wxJSAPIRedirectUrl)
          let wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxJSAPIAppId}&redirect_uri=${encodedWSJSAPIRedirectUrl}&&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
          window.location.href = wxUrl
        }
      } else {
        next({path: '/login', replace: true, query: {path: to.fullPath}})
      }
    }
  } else {
    next()
  }
  // if (store.state.lineUser.id) {
  //   if (to.path.indexOf('wxLogin') > -1 || to.path.indexOf('login') > -1) {
  //     window.history.length <= 1?router.replace({path: '/'}):router.back()
  //   } else {
  //     next()
  //   }
  // } else if (to.meta.requireAuth && !store.state.lineUser.id) {
  //   let ua = navigator.userAgent.toLowerCase()
  //   let result = ua.match(/MicroMessenger/i) || ''
  //   // alert(result);
  //   if (result) {
  //     if (result.join(',') === 'micromessenger') {
  //       let wxJSAPIAppId = 'wx93a4e8ff7be8feb9'
  //       let nextPage = to.name;
  //       let wxJSAPIRedirectUrl = `http://www.daxi51.com/lineC/#/wxLogin?nextPage=${nextPage}`
  //       let encodedWSJSAPIRedirectUrl = encodeURIComponent(wxJSAPIRedirectUrl)
  //       let wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxJSAPIAppId}&redirect_uri=${encodedWSJSAPIRedirectUrl}&&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  //       window.location.href = wxUrl
  //     }
  //   } else {
  //     next({path: '/login', replace: true, query: {path: to.fullPath}})
  //   }
  // } else {
  //   next()
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// ????????????????????? 'myOption' ????????????????????????
// Vue.mixin({
//   methods: {
//     // ??????
//     goBack: function () {
//       // ???????????????????????????????????????????????????
//       if (window.history.length === 1) {
//         this.$router.replace({path: '/'})
//         // next({path: '/login',replace: true, query: {path: to.fullPath}})
//       } else {
//         this.$router.back()
//       }
//     },
//     // ??????
//     MessageBox: MessageBox,
//     Indicator: Indicator
//   }
// })
// ????????????iphone6????????????????????????viewport scale=1  ???????????????375?????????
// ???????????????16px ??????????????????????????????????????? 375/16 = 23.4375
// ??????????????????????????????????????????
var deviceWidth = document.documentElement.clientWidth
if (deviceWidth > 640) deviceWidth = 640
document.documentElement.style.fontSize = deviceWidth / (375 / 16) + 'px'
document.body.width = deviceWidth + 'px'

import Vue from 'vue'
import Router from 'vue-router'

const Home = () => {
  return require.ensure([], () => {
    return require('@/pages/home')
  })
}
const List = () => {
  return require.ensure([], () => {
    return require('@/pages/list')
  })
}
const NewList = () => {
  return require.ensure([], () => {
    return require('@/pages/list520')
  })
}
const Details = () => {
  return require.ensure([], () => {
    return require('@/pages/details')
  })
}

const ChooseDate = () => {
  return require.ensure([], () => {
    return require('@/pages/choose-date')
  })
}
const OrderConfirmation= () => {
  return require.ensure([], () => {
    return require('@/pages/order-confirmation')
  })
}
const MyOrders = () => {
  return require.ensure([], () => {
    return require('@/pages/my-orders')
  })
}
const OrderDetails = () => {
  return require.ensure([], () => {
    return require('@/pages/order-details')
  })
}
const Login = () => {
  return require.ensure([], () => {
    return require('@/pages/login')
  })
}
const WXLogin = () => {
  return require.ensure([], () => {
    return require('@/pages/wxLogin')
  })
}
const Register = () => {
  return require.ensure([], () => {
    return require('@/pages/register')
  })
}
const RePassword = () => {
  return require.ensure([], () => {
    return require('@/pages/rePassword')
  })
}
const Comment = () => {
  return require.ensure([], () => {
    return require('@/pages/comment')
  })
}
const Hotel = () => {
  return require.ensure([], () => {
    return require('@/pages/hotel520')
  })
}
const StartPage = () => {
  return require.ensure([], () => {
    return require('@/pages/startPage')
  })
}
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: StartPage,
      meta: {keepAlive: true}
    }, {
      path: '/login',
      name: Login,
      component: Login,
      meta: {requireAuth: false, title: '登录'}
    }, {
      path: '/wxLogin',
      name: WXLogin,
      component: WXLogin
      // meta: {requireAuth: true}
    }, {
      path: '/register',
      name: Register,
      component: Register,
      // meta: {keepAlive: true}
      meta: {requireAuth: false, title: '注册'}
    }, {
      path: '/rePassword',
      name: RePassword,
      component: RePassword,
      meta: {requireAuth: false, title: '修改密码'}
      // meta: {keepAlive: true}
    }, {
      path: '/list',
      name: List,
      component: List,
      meta: {requireAuth: false, title: '精品线路'}
    }, {
      path: '/newList',
      component: NewList,
      meta: {requireAuth: false, title: '线路TOP13'}
      // meta: {requireAuth: false}
    }, {
      path: '/hotel',
      component: Hotel,
      meta: {title: '酒店|民宿TOP9'}
    },
    {
      path: '/startPage',
      component: StartPage
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {title: '达西云商-酒店预订-线路预订'}
    }, {
      path: '/details:id',
      name: 'Details',
      component: Details,
      meta: {title: '线路详情'}
    }, {
      path: '/choose-date:id',
      name: 'ChooseDate',
      component: ChooseDate,
      meta: {requireAuth: true, title: '线路预定'}
    }, {
      // path: '/order-confirmation/:stockGoodsId/:stockGoodsName/:adult/:child/:orderMoney/:day',
      path: '/order-confirmation',
      name: 'OrderConfirmation',
      component: OrderConfirmation,
      meta: {requireAuth: true, title: '线路预定'}
    }, {
      path: '/my-orders',
      name: 'MyOrders',
      component: MyOrders,
      meta: {requireAuth: true, title: '我的订单'}
    }, {
      path: '/order-details',
      name: 'OrderDetails',
      component: OrderDetails,
      meta: {requireAuth: true, title: '订单详情'}
    }, {
      path: '/comment',
      component: Comment,
      meta: {requireAuth: true, title: '线路评论'}
    }
  ]
})

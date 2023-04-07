import Vue from 'vue'
import VueRouter from 'vue-router'
import WebsiteView from '@/views/website/index'
import MineView from '@/views/website/mine/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/website'
  },
  {
    path: '/website',
    component: WebsiteView,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/website/home'),
        meta: { title: '首页' }
      },
      {
        path: 'mine',
        name: 'Mine',
        component: MineView,
        children: [
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('@/views/website/mine/profile'),
            meta: { title: '我的资料' }
          },
          {
            path: 'address',
            name: 'Address',
            component: () => import('@/views/website/mine/address'),
            meta: { title: '我的收货地址' }
          },
          {
            path: 'order',
            name: 'Order',
            component: () => import('@/views/website/mine/order'),
            meta: { title: '我的订单' }
          },
          {
            path: 'order/detail/:id',
            name: 'OrderDetail',
            component: () => import('@/views/website/mine/orderDetail'),
            meta: { title: '订单详情' }
          }
        ]
      },
      {
        path: 'drug/all',
        name: 'DrugAll',
        component: () => import('@/views/website/drugAll'),
        meta: { title: '全部药品' }
      },
      {
        path: 'drug/detail',
        name: 'DrugDetail',
        component: () => import('@/views/website/drugDetail'),
        meta: { title: '药品详情' }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/website/cart'),
        meta: { title: '购物车' }
      },
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('@/views/website/pay'),
        meta: { title: '结算' }
      }
    ]
  },
  {
    path: '/website/login',
    name: 'Login',
    component: () => import('@/views/website/login'),
    meta: { title: '登录' }
  },
  {
    path: '/website/register',
    name: 'Register',
    component: () => import('@/views/website/register'),
    meta: { title: '注册' }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/website/404'),
    meta: { title: '页面错误' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | 我的药店'
  if (to.path) next()
})

export default router

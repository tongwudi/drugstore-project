import Vue from 'vue'
import VueRouter from 'vue-router'
import WebsiteView from '@/views/website/index'
import LayoutView from '@/layout/index'

// import MineView from '@/views/website/mine/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/backend'
  },
  {
    path: '/website',
    component: WebsiteView,
    children: [
      {
        path: '',
        name: 'WebsiteHome',
        component: () => import('@/views/website/home'),
        meta: { title: '首页' }
      },
      //   {
      //     path: 'mine',
      //     name: 'Mine',
      //     component: MineView,
      //     children: [
      //       {
      //         path: 'profile',
      //         name: 'Profile',
      //         component: () => import('@/views/website/mine/profile'),
      //         meta: { title: '我的资料' }
      //       },
      //       {
      //         path: 'address',
      //         name: 'Address',
      //         component: () => import('@/views/website/mine/address'),
      //         meta: { title: '我的收货地址' }
      //       },
      //       {
      //         path: 'order',
      //         name: 'Order',
      //         component: () => import('@/views/website/mine/order'),
      //         meta: { title: '我的订单' }
      //       },
      //       {
      //         path: 'order/detail/:id',
      //         name: 'OrderDetail',
      //         component: () => import('@/views/website/mine/orderDetail'),
      //         meta: { title: '订单详情' }
      //       }
      //     ]
      //   },
      {
        path: 'drug/all',
        name: 'DrugAll',
        component: () => import('@/views/website/drugAll'),
        meta: { title: '全部药品' }
      },
      {
        path: 'drug/detail/:id',
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
    path: '/backend',
    component: LayoutView,
    redirect: '/backend/index',
    children: [
      {
        path: 'index',
        name: 'BackendIndex',
        component: () => import('@/views/backend/index'),
        meta: { title: '首页' }
      },
      {
        path: 'drug',
        name: 'BackendDrug',
        component: () => import('@/views/backend/drug'),
        meta: { title: '药品管理' }
      },
      {
        path: 'stock',
        name: 'BackendStock',
        component: () => import('@/views/backend/stock'),
        meta: { title: '库存管理' }
      },
      {
        path: 'user',
        name: 'BackendUser',
        component: () => import('@/views/backend/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'auth',
        name: 'BackendAuth',
        component: () => import('@/views/backend/auth'),
        meta: { title: '权限管理' }
      }
    ]
  },
  {
    path: '/backend/login',
    name: 'BackendLogin',
    component: () => import('@/views/backend/login'),
    meta: { title: '登录' }
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

export default router

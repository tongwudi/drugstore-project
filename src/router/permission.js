import router from './index'
import store from '@/store/index'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | 我的药店'

  if (to.path.includes('/backend')) {
    if (store.getters.isLogin) {
      if (to.path === '/backend/login') {
        next('/backend')
      } else {
        next()
      }
    } else {
      if (to.path === '/backend/login') {
        next({ replace: true })
      } else {
        next({ path: '/backend/login', replace: true })
      }
    }
  } else {
    next()
  }
})
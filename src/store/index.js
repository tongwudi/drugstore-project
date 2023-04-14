import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.getItem('userInfo'),
    collapse: +Cookies.get('collapse') || 0
  },
  getters: {
    isWebLogin: state => !!state.userInfo,
    getUserInfo: state => JSON.parse(state.userInfo) || {},
    isCollapse: state => !!+state.collapse,
  },
  mutations: {
    SET_USERINFO(state, obj) {
      state.userInfo = JSON.stringify(obj)
      localStorage.setItem('userInfo', JSON.stringify(obj))
    },
    DELETE_USERINFO(state) {
      state.userInfo = ''
      localStorage.removeItem('userInfo')
    },
    TOGGLE_SIDEBAR(state) {
      state.collapse = state.collapse ? 0 : 1
      Cookies.set('collapse', state.collapse)
    },
    COLLAPSE_SIDEBAR(state) {
      state.collapse = 1
      Cookies.set('collapse', 1)
    }
  },
  actions: {},
  modules: {}
})

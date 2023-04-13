import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.getItem('userInfo') || ''
  },
  getters: {
    isWebLogin: state => !!state.userInfo,
    getUserInfo: state => JSON.parse(state.userInfo)
  },
  mutations: {
    SET_USERINFO(state, obj) {
      state.userInfo = JSON.stringify(obj)
      localStorage.setItem('userInfo', JSON.stringify(obj))
    },
    DELETE_USERINFO(state) {
      state.userInfo = ''
      localStorage.removeItem('userInfo')
    }
  },
  actions: {},
  modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    webToken: ''
  },
  getters: {
    isWebLogin: state => !!state.webToken
  },
  mutations: {},
  actions: {},
  modules: {}
})

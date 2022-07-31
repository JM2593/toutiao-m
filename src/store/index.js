import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN'))
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // 防止刷新token消失
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})

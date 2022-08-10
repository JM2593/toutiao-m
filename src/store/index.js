import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getHistory, setHistory } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN'))
    tokenObj: getToken() || {},
    searchHistory: getHistory() || [],
    showReply: false,
    commentitem: {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // 防止刷新token消失
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      setToken(payload)
    },
    SET_HISTORY(state, payload) {
      state.searchHistory = payload
      setHistory(payload)
    },
    SET_REPLY(state, payload) {
      state.showReply = payload
    },
    SET_COMMENTITEM(state, payload) {
      state.commentitem = payload
    }
  },
  actions: {},
  modules: {}
})

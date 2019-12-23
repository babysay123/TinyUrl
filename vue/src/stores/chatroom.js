import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatRoom: {
      init: {},
      initRoom: null
    },
    activeRoom: null,
    privateChat: null,
    redPacket: null
  },
  getters: {
    // getActiveRoom (state) {
    //   console.log('active room', state)
    //   return state
    // },
    // getPrivate (state) {
    //   console.log('private', state)
    //   return state
    // }
  },
  mutations: {
    // 聊天室
    init (state, data) {
      state.chatRoom.init = data
    },
    initRoom (state, data) {
      state.chatRoom.initRoom = data
    }
  },
  actions: {
    // 聊天室
    init ({ commit, state }) {
      commit('init', state)
    }
  }
})

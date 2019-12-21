/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-06 17:19:17
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'

// import Storage from 'Plugins/utils/StorageUtil'
// import global from './global'
// import football from './football'
// import game from './game'
// import mine from './mine'
// import agency from './agency'
// import active from './active'
// import amount from './amount'
// import variety from './variety'
// import voice from './voice'
// import Axios from 'Plugins/axios'
// import Utils from 'Plugins/utils'
// import {
//   Toast
// } from 'mint-ui'
// import Router from '@/router'
// import {
//   Howl
// } from 'howler'
// import {
//   userInfoApi,
//   accessTokenApi
// } from 'Plugins/api'

Vue.use(Vuex)

export default new Vuex.Store({
  // ...
  state: {
    access_token: '',
    ChatRoomOpenStatus: 'close',
    UserInfo: {}
  },
  getters: {
    access_token: state => state.access_token
  },
  mutations: {
    // resetUnreadMsg (state) {
    //   state.chatRoom.unreadMsgRed = 0
    // },
    setAccess_token (state, token) {
      state.access_token = token
    }
  },
  actions: {
    // // 投注区
    // SetLotteryId (context, data) {
    //   context.commit('SetLotteryId', data)
    // },
    // LotteryPage (context, data) {
    //   // state.Lottery = data
    //   context.commit('LotteryPage', data)
    // },
    // ShareCodeUpdate (context, data) {
    //   context.commit('ShareCodeUpdate', data)
    // },
    ColorSave (context, data) {
      context.commit('ColorSave', data)
    }
  },
  modules: {
    // global: global,
    // football: football,
    // game: game,
    // mine: mine,
    // agency: agency,
    // active: active,
    // amount: amount,
    // variety: variety
    // voice: voice
  }
})

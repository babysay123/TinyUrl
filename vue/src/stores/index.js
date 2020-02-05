/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-06 17:19:17
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router/index'

// import Storage from 'Plugins/utils/StorageUtil'
// import global from './global'
// import football from './football'
// import game from './game'
// import agency from './agency'
// import active from './active'
// import amount from './amount'
// import variety from './variety'
// import voice from './voice'
// import Axios from 'Plugins/axios'

import Utils from 'Plugins/utils'
import Mine from './mine'
import ChatRoom from './chatroom'
import WsOnMsg from './modules/wsonmsg'
// import { Toast } from 'mint-ui'
// import Router from '@/router'
// import { Howl } from 'howler'
// import {
//   userInfoApi,
//   accessTokenApi
// } from 'Plugins/api'
const { Storage } = Utils
Vue.use(Vuex)

export default new Vuex.Store({
  // ...
  state: {
    AccessToken: '',
    SocketToken: '',
    ChatRoomOpenStatus: 'close',
    UserInfo: {},
    GameConfig: {
      active: {},
      list: []
    },
    WsConfig: {
      websocket: null,
      init: null,
      logs: [] // 聊天记录
    }
  },
  getters: {
    GameConfig: state => state.GameConfig,
    AccessToken: state => state.AccessToken || Utils.Storage.get('accessToken'),
    SocketToken: state => state.SocketToken || Utils.Storage.get('socketToken'),
    WsConfig: state => state.WsConfig,
    User: state => (state.UserInfo.id && state.UserInfo) || Utils.Storage.get('userInfo'),
    ChatLogs: state => {
      const slogs = Storage.get('chatLogs')
      const { logs } = state.WsConfig
      if (logs.length > 0) {
        return logs
      }
      if (slogs && slogs.length > 0) {
        state.WsConfig.logs = slogs
      }
      console.log('get log', state.WsConfig.logs)
      return state.WsConfig.logs
    },
    CheckLogin: state => {
      let user = state.UserInfo || Utils.Storage.get('userInfo')
      if (!user) {
        // 重新请求user信息

      }
      return user
    }
    // CheckWS: state =>
  },
  mutations: {
    // resetUnreadMsg (state) {
    //   state.chatRoom.unreadMsgRed = 0
    // },
    setGameConfig (state, data) {
      Object.keys(data).forEach(e => {
        state.GameConfig[e] = data[e]
      })
    },
    //
    setAccessToken (state, data) {
      state.AccessToken = data
    },
    // WS
    setWS (state, data) {
      state.WsConfig.websocket = data
    },
    // closeWS (state) {
    //   state.WsConfig.websocket = null
    // },
    setInit (state, data) {
      state.WsConfig.init = data
    },
    resetWs (state, data) {
      state.WsConfig.init = data
    },
    setLogs (state, data) {
      if (typeof data === 'string') {
        if (data === 'clear') {
          state.WsConfig.logs = []
        }
      } else {
      // // state.WsConfig.logs = data
      // // logs 检验是否重复
      // let { logs } = state.WsConfig
      // logs.push(data)
      // logs = Array.from(new Set(logs))
      // state.WsConfig.logs = logs
        state.WsConfig.logs.push(data)
      }
      // console.log('new logs', state.WsConfig.logs)
      Storage.save('chatLogs', state.WsConfig.logs)
    },
    // 保存用户信息
    setUserInfo (state, data) {
      state.UserInfo = data
      state.AccessToken = data.accessToken
      state.SocketToken = data.socketToken
      Storage.save('userInfo', data)
      Storage.save('accessToken', data.accessToken)
      Storage.save('socketToken', data.socketToken)
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
    ColorSave ({ commit }, data) {
      // commit('ColorSave', data)
      console.log(commit, data, 'color save')
    },
    // userInfo
    setUserInfo ({ commit }, data) {
      commit('setUserInfo', data)
    },
    // webSocket
    // action 的参数有 commit, state, getters, dispatch
    async LinkWS ({ commit, getters }) {
      // console.log(commit)
      // console.log(getters)
      // console.log(this.dispatch('ColorSave'))
      const { SocketToken, WsConfig } = getters
      const { chatURL } = Utils
      // console.log(SocketToken, WsConfig)
      // 链接前先关闭
      let { websocket } = WsConfig
      // let height = window.innerHeight - 90
      if (websocket) {
        websocket.close()
        commit('setWS', null)
      }
      // 如果没有获取到socket token，则不做链接
      if (!SocketToken) {
        commit('setWS', null)
        return
      }

      // 创建socket
      const WS = new WebSocket(`${chatURL('ws')}/socket/${SocketToken}`)
      commit('setWS', WS)
      // socket 是否要轮询？

      WS.onopen = () => {}
      WS.onmessage = evt => new WsOnMsg(evt, commit)
      // WS.onmessage = (evt) => {
      //   // console.log(evt)
      //   const res = JSON.parse(evt.data)
      //   console.log(res)
      //   console.log(WsOnMsg)

      //   // 初始化成功
      //   if (res.event === 'INIT_SUCCESS') {
      //     commit('setInit', res)
      //   }

      //   // 无效访问令牌，请重新登录
      //   if (res.event === 'INVALID_ACCESS_TOKEN') {
      //     // console.log(router)
      //     commit('setInit', res)
      //     InvalidStatus(res)
      //   }

      //   // 在其他地方新开了一条socket，本socket即将关闭
      //   if (res.event === 'RESET_SOCKET') {
      //     // 需要重新链接socket
      //     commit('setInit', res)
      //     // 重连
      //   }

      //   // 聊天事件
      //   if (res.event === 'CHAT') {
      //     // commit('setInit', res)
      //     console.log(res, 'chat')
      //     commit('setLogs', res)
      //   }

      //   // 红包事件
      //   if (res.event === 'RED_PACKETE') {
      //     commit('setInit', res)
      //   }

      //   // console.log(this.routerLink)
      //   // console.log(this.$router)
      //   // if (res.type === 'WARN') {
      //   //   Message({
      //   //     type: 'warning',
      //   //     message: res.data,
      //   //     offset: height
      //   //   })
      //   //   return
      //   // }
      // }
      WS.onerror = () => {}
    },
    setGameConfig ({ commit }, data) {
      commit('setGameConfig', data)
    }
  },
  modules: {
    Mine,
    ChatRoom
    // global: global,
    // football: football,
    // game: game,
    // agency: agency,
    // active: active,
    // amount: amount,
    // variety: variety
    // voice: voice
  }
})

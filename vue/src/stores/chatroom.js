// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     RoomInfo: {
//       init: null, // 房间对象
//       initRoom: null
//     },
//     activeRoom: null,
//     privateChat: null, // 私聊
//     redPacket: null // 红包
//   },
//   getters: {
//     // getActiveRoom (state) {
//     //   console.log('active room', state)
//     //   return state
//     // },
//     // getPrivate (state) {
//     //   console.log('private', state)
//     //   return state
//     // }
//     // RoomInfo: state => state.RoomInfo || null
//   },
//   mutations: {
//     // 聊天室
//     // init (state, data) {
//     //   state.chatRoom.init = data
//     // },
//     // initRoom (state, data) {
//     //   state.chatRoom.initRoom = data
//     // },
//     setRoomInfo (state, data) {
//       if (typeof data !== 'object') {
//         Object.keys(data).forEach(e => {
//           state.RoomInfo[e] = data[e]
//         })
//       }
//     }
//   },
//   actions: {
//     // 聊天室 状态
//     // init ({ commit, state }, data) {
//     //   console.log(state)
//     //   commit('init', data)
//     // }
//     setRoomInfo ({ commit }, data) {
//       commit('setRoomInfo', data)
//     }
//   }
// })
import Utils from 'Plugins/utils'

const storageData = (keys, sign) => {
  const st = Utils.Storage.get(keys)
  if (sign && st[sign]) {
    return st[sign]
  }
  return st
}

export default {
  namespaced: true,
  state: {
    // 聊天室信息
    RoomInfo: {
      init: null, // 房间对象
      active: {}, // 当前 活动 房间
      glist: [], // 当前 房间列表
      initRoom: null
    },
    RoomStatus: 'leave', // 房间进入推出状态
    // // 具体房间信息
    // GameInfo: {
    // },
    // RoomConfig: {},
    ActiveRoom: null,
    PrivateChat: null, // 私聊
    RedPacket: null // 红包
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
    GameActive: state => {
      const actives = storageData('roomInfo', 'active')
      if (actives && actives.id) {
        state.RoomInfo.active = actives
      }
      return state.RoomInfo.active
    },
    GameList: state => {
      const glist = storageData('roomInfo', 'glist')
      if (glist && glist.length > 0) {
        state.RoomInfo.glist = glist
      }
      return state.RoomInfo.glist
    },
    // RoomInit: state => {
    //   const init = storageData('roomInfo', 'init')
    //   if (init && init.id) {
    //     state.RoomInfo.init = init
    //   }
    //   return state.RoomInfo.init
    // },
    RoomStatus: state => state.RoomStatus,
    RoomInfo: state => {
      const info = storageData('roomInfo')
      if (info && info.active && info.active.id) {
        state.RoomInfo = info
      }
      return state.RoomInfo
    }
  },
  mutations: {
    // 聊天室
    // init (state, data) {
    //   state.chatRoom.init = data
    // },
    // initRoom (state, data) {
    //   state.chatRoom.initRoom = data
    // },
    // game config
    setGameInfo (state, data) {
      Object.keys(data).forEach(e => {
        state.GameInfo[e] = data[e]
      })
      Utils.Storage.save('gameInfo', state.GameInfo)
    },
    // room info
    setRoomInfo (state, data) {
      // 对象赋值
      Object.keys(data).forEach(e => {
        if (e === 'status') {
          state.RoomStatus = data[e]
        } else {
          state.RoomInfo[e] = data[e]
        }
      })
      Utils.Storage.save('roomInfo', state.RoomInfo)
    }
  },
  actions: {
    // 聊天室 房间
    setGameInfo ({ commit }, data) {
      commit('setGameInfo', data)
    },
    // 聊天室 状态
    setRoomInfo ({ commit }, data) {
      commit('setRoomInfo', data)
    }
  }
}

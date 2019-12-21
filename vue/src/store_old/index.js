/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-06 17:19:17
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import Storage from 'Plugins/utils/StorageUtil'
import global from './global'
import football from './football'
import game from './game'
import mine from './mine'
import agency from './agency'
import active from './active'
import amount from './amount'
import variety from './variety'
// import voice from './voice'
import Axios from 'Plugins/axios'
import Utils from 'Plugins/utils'
// import {
//   Toast
// } from 'mint-ui'
import Router from '@/router'
// import {
//   Howl
// } from 'howler'
import {
  userInfoApi,
  accessTokenApi
} from 'Plugins/api'

Vue.use(Vuex)

export default new Vuex.Store({
  // ...
  state: {
    access_token: '',
    chatRoom: {
      flag: '',
      flagWs: false,
      service: {
        url: '',
        type: 0
      },
      ws: null,
      authority: 0,
      roomAuthority: 0,
      music: {
        message: null,
        reg: null,
        click: null,
        plan: null,
        packet: null
      },
      eiteMore: {
        flag: false,
        list: []
      },
      font: {
        fontSize: 14,
        fontSizeAdd1: 15,
        fontSizeAdd2: 16,
        fontSizeAdd3: 17,
        roomGradeHeight: 14
      },
      musicSto: Utils.Storage.get('music'),
      init: false, // 初始数据
      systemNotify: false,
      initRoom: false, // 进入房间
      dialogue: false,
      sessionClosedReceipt: false,
      roomReleaseShutup: false,
      roomShutup: false,
      memberShutup: false,
      memberReleaseShutup: false,
      exceptionNotify: false,
      shareOrder: false,
      todayScore: false,
      commonRedPacket: false,
      serviceChatReceipt: false,
      requestPrivateChatNotify: false,
      serviceChatTransmitNotify: false,
      privateServiceChat: false,
      joinRoomNotify: false,
      joinRoomNotallowedNotify: false,
      privateChat: false,
      chatReceipt: false,
      transferMessage: false,
      transferReceipt: false,
      leaveRoomNotify: false,
      deleteMessage: false,
      chatroomNoticeNotify: false,
      removeFromRoomNotify: false,
      friendDeletedNotify: false,
      releaseFromRoomNotify: false,
      roomDeleteNotify: false,
      reLoginNotify: false,
      roomTitleActive: false, // 第一次是从别的路由进入聊天室的时候
      messagState: { // 发送消息的结果 状态
        load: false,
        err: false
      },
      openid: '', // token接口用openid
      friendopenid: '',
      privateRedPacket: '',
      otherOpenid: '', // 列表里面的私聊openId
      roomNmae: '',
      privateChatId: '',
      chatroomStorage: {},
      oneRoomData: [],
      unreadListData: [],
      unreadMsgRed: 0,
      remainingUnreadMsg: [],
      forward: {}, // 分享消息到房间 或者 到个人 的 附件 attachment
      sharePop: false, // 分享 选择群体 后的v-if
      unreadMsg: [],
      currentChatId: '', // 判断是否当前聊天
      serviceOnline: false, // 判断客服是否在线
      serviceMsg: [], // 客服聊天的上线消息提醒
      notice: [], // 公告
      headImg: [ // 等级标识
        require('Assets/images/chatroom/room-expert.png'),
        require('Assets/images/chatroom/room1.png'),
        require('Assets/images/chatroom/room2.png'),
        require('Assets/images/chatroom/room3.png'),
        require('Assets/images/chatroom/room4.png'),
        require('Assets/images/chatroom/room5.png'),
        require('Assets/images/chatroom/room6.png'),
        require('Assets/images/chatroom/room7.png'),
        require('Assets/images/chatroom/room8.png'),
        require('Assets/images/chatroom/room9.png'),
        require('Assets/images/chatroom/room10.png'),
        require('Assets/images/chatroom/room-expert.png')
      ],
      temporaryBussType: 0, // 判断游客的是否私聊
      purive (auth, identity) {
        let a = 1 << identity
        return (auth & (a)) === a
      },
      privateChatz: {}, // 转发
      lookInformationAddSayRomm: '', // 在线列表查看资料里的私聊类型
      diglogClose: false, // 客服会话是否关闭
      diglogOk: false, // 会员跟游客每次发送成功保存最后一条对比记录
      BettingPalettePlay: true, // 右侧玩法按钮显示
      msgIsUnread: null,
      eiteStatus: 0, // 艾特的状态
      eiteArr: [], // 艾特的未读数组
      isLogin: false
    },
    ChatRoomOpenStatus: 'close',
    UserInfo: {},
    Lottery: { // 投注数据
      lotteryResult: false,
      lotteryList: [], // 全部投注列表
      lotteryId: 0,
      lotteryTitle: '', // 全局标题
      lotteryLayout: {}, // 当前彩种布局
      playWayArr: [], // 玩法数组 全数据
      lotteryMsg: {},
      AwardList: []
    },
    payments: [],
    shareCode: 0,
    ballSetColorDic: [] // 六合彩颜色数组
  },
  getters: {
    access_token: state => state.access_token,
    chatRoomFont (state) {
      let fontSize = Storage.get('chatFontSize')
      let user = Storage.get('user')
      if (user && fontSize && fontSize[user.userId]) {
        state.chatRoom.font.fontSize = Number(fontSize[user.userId].fontSize)
        state.chatRoom.font.fontSizeAdd1 = Number(state.chatRoom.font.fontSize) + 1
        state.chatRoom.font.fontSizeAdd2 = Number(state.chatRoom.font.fontSize) + 2
        state.chatRoom.font.fontSizeAdd3 = Number(state.chatRoom.font.fontSize) + 3
      }
      switch (state.chatRoom.font.fontSize) {
        case 14:
          state.chatRoom.font.roomGradeHeight = '15px'
          break
        case 16:
          state.chatRoom.font.roomGradeHeight = '18px'
          break
        case 18:
          state.chatRoom.font.roomGradeHeight = '22px'
          break
      }
      return state.chatRoom.font
    },
    getOneRoomData (state) {
      return state.chatRoom.oneRoomData
    },
    getPayments (state) {
      // Storage.get('payments') ? Storage.get('payments')
      if (state.payments.length > 0) {
        return state.payments
      } else if (Storage.get('payments')) {
        let data = Storage.get('payments')
        state.payments = data
        return data
      } else {
        return []
      }
    },
    getLayout (state) {
      //
      //
      //
      if (state.Lottery.lotteryLayout.lotteryId) {
        return state.Lottery.lotteryLayout
      } else if (Storage.get('lotteryLayout')) {
        // 判断id是否一致
        let data = Storage.get('lotteryLayout')
        if (state.Lottery.lotteryId !== data.lotteryId + '') {
          state.Lottery.lotteryLayout = {}
          return {}
        }
        state.Lottery.lotteryLayout = data
        return data
      } else {
        return {}
      }
    },
    getLayoutMsg (state) {
      if (state.Lottery.lotteryMsg.lotteryId) {
        return state.Lottery.lotteryMsg
      } else if (Storage.get('lotteryMsg')) {
        // 判断id是否一致
        let data = Storage.get('lotteryMsg')
        // if (state.Lottery.lotteryId !== data.lotteryId + '') {
        //   state.Lottery.lotteryMsg = {}
        //   return {}
        // }
        state.Lottery.lotteryMsg = data
        return data
      } else {
        return {}
      }
    },
    getShareCode (state) {
      if (state.shareCode || state.shareCode === 0) {
        return state.shareCode
      } else if (Storage.get('shareCode') !== '' || Storage.get('shareCode') !== undefined) {
        let data = Storage.get('shareCode')
        state.shareCode = data
        return data
      } else {
        return 0
      }
    },
    getTitle (state) {
      if (state.Lottery.lotteryTitle) {
        return state.Lottery.lotteryTitle
      } else if (Storage.get('lotteryTitle')) {
        state.Lottery.lotteryTitle = Storage.get('lotteryTitle')
        return state.Lottery.lotteryTitle
      } else {
        return ''
      }
    },
    getUserInfo (state) {
      if (state.UserInfo.account) {
        return state.UserInfo
      } else if (Storage.get('user')) {
        state.UserInfo = Storage.get('user')
        return state.UserInfo
      } else {
        return {}
      }
    },
    getEiteArr (state) {
      return state.chatRoom.eiteArr || []
    },
    getChatInit (state) {
      let _member = {}
      let _chatRooms = {}
      if (state.chatRoom.init) {
        try {
          _member = state.chatRoom.init.message.member
          _chatRooms = state.chatRoom.init.message.chatRooms
        } catch (error) {

        }
      }
      return {
        _full: state.chatRoom.init,
        member: _member,
        chatRooms: _chatRooms
      }
    }
  },
  mutations: {
    resetUnreadMsg (state) {
      state.chatRoom.unreadMsgRed = 0
    },
    setAccess_token (state, token) {
      state.access_token = token
    },
    // 聊天室
    changeChatRoomNickName (state, nickname) {
      state.chatRoom.init.message.member.nickname = nickname
    },
    flag (state, data) {
      state.chatRoom.flag = data
    },
    ws (state, data) {
      state.chatRoom.ws = data
    },
    init (state, data) {
      state.chatRoom.init = data
    },
    friendopenid (state, data) {
      state.chatRoom.friendopenid = data
    },
    systemNotify (state, data) {
      state.chatRoom.systemNotify = data
    },
    initRoom (state, data) {
      state.chatRoom.initRoom = data
    },
    dialogue (state, data) {
      state.chatRoom.dialogue = data
    },
    // 私聊红包
    privateRedPacket (state, data) {
      state.chatRoom.privateRedPacket = data
    },
    sessionClosedReceipt (state, data) {
      state.chatRoom.isLogin = false
      state.chatRoom.sessionClosedReceipt = data
    },
    roomReleaseShutup (state, data) {
      state.chatRoom.roomReleaseShutup = data
    },
    roomShutup (state, data) {
      state.chatRoom.roomShutup = data
    },
    memberShutup (state, data) {
      state.chatRoom.memberShutup = data
    },
    memberReleaseShutup (state, data) {
      state.chatRoom.memberReleaseShutup = data
    },
    exceptionNotify (state, data) {
      state.chatRoom.exceptionNotify = data
    },
    shareOrder (state, data) {
      state.chatRoom.shareOrder = data
    },
    todayScore (state, data) {
      state.chatRoom.todayScore = data
    },
    commonRedPacket (state, data) {
      state.chatRoom.commonRedPacket = data
    },
    serviceChatReceipt (state, data) {
      state.chatRoom.serviceChatReceipt = data
    },
    requestPrivateChatNotify (state, data) {
      state.chatRoom.requestPrivateChatNotify = data
    },
    serviceChatTransmitNotify (state, data) {
      state.chatRoom.serviceChatTransmitNotify = data
    },
    privateServiceChat (state, data) {
      state.chatRoom.privateServiceChat = data
    },
    joinRoomNotify (state, data) {
      state.chatRoom.joinRoomNotify = data
    },
    joinRoomNotallowedNotify (state, data) {
      state.chatRoom.joinRoomNotallowedNotify = data
    },
    privateChat (state, data) {
      state.chatRoom.privateChat = data
    },
    chatReceipt (state, data) {
      state.chatRoom.chatReceipt = data
    },
    transferMessage (state, data) {
      state.chatRoom.transferMessage = data
    },
    transferReceipt (state, data) {
      state.chatRoom.transferReceipt = data
    },
    leaveRoomNotify (state, data) {
      state.chatRoom.leaveRoomNotify = data
    },
    deleteMessage (state, data) {
      state.chatRoom.deleteMessage = data
    },
    chatroomNoticeNotify (state, data) {
      state.chatRoom.chatroomNoticeNotify = data
    },
    removeFromRoomNotify (state, data) {
      state.chatRoom.removeFromRoomNotify = data
    },
    releaseFromRoomNotify (state, data) {
      state.chatRoom.releaseFromRoomNotify = data
    },
    roomDeleteNotify (state, data) {
      state.chatRoom.roomDeleteNotify = data
    },
    friendDeletedNotify (state, data) {
      state.chatRoom.friendDeletedNotify = data
    },
    reLoginNotify (state, data) {
      state.chatRoom.reLoginNotify = data
    },
    sharePopH (state) {
      state.sharePop = false
    },
    roomNmaeHd (state, name) {
      state.chatRoom.roomNmae = name
    },
    // 投注区
    SetLotteryId (state, data) {
      state.Lottery.lotteryId = data
    },
    LotteryPage (state, data) {
      // state.Lottery = data
      let _returnData = {
        lotteryLayout: {}, // 当前彩种布局
        playWayArr: [] // 玩法数组 全数据
      }
      if (!data || data.length === 0) {
        state.Lottery.lotteryLayout = _returnData.lotteryLayout
        state.Lottery.playWayArr = _returnData.playWayArr
        return _returnData
      }
      // 彩种信息，替换头部信息
      _returnData.playWayArr = data
      // 把玩法布局分离一下
      if (data[0] && data[0].defaultPlayWay) {
        // 保存起来，页面转到结算的时候要用
        _returnData.lotteryLayout = data[0].defaultPlayWay
      } else {
        _returnData.lotteryLayout = data[0].playWayData[0]
      }
      state.Lottery.lotteryLayout = _returnData.lotteryLayout
      Storage.save('lotteryLayout', _returnData.lotteryLayout)
      state.Lottery.playWayArr = _returnData.playWayArr
    },
    LotteryDetail (state, data) {
      if (data && data.lotteryId > 0) {
        //
        state.Lottery.lotteryMsg = data // 获取彩种信息，以及开奖信息
        Storage.save('lotteryMsg', data)
      }
    },
    LotteryLayoutUpdate (state, data) {
      if (data && data.lotteryId > 0) {
        state.Lottery.lotteryLayout = data
        Storage.save('lotteryLayout', data)
      }
    },
    ShareCodeUpdate (state, data) {
      state.shareCode = data
      Storage.save('shareCode', data)
    },
    ColorSave (state, data) {
      state.ballSetColorDic = data
    },
    dictSave (state, dict) {
      for (let key in dict) {
        if (dict.hasOwnProperty(key)) {
          let element = dict[key]
          state[key] = element
        }
      }
    },
    updateAllLotterys (state, data) {
      state.Lottery.lotteryList = data
    },
    updateTitle (state, data) {
      state.Lottery.lotteryTitle = data
      Storage.save('lotteryTitle', data)
    },
    updatePayments (state, data) {
      // 如果为空则增加，如果有值，则判断是否重复
      // 需要更新的东西，1，期数，时时最新，更新前判断弹提示
      // 2，不同号码不同注数或不同玩法不是同一期，则新增
      // let _flag = false
      // if (state.payments.length === 0) {
      //   state.payments.push(data)
      // } else {
      //   for (let inx = 0; inx < state.payments.length; inx++) {
      //     let item = state.payments[inx]
      //     if (item.playId === data.playId && item.numbers === data.numbers && item.size === data.size) {
      //       state.payments[inx] = data
      //       _flag = true
      //     }
      //   }
      //   if (!_flag) {
      //     state.payments.push(data)
      //   }
      // }
      // 传过来的data要是全部的数组
      state.payments = data
      Storage.save('payments', state.payments)
    },
    removePayments (state, data) {
      // 删除投注数据，分为逐条和全部
      if (data === 'clear') {
        // 全部删除
        state.payments = []
        Storage.remove('payments')
      } else {
        // 逐条
        state.payments = data
        Storage.save('payments', state.payments)
      }
    },
    updateAwardList (state, data) {
      state.Lottery.AwardList = data
    },
    updateEites (state, data) {
      // type add remove clear
      if (data.type === 'add') {
        state.chatRoom.eiteArr = data.arr || [] // 新增数组元素在外方法实现
      } else if (data.type === 'remove') {
        for (let inx = 0; inx < state.chatRoom.eiteArr.length; inx++) {
          let e = state.chatRoom.eiteArr[inx]
          if (e.content === data.content) {
            state.chatRoom.eiteArr.splice(inx, 1)
            break
          }
        }
      } else if (data.type === 'clear') {
        state.chatRoom.eiteArr = []
      }
      return state.chatRoom.eiteArr
    },
    changeEiteStatus (state, data) {
      state.chatRoom.eiteStatus = data
    },
    updateUserInfo (state, data) {
      Storage.save('user', data)
      state.UserInfo = data
    }
  },
  actions: {
    async getNewAccessToken ({
      commit,
      state
    }) {
      try {
        let ws = localStorage.getItem('ws')
        if (ws) {
          commit('setAccess_token', ws)
          return
        }
        const res = await accessTokenApi()
        const {
          code,
          data
        } = res
        if (code === 0) {
          commit('setAccess_token', data)
        }
        const {
          path
        } = router.history.current
        if (code === 1312 && path.indexOf('chatroom') > -1) {
          const reNewToken = await accessTokenApi()
          if (reNewToken.code === 0) {
            commit('setAccess_token', reNewToken.data)
          }
        }
      } catch (error) {

      }
    },
    // 聊天室
    async websocket ({
      commit,
      state,
      getters
    }) {
      if (state.chatRoom.ws) {
        state.chatRoom.ws.close()
        state.chatRoom.ws = null
      }
      //
      // const { getNewAccessToken } = this._actions
      // // eslint-disable-next-line no-undef
      // await this.dispatch(getNewAccessToken())
      // eslint-disable-next-line camelcase
      const { access_token } = getters
      // Axios.get('/chat_room/access_token.do')
      //   .then((res) => {
      //     if (res.code === 0) {

      commit('flag', access_token)
      // eslint-disable-next-line camelcase
      commit('ws', new WebSocket(Utils.chatURL('ws') + '/websocket/' + (Storage.get('cardId') !== null ? Storage.get('cardId') : access_token)))
      console.log(access_token, Storage.get('cardId'))
      setInterval(() => {
        state.chatRoom.ws.send(`{ "event": "hold", "data": 0 }`)
      }, 15000)
      state.chatRoom.ws.onopen = (evt) => {}
      state.chatRoom.ws.onmessage = (evt) => {
        let data = JSON.parse(evt.data)
        if (data.event === 'init') {
          commit('init', data)
        }
        if (data.event === 'reLoginNotify') { // 000
          commit('reLoginNotify', data)
        }
        if (data.event === 'systemNotify') {
          commit('systemNotify', data)
        }
        if (data.event === 'initRoom') {
          commit('initRoom', data)
        }
        if (data.event === 'dialogue') {
          commit('dialogue', data)
        }
        if (data.event === 'privateRedPacket') {
          commit('privateRedPacket', data)
        }
        if (data.event === 'sessionClosedReceipt') {
          Axios.get('/passport/check_status.do')
            .then((res) => {
              if (res.code !== 0) {
                console.log('未登录', res)
                for (let key in sessionStorage) {
                  if (typeof sessionStorage[key] === 'string' && typeof JSON.parse(sessionStorage[key])) {
                    if (JSON.parse(sessionStorage[key])[0] && JSON.parse(sessionStorage[key])[0].temporary) {
                      sessionStorage.removeItem(key)
                    }
                  }
                }
                sessionStorage.removeItem('manager')
                sessionStorage.removeItem('ykAfterServier')
                sessionStorage.removeItem('ykUnread')
                localStorage.removeItem('privateChatUnread')
                localStorage.removeItem('sessionid')
                // window.location.reload(true)
                state.chatRoom.isLogin = false
                commit('sessionClosedReceipt', data)
              }
            })
            .catch(() => {})
        }
        if (data.event === 'roomReleaseShutup') {
          commit('roomReleaseShutup', data)
        }
        if (data.event === 'friendDeletedNotify') {
          commit('friendDeletedNotify', data)
        }
        if (data.event === 'roomShutup') {
          commit('roomShutup', data)
        }
        if (data.event === 'memberShutup') {
          commit('memberShutup', data)
        }
        if (data.event === 'memberReleaseShutup') {
          commit('memberReleaseShutup', data)
        }
        if (data.event === 'exceptionNotify') {
          commit('exceptionNotify', data)
        }
        if (data.event === 'shareOrder' || data.event === 'precisePlan') {
          commit('shareOrder', data)
        }
        if (data.event === 'todayScore' || data.event === 'getRedPacketNotify') {
          commit('todayScore', data)
        }
        if (
          data.event === 'commonRedPacket' ||
          data.event === 'flauntRedPacket' ||
          data.event === 'speciallyRedPacket' ||
          data.event === 'privateRedPacket'
        ) {
          commit('commonRedPacket', data)
        }
        if (data.event === 'serviceChatReceipt') {
          commit('serviceChatReceipt', data)
          state.chatRoom.msgIsUnread = data.message
          state.chatRoom.unreadMsgRed++
          if (!data.message.success) {
            // if (data.message.msg === '该会话已关闭') {
            //   if (state.chatRoom.init.message.member.type === 3) {
            //     Toast({
            //       message: data.message.msg,
            //       position: 'middle',
            //       duration: 2000
            //     })
            //   } else {
            //     state.chatRoom.diglogClose = true
            //     // Toast({
            //     //   message: '该会话已关闭, 请重新选择',
            //     //   position: 'middle',
            //     //   duration: 2000
            //     // })
            //   }
            // } else {
            //   Toast({
            //     message: data.message.msg,
            //     position: 'middle',
            //     duration: 1500
            //   })
            // }
          } else {
            state.chatRoom.diglogOk = true
          }
        }
        if (data.event === 'requestPrivateChatNotify') {
          commit('requestPrivateChatNotify', data)
          let unreadList = data.message.unreadList
          if (unreadList) {
            let unreadListLeng = unreadList.length
            if (unreadListLeng > 0) {
              for (let i = 0; i < unreadList.length; i++) {
                state.chatRoom.unreadListData.push(unreadList[i])
              }
            }
          }
          state.chatRoom.currentChatId = data.message.chatRoom.chatId
          state.chatRoom.serviceOnline = true
          let otherOpendId = ''
          if (state.chatRoom.init.message.member.openid === data.message.chatRoom.receiver) {
            otherOpendId = data.message.chatRoom.sender
          } else {
            otherOpendId = data.message.chatRoom.receiver
          }
          let roomType = ''
          if (state.chatRoom.lookInformationAddSayRomm === 'online') {
            data.message.chatRoom.bussType = 3
          }
          setTimeout(() => {
            Router.push({
              name: 'privateChat',
              params: {
                queryData: data.message.chatRoom,
                otherOpenId: otherOpendId,
                roomType: roomType
              }
            })
          }, 600)
        }
        if (data.event === 'serviceChatTransmitNotify') {
          commit('serviceChatTransmitNotify', data)
        }
        if (data.event === 'privateServiceChat') {
          commit('privateServiceChat', data)
          // let sound = new Howl({
          //   src: [require('../assets/images/chatroom/message.mp3')]
          // })
          // if (state.chatRoom.musicSto) {
          //   if (state.chatRoom.musicSto.message) {
          //     sound.play()
          //   } else {
          //     sound.stop()
          //   }
          // } else {
          //   sound.play()
          // }
          data.message.times = {
            show: false,
            time: ''
          }
          if (data.message.attachment && (data.message.attachment.sender.type === -1 || data.message.attachment.receiver.type === -1)) {
            data.message.chatType = 1
            data.message.bussType = 3
            // 游客和客服的全部消息
            data.message.temporary = true
            if (!JSON.parse(sessionStorage.getItem(data.message.chatId))) {
              let temporary = []
              temporary.push(data.message)
              sessionStorage.setItem(data.message.chatId, JSON.stringify(temporary))
            } else {
              let temporary = JSON.parse(sessionStorage.getItem(data.message.chatId))
              temporary.push(data.message)
              sessionStorage.setItem(data.message.chatId, JSON.stringify(temporary))
            }
          }
          state.chatRoom.oneRoomData = data.message
          if (state.chatRoom.currentChatId !== data.message.chatId) {
            state.chatRoom.unreadMsgRed += 1
            // 会员和客服的未读
            if (data.message.bussType === 2 && (data.message.attachment.sender.type === 0 || data.message.attachment.sender.type === 3)) {
              let sto = Utils.Storage.get('hyUnread')
              let hyUnread = {}
              if (sto) {
                hyUnread = sto
                if (!hyUnread[state.chatRoom.init.message.member.openid]) {
                  hyUnread[state.chatRoom.init.message.member.openid] = []
                }
                hyUnread[state.chatRoom.init.message.member.openid].push(data.message.chatId)
              } else {
                hyUnread[state.chatRoom.init.message.member.openid] = []
                hyUnread[state.chatRoom.init.message.member.openid].push(data.message.chatId)
              }
              Utils.Storage.save('hyUnread', hyUnread)
            }
            if (data.message.attachment && (data.message.attachment.sender.type === -1 || data.message.attachment.receiver.type === -1)) {
              data.message.chatType = 1
              data.message.bussType = 3
              // 游客和客服的未读消息
              data.message.temporary = false
              let ykUnread = null
              if (JSON.parse(sessionStorage.getItem('ykUnread'))) {
                ykUnread = JSON.parse(sessionStorage.getItem('ykUnread'))
              } else {
                ykUnread = []
              }
              ykUnread.push(data.message)
              sessionStorage.setItem('ykUnread', JSON.stringify(ykUnread))
            }
          }
        }
        if (data.event === 'joinRoomNotify') {
          // state member msg
          // let { init } = state.chatRoom
          // let { member } = init.message
          // new member level
          // let { level } = data.message
          // if (member.level < level) {
          //   member.level = level
          // }
          commit('joinRoomNotify', data)
        }
        if (data.event === 'joinRoomNotallowedNotify') {
          commit('joinRoomNotallowedNotify', data)
        }
        if (data.event === 'privateChat') {
          commit('privateChat', data)
          data.message.times = {
            show: false,
            time: ''
          }
          console.log(data.message.attachment)
          // if (data.message.attachment.receiver.type === -1 || data.message.attachment.sender.type === -1) {
          //   data.message.bussType = 3
          // }
          if (data.message.attachment.receiver) {
            if (data.message.attachment.receiver.type === -1 || data.message.attachment.sender.type === -1) {
              data.message.bussType = 3
            }
          }
          if (data.message.attachment.receive) {
            if (data.message.attachment.receive.type === -1 || data.message.attachment.sender.type === -1) {
              data.message.bussType = 3
            }
          }
          // if (data.message.attachment.receive.type === -1 || data.message.attachment.sender.type === -1) {
          //   data.message.bussType = 3
          // }
          if (state.chatRoom.currentChatId !== data.message.chatId) {
            // let sound = new Howl({
            //   src: [require('../assets/images/chatroom/message.mp3')]
            // })
            // if (state.chatRoom.musicSto) {
            //   if (state.chatRoom.musicSto.message) {
            //     sound.play()
            //   } else {
            //     sound.stop()
            //   }
            // } else {
            //   sound.play()
            // }
            state.chatRoom.unreadMsgRed += 1
            let chatUnread = []
            if (data.message.attachment.receiver) {
              if (data.message.attachment && (data.message.attachment.receiver.type !== -1 && data.message.attachment.sender.type !== -1)) {
                let privateChatUnread = Utils.Storage.get('privateChatUnread')
                if (privateChatUnread) {
                  chatUnread = privateChatUnread
                  chatUnread.push(data.message.chatId)
                  Utils.Storage.save('privateChatUnread', chatUnread)
                } else {
                  chatUnread.push(data.message.chatId)
                  Utils.Storage.save('privateChatUnread', chatUnread)
                }
              }
            }
            if (data.message.attachment.receive) {
              if (data.message.attachment && (data.message.attachment.receive.type !== -1 && data.message.attachment.sender.type !== -1)) {
                let privateChatUnread = Utils.Storage.get('privateChatUnread')
                if (privateChatUnread) {
                  chatUnread = privateChatUnread
                  chatUnread.push(data.message.chatId)
                  Utils.Storage.save('privateChatUnread', chatUnread)
                } else {
                  chatUnread.push(data.message.chatId)
                  Utils.Storage.save('privateChatUnread', chatUnread)
                }
              }
            }
            if (data.message.bussType === 3) {
              // 管理员跟游客的聊天
              data.message.chatType = 1
              data.message.manager = true
              let manage = function (name) {
                let manager = {}
                if (JSON.parse(sessionStorage.getItem(name))) {
                  manager = JSON.parse(sessionStorage.getItem(name))
                  if (manager[data.message.chatId]) {
                    manager[data.message.chatId].push(data.message)
                  } else {
                    manager[data.message.chatId] = []
                    manager[data.message.chatId].push(data.message)
                  }
                } else {
                  manager[data.message.chatId] = []
                  manager[data.message.chatId].push(data.message)
                }
                sessionStorage.setItem(name, JSON.stringify(manager))
              }
              manage('manager')
              manage('managerUnread')
            }
          }
          if (state.chatRoom.init.message.member.type !== 3) {
            state.chatRoom.oneRoomData = data.message
          }
        }
        if (data.event === 'chatReceipt') {
          commit('chatReceipt', data)
          state.chatRoom.msgIsUnread = data.message
        }
        if (data.event === 'transferMessage') {
          commit('transferMessage', data)
        }
        if (data.event === 'transferReceipt') {
          commit('transferReceipt', data)
        }
        if (data.event === 'leaveRoomNotify') {
          commit('leaveRoomNotify', data)
        }
        if (data.event === 'deleteMessage') {
          commit('deleteMessage', data)
        }
        if (data.event === 'chatroomNoticeNotify') {
          commit('chatroomNoticeNotify', data)
        }
        if (data.event === 'removeFromRoomNotify') {
          commit('removeFromRoomNotify', data)
        }
        if (data.event === 'friendDeletedNotify') {
          commit('friendDeletedNotify', data)
        }
        if (data.event === 'releaseFromRoomNotify') {
          commit('releaseFromRoomNotify', data)
        }
        if (data.event === 'roomDeleteNotify') {
          commit('roomDeleteNotify', data)
        }
        if (data.event === 'friendDeletedNotify') {
          commit('friendDeletedNotify', data)
        }
      }
      state.chatRoom.ws.onerror = (evt) => {}
      // }
      // })
      // .catch(() => {})
    },
    friendopenid (context, data) {
      context.commit('friendopenid', data)
    },
    // 投注区
    SetLotteryId (context, data) {
      // state.Lottery.lotteryId = data
      context.commit('SetLotteryId', data)
    },
    LotteryPage (context, data) {
      // state.Lottery = data
      context.commit('LotteryPage', data)
    },
    LotteryDetail (context, data) {
      context.commit('LotteryDetail', data)
    },
    LotteryLayoutUpdate (context, data) {
      context.commit('LotteryLayoutUpdate', data)
    },
    ShareCodeUpdate (context, data) {
      context.commit('ShareCodeUpdate', data)
    },
    ColorSave (context, data) {
      context.commit('ColorSave', data)
    },
    dictSave (context, dict) {
      context.commit('dictSave', dict)
    },
    updateTitle (context, data) {
      context.commit('updateTitle', data)
    },
    updatePayments (context, data) {
      context.commit('updatePayments', data)
    },
    removePayments (context, data) {
      context.commit('removePayments', data)
    },
    updateAwardList (context, data) {
      context.commit('updateAwardList', data)
    },
    updateEites (context, data) {
      context.commit('updateEites', data)
    },
    changeEiteStatus (context, data) {
      context.commit('changeEiteStatus', data)
    },
    async refreshUserInfo ({
      commit
    }) {
      const res = await userInfoApi()
      if (res.data) {
        commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {
    global: global,
    football: football,
    game: game,
    mine: mine,
    agency: agency,
    active: active,
    amount: amount,
    variety: variety
    // voice: voice
  }
})

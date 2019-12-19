<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-16 22:44:59
 * @LastEditors: Please set LastEditors
 -->
<template>
    <section>
        <!--我的消息列表-->
        <ul class="fw box">
            <li
              class="rankingInfo-list pr"
              ref="rankingInfoList"
              v-for="(item, index) in message"
              :key="index"
              @touchstart="scrollStart($event, index)"
              @touchmove="scrollMove($event, item)"
              @touchend="scrollEnd"
            >
                <section v-if="item.chatType !== 2" @click="goPrivateChat(item, index)">
                    <!-- bussType 业务类型 1 普通聊天  2 客服聊天 此处传入1 -->
                    <!-- type // TEXT_MESSAGE = 0, IMAGE_MESSAGE = 1, VOICE_MESSAGE = 3 -->
                    <template v-if="item.bussType !== 3">
                        <template v-if="init.message.member.type !== 3">
                            <img v-if="item.bussType !== 2 && item.infos && item.infos.type !== 3"
                                :src="!item.infos || !item.infos.headImg || item.infos.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.infos.headImg" class="rankingInfo-headIm dInV">
                            <img v-if="item.bussType === 2" src="../../../assets/images/chatroom/chat_service.png" class="rankingInfo-headIm dInV">
                            <!--&& item.infos && item.infos.type === 3-->
                            <div class="dInV rankingInfo-list-names">
                                <span class="rankingInfo-list-name">
                                {{item.bussType === 2 ? '客服' : item.infos.nickname}}
                                </span>
                                <p class="wzfw rankingInfo-list-content">{{item.type === 3 ? '[图片]' : item.content}}</p>
                            </div>
                        </template>
                        <template v-if="init.message.member.type === 3">
                            <img
                              :src="!item.infos || !item.infos.headImg || item.infos.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.infos.headImg"
                              class="rankingInfo-headIm dInV">
                            <div class="dInV rankingInfo-list-names">
                                <span class="rankingInfo-list-name">
                                {{item.infos.nickname}}
                                </span>
                                <p class="wzfw rankingInfo-list-content">{{item.type === 3 ? '[图片]' : item.content}}</p>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="init.message.member.type > 0">
                            <img src="../../../assets/images/chatroom/yiming.png" class="rankingInfo-headIm dInV">
                            <div class="dInV rankingInfo-list-names">
                                <span class="rankingInfo-list-name">{{ openid==item.attachment.receiver.openid?item.attachment.sender.nickname:item.attachment.receiver.nickname}}</span>
                                <p class="wzfw rankingInfo-list-content">{{item.content}}</p>
                            </div>
                        </template>
                        <template v-else>
                            <template v-if="item.manager && item.attachment">
                              <!-- {{item.attachment.receiver}} -->
                                <template v-if="item.attachment.receiver.type > 0">
                                    <img
                                      :src="!item.attachment.receiver.headImg || item.attachment.receiver.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.attachment.receiver.headImg"
                                      class="rankingInfo-headIm dInV">
                                    <div class="dInV rankingInfo-list-names">
                                        <span class="rankingInfo-list-name">{{item.attachment.receiver.nickname}}</span>
                                        <p class="wzfw rankingInfo-list-content">{{item.content}}</p>
                                    </div>
                                </template>
                              <!-- {{item.attachment.sender}} -->
                                <template v-if="item.attachment.sender.type > 0">
                                    <img
                                      :src="!item.attachment.sender.headImg || item.attachment.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.attachment.sender.headImg"
                                      class="rankingInfo-headIm dInV">
                                    <div class="dInV rankingInfo-list-names">
                                        <span class="rankingInfo-list-name">{{item.attachment.sender.nickname}}</span>
                                        <p class="wzfw rankingInfo-list-content">{{item.content}}</p>
                                    </div>
                                </template>
                            </template>
                            <template v-else>
                                <img src="../../../assets/images/chatroom/chat_service.png" class="rankingInfo-headIm dInV">
                                <div class="dInV rankingInfo-list-names">
                                    <span class="rankingInfo-list-name">客服</span>
                                    <p class="wzfw rankingInfo-list-content">{{item.content}}</p>
                                </div>
                            </template>
                        </template>
                    </template>
                </section>
                <section v-if="item.chatType === 2" @click="goRoomChat(item)">
                    <img :src="item.icon" class="rankingInfo-headIm dInV">
                    <div class="dInV rankingInfo-list-names">
                        <span class="rankingInfo-list-name" :class="{c333: item.chatType === 2}">
                            {{item.name}}
                        </span>
                        <p class="wzfw rankingInfo-list-content">{{item.content}}</p>
                    </div>
                </section>
                <span v-if="item.flag" :style="{right: slider.right + 'px'}" class="rankingInfo-delect tc" @click="delectList(item, index)">删除</span>
                <span class="rankingInfo-time">{{getDayName(item.timestamp)}}</span>
                <span class="rankingInfo-ren" v-if="item.unreadMsgCount > 0">{{item.unreadMsgCount>99?'99+':item.unreadMsgCount}}</span>
            </li>
            <li v-if="message.length <= 0" class="rankingInfo-list rankingInfo-list-no">
              <img src="../../../assets/images/chatroom/noData.png" class="noDatas">
                暂无消息
            </li>
        </ul>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  name: 'moreMessage',
  data () {
    return {
      room: false,
      privateChatType: '', // 私聊类型
      shareBettingMoney: this.Utils.Storage.get('shareBettingMoney'),
      lotteryArr: this.Utils.Storage.get('lotteryArr'),
      message: [],
      queryData: {},
      privateChatShow: false,
      otherInfo: null,
      params: {
        offset: 0,
        count: 20
      },
      openId: {
        thisOpenId: '',
        other: ''
      },
      unreadMsg: [],
      newNnreadMsg: [],
      newUnreadMsgleng: [],
      isShowRed: false,
      unreadMsgCount: 0, // 未读消息数
      roomId: '', // 私聊窗口id
      roomName: '', // 私聊好友name
      joinChatRoom: false,
      istemporary: false,
      slider: {
        flag: false,
        top: 0,
        start: 0,
        end: 0,
        dis: 0,
        right: 0
      }, // 滑动开关
      roomIconId: []
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      },
      friendDeletedNotify (state) {
        return state.chatRoom.friendDeletedNotify
      }
    }),
    openid () {
      return this.$store.state['chatRoom']['init']['message']['member']['openid']
    }// 定义opid
  },
  watch: {
    // 6.9 xioayu ：解决消息界面消息没有实时显示
    '$store.state.chatRoom.unreadMsgRed': function (old, newVal) {
      this.newMsg()
    },
    // 监听是否被删除好友 重新渲染
    '$store.state.chatRoom.friendDeletedNotify': function (old, newVal) {
      let deleFriend = this.chatRoom.friendDeletedNotify
      let prChat = this.Utils.Storage.get('privateChatUnread')
      let list = []
      let count = 0
      for (let i = 0; i < prChat.length; i++) {
        if (deleFriend.message.chatId === prChat[i]) {
          ++count
          list = prChat.splice(i, 1)
        }
      }
      this.chatRoom.unreadMsgRed = this.chatRoom.unreadMsgRed - count - 1
      localStorage.setItem('privateChatUnread', list)
      this.newMsg()
      window.location.reload()
    }
  },
  created () {
    // this.$store.commit('resetUnreadMsg')
    let _this = this
    _this.openId.thisOpenId = _this.init.message.member.openid
    if (_this.init.message.member.type === -1) {
      // 游客 和 客服 的聊天缓存
      let chatId = []
      for (let key in sessionStorage) {
        if (typeof sessionStorage[key] === 'string' && typeof JSON.parse(sessionStorage[key])) {
          if (JSON.parse(sessionStorage[key])[0] && JSON.parse(sessionStorage[key])[0].temporary) {
            for (let i = 0; i < JSON.parse(sessionStorage[key]).length; i++) {
              chatId.push(JSON.parse(sessionStorage[key])[i])
            }
          }
        }
      }
      chatId.sort((a, b) => {
        return a.timestamp - b.timestamp
      })
      if (chatId.length > 0) {
        chatId[chatId.length - 1].flag = false
        this.message.push(chatId[chatId.length - 1])
      }
      let message = this.message
      let messageLeng = message.length
      for (let i = 0; i < messageLeng; i++) {
        message[i].unreadMsgCount = 0
      }
      let ykUnread = JSON.parse(sessionStorage.getItem('ykUnread'))
      if (ykUnread) {
        let ykUnreadLeng = ykUnread.length
        for (let i = 0; i < ykUnreadLeng; i++) {
          for (let j = 0; j < messageLeng; j++) {
            if (ykUnread[i].chatId === message[j].chatId) {
              message[j].unreadMsgCount += 1
            }
          }
        }
      }
      // 游客 和 管理 的聊天缓存
      let manager = JSON.parse(sessionStorage.getItem('manager'))
      let managerUnread = JSON.parse(sessionStorage.getItem('managerUnread'))
      if (manager) {
        for (let key in manager) {
          let managerNow = manager[key][manager[key].length - 1]
          if (managerUnread) {
            for (let unreadKey in managerUnread) {
              if (managerNow.chatId === unreadKey) {
                managerNow.unreadMsgCount = managerUnread[unreadKey].length
              }
            }
          }
          managerNow.flag = false
          this.message.push(managerNow)
          _this.istemporary = true
        }
      }
    } else {
      // 获取对话信息列表
      _this.axios.post('/cpi/record/history/dialogue_list/' + _this.chatRoom.flag + '?offset=' + _this.params.offset + '&count=' + _this.params.count)
        .then((res) => {
          if (res.code === 0) {
            let resData = res.data
            let otherOpenId = []
            let resDataLeng = resData.length
            let friends = _this.init.message.friends
            this.message = []
            if (friends) {
              resData.forEach(e => {
                const { chatType, receiver, sender, bussType } = e
                if (chatType === 1 && receiver !== 'service' && sender !== 'service') {
                  friends.forEach(f => {
                    const { openid } = f
                    if (receiver === openid || sender === openid) {
                      e.infos = f
                    }
                    if (_this.init.message.member.type === 3) {
                      _this.message.push(e)
                    }
                  })

                  if (bussType === 2 && _this.init.message.member.type !== 3) {
                    e.infos = {
                      type: 3
                    }
                  }
                }
              })

              // let friendsLeng = friends.length
              // for (let i = 0; i < resDataLeng; i++) {
              //   if (resData[i].chatType === 1 && resData[i].receiver !== 'service' && resData[i].sender !== 'service') {
              //     for (let j = 0; j < friendsLeng; j++) {
              //       if (resData[i].receiver === friends[j].openid || resData[i].sender === friends[j].openid) {
              //         resData[i].infos = friends[j]
              //         if (_this.init.message.member.type === 3) {
              //           _this.message.push(resData[i])
              //         }
              //       }
              //     }
              //     if (resData[i].bussType === 2 && _this.init.message.member.type !== 3) {
              //       resData[i].infos = {}
              //       resData[i].infos.type = 3
              //     }
              //   }
              // }
            }
            for (let i = 0; i < resDataLeng; i++) {
              if (resData[i].chatType === 1 && resData[i].receiver !== 'service' && resData[i].sender !== 'service' && !resData[i].infos) {
                if (_this.openId.thisOpenId === resData[i].receiver) {
                  otherOpenId.push(resData[i].sender)
                } else {
                  otherOpenId.push(resData[i].receiver)
                }
              } else if (resData[i].chatType === 2) {
                this.roomIconId = true
              }
            }
            let otherLeng = otherOpenId.length
            for (let i = 0; i < otherLeng; i++) {
              _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + otherOpenId[i])
                .then((re) => {
                  // if (re.code === 1404) {
                  //   for (let j = 0; j < resData.length; j++) {
                  //     if (otherOpenId[i] === resData[j].sender || otherOpenId[i] === resData[j].receiver) {
                  //       resData[j].bussType = 3
                  //       resData[j].unreadMsgCount = 0
                  //     }
                  //   }
                  // } else
                  if (re.code === 0) {
                    for (let j = 0; j < resData.length; j++) {
                      if (otherOpenId[i] === resData[j].sender || otherOpenId[i] === resData[j].receiver) {
                        resData[j].infos = re.data.member
                        resData[j].unreadMsgCount = 0
                        _this.message.push(resData[j])
                      }
                    }
                  }
                })
                .catch(() => {})
            }
            setTimeout(() => {
              let bus2 = []
              let chatType2 = []
              for (let i = 0; i < resDataLeng; i++) {
                resData[i].flag = false
                if (resData[i].infos && resData[i].infos.type !== 3 && _this.init.message.member.type !== 3) {
                  if (!this.message.some(e => e.chatId === resData[i].chatId)) {
                    _this.message.push(resData[i])
                  }
                } else if (resData[i].chatType === 2) {
                  let rooms = _this.init.message.chatRooms
                  let roomsLeng = rooms.length
                  for (let j = 0; j < roomsLeng; j++) {
                    if (resData[i].roomId === rooms[j].roomId) {
                      resData[i].name = rooms[j].name
                      chatType2.push(resData[i])
                    }
                  }
                } else if (resData[i].infos) {
                  bus2.push(resData[i])
                }
              }
              if (chatType2.length > 0) {
                // 我的消息列表渲染
                _this.axios.get('/cpi/room/list/' + _this.chatRoom.flag)
                  .then(res => {
                    if (res.code === 0) {
                      let data = res.data
                      let dataLeng = data.length
                      for (let i = 0; i < resDataLeng; i++) {
                        if (resData[i].chatType === 2) {
                          for (let j = 0; j < dataLeng; j++) {
                            if (resData[i].roomId === data[j].roomId) {
                              if (this.lotteryArr) {
                                let lotteryArrLeng = this.lotteryArr.length
                                for (let k = 0; k < lotteryArrLeng; k++) {
                                  if (data[j].flag && data[j].flag !== 'lobby' && data[j].flag === this.lotteryArr[k].flag) {
                                    // 我的消息的icon赋值
                                    // resData[i].icon = this.lotteryArr[k].URL
                                    resData[i].icon = data[j].cover || this.lotteryArr[k].URL
                                  } else if (!data[j].flag || data[j].flag === 'lobby') {
                                    resData[i].icon = require('../../../assets/images/chatroom/chatroom.png')
                                  }
                                }
                              }
                            }
                          }
                          _this.message.push(resData[i])
                          _this.message.sort((a, b) => b.timestamp - a.timestamp)
                        }
                      }
                    }
                  })
              }
              if (bus2.length > 0) {
                _this.message.push(bus2[0])
              }
              // 游客和客服的消息和未读
              let message = _this.message
              let messageLeng = message.length
              for (let i = 0; i < messageLeng; i++) {
                message[i].unreadMsgCount = 0
              }
              // if (_this.init.message.member.type === 3) {
              //   for (let key in sessionStorage) {
              //     if (typeof sessionStorage[key] === 'string' && typeof JSON.parse(sessionStorage[key])) {
              //       if (JSON.parse(sessionStorage[key])[0] && JSON.parse(sessionStorage[key])[0].temporary) {
              //         let data = JSON.parse(sessionStorage[key])[JSON.parse(sessionStorage[key]).length - 1]
              //         data.flag = false
              //         if (data.attachment.receiver.type === -1) {
              //           data.infos = data.attachment.receiver
              //         } else if (data.attachment.sender.type === -1) {
              //           data.infos = data.attachment.sender
              //         }
              //         this.message.unshift(data)
              //         this.message[0].unreadMsgCount = 0
              //       }
              //     }
              //   }
              //   let ykUnread = JSON.parse(sessionStorage.getItem('ykUnread'))
              //   if (ykUnread) {
              //     let ykUnreadLeng = ykUnread.length
              //     for (let i = 0; i < ykUnreadLeng; i++) {
              //       for (let j = 0; j < messageLeng; j++) {
              //         if (ykUnread[i].chatId === message[j].chatId) {
              //           message[j].unreadMsgCount += 1
              //         }
              //       }
              //     }
              //   }
              // }
              // 处理 游客和客服的消息和未读 end
              // 会员和客服的未读
              // let sto = this.Utils.Storage.get('hyUnread')
              // if (sto) {
              //   // let stoleng = sto.length
              //   for (let key in sto) {
              //     if (key === _this.openId.thisOpenId) {
              //       let stoLeng = sto[key].length
              //       for (let j = 0; j < stoLeng; j++) {
              //         for (let k = 0; k < message.length; k++) {
              //           if (sto[key][j] === message[k].chatId) {
              //             message[k].unreadMsgCount += 1
              //           }
              //         }
              //       }
              //     }
              //   }
              // }
              // 会员和客服的未读 end
              // 游客和管理的未读
              // if ((_this.init.message.member.type > 0 && _this.init.message.member.type !== 3) || _this.init.message.member.type === -1) {
              if (_this.init.message.member.type !== 0 && _this.init.message.member.type !== 3) {
                let manager = JSON.parse(sessionStorage.getItem('manager'))
                if (manager) {
                  for (let key in manager) {
                    let ykList = manager[key][manager[key].length - 1]
                    ykList.unreadMsgCount = 0
                    ykList.flag = false
                    this.message.unshift(ykList)
                  }
                }
                let managerUnread = JSON.parse(sessionStorage.getItem('managerUnread'))
                let managerMsgLeng = message.length
                if (managerUnread) {
                  for (let key in managerUnread) {
                    for (let j = 0; j < managerMsgLeng; j++) {
                      if (key === message[j].chatId) {
                        message[j].unreadMsgCount += managerUnread[key].length
                      }
                    }
                  }
                }
              }
              // 管理和会员的初始化条数
              if (_this.init.message.member.type > -1 && _this.init.message.member.type !== 3) {
                let notRead = _this.init.message
                if (notRead.notReadSummaryList) {
                  message.forEach((item, index) => {
                    if (item.chatType === 1) {
                      notRead.notReadSummaryList.forEach((val, mark) => {
                        if (item.chatId === val.chatId) {
                          item.unreadMsgCount += val.count
                        }
                      })
                    }
                  })
                }
                // 管理和会员的未读条数
                if (_this.init.message.member.type !== -1 && _this.init.message.member.type !== 3) {
                  let privateChatUnread = this.Utils.Storage.get('privateChatUnread')
                  if (privateChatUnread) {
                    privateChatUnread.map((item) => {
                      message.map((el) => {
                        if (item === el.chatId) {
                          el.unreadMsgCount++
                        }
                      })
                    })
                  }
                }
              }
              _this.message.sort((a, b) => {
                return b.timestamp - a.timestamp
              })
            })
          }
        })
        .catch(() => {})
    }
  },
  methods: {
    newMsg () {
      // 获取对话信息列表
      let _this = this
      _this.axios.post('/cpi/record/history/dialogue_list/' + _this.chatRoom.flag + '?offset=' + _this.params.offset + '&count=' + _this.params.count)
        .then((res) => {
          if (res.code === 0) {
            let resData = res.data
            let otherOpenId = []
            let resDataLeng = resData.length
            let friends = _this.init.message.friends
            this.message = []
            if (friends) {
              resData.forEach(e => {
                const { chatType, receiver, sender, bussType } = e
                if (chatType === 1 && receiver !== 'service' && sender !== 'service') {
                  friends.forEach(f => {
                    const { openid } = f
                    if (receiver === openid || sender === openid) {
                      e.infos = f
                    }
                    if (_this.init.message.member.type === 3) {
                      _this.message.push(e)
                    }
                  })

                  if (bussType === 2 && _this.init.message.member.type !== 3) {
                    e.infos = {
                      type: 3
                    }
                  }
                }
              })
            }
            for (let i = 0; i < resDataLeng; i++) {
              if (resData[i].chatType === 1 && resData[i].receiver !== 'service' && resData[i].sender !== 'service' && !resData[i].infos) {
                if (_this.openId.thisOpenId === resData[i].receiver) {
                  otherOpenId.push(resData[i].sender)
                } else {
                  otherOpenId.push(resData[i].receiver)
                }
              } else if (resData[i].chatType === 2) {
                this.roomIconId = true
              }
            }
            let otherLeng = otherOpenId.length
            for (let i = 0; i < otherLeng; i++) {
              _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + otherOpenId[i])
                .then((re) => {
                  if (re.code === 0) {
                    for (let j = 0; j < resData.length; j++) {
                      if (otherOpenId[i] === resData[j].sender || otherOpenId[i] === resData[j].receiver) {
                        resData[j].infos = re.data.member
                        resData[j].unreadMsgCount = 0
                        _this.message.push(resData[j])
                      }
                    }
                  }
                })
                .catch(() => {})
            }
            setTimeout(() => {
              let bus2 = []
              let chatType2 = []
              for (let i = 0; i < resDataLeng; i++) {
                resData[i].flag = false
                if (resData[i].infos && resData[i].infos.type !== 3 && _this.init.message.member.type !== 3) {
                  if (!this.message.some(e => e.chatId === resData[i].chatId)) {
                    _this.message.push(resData[i])
                  }
                } else if (resData[i].chatType === 2) {
                  let rooms = _this.init.message.chatRooms
                  let roomsLeng = rooms.length
                  for (let j = 0; j < roomsLeng; j++) {
                    if (resData[i].roomId === rooms[j].roomId) {
                      resData[i].name = rooms[j].name
                      chatType2.push(resData[i])
                    }
                  }
                } else if (resData[i].infos) {
                  bus2.push(resData[i])
                }
              }
              if (chatType2.length > 0) {
                _this.axios.get('/cpi/room/list/' + _this.chatRoom.flag)
                  .then(res => {
                    if (res.code === 0) {
                      let data = res.data
                      let dataLeng = data.length
                      for (let i = 0; i < resDataLeng; i++) {
                        if (resData[i].chatType === 2) {
                          for (let j = 0; j < dataLeng; j++) {
                            if (resData[i].roomId === data[j].roomId) {
                              if (this.lotteryArr) {
                                let lotteryArrLeng = this.lotteryArr.length
                                for (let k = 0; k < lotteryArrLeng; k++) {
                                  if (data[j].flag && data[j].flag !== 'lobby' && data[j].flag === this.lotteryArr[k].flag) {
                                    // 我的消息的icon赋值
                                    // resData[i].icon = this.lotteryArr[k].URL
                                    resData[i].icon = data[j].cover || this.lotteryArr[k].URL
                                  } else if (!data[j].flag || data[j].flag === 'lobby') {
                                    resData[i].icon = require('../../../assets/images/chatroom/chatroom.png')
                                  }
                                }
                              }
                            }
                          }
                          _this.message.push(resData[i])
                          _this.message.sort((a, b) => b.timestamp - a.timestamp)
                        }
                      }
                    }
                  })
              }
              if (bus2.length > 0) {
                _this.message.push(bus2[0])
              }
              // 游客和客服的消息和未读
              let message = _this.message
              let messageLeng = message.length
              for (let i = 0; i < messageLeng; i++) {
                message[i].unreadMsgCount = 0
              }
              // 处理 游客和客服的消息和未读 end
              // 游客和管理的未读
              // if ((_this.init.message.member.type > 0 && _this.init.message.member.type !== 3) || _this.init.message.member.type === -1) {
              if (_this.init.message.member.type !== 0 && _this.init.message.member.type !== 3) {
                let manager = JSON.parse(sessionStorage.getItem('manager'))
                if (manager) {
                  for (let key in manager) {
                    let ykList = manager[key][manager[key].length - 1]
                    ykList.unreadMsgCount = 0
                    ykList.flag = false
                    this.message.unshift(ykList)
                  }
                }
                let managerUnread = JSON.parse(sessionStorage.getItem('managerUnread'))
                let managerMsgLeng = message.length
                if (managerUnread) {
                  for (let key in managerUnread) {
                    for (let j = 0; j < managerMsgLeng; j++) {
                      if (key === message[j].chatId) {
                        message[j].unreadMsgCount += managerUnread[key].length
                      }
                    }
                  }
                }
              }
              // 管理和会员的初始化条数
              if (_this.init.message.member.type > -1 && _this.init.message.member.type !== 3) {
                let notRead = _this.init.message
                if (notRead.notReadSummaryList) {
                  message.forEach((item, index) => {
                    console.log(item, index)
                    if (item.chatType === 1) {
                      notRead.notReadSummaryList.forEach((val, mark) => {
                        if (item.chatId === val.chatId) {
                          item.unreadMsgCount += val.count
                        }
                      })
                    }
                  })
                }
                // 管理和会员的未读条数
                if (_this.init.message.member.type !== -1 && _this.init.message.member.type !== 3) {
                  let privateChatUnread = this.Utils.Storage.get('privateChatUnread')
                  // privateChatUnread.map((item) => {
                  //   message.map((el) => {
                  //     if (item === el.chatId) {
                  //       el.unreadMsgCount++
                  //     }
                  //   })
                  // })
                  Array.prototype.forEach.call(privateChatUnread, (item) => {
                    message.map((el) => {
                      if (item === el.chatId) {
                        el.unreadMsgCount++
                      }
                    })
                  })
                }
              }
              _this.message.sort((a, b) => {
                return b.timestamp - a.timestamp
              })
            })
          }
        })
        .catch(() => {})
    },
    scrollStart (e, index) {
      // let obj = this.$refs.rankingInfoList[index].getElementsByClassName('rankingInfo-delect')[0]
      // this.slider.dis = this.$refs.rankingInfoList[0].offsetWidth - 85
      this.slider.start = e.touches[0].pageX
    },
    scrollMove (e, item) {
      this.slider.end = e.touches[0].pageX
      let disX = this.slider.start - this.slider.end
      if (this.slider.end <= this.slider.start && disX > 30) {
        item.flag = true
        // if (this.slider.right <= -1) {
        //   this.slider.right = disX + -85
        // }
      } else if (this.slider.end > this.slider.start && this.slider.end - this.slider.start > 30) {
        item.flag = false
        // this.slider.right = disX
      }
    },
    scrollEnd () {
    },
    delectList (item, index) {
      this.axios.get('/cpi/record/history/delete/' + this.chatRoom.flag + '?chatId=' + item.chatId)
        .then((res) => {
          let privateChatUnread = this.Utils.Storage.get('privateChatUnread')
          let arr = Array.from(privateChatUnread)
          let list = []
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item.chatId) {
              list = arr.splice(i, 1)
            }
          }
          localStorage.setItem('privateChatUnread', list)
          if (res.code === 0) {
            this.$toast({
              message: '删除成功',
              position: 'middle',
              duration: 1000
            })
            this.message.splice(index, 1)
          } else {
            this.$toast({
              message: res.msg,
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(() => {
        })
    },
    leaveChatRoom () {
      let _this = this
      _this.joinChatRoom = false
      _this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + _this.roomId + "'}")
      this.chatRoom.roomNmae = ''
    },
    goRoomChat (item) {
      let _this = this
      _this.roomId = item.roomId
      _this.roomName = item.name
      _this.axios.get('/cpi/room/list/' + _this.chatRoom.flag)
        .then((res) => {
          if (res.code === 0) {
            if (item.roomId === this.init.message.chatRooms[0].roomId) {
              _this.chatRoom.roomNmae = item.roomId
              this.chatRoom.roomTitleActive = 0
            } else {
              let json = {}
              if (this.shareBettingMoney) {
                json = this.shareBettingMoney
              }
              json.currentRoom = {}
              if (this.lotteryArr) {
                let lotteryArrLeng = this.lotteryArr.length
                for (let i = 0; i < lotteryArrLeng; i++) {
                  if (item.flag === this.lotteryArr[i].flag) {
                    json.currentRoom = this.lotteryArr[i]
                  }
                }
              }
              json.currentRoom.roomName = item.name
              json.currentRoom.flag = item.flag
              json.currentRoom.roomId = item.roomId
              this.Utils.Storage.save('shareBettingMoney', json)
              _this.$router.push({
                name: 'moreRoom',
                params: {
                  roomName: item.name,
                  flag: item.flag,
                  name: json.currentRoom.name,
                  lotteryId: json.currentRoom.lotteryId,
                  roomId: item.roomId
                }
              })
            }
          }
        })
        .catch(() => {})
    },
    // 显示聊天时间
    getDayName (d) {
      let td = new Date()
      td = new Date(td.getFullYear(), td.getMonth(), td.getDate())
      let od = new Date(d)
      od = new Date(od.getFullYear(), od.getMonth(), od.getDate())
      let hours = new Date(d).getHours()
      let minutes = new Date(d).getMinutes()
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      let xc = (od - td) / 1000 / 60 / 60 / 24
      if (xc < -2) {
        return -xc + '天前' + ' ' + hours + ':' + minutes
      } else if (xc < -1) {
        return '前天' + ' ' + hours + ':' + minutes
      } else if (xc < 0) {
        return '昨天' + ' ' + hours + ':' + minutes
      } else if (xc === 0) {
        return '今天' + ' ' + hours + ':' + minutes
      }
    },
    closeOneChat (val, infos) {
      let _this = this
      _this.privateChatShow = false
      _this.newUnreadMsgleng = _this.newUnreadMsgleng - val
      _this.isShowRed = !_this.isShowRed
      let message = _this.message
      let messageLeng = _this.message.length
      if (infos) {
        for (let i = 0; i < messageLeng; i++) {
          if (message[i].chatId === infos.chatId) {
            message[i].content = infos.content
            // message[i].unreadMsgCount += 1
            // this.$store.state.chatRoom.unreadMsgRed += 1
          }
        }
      }
    },
    goPrivateChat (item) {
      console.log(item, this.$store.state['chatRoom']['init']['message']['member']['openid'])
      let _this = this
      if (item.sender === this.openid) {
        this.$store.commit('friendopenid', item.receiver)
      } else {
        this.$store.commit('friendopenid', item.sender)
      }
      let otherInfo = {}
      if (_this.openId.thisOpenId === item.receiver) {
        _this.openId.other = item.sender
        if (item.attachment) {
          otherInfo = item.attachment.sender
        }
      } else {
        _this.openId.other = item.receiver
        if (item.attachment) {
          otherInfo = item.attachment.receiver
        }
      }
      _this.chatRoom.currentChatId = item.chatId
      // if (_this.init.message.member.type === 0) {
      //   // 存客服和会员的最后一条对比时间
      //   if (item.chatType === 1) {
      //     let afterServier = this.Utils.Storage.get('afterServier')
      //     let json = {}
      //     if (afterServier) {
      //       json = afterServier
      //     }
      //     json[_this.openId.thisOpenId] = {}
      //     json[_this.openId.thisOpenId].chatId = item.chatId
      //     json[_this.openId.thisOpenId].receiver = item.receiver
      //     json[_this.openId.thisOpenId].sender = item.sender
      //     json[_this.openId.thisOpenId].timestamp = item.timestamp
      //     this.Utils.Storage.save('afterServier', json)
      //   }
      //   // 存客服和会员的最后一条对比时间 end
      //   if (item.infos && item.infos.type === 3) {
      //     _this.privateChatType = 'service'
      //   }
      // }
      if (_this.init.message.member.type === -1) {
        if ((otherInfo.type === 3 || item.temporary) && item.bussType === 3) {
          _this.privateChatType = 'temporary'
        }
      }
      if (_this.init.message.member.type === 3) {
        if (item.attachment && item.attachment.sender && (item.attachment.sender.type === -1 || item.attachment.sender.type === 3) && item.bussType === 3) {
          _this.privateChatType = 'temporary'
        }
        if (item.bussType === 3) {
          _this.privateChatType = 'temporary'
        }
        if (item.infos && item.infos.type === 0) {
          _this.privateChatType = 'service'
        }
        if (item.bussType === 2) {
          _this.privateChatType = 'service'
        }
      }
      _this.chatRoom.unreadMsgRed -= item.unreadMsgCount
      let notReadSummaryList = _this.init.message.notReadSummaryList
      if (notReadSummaryList) {
        let notReadSummaryListLeng = notReadSummaryList.length
        if (notReadSummaryListLeng > 0) {
          for (let i = 0; i < notReadSummaryListLeng; i++) {
            if (item.chatId === notReadSummaryList[i].chatId) {
              notReadSummaryList.splice(i, 1)
            }
          }
        }
      }
      // let sto = this.Utils.Storage.get('hyUnread')
      // if (sto) {
      //   for (let key in sto) {
      //     if (key === _this.openId.thisOpenId) {
      //       let stoLeng = sto[key].length
      //       for (let j = 0; j < stoLeng; j++) {
      //         if (item.chatId === sto[key][j]) {
      //           sto[key].splice(j, 1)
      //           j -= 1
      //           this.Utils.Storage.save('hyUnread', sto)
      //         }
      //       }
      //     }
      //   }
      // }
      item.unreadMsgCount = 0
      _this.queryData = item
      let requestData = {
        'event': 'requestPrivateChat',
        'data': {
          'sender': _this.init.message.member.openid,
          'receiver': _this.openId.other
        }
      }
      _this.chatRoom.ws.send(JSON.stringify(requestData))
      _this.$router.push({
        name: 'privateChat',
        params: {
          queryData: _this.queryData,
          roomType: _this.privateChatType
        }
      })
      _this.isShowRed = !_this.isShowRed
    }
  }
}
</script>

<style scoped>
    .box{margin-top:calc(1.125rem + 85px + .6rem);}
    .rankingInfo-headIm{position:relative;margin:0 .4rem;width:1.3rem;height:1.3rem;}
    .rankingInfo-list{font-size:0;line-height:1.6rem;border-bottom:1px solid #CCCCCC;color:#999999;}
    .rankingInfo-list-names{line-height:.6rem;font-size:.35rem;max-width:63%;}
    .rankingInfo-list-name{font-size:.35rem;color:#FF6500;}
    .rankingInfo-list-content{max-width:5.8rem;color:#666;}
    .rankingInfo-time{position:absolute;right:.3rem;top:0;font-size:.35rem;color:#666;}
    .rankingInfo-list-no{font-size: .35rem;text-align: center;border-bottom: none;color:#333;}
    .rankingInfo-list .rankingInfo-ren {
        text-align:center;
        position: absolute;
        left: 1.4rem;
        top: 0.2rem;
        z-index: 2;
        width: .5rem;
        height: .5rem;
        background: #FF0000;
        border-radius: 50%;
        font-size: .25rem;
        line-height:.5rem;
        color:#fff;
    }
    .lottery-head{position:fixed;top:0;z-index:201;height:1.125rem;width:100%;background:#D81E06;font-size:.2rem;color:#fff;}
    .mint-button-icon{position:relative;z-index:2;width:12%;text-align:center;}
    .mintui-back{font-size:20px;line-height:1.125rem;}
    .play-center{position:absolute;left:0;top:0;line-height:1.125rem;width:100%;text-align:center;font-size:.35rem;}
    .body{height: 100%;position: fixed;top:0;width: 100%;max-width:780px;background: #F5F4F9;z-index: 299;}
    .rankingInfo-delect{position:absolute;z-index:2;top:0;width:2.5rem;height:100%;background:#D81E06;font-size: .4rem;color: #fff;}
    .notice{position:fixed;top:1.125rem;width:100%;z-index:199;}
</style>

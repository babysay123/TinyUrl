<template>
    <section class="banned-list">
        <ul
          class="fw box"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="infinite"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="true"
        >
            <li
              class="rankingInfo-list pr"
              :class="{active: item.share}"
              v-for="(item, index) in message"
              :key="index"
              @click="openLookData(item)"
              v-if="init.message.member.openid !== item.openid"
            >
              <section v-if="share && init.message.member.type !== -1" class="checked dInV">
              <!--{{item.checked ? '√' : ''}}-->
            </section>
              <img
                :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg"
                :style="{'margin-left':share && init.message.member.type !== -1 ? '1rem' : '.4rem'}"
                class="rankingInfo-headIm dInV">
              <img
                :src='chatRoom.headImg[item.level ? item.level : 1]'
                class="room-grade room-bottom-lookData-grade"
              >
                <span class="rankingInfo-list-name wzfw dInV limit-w">
                  {{item.nickname}}
                  <span class="mark-gap">{{item.markName ? `(${item.markName})` : ''}}</span>
                </span>
                <span v-if="item.fail" class="fail">发送失败</span>
                <span
                class="rankingInfo-ren"
                v-if="
                type !== 'friendList' &&
                share === false &&
                type !== 'attentionList'"
                @click.stop="delectBanned(item, index)">解除</span>
                <a
                class="rank-remark"
                v-if="
                type === 'friendList' &&
                share === false &&
                init.message.member.type > 0"
                @click.stop="remarkClick(item, index)"
                >{{item.markName ? '修改备注' : '备注'}}</a>
            </li>
            <li class="rankingInfo-list2 tc" v-if="message.length === 0" style="font-size:.35rem;font-weight:bold;">
              <img src="../../../assets/images/chatroom/noData.png" class="noDatas">
                暂无数据
            </li>
            <li class="rankingInfo-list2 tc" v-else-if="isAll" style="line-height:1rem;font-size:.35rem;font-weight:bold;">
                已经全部加载完毕
            </li>
        </ul>
        <LookInformation v-if="lookInformation" :lookData="lookData" @openLookClose="openLookClose" @delectFriend="delectFriend" class="body"></LookInformation>
        <!-- 提示 是否清空数组 -->
        <mt-popup
          :class="'mt-nobg'"
          position="right"
          v-model="popupTips"
        >
          <!-- popup-transition="popup-fade" -->
          <section class="popup-page bg-whole" id="popMark">
            <header class="head bg-col">
              <a class="back" href="javascript:void(0);" @click="popupTips = false"><i class="fa fa-angle-left fa-2x"></i></a>
              <h3>修改备注</h3>
            </header>
            <div class="edit-input">
              <ul class="edit-list">
                <li class="bg-white">
                  <input class="edit-user bg-white" name="markName" type="text" placeholder="请输入备注" autocomplete="off" maxlength='50' v-model="inputMarkName" />
                </li>
                <span class="input-limit"><span>{{inputMarkName.length}}</span> / 50</span>
              </ul>
            </div>
            <div class="login-btns edit-btns">
              <a class="btn btn-col" @click="markSub">提交</a>
            </div>
          </section>
        </mt-popup>
    </section>
</template>

<script>
import LookInformation from 'Components/lottery/chatroom/lookInformation'
import { mapState } from 'vuex'
export default {
  props: ['pRoomId', 'type'],
  name: 'moreMessage',
  data () {
    return {
      message: [],
      openID: '',
      share: false,
      params: {
        roomId: this.pRoomId,
        offset: 0,
        count: 20
      },
      popupTips: false, // 备注弹出窗
      inputMarkName: '', // 修改备注长度
      markFriend: {},
      lookInformation: false,
      lookData: {},
      infinite: true,
      isAll: false,
      shareList: []
    }
  },
  watch: {
    'inputMarkName': function (data) {
      // onkeyup="this.value=this.value.replace(/[^\w]/g,'');"
      data = data.replace(/[\s]/g, '')
      this.inputMarkName = data
    },
    '$store.state.chatRoom.forwardListCancel': {
      handler (cancel) {
        let cancelLeng = cancel.length
        let list = this.chatRoom.forwardList
        let listLeng = list.length
        for (let i = 0; i < cancelLeng; i++) {
          for (let j = listLeng - 1; j >= 0; j--) {
            if (cancel[i].msgId === list[j].openid) {
              if (cancel[i].success) {
                list[j].share = false
                list.splice(j, 1)
              } else {
                list[j].fail = true
              }
            }
          }
        }
      },
      deep: true
    },
    'chatRoom.init': {
      handler (data) {
        let roomss = data.message.chatRooms
        let roomsLengh = roomss.length
        if (this.chatRoom.roomNmae) {
          for (let i = 0; i < roomsLengh; i++) {
            if (roomss[i].roomId === this.chatRoom.roomNmae) {
              this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[i].roomId + "'}")
            }
          }
        } else {
          this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[0].roomId + "'}")
          this.chatRoom.roomNmae = roomss[0].roomId
        }
        this.init.message.member.openid = data.message.member.openid
        for (let item of data.message.notReadSummaryList) {
          this.chatRoom.unreadMsgRed += item.count * 1
        }
        // if (notReadSummaryList) {
        //   let notReadLeng = notReadSummaryList.length
        //   for (let i = 0; i < notReadLeng; i++) {
        //     this.chatRoom.unreadMsgRed += notReadSummaryList[i].count
        //   }
        // }
        let hyUnread = this.Utils.Storage.get('hyUnread')
        if (hyUnread) {
          for (let key in hyUnread) {
            if (key === this.init.message.member.openid) {
              for (let key2 in sessionStorage) {
                if (typeof sessionStorage[key2] === 'string' && typeof JSON.parse(sessionStorage[key2])) {
                  if (JSON.parse(sessionStorage[key2])[0] && JSON.parse(sessionStorage[key2])[0].temporary) {
                    if (key2 === this.init.message.member.openid) {
                      this.chatRoom.unreadMsgRed += hyUnread[key].length
                    }
                  }
                }
              }
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      }
    })
  },
  methods: {
    // 通过poprs传递渲染
    loadMore () {
      if (this.isAll) {
        return
      } else {
        // 可下拉请求
        this.infinite = false
      }
      switch (this.type) {
        case 'bannedList':
          this.bannedList('more')
          break
        case 'blackList':
          this.blackList('more')
          break
        case 'attentionList':
          this.attentionList('more')
          break
        case 'friendList':
          this.friendList('more')
          break
        case 'share':
          this.friendList('more')
          this.share = true
          break
      }
      setTimeout(() => {
      }, 2000)
    },
    remarkClick (item, index) {
      let _this = this
      console.log(_this)
      // 自定义一个全局弹窗，可监控输入的文字数
      _this.popupTips = true
      _this.inputMarkName = item.markName || ''
      _this.markFriend = {
        item: item,
        inx: index
      }
      // MessageBox.prompt('请输入备注', '').then(action => {
      //   _this.axios.get('/cpi/relation/remarkFriend/' + _this.chatRoom.flag, {
      //     params: {
      //       friendOpenid: item.openid,
      //       markName: action.value
      //     }
      //   })
      //     .then((res) => {
      //       if (res.code === 0) {
      //         // success
      //         item.markName = action.value
      //       }
      //     })
      //     .catch(() => {})
      // })
    },
    // 提交修改的备注
    markSub () {
      let _item = this.markFriend.item || undefined
      let _mark = this.inputMarkName
      if (_mark && _mark.length > 0 && _item && _item.openid) {
        this.axios.get('/cpi/relation/remarkFriend/' + this.chatRoom.flag, {
          params: {
            friendOpenid: _item.openid,
            markName: _mark
          }
        })
          .then((res) => {
            if (res.code === 0) {
              // success
              _item.markName = _mark
              this.popupTips = false
            }
          })
          .catch(() => {})
      } else {
        this.popupTips = false
      }
    },
    // TODO: 可优化，取公用部分
    bannedList (more) {
      let params = this.params
      if (more && more === 'more') {
        // offset 增加
        this.params.offset += this.params.count
      }
      this.axios.get('/cpi/room/shutup_list/' + this.chatRoom.flag, {
        params
      })
        .then((res) => {
          if (res.code === 0) {
            // _this.message = res.data
            if (params.offset === 0) {
              this.message = res.data
            } else {
              this.message = [...this.message, ...res.data]
            }

            // 已加载完全。则isAll
            if (res.data.length < params.count) {
              this.isAll = true
            }
          }
          this.infinite = true
        })
        .catch(() => {
        })
    },
    blackList (more) {
      let params = this.params
      if (more && more === 'more') {
        // offset 增加
        this.params.offset += this.params.count
      }
      this.axios.get('/cpi/room/blacklist/' + this.chatRoom.flag, {
        params
      })
        .then((res) => {
          if (res.code === 0) {
            // _this.message = res.data
            if (params.offset === 0) {
              this.message = res.data
            } else {
              this.message = [...this.message, ...res.data]
            }

            // 已加载完全。则isAll
            if (res.data.length < params.count) {
              this.isAll = true
            }
          }
          this.infinite = true
        })
        .catch(() => {
        })
    },
    attentionList (more) {
      let params = this.params
      if (more && more === 'more') {
        // offset 增加
        this.params.offset += this.params.count
      }
      this.axios.get('/cpi/relation/follow_list/' + this.chatRoom.flag + '?offset=' + params.offset + '&count=' + params.count)
        .then((res) => {
          if (res.code === 0) {
            // this.message = res.data
            if (params.offset === 0) {
              this.message = res.data
            } else {
              this.message = [...this.message, ...res.data]
            }

            // 已加载完全。则isAll
            if (res.data.length < params.count) {
              this.isAll = true
            }
          }
          this.infinite = true
        })
        .catch(() => {})
    },
    // 查看资料删除好友
    delectFriend (openid) {
      let message = this.message
      let messageLeng = message.length
      for (let i = 0; i < messageLeng; i++) {
        if (message[i].openid === openid) {
          this.$delete(message, i)
        }
      }
    },
    // 渲染好友列表
    friendList (more) {
      let params = this.params
      if (more && more === 'more') {
        // offset 增加
        this.params.offset += this.params.count
      }
      this.axios.get('/cpi/relation/friend_list/' + this.chatRoom.flag + '?offset=' + params.offset + '&count=' + params.count)
        .then((res) => {
          if (res.code === 0) {
            let { data } = res
            let dataLeng = data.length
            // 分享初始化
            for (let i = 0; i < dataLeng; i++) {
              data[i].share = false
              data[i].fail = false
            }
            if (params.offset === 0) {
              this.message = res.data
            } else {
              this.message = [...this.message, ...res.data]
            }

            // 已加载完全。则isAll
            if (dataLeng < params.count) {
              this.isAll = true
            }
          }
          this.infinite = true
        })
        .catch(() => {})
    },
    openLookClose () {
      this.lookInformation = false
    },
    forwardOne () {
      let leng = this.chatRoom.forwardList.length
      if (leng === 0) {
        this.$toast({
          message: '请先选择分享人~',
          position: 'middle',
          duration: 1600
        })
        return
      }
      for (let i = 0; i < leng; i++) {
        let forward = this.chatRoom.forward
        forward.receiver = this.chatRoom.forwardList[i]
        forward.transfer = forward.sender
        forward.sender = forward.sender
        let data = {
          event: 'transferMessage',
          data: {
            transferType: 4,
            targetId: this.chatRoom.forwardList[i].openid,
            content: '[分享注单]',
            attachment: forward
          },
          msgId: forward.receiver.openid
        }
        this.chatRoom.privateChatz = data
        this.chatRoom.privateChatz.yes = true
        this.chatRoom.ws.send(JSON.stringify(data))
      }
    },
    openLookData (item) {
      if (this.share) {
        if (this.init.message.member.type === 3) {
          this.$toast({
            message: '客服不能分享',
            position: 'middle',
            duration: 2000
          })
          return
        }
        if (item.type === 3) {
          this.$toast({
            message: '不能分享给客服',
            position: 'middle',
            duration: 2000
          })
          return
        }
        item.share = !item.share
        if (item.share) {
          this.chatRoom.forwardList.push(item)
        } else {
          let leng = this.chatRoom.forwardList.length
          for (let i = leng - 1; i >= 0; i--) {
            if (this.chatRoom.forwardList[i].openid === item.openid) {
              this.chatRoom.forwardList.splice(i, 1)
            }
          }
        }
      } else {
        this.lookInformation = true
        this.lookData = item
        if (this.init.message.member.type > 0) {
          if (item.type !== 3 && (this.chatRoom.purive(this.init.message.member.authority, 4) || this.chatRoom.purive(this.init.message.member.authority, 3))) {
            this.lookData.addSayRomm = true
          }
        } else {
          if (item.type > 0 && (this.chatRoom.purive(item.authority, 4) || this.chatRoom.purive(item.authority, 3))) {
            this.lookData.addSayRomm = true
          }
        }
        this.lookData.typeClass = this.type
      }
    },
    delectBanned (item, index) {
      let _this = this
      _this.openId = item.openid
      if (_this.type === 'bannedList') {
        _this.axios.get('/cpi/room/release_shutup/' + _this.chatRoom.flag + '?roomId=' + _this.params.roomId + '&openid=' + _this.openId)
          .then((res) => {
            if (res.code === 0) {
              this.$toast({
                message: '已解除禁言',
                position: 'middle',
                duration: 1000
              })
              _this.message.splice(index, 1)
            }
          })
          .catch(() => {})
      } else {
        _this.axios.get('/cpi/room/release_stop/' + _this.chatRoom.flag + '?roomId=' + _this.params.roomId + '&openid=' + _this.openId)
          .then((res) => {
            if (res.code === 0) {
              this.$toast({
                message: '已解除黑名单',
                position: 'middle',
                duration: 1000
              })
              _this.message.splice(index, 1)
            }
          })
          .catch(() => {})
      }
    }
  },
  created () {
    let _this = this
    // 初始化
    this.isAll = false
    switch (_this.type) {
      case 'bannedList':
        _this.bannedList()
        break
      case 'blackList':
        _this.blackList()
        break
      case 'attentionList':
        _this.attentionList()
        break
      case 'friendList':
        _this.friendList()
        break
      case 'share':
        _this.friendList()
        _this.share = true
        _this.chatRoom.forwardList = []
        break
    }
  },
  components: {
    LookInformation
  }
}
</script>

<style scoped>
    .box{margin-top:1.125rem;}
    .body{height: 100%;position: fixed;top:0;width: 100%;max-width:780px;z-index: 400;}
    .rankingInfo-headIm{position:relative;z-index:2;margin: 0 .1rem 0 .3rem;width:1.3rem;height:1.3rem;background:#fff;border-radius:50%;}
    .rankingInfo-list{font-size:0;line-height:1.6rem;border-bottom:1px solid #CCCCCC;color:#333;}
    .rankingInfo-list-name{font-size:.35rem;color:#666;}
    .rankingInfo-ren,
    .fail{position:absolute;text-align:center;font-size:.35rem;line-height:.7rem;right:.3rem;top:0;bottom:0;margin:auto 0;width:1.3rem;height:.7rem;background:#D54545;color:#fff;border-radius:.1rem;}
    .fail{background:none;width:2.2rem;color:#D81E06;}
    .room-grade{margin-right:.2rem;width:2.1rem;display:inline-block;vertical-align:middle;}
    .room-info-admin-title{padding: 0 .25rem;margin-right: .2rem;background: #E41D1D;color: #fff;height: .45rem;display: inline-block;vertical-align: middle;line-height: .45rem;}
    .rank-remark{ font-size: 13px; position: absolute; right: 10px; padding: 5px 8px; background: #D54545; color: #fff; line-height: 1.2; top: 50%; margin-top: -12.5px;border-radius:.06rem;}
    .mark-gap{margin-left: 5px; color: #3599FF;}
    .limit-w{ width: 3.75rem; }
    .banned-list{overflow: auto;height: 100%;background:#fff;}
    .checked:before,
    .rankingInfo-list.active:before{font-family: FontAwesome;content:'\f058';top:0;bottom:0;left:.2rem;margin:auto .2rem auto 0;position:absolute;border-radius:50%;font-size:23px;font-weight:900;color:#DEDEDE;z-index: 1;}
    .rankingInfo-list.active{background:#c5d8f3;}
    .rankingInfo-list.active:before{color:#40A0E9;z-index: 2;}
</style>
<style>
    .mint-msgbox-input {padding-top: 14px;}
    .mint-msgbox-input input{width: 96%;}
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-14 14:34:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!--查看资料模块-->
    <section class="room-bottom-lookData" v-cloak>
        <section class="room-bottom-lookData-box fw pr">
          <section class="pr">
            <img
              :src="!actionsData.headImg || actionsData.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : actionsData.headImg"
              class="room-bottom-lookData-headImg dInV"
            >
            <span
              v-if="init.message.member.openid === actionsData.openid"
              class="room-info-admin-title-headImg">本人</span>
          </section>
            <p class="room-bottom-lookData-name">{{actionsData.nickname}}
              <span class="room-bottom-lookData-mark">{{lookData.markName ? '(' + lookData.markName + ')' : ''}}</span>
            </p>
            <div class="fw tc room-info-alookData-title">
              <img
                :src='chatRoom.headImg[actionsData.level]'
                class="room-grade room-bottom-lookData-grade"
              >
              <span class="room-info-admin-title dInV">{{actionsData.identity}}</span>
              <div class="dn">{{actionsData}}</div>
            </div>
            <template v-if="actionsData.openid !== ''">
              <div v-if="lookData.type !== -1 && actionsData.type !== 3" class="fw">
                <p class="room-bottom-lookData-infof tc">关注 {{actionsData.followNumber}} </p>
                <p class="room-bottom-lookData-infof tc">粉丝 {{actionsData.fansNumber}} </p>
              </div>
              <div
                :style="{'padding-top': lookData.type === -1 ? '.5rem' : 0, padding: actionsData.type === 3 || actionsData.type === -1 ? '.7rem 0 .1rem 0' : 0}"
                v-if="init.message.member.openid !== actionsData.openid"
                class="fw room-bottom-lookData-infos">
                <p
                  v-if="lookData.typeClass === 'friendList'&&deleType!=='会员'"
                  class="room-bottom-lookData-info room-bottom-lookData-F87014 tc"
                  @click="delectFriend"
                >
                  删除好友
                </p>
                <p
                  v-if="
                  actionsData.addAttention &&
                  init.message.member.type !== -1 &&
                  init.message.member.openid !== actionsData.openid &&
                  !actionsData.attention"
                  class="room-bottom-lookData-info room-bottom-lookData-72B7FF tc"
                  :class="{c7C7C7C: actionsData.attention}"
                  @click="addAttention"
                >
                  +关注
                  <!--{{actionsData.attention  ? '已关注' : '+关注'}}-->
                </p>
                <!-- 没有私聊则不私聊 -->
                <p
                  v-if="
                  actionsData.addSayRomm &&
                  init.message.member.type !== 3 &&
                  actionsData.type !== 3 &&
                  !actionsData.privateflag &&
                  init.message.member.openid !== actionsData.openid&&
                  showChat !== 1?true:false"
                  class="room-bottom-lookData-info room-bottom-lookData-72B7FF tc"
                >
                  <span
                    @click="addSayRomm"
                    class="room-bottom-lookData-info-sp">私聊</span>
                </p>
                <template v-if="roomid && chatRoom.purive(chatRoom.roomAuthority, 0)">
                  <p class="room-bottom-lookData-info room-bottom-lookData-72B7FF tc" v-if="!actionsData.shutup" @click="actionBanned('no')">+禁言</p>
                  <p
                    class="room-bottom-lookData-info room-bottom-lookData-72B7FF tc"
                    :class="{c7C7C7C: actionsData.shutup}"
                    v-if="actionsData.shutup"
                    @click="actionBanned('yes')"
                  >-解禁</p>
                </template>
                <p
                  v-if="roomid && !actionsData.stop && chatRoom.purive(chatRoom.roomAuthority, 2)"
                  class="room-bottom-lookData-info room-bottom-lookData-72B7FF tc"
                  @click="outRoom">
                    +踢人
                    <!--{{actionsData.stop ? '-解踢' : '+踢人'}}-->
                </p>
              </div>
            </template>
            <img src="../../../assets/images/chatroom/zhubo_detail_close.png" @click="close" class="room-bottom-lookData-close">
        </section>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'lookInformation',
  props: ['lookData'],
  data () {
    return {
      showChat: '', // 判断用户身份
      deleType: '', // 获取用户身份
      actionsLookData: false,
      actionsData: { // 用户信息
        fansNumber: null,
        followNumber: null,
        attention: null,
        level: null,
        identity: null, // 身份
        nickname: null,
        openid: null,
        openID: null,
        headImg: null,
        shutup: null,
        stop: false,
        type: null,
        authority: null,
        markName: null,
        roomid: null
      },
      roomid: '' // 房间id
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
  mounted () {
    this.deleType = localStorage.getItem('idType')
    let _this = this
    // this.$indicator.open('加载中...')
    if (this.$route.params.roomId) {
      _this.roomid = this.$route.params.roomId
    } else {
      _this.roomid = _this.lookData.roomid
    }
    if (_this.lookData.type === -1) {
      _this.actionsData = _this.lookData
    } else {
      console.log('get friend ?')
      console.log(_this.chatRoom)
      // 获取当前查看好友信息
      _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + _this.lookData.openid)
        .then((res) => {
          console.log(res)
          if (this.deleType === '会员') {
            this.showChat = res.data.shilding
          } else {
            this.showChat = 0
          }
          console.log(this.showChat)
          if (res.code === 0) {
            _this.actionsData.attention = res.data.attention
            _this.actionsData.fansNumber = res.data.fansNumber
            _this.actionsData.followNumber = res.data.followNumber
            _this.actionsData.authority = res.data.member.authority
            _this.actionsData.headImg = res.data.member.headImg
            _this.actionsData.identity = res.data.member.identity
            _this.actionsData.nickname = res.data.member.nickname
            _this.actionsData.openid = res.data.member.openid
            _this.actionsData.level = res.data.member.level
            _this.actionsData.type = res.data.member.type
            res.data.shutup ? _this.actionsData.shutup = res.data.shutup : _this.actionsData.shutup = _this.lookData.shutup
            res.data.stop ? _this.actionsData.stop = res.data.stop : _this.actionsData.stop = _this.lookData.stop
            if (_this.lookData.privateflag) {
              _this.actionsData.privateflag = _this.lookData.privateflag
            }
          } else if (res.code === 1404) {
            _this.actionsData = _this.lookData
          }
        })
        .catch(() => {})
    }
    if (_this.lookData.type !== -1 && (_this.chatRoom.purive(_this.init.message.member.authority, 5) || _this.chatRoom.purive(_this.lookData.authority, 6))) {
      this.actionsData.addAttention = true
    } else {
      this.actionsData.addAttention = false
    }
    if (_this.init.message.member.type <= 0 && _this.lookData.type > 0) {
      if (this.chatRoom.purive(_this.init.message.member.authority, 4) || this.chatRoom.purive(_this.lookData.authority, 3)) {
        _this.actionsData.addSayRomm = true
      }
    } else if (_this.init.message.member.type > 0 && _this.lookData.type !== 3) {
      if (this.chatRoom.purive(_this.init.message.member.authority, 4) || this.chatRoom.purive(_this.lookData.authority, 3)) {
        _this.actionsData.addSayRomm = true
      }
    } else {
      _this.actionsData.addSayRomm = false
    }
  },
  methods: {
    // 删除好友
    delectFriend () {
      let _this = this
      _this.$emit('delectFriend', _this.lookData.openid)
      _this.axios.get('/cpi/relation/delete/' + _this.chatRoom.flag + '?friendOpenid=' + _this.actionsData.openid)
        .then((res) => {
          if (res.code === 0) {
            this.$emit('openLookClose')
            this.$toast({
              message: '删除成功',
              position: 'middle',
              duration: 1000
            })
            window.location.reload()
          } else {
            this.$toast({
              message: '失败, 稍后重试',
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(() => {})
    },
    close () {
      this.$emit('openLookClose')
      this.chatRoom.lookInformationAddSayRomm = ''
    },
    // 禁言和解禁功能
    actionBanned (release) {
      let _this = this
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      if (release === 'no') {
        _this.axios.get('/cpi/room/shutup/' + _this.chatRoom.flag + '?roomId=' + _this.roomid + '&openid=' + _this.actionsData.openid)
          .then((res) => {
            if (res.code === 0) {
              this.$indicator.close()
              _this.actionsData.shutup = true
              this.$toast({
                message: '禁言成功',
                position: 'middle',
                duration: 1500
              })
            } else {
              this.$toast({
                message: res.msg,
                position: 'middle',
                duration: 1500
              })
            }
          })
          .catch(() => {})
      }
      if (release === 'yes') {
        _this.axios.get('/cpi/room/release_shutup/' + _this.chatRoom.flag + '?roomId=' + _this.roomid + '&openid=' + _this.actionsData.openid)
          .then((res) => {
            if (res.code === 0) {
              this.$indicator.close()
              _this.actionsData.shutup = false
              this.$toast({
                message: '已解除禁言',
                position: 'middle',
                duration: 1500
              })
            } else {
              this.$toast({
                message: res.msg,
                position: 'middle',
                duration: 1500
              })
            }
          })
          .catch(() => {})
      }
    },
    addSayRomm () {
      let _this = this
      let authority = 0
      this.$store.commit('friendopenid', this.lookData.openid)
      // console.log(this.$store)
      console.log(this.lookData.openid, 'friend openid')
      // 如果是游客或者 会员发起
      if (this.init.message.friends) {
        let isfriends = this.init.message.friends.filter((item) => {
          return item.openid === _this.lookData.openid
        })
        if (isfriends.length === 0) {
          _this.axios.get('/cpi/relation/friend/' + _this.chatRoom.flag + '?openid=' + _this.lookData.openid)
        }
      }
      if (_this.init.message.member.type <= 0) {
        authority = _this.lookData.authority
        if (_this.lookData.type === 3) {
          let roomtype = ''
          _this.init.message.member.type === -1 ? roomtype = 'temporary' : roomtype = 'service'
          _this.$router.push({
            name: 'privateChat',
            params: {
              queryData: {},
              roomType: roomtype
            }
          })
        } else if (_this.lookData.type > 0) {
          if (this.chatRoom.purive(authority, 4) || this.chatRoom.purive(authority, 3)) {
            let requestData = {
              'event': 'requestPrivateChat',
              'data': {
                'sender': _this.init.message.member.openid,
                'receiver': _this.lookData.openid
              }
            }
            _this.chatRoom.ws.send(JSON.stringify(requestData))
            _this.axios.get('/cpi/relation/friend/' + _this.chatRoom.flag + '?openid=' + _this.lookData.openid)
          } else {
            this.$toast({
              message: '你不能和对方说话',
              position: 'middle',
              duration: 1500
            })
          }
        }
      } else {
        // 如果是管理员发起
        authority = _this.init.message.member.authority
        if (_this.init.message.member.type !== 3) {
          // 如果自己不是客服
          if (_this.lookData.type !== 3) {
            if (_this.chatRoom.purive(authority, 4) || _this.chatRoom.purive(_this.lookData.authority, 3)) {
              let requestData = {
                'event': 'requestPrivateChat',
                'data': {
                  'sender': _this.init.message.member.openid,
                  'receiver': _this.lookData.openid
                }
              }
              _this.chatRoom.ws.send(JSON.stringify(requestData))
            }
          } else {
            this.$toast({
              message: '你不能和客服说话',
              position: 'middle',
              duration: 1500
            })
          }
        } else {
          // 如果自己是客服
          let roomtype = ''
          _this.lookData.type === -1 ? roomtype = 'temporary' : roomtype = 'service'
          _this.$router.push({
            name: 'privateChat',
            params: {
              queryData: {},
              roomType: roomtype
            }
          })
        }
      }
    },
    // 将当前用户提出房间
    outRoom () {
      let _this = this
      _this.axios.get('/cpi/room/stop/' + _this.chatRoom.flag + '?roomId=' + _this.lookData.roomid + '&openid=' + _this.actionsData.openid)
        .then((res) => {
          if (res.code === 0) {
            this.$toast({
              message: '成功踢出房间',
              position: 'middle',
              duration: 1500
            })
            _this.actionsData.stop = true
            _this.actionsLookData = false
          } else {
            this.$toast({
              message: res.msg,
              position: 'middle',
              duration: 1500
            })
          }
        })
        .catch(() => {})
    },
    // 关注当前用户
    addAttention () {
      let _this = this
      if (this.chatRoom.purive(_this.lookData.authority, 6) || this.chatRoom.purive(_this.init.message.member.authority, 5)) {
        _this.axios.get('/cpi/relation/follow/' + _this.chatRoom.flag + '?openid=' + _this.actionsData.openid)
          .then((res) => {
            if (res.code === 0) {
              _this.actionsData.attention = true
              _this.actionsData.addAttention = false
              this.$toast({
                message: '已关注',
                position: 'middle',
                duration: 1500
              })
            } else {
              this.$toast({
                message: res.msg,
                position: 'middle',
                duration: 1500
              })
            }
          })
          .catch(() => {
          })
      } else {
        this.$toast({
          message: '不能关注别人 或 不能被关注',
          position: 'middle',
          duration: 1500
        })
      }
    }
  }
}
</script>

<style scoped>
    .room-bottom-lookData{position:fixed;top:0;z-index:100;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6) !important;}
    .room-bottom-lookData-box{width:9rem;background:url(../../../assets/images/chatroom/zhubo_detail_bg.png) no-repeat #fff;background-size:100%;border-radius:.2rem;color:#fff;margin:4.5rem auto 0;text-align:center;font-size:.35rem;min-height: 5.5rem;}
    .room-bottom-lookData-headImg{
      margin:.45rem auto 0;
      width:1.6rem;
      height:1.6rem;
      border:3px solid #fff;
      border-radius:50%;
    }
    .room-bottom-lookData-close{position:absolute;right:.3rem;top:.3rem;width:.5rem;height:.5rem;}
    .room-bottom-lookData-name{
      font-size:.35rem;
      padding:.1875rem 0 0 0;
      word-break: break-word;
      height: 1.4063rem;
      overflow: hidden;
    }
    .room-bottom-lookData-mark {
      color: #FFFB4E;
      padding: .1875rem .3125rem 0;
      display: block;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .room-bottom-lookData-grade{float:inherit;display:inline-block;vertical-align:top;}
    .room-bottom-lookData-infof{float:left;width:50%;padding:.8rem 0 .4rem;color:#999;border-bottom:1px solid #ECECEC;}
    .room-bottom-lookData-infos{display:flex;}
    .room-bottom-lookData-info{flex:1;padding:1.55rem 0 .4rem;color:#7C7C7C;border-bottom:1px solid #ECECEC;}
    .room-bottom-lookData-F87014,
    .room-bottom-lookData-72B7FF{padding:0;color:#F87014;font-size:.4rem;border-bottom:0;height:1rem;line-height:1rem;}
    .room-bottom-lookData-72B7FF{color:#72B7FF;}
    .room-grade{margin-right:.2rem;width:2.1rem;display:inline-block;vertical-align:middle;}
    .room-bottom-lookData-info-sp{display:block;}
    .room-info-admin-title,
    .room-info-admin-title-headImg{padding: 0 .25rem;margin-right: .2rem;background: #D54545;color: #fff;height: .45rem;display: inline-block;vertical-align: middle;line-height: .45rem;}
    .room-info-admin-title-headImg{position:absolute;top: .5rem;right: 2.3rem;}
    .c7C7C7C{color:#7C7C7C;}
    .mint-this.$indicator .mint-this.$indicator-mask{z-index: 310 !important;}
</style>

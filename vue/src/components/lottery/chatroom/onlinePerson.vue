<template>
    <!--在线人数模块  -->
    <section class="warp">
        <Head>
            在线人数
            {{userInfo.number}}
            <span v-if="chatRoom.eiteMore.flag && init.message.member.type !== -1" class="confirm" @click="confirm">确认</span>
        </Head>
          <ul class="onlinePersons">
              <li v-if="chatRoom.eiteMore.flag && init.message.member.type > 0" class="onlineAll tc" @click="eiteAll">
                  点击@所有人
              </li>
              <li
                class="onlinePerson pr fw"
                v-for="(item, index) in userInfo.onlines"
                :key="index"
                @click="goOneChat(item)"
                :class="{active: item.checked}">
                  <section v-if="chatRoom.eiteMore.flag && init.message.member.type !== -1" class="checked dInV">
                      <!--{{item.checked ? '√' : ''}}-->
                  </section>
                  <img
                    :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg"
                    class="onlinePerson-headImg dInV"
                    :style="{'margin-left': chatRoom.eiteMore.flag && init.message.member.type !== -1 ? '.7rem' : '0'}"
                    ref="headImg"
                  >
                  <img v-if="item.type !== -1" :src='chatRoom.headImg[item.level]' class="room-grade">
                  <div
                    class="onlinePerson-name dInV">{{item.nickname}}</div>
                  <div class="dInV room-info-admin-box">
                      <div
                        v-if="init.message.member.openid === item.openid"
                        class="room-info-admin-title dInV" style="margin-right:.1rem;">本人</div>
                      <div class="room-info-admin-title dInV">{{item.identity}}</div>
                  </div>
                  <span class="rankingInfo-ren dn" @click="outRoom(item, index)">踢出</span>
              </li>
              <li class="onlinePersonALL tc" v-if="userInfo.number === 0">
                  暂无人在线
              </li>
              <li class="onlinePersonA tc" v-if="params.count >= userInfo.number && userInfo.number !== 0">
                  已显示全部
              </li>
          </ul>
        <LookInformation v-if="lookInformation" :lookData="lookData" @openLookClose="openLookClose" class="body"></LookInformation>
    </section>
</template>

<script>
import Head from 'Components/global/head'
import LookInformation from 'Components/lottery/chatroom/lookInformation'
import { Loadmore } from 'mint-ui'
import { mapState } from 'vuex'
export default {
  name: 'onlinePerson',
  props: ['data'],
  data () {
    return {
      member: 0,
      loading: false,
      userInfo: {
        number: 0,
        onlines: []
      },
      params: {
        appid: '',
        roomId: this.$route.params.roomId,
        offset: 0,
        count: 600
      },
      lookData: [],
      lookInformation: false,
      eiteMoreList: []
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
    HeadBack () {
      this.chatRoom.flagWs = true
      this.$parent.onlinePersonClose()
    },
    eiteAll () {
      this.chatRoom.eiteMore.list = [
        {
          nickname: '所有人 '
        }
      ]
      this.$parent.onlinePersonClose()
    },
    confirm () {
      this.chatRoom.eiteMore.list = this.eiteMoreList
      this.$parent.onlinePersonClose()
    },
    goOneChat (item) {
      this.lookData = item
      this.lookData.roomid = this.data.data.chatRoomId
      if (this.chatRoom.eiteMore.flag && this.init.message.member.type !== -1) {
        item.checked = !item.checked
        let list = this.eiteMoreList
        if (item.checked) {
          list.push(item)
          this.chatRoom.eiteMore.list = list
          if (this.init.message.member.type === 0) {
            this.$parent.onlinePersonClose()
          }
        } else {
          let listLeng = list.length
          for (let i = listLeng - 1; i >= 0; i--) {
            if (item.openid === list[i].openid) {
              list.splice(i, 1)
            }
          }
        }
      } else {
        this.lookInformation = true
      }
    },
    openLookClose () {
      this.lookInformation = false
    },
    // 踢出房间
    outRoom (item, index) {
      let _this = this
      _this.axios.get('/cpi/room/stop/' + _this.chatRoom.flag + '?roomId=' + _this.data.data.chatRoomId + '&openid=' + item.openid)
        .then((res) => {
          if (res.code === 0) {
            this.$toast({
              message: '已踢出房间',
              position: 'middle',
              duration: 1500
            })
            _this.userInfo.onlines.splice(index, 1)
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
    getOlinePerson () {
      let appid = this.data.data.appid
      let params = this.params
      let _this = this
      params.appid = appid
      params.roomId = this.data.data.chatRoomId
      _this.chatRoom.eiteMore.list = []
      _this.axios.get('/cpi/room/online/' + _this.chatRoom.flag, {
        params
      })
        .then((res) => {
          if (res.code === 0) {
            let data = res.data
            let online = data.onlines
            let onlineLeng = online.length
            if (_this.chatRoom.eiteMore.flag && _this.init.message.member.type > 0) {
              for (let i = 0; i < onlineLeng; i++) {
                if (online[i].openid !== '' && online[i].type !== -1) {
                  online[i].checked = false
                  if (online[i].openid !== _this.init.message.member.openid) {
                    _this.userInfo.onlines.push(online[i])
                  }
                }
              }
              _this.userInfo.number = _this.userInfo.onlines.length
            } else {
              _this.userInfo = data
            }
          } else {
            this.$parent.onlinePersonClose()
          }
        })
        .catch(() => {
          this.$parent.onlinePersonClose()
        })
    }
  },
  created () {
    this.getOlinePerson()
  },
  beforeDestroy () {
    if (this.lookData.length === 0 && this.chatRoom.eiteMore.flag) {
      this.chatRoom.eiteMore.flag = false
    }
  },
  components: {
    Head,
    Loadmore,
    LookInformation
  }
}
</script>

<style scoped>
    .warp{position:fixed;top:0;left:0;width:100%;background: #F5F4F9;z-index:400;overflow:scroll;}
    .body{height: 100%;position: fixed;top:0;width: 100%;max-width:780px;z-index: 400;}
    .onlinePerson:nth-child(1){margin-top:1.125rem;}
    .onlinePerson{padding:0 .201rem;height:1.6rem;line-height: 1.6rem;border-bottom:1px solid #CCCCCC;font-size:.4rem;background:#fff;}
    .onlinePersonALL{padding-top:3rem;color:#333;font-size:.35rem;}
    .onlinePersonA{line-height:1rem;}
    .onlinePerson:before{content:'';display:inline-block;vertical-align:middle;height:100%;width:0;}
    .onlinePerson-headImg{width:1.2rem;height:1.2rem;border-radius:50%;background:#333;}
    .onlinePerson-name{max-width:4.5rem;font-size:.4rem;padding:0 .2rem 0 .1rem;color:#666;line-height:.7rem;}
    .room-grade{margin:0 .1rem;width:2.1rem;display:inline-block;vertical-align:middle;}
    .onlinePerson-leave{width:2rem;height:.6rem;line-height:.7rem;}
    .rankingInfo-ren{position:absolute;text-align:center;font-size:.35rem;line-height:.7rem;right:.3rem;top:0;bottom:0;margin:auto 0;width:1.3rem;height:.7rem;background:red;color:#fff;border-radius:.1rem;}
    .room-info-admin-box{position:absolute;top:0;bottom:0;right:0;margin: auto .2rem auto 0;height: .5rem;line-height: .5rem;}
    .room-info-admin-title{padding:0 8px;height:21px;line-height:23px;border-radius:3px;background: #D54545;color: #fff;}
    .mint-loadmore /deep/ .mint-loadmore-text{line-height:150px;}
    .checked:before,
    .onlinePerson.active:before{font-family: FontAwesome;content:'\f058';top:0;bottom:0;left:.2rem;margin:auto .2rem auto 0;position:absolute;border-radius:50%;font-size:23px;font-weight:900;color:#DEDEDE;z-index: 1;}
    .onlinePerson.active{background:#c5d8f3;}
    .onlinePerson.active:before{color:#40A0E9;z-index: 2;}
    .confirm{position:absolute;right:.5rem;top:0;font-size:.35rem;line-height:1.125rem;}
    .onlineAll{margin-top:1.125rem;width:100%;height:1rem;line-height:1rem;text-align:center;color:#666666;font-size:.4rem;background:#DFEFF8;}
    .onlinePersons{position: absolute;top: 0;width: 100%;overflow:scroll;}
</style>

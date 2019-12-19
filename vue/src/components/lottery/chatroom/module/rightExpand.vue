<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-07 16:49:01
 * @LastEditTime: 2019-10-07 17:13:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <section class="rightFloat" :style="{top:rightFloatFlang?'4.3rem':'2rem'}">
      <section
        v-if="removeRoomHandler"
        class="onlinePerson"
        @click="goOnlinePerson"
      >{{onlinePerson>999?'999+':onlinePerson}}</section>
      <img
        src="../../../../assets/images/chatroom/chat_service.png"
        class="onlineServer"
        @click="serviceChat"
        v-if="init.message.member.type > -1 || sessionClosedReceipt"
      />
      <img
        src="../../../../assets/images/chatroom/login_icon_90.png"
        class="noLogin"
        @click="noLogin"
        v-if="init.message.member.type === -1  || sessionClosedReceipt"
      />
      <img
        src="../../../../assets/images/chatroom/roomBetting.png"
        class="roomBetting"
        @click="roomBetting"
        v-if="(init.message.member.type > -1 && roomBettingShow) && !sessionClosedReceipt"
      />
      <img
        src="../../../../assets/images/chatroom/dragon.png"
        class="dragon"
        @click="dragonShow = true"
        v-if="dragonIconShow"
      />
      <img
        src="../../../../assets/images/chatroom/friend.png"
        class="dragon"
        @click="bannedShow"
        v-if="init.message.member.type > -1 && !sessionClosedReceipt && friendIcon !== 0"
      />
      <!-- 悬浮按钮 -->
      <BettingPalette
        v-if="init.message.member.type > -1 && !sessionClosedReceipt"
        :data="BettingPalette"
        style="position:relative;z-index:999;"
      />
    </section>
    <!-- 在线人数 -->
    <OnlinePerson v-if="onlinePersonShow" :data="rooms" class="onlinePersonShow box-warp"></OnlinePerson>
    <!-- 长龙助手弹窗 -->
    <Dragon v-if="dragonShow" @closeDragon="closeDragon" />
    <!-- 好友列表 -->
    <section class="fw body" v-if="bannedListShow">
      <Head>
        <div class="play-center">
          <span v-if="bannedListType === 'friendList'">好友列表</span>
        </div>
      </Head>
      <!-- 根据不同的type。获取不同列表数据 -->
      <BannedList ref="confrim" :pRoomId="rooms.data.chatRoomId" :type="bannedListType"></BannedList>
    </section>
  </div>
</template>
<script>
import BettingPalette from 'Components/lottery/betting/module/betting-palette'
import BannedList from 'Components/lottery/chatroom/bannedList'
import OnlinePerson from 'Components/lottery/chatroom/onlinePerson'
import Dragon from 'Components/lottery/chatroom/module/dragon'
import Head from 'Components/global/head'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    BettingPalette,
    OnlinePerson,
    Dragon,
    BannedList,
    Head
  },
  computed: {
    ...mapGetters({
      // chatRoomFont: 'chatRoomFont',
      system_config: 'system_config'
    }),
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      Lottery (state) {
        return state.Lottery
      },
      init (state) {
        if (state.chatRoom) {
          return state.chatRoom.init
        } else {
          return {}
        }
      }
    })
  },
  props: {
    removeRoomHandler: Boolean, // 是否被踢出房间
    dragonIconShow: Boolean,
    rooms: Object,
    rightFloatFlang: Boolean,
    friendIcon: Number // 如果好友数是0就不开启好友悬浮窗
  },
  data () {
    return {
      BettingPalette: {
        isShow: true // 拓展悬浮控制开关
      },
      onlinePersonShow: false, // 在线人数页面组件状态
      sessionClosedReceipt: false, // 用户状态验证
      onlinePerson: 0, // 在线人数,
      roomBettingShow: true, // 子房间右侧投注按钮
      dragonShow: false,
      bannedListType: '', // 列表类型
      bannedListShow: false // 好友列表
    }
  },
  watch: {
    'chatRoom.sessionClosedReceipt': {
      handler () {
        // this.$messagebox('提示', '登录失效, 将启用游客身份')
        this.sessionClosedReceipt = true
        // this.chatRoom.ws.onclose()
      },
      deep: true
    },
    'chatRoom.joinRoomNotify': {
      handler (data) {
        this.onlinePerson = data.message.currentOnlineNumbers
      },
      deep: true
    },
    'chatRoom.leaveRoomNotify': {
      handler (data) {
        this.onlinePerson = data.message.currentOnlineNumbers
      },
      deep: true
    },
    'chatRoom.systemNotify': {
      handler (data) {
        let chatRooms = this.init.message.chatRooms
        if (data.message.chatRoomId === chatRooms[0].roomId) {
          this.roomBettingShow = false
        } else {
          this.roomBettingShow = true
        }
      },
      deep: true
    }
  },
  methods: {
    goOnlinePerson () {
      this.$indicator.open({ spinnerType: 'fading-circle' })
      setTimeout(() => {
        this.onlinePersonShow = true
        this.chatRoom.eiteMore.flag = false
        this.$indicator.close()
      }, 1200)
      // this.$router.push({
      //   name: 'onlinePerson',
      //   params: {
      //     appid: this.rooms.data.appid,
      //     roomId: this.rooms.data.chatRoomId
      //   }
      // })
    },
    onlinePersonClose () {
      this.onlinePersonShow = false
      if (this.chatRoom.eiteMore.flag) {
        let list = this.chatRoom.eiteMore.list
        let listLeng = list.length
        if (list.length > 0) {
          if (this.init.message.member.type === 0) {
            this.$parent.userText = '@' + list[0].nickname + ' '
          } else if (this.init.message.member.type > 0) {
            this.$parent.userText = ''
            for (let i = 0; i < listLeng; i++) {
              this.$parent.userText += '@' + list[i].nickname + ' '
            }
          }
        }
      }
    },
    serviceChat () {
      this.$router.push('/mine/onlineService')
    },
    noLogin () {
      window.location.href = '/mobile/studio/#/login'
    },
    roomBetting () {
      let sto = this.Utils.Storage.get('shareBettingMoney')
      let lotteryArr = this.Utils.Storage.get('lotteryArr')
      this.Lottery.lotteryResult = false
      if (sto && sto.afterLottery) { // 如果有最后一次记录
        this.$store.commit('SetLotteryId', sto.afterLottery.lotteryId)
        if (sto.afterLottery.lotteryId < 100000) {
          this.$router.push({
            path: '/lottery',
            name: 'lottery',
            params: {
              reload: true
            },
            query: {
              lotteryId: sto.afterLottery.lotteryId
            }
          })
        } else {
          window.location.href = '/mobile/lottery/lotteryFootBall.html?lotteryId=' + sto.afterLottery.lotteryId
        }
      } else if (sto && sto.currentRoom && sto.currentRoom.flag && lotteryArr) { // 没有就用房间的flag匹配彩种
        let lot = sto.currentRoom.flag
        let lotteryId = 0
        let lotteryArrLeng = lotteryArr.length
        for (let i = 0; i < lotteryArrLeng; i++) {
          if (lot === lotteryArr[i].flag) {
            lotteryId = lotteryArr[i].lotteryId
            this.$store.commit('SetLotteryId', lotteryId)
          }
        }
        if (lotteryId < 100000) {
          this.$router.push({
            path: '/lottery',
            name: 'lottery',
            params: {
              reload: true
            },
            query: {
              lotteryId: lotteryId
            }
          })
        } else {
          window.location.href = '/mobile/lottery/lotteryFootBall.html?lotteryId=' + lotteryId
        }
      } else if (lotteryArr) { // 房间也没有flag, 用彩种列表第一个彩种的id
        if (lotteryArr[0].lotteryId < 100000) {
          this.$store.commit('SetLotteryId', lotteryArr[0].lotteryId)
          this.$router.push({
            path: '/lottery',
            name: 'lottery',
            params: {
              reload: true
            },
            query: {
              lotteryId: lotteryArr[0].lotteryId
            }
          })
        } else {
          window.location.href = '/mobile/lottery/lotteryFootBall.html?lotteryId=' + lotteryArr[0].lotteryId
        }
      }
    },
    closeDragon () {
      this.dragonShow = false
    },
    bannedShow () {
      this.bannedListType = 'friendList'
      this.bannedListShow = true
    },
    HeadBack () {
      this.bannedListShow = false
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.rightFloat {
  width: 1rem;
  position: fixed;
  right: 0.1rem;
  top: 4.3rem;
  z-index: 299;
  text-align: center;
  color: #666666;
}
.onlinePerson {
  width: 1.1rem;
  line-height: 1.4rem;
  height: 1.1rem;
  padding-top: 0.05rem;
  margin-left: -0.15rem;
  background: url(../../../../assets/images/chatroom/chat_online.png) no-repeat;
  background-size: 100%;
  color: #fff;
}
.onlineServer {
  position: relative;
  right: 0.12rem;
  width: 0.95rem;
  height: 0.95rem;
  margin-top: 0.1rem;
}
.noLogin {
  width: 1.1rem;
  margin: 0.1rem 0 0 -0.2rem;
}
.roomBetting {
  width: 0.95rem;
  margin: 0.1rem 0 0 -0.25rem;
}
.dragon {
  width: 1.15rem;
  margin: 0.2rem 0 0 -0.2rem;
}
.body {
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 780px;
  background: #f5f4f9;
  z-index: 400;
  overflow-y: auto;
}
.play-center {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1.125rem;
  width: 100%;
  text-align: center;
  font-size: 0.35rem;
}
</style>

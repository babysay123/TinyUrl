<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-09-16 14:07:14
 * @LastEditors: your name
 -->
<template>
  <section class="fw body">
    <Head>
      聊天室 {{roomName}}
    </Head>
    <Notice class="clear notice"></Notice>
    <Room ref="room" v-if="roomFlag" :moreRoom="true"/>
  </section>
</template>

<script>
import Room from '@/components/lottery/chatroom/room'
import Notice from 'Components/lottery/chatroom/notice'
import Head from 'Components/global/head'
import { mapState } from 'vuex'
export default {
  name: 'moreRoom',
  data () {
    return {
      roomName: '',
      ws: null,
      shareBettingMoney: null,
      roomFlag: false
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
  watch: {
    'chatRoom.ws': {
      handler () {
        this.delayLoad()
      },
      deep: true
    }
  },
  methods: {
    HeadBack () {
      this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + this.chatRoom.roomNmae + "'}")
      let roomss = this.init.message.chatRooms
      this.chatRoom.roomNmae = roomss[0].roomId
      let afterLotteryId = ''
      if (this.shareBettingMoney && this.shareBettingMoney.currentRoom && this.shareBettingMoney.currentRoom.afterLotteryId) {
        afterLotteryId = this.shareBettingMoney.currentRoom.afterLotteryId
      }
      this.$router.push({
        name: 'chatroom',
        query: {
          lotteryId: afterLotteryId
        }
      })
      this.chatRoom.BettingPalettePlay = true
      // 清除当前房间
      console.log('清除当前房间')
      if (this.shareBettingMoney) {
        if (this.shareBettingMoney.currentRoom) {
          delete this.shareBettingMoney.currentRoom
        }
        if (this.shareBettingMoney.afterLottery) {
          delete this.shareBettingMoney.afterLottery
        }
        this.Utils.Storage.save('shareBettingMoney', this.shareBettingMoney)
      }
      console.log(this.$store.getters.getLayoutMsg)
    },
    delayLoad () {
      setTimeout(() => {
        this.roomFlag = true
      }, 500)
    }
  },
  mounted () {
    this.shareBettingMoney = this.Utils.Storage.get('shareBettingMoney')
    let flag = null
    if (this.$route.params.roomName) { // 如果路由信息存在先走路由   不存在判断走当前房间
      console.log('params')
      this.delayLoad()
      flag = this.$route.params.flag
      this.roomName = this.$route.params.roomName
      this.chatRoom.roomNmae = this.$route.params.roomId
      if (flag) {
        this.$store.getters.getLayoutMsg.name = this.$route.params.name
        this.$store.getters.getLayoutMsg.lotteryId = this.$route.params.lotteryId
      }
      if (!this.init) {
        this.init = JSON.parse(sessionStorage.getItem('message')) // socket 全局后去掉
      }
    } else if (this.shareBettingMoney && this.shareBettingMoney.currentRoom) { // 如果当前房间存在
      console.log('shareBettingMoney')
      if (this.chatRoom.ws) {
        this.delayLoad()
      }
      flag = this.shareBettingMoney.currentRoom.flag
      this.chatRoom.roomNmae = this.shareBettingMoney.currentRoom.roomId
      this.roomName = this.shareBettingMoney.currentRoom.roomName
      if (flag) {
        this.$store.getters.getLayoutMsg.name = this.shareBettingMoney.currentRoom.name
        this.$store.getters.getLayoutMsg.lotteryId = this.shareBettingMoney.currentRoom.lotteryId
      }
    }
    if (flag) {
      // 修改显示玩法状态
      this.chatRoom.BettingPalettePlay = true
    } else {
      // 修改显示玩法状态
      this.chatRoom.BettingPalettePlay = false
    }
  },
  components: {
    Room,
    Notice,
    Head
  }
}
</script>

<style scoped>
  .body{height: 100%;position: fixed;top:0;width: 100%;max-width:780px;background: #F5F4F9;z-index: 299;}
  .notice{position:fixed;top:1.125rem;width:100%;}
  #app /deep/ .room-main{height:100%;}
</style>

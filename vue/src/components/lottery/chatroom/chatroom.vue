<style scoped>
  .notice {
    position: fixed;
    top: calc(1.125rem + 42px);
    z-index: 399;
    width: 100%;
    border-top: 1px solid #FFE5D5;
    border-bottom: 1px solid #FFE5D5;
  }
  .room-titles{
    position:fixed;
    top:calc(1.125rem + 42px + .6rem);
    z-index:1;
    width:100%;
    height:42px;
    background:#fff;
    font-size:.35rem;
    text-align:center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
  }
  .room-title{
    width:90px;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    color: #333;
  }
  .rankingInfo-ren {
    text-align: center;
    position: absolute;
    right: 6px;
    top: -3px;
    z-index: 2;
    width: 18px;
    height: 18px;
    background: #FF0000;
    border: 1px solid #fff;
    border-radius: 50%;
    font-size: 10px;
    line-height: 18px;
    color: #fff;
  }
  /*.lists{position:relative;z-index:600;}*/
</style>

<template>
  <section class="pr fw">
    <Notice class="clear notice"></Notice>
    <ul class="room-titles wrap">
      <li class="room-title" @click="titleActive(0)" :class="{active: roomTitleActive === 0}">大厅</li>
      <li class="room-title" @click="titleActive(1)" :class="{active: roomTitleActive === 1}">高手榜</li>
      <li class="room-title" @click="titleActive(2)" :class="{active: roomTitleActive === 2}">计划群</li>
      <li class="room-title pr" @click="titleActive(3)" :class="{active: roomTitleActive === 3}">
        消息
          <span class="rankingInfo-ren" v-show="chatRoom.unreadMsgRed > 0 && roomTitleActive !==3">
            {{chatRoom.unreadMsgRed>99?'99+':chatRoom.unreadMsgRed}}
          </span>
      </li>
      <li class="room-title" @click="titleActive(4)" :class="{active: roomTitleActive === 4}">好友</li>
    </ul>
    <ul class="fw lists">
      <li v-if="roomTitleActive === 0"><Room :friendIcon =0></Room></li>
      <li v-else-if="roomTitleActive === 1"><Ranking/></li>
      <li v-else-if="roomTitleActive === 2"><MoreChat/></li>
      <li v-else-if="roomTitleActive === 3"><OldMessage/></li>
      <li v-else-if="roomTitleActive === 4"><friendList/></li>
    </ul>
  </section>
</template>

<script>
import Room from '@/components/lottery/chatroom/room'
import Ranking from '@/components/lottery/chatroom/ranking'
import MoreChat from '@/components/lottery/chatroom/moreChat'
import OldMessage from '@/components/lottery/chatroom/oldMessage'
import friendList from '@/components/lottery/chatroom/friendList'
import Notice from 'Components/lottery/chatroom/notice'
import { mapState, mapGetters } from 'vuex'
export default {
  inject: ['reload'],
  name: 'demo',
  data () {
    return {
      test: 100,
      roomTitleActive: null,
      myMessageShow: 0
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      }
    })
  },
  watch: {
    // 监听当前选中
    '$store.state.chatRoom.roomTitleActive' (newVal) {
      if (newVal === 0) {
        this.roomTitleActive = newVal
        this.chatRoom.roomTitleActive = 9
      }
    }
  },
  methods: {
    titleActive (val) {
      this.roomTitleActive = val
      switch (val) {
        case 0:
          this.chatRoom.BettingPalettePlay = true
          break
        case 1:
          break
        case 2:
          break
        case 3:
          break
      }
      if (val !== 0) {
        if (this.chatRoom.roomNmae) {
          this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + this.chatRoom.roomNmae + "'}")
          this.chatRoom.roomNmae = ''
        }
      }
    }
  },
  created () {
    /**
     * 问题组件： room.vue
     * 问题描述： 在聊天室刷新页面组件数据无法及时显示
     * 问题判断： 猜测可能是页面刷新时webSocket正在连接中,而room组件却已经再做数据处理了导致数据加载异常
     * 临时处理： 延迟载入room组件后 组件数据状态恢复正常
     * 处理建议： 要想彻底解决该问题，需要在先对webSocket链接判断 成功链接后再加载数据
     * webSocket链接页面：@/store/index.js row：553
     */
    setTimeout(() => {
      this.roomTitleActive = 0
    }, 500)
  },
  components: {
    Room,
    Ranking,
    MoreChat,
    OldMessage,
    Notice,
    friendList
  }
}
</script>

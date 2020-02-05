<template>
  <section style="height: 100vh; position: relative;">
    <Head fixed :backHandler="backHandler">
      <h3 class="room-head-h3">
        {{ GameActive && GameActive.name }}
      </h3>
      <a class="room-btn" style="right: 12%;">rule</a>
      <a class="room-btn" style="right: 0;">red</a>
    </Head>

    <Room class="room-gap" ref="roomMain">
      <!-- 右侧 -->
      <RoomFix></RoomFix>
    </Room>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import Room from 'Components/chatroom/room'
import RoomFix from 'Components/chatroom/roomFix'
import {
  // mapState,
  mapGetters,
  mapActions
} from 'vuex'
import { leaveRoomApi, enterRoomApi } from 'Plugins/api'
const RoomEntryStatus = 'entry' // 已进入房间状态
const RoomLeaveStatus = 'leave' // 已离开房间状态

export default {
  name: 'game-room',
  data () {
    return {
      roomTitle: ''
    }
  },
  components: {
    Head,
    Room,
    RoomFix
  },
  computed: {
    ...mapGetters(
      'ChatRoom', [ 'RoomInfo', 'GameActive', 'RoomStatus' ]
    ),
    ...mapGetters([ 'WsConfig' ])
  },
  created () {
    // console.log('create')
    if (
      !this.GameActive ||
      !this.GameActive.id
    ) {
      // 房间信息失效
      this.routerLink({
        path: '/malls/gameMall'
      })
    }
    // 访问时判断是否有进入的房间，重新进入房间
    // 先退出再进入
    console.log(this.GameActive, this.RoomInfo.status, this.RoomStatus)
    if (
      this.GameActive &&
      this.GameActive.id &&
      this.RoomStatus !== RoomEntryStatus
      // this.RoomStatus === RoomEntryStatus
    ) {
      console.log(this.GameActive, '刷新页面')
      // this.reloadRoom()
    }
  },
  directives: {
    pageClick: {
      // 全局点击
      inserted: function (el) {
        console.log(el)
        // this.$roomCtrl.closeSendBox()
        el.ontouchend = function (e) {
          console.log(e, 'e v e n t')
        }
      }
    }
  },
  methods: {
    ...mapActions(
      'ChatRoom', [ 'setRoomInfo' ]
    ),
    init () {
      console.log('init')
    },
    async backHandler () {
      const { category, id } = this.GameActive
      const { code } = await leaveRoomApi({
        type: category,
        roomId: id
      })

      if (code === 0) {
        this.setRoomInfo({
          // init: null,
          active: {},
          status: RoomLeaveStatus // 房间状态，离开房间
        })
        this.$router.go(-1)
      } else {
        this.warnMsgs('网络异常，请刷新')
      }
    },
    async reloadRoom () {
      // room init msg
      const {
        category,
        id,
        needPassword,
        password
      } = this.GameActive
      const le = await leaveRoomApi({
        type: category,
        roomId: id // 房间ID
      })
      if (le.code !== 0) {
        return
      }

      const en = await enterRoomApi({
        type: category,
        roomId: id, // 房间ID
        password: needPassword ? password : null
      })
      if (en.code !== 0) {
        return
      }

      // 存 room info 信息
      this.setRoomInfo({
        status: RoomEntryStatus // 房间状态，已进入房间
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.room-gap {
  margin-top: calc(1.125rem - 3px);
  position: relative;
}
.room-head-h3 {
  text-align: left;
  width: 64%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 12%;
}
.room-btn {
  width: 12%;
}
</style>

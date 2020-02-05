<template>
  <section>
    <Head fixed>
      <h3>{{ gameTitle || '游戏' }}</h3>
      <a class="game-rule" @click="toPlayRule">玩法规则</a>
    </Head>

    <div class="tabs-ul">
      <ul>
        <li
          v-for="(item, i) in roomTabs"
          :key="i + '-game-tab'"
          @click="clickSwitch(item, i)"
          :class="{ active: i === tabInx }"
        >
          <img :src="item.imgUrl || '/mobile/img/icon_loading_Normal1.png'">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>

    <div class="tabs-content" v-if="roomContents.length > 0">
      <div
        v-for="(e, i) in roomContents"
        :key="i + '-game-box'"
        @click="enterGame(e)"
        class="tabs-box"
      >
        <!-- {{ e }} -->
        <img :url="e.icon || '/mobile/img/icon_loading_Normal1.png'">
        <h3>{{ e.name }}</h3>
        <h4>{{ e.describe }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import {
  getRoomListApi,
  enterRoomApi
} from 'Plugins/api'
import {
  // mapState,
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'gameContent',
  components: {
    Head
  },
  data () {
    return {
      gameTitle: '',
      tabInx: 0,
      roomTabs: [],
      roomContents: []
    }
  },
  computed: {
    ...mapGetters([
      'User',
      'WsConfig',
      'GameConfig'
    ]),
    ...mapGetters(
      'ChatRoom', [ 'RoomInfo', 'GameActive' ]
    )
  },
  created () {
    // console.log('content')
    const { active, list } = this.GameConfig
    const { query } = this.$route
    // console.log(active, list, this.$route)
    this.gameTitle = query.gameTitle || '游戏'
    document.title = this.gameTitle || '游戏'

    if (active && active.id) {
      // this.contents = list
      this.roomTabs = list
      this.tabInx = list.findIndex(item => item.id === active.id)
      // url
      // console.log(this.contents[this.tabInx])
      this.init()
    } else {
      this.routerLink({
        path: '/malls/gameMall'
      })
    }
  },
  methods: {
    ...mapActions(
      'ChatRoom', [ 'setRoomInfo' ]
    ),
    ...mapActions([ 'setGameConfig' ]),
    async init () {
      // active game tabs
      const { active } = this.GameConfig
      // 别名字段 url
      const { code, data } = await getRoomListApi(active.url)
      if (code === 0) {
        this.roomContents = data
        // 保存房间列表
        this.setRoomInfo({
          glist: data
        })
      }
    },
    clickSwitch (item, i) {
      // console.log(item, i)
      if (i === this.tabInx) {
        return
      }
      this.tabInx = i
      this.setGameConfig({
        active: item
      })
      this.init()
    },
    checkRoomKeys (room) {
      // 检查密码
      if (!room.needPassword) {
        return true
      }

      return true
    },
    async enterGame (item) {
      // 验证登录
      if (
        this.User &&
        this.User.socketToken &&
        this.WsConfig.websocket
      ) {
        // 判断房间是否有密码
        if (!this.checkRoomKeys(item)) {
          return
        }

        // loading
        const load = this.$loading({
          lock: true,
          text: '跳转中...'
        })

        // 调用进入房间
        const { code } = await enterRoomApi({
          'type': item.category,
          'roomId': item.id, // 房间ID
          'password': item.needPassword ? item.password : null
        })
        // console.log(code)
        if (code !== 0) {
          // this.warnMsgs('请重新登录~')
          setTimeout(() => {
            load.close()
          }, 1000)
          return
        }

        if (code === 0) {
          // 存 room info 信息
          this.setRoomInfo({
            // init: item,
            active: item,
            status: 'entry' // 房间状态，已进入房间
          })
          // console.log(this.RoomInfo, this.GameActive)

          setTimeout(() => {
            // console.log('game detail', item)
            // console.log(this.RoomInfo)
            load.close()
            this.routerLink({
              path: '/malls/gameRoom',
              params: {
                gameTitle: item.name
              }
            })
          }, 1000)
        }
      } else {
        this.warnMsgs('请重新登录~')
        setTimeout(() => {
          this.routerLink({
            path: '/login'
          })
        }, 1200)
      }
    },
    toPlayRule () {
      console.log('go to play rule')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.game-rule {
  position: absolute;
  right: 5px;
  font-size: 13px;
  width: 18%;
  // top: calc(1.125rem / 2 - 10px);
}

.tabs-ul {
  position: relative;
  font-size: 0;
  margin-top: 1.125rem;
  // border-bottom: 1px solid #eee;
  ul {
    display: block;
    overflow-x: auto;
    // width: 300px;
    overflow-y: hidden;
    white-space: nowrap;
  }

  li {
    // display: inline-block;
    // width: 25%;
    // margin-right: 8px;
    // width: 80px;
    // float: left;
    display: inline-block;
    width: calc(100vw / 4);
    text-align: center;
    background: #fff;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    &:active {
      background: #f9f9f9;
    }
    img {
      display: block;
      width: 40px;
      padding-left: 50%;
      margin-left: -20px;
      margin-top: 5px;
    }
    span {
      display: block;
      line-height: 24px;
      height: 24px;
      // padding: 0 8px;
      font-size: 13px;
      box-sizing: border-box;
    }
    &:last-child {
      margin-right: 0;
    }

    &.active {
      border-bottom: 2px solid $baseRed;
      span {
        color: $baseRed;
      }
    }
  }
}

.tabs-content {
  // padding: 6px;
  background: #fff;
  max-height: calc(100vh - 1.125rem - 72px);
  overflow-y: auto;
  overflow-x: hidden;

  .tabs-box {
    // margin: 6px 0px;
    // margin-bottom: 6px;
    // &:last-child {
    //   margin-bottom: 0;
    // }
    overflow: hidden;
    padding: 10px;
    border-bottom: 1px solid #eee;
    > img {
      width: 44px;
      height: 44px;
      border-radius: 3px;
      float: left;
      margin-right: 8px;
    }
    h3 {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    h4 {
      font-weight: 100;
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

// /deep/ .el-card {
//   border-radius: 8px;
// }

// /deep/ .el-card__body {
//   line-height: 16px;
//   padding: 12px 16px;
//   color: #fff;
//   h2 {
//     line-height: 26px;
//   }
//   h5 {
//     line-height: 24px;
//     font-size: 12px;
//   }
// }
</style>

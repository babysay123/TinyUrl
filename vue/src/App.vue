<template>
  <div id="app" class="wrap" v-cloak>
    <router-view v-if="isShow"/>
    <!-- <Notice /> -->
  </div>
</template>

<script>
// import Notice from 'Components/global/notice.vue'
import {
  mapActions,
  mapGetters
  // mapState
} from 'vuex'
export default {
  name: 'App',
  // components: { Notice },
  provide () {
    return {
      loading: null,
      reload: this.reload
      // musicSto: this.Utils.Storage.get('music')
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  computed: {
    ...mapGetters([ 'WsConfig' ])
    // ...mapState({
    //   chatRoom (state) {
    //     return state.chatRoom
    //   },
    //   init (state) {
    //     return state.chatRoom.init
    //   }
    // })
  },
  methods: {
    // ...mapActions([ 'getSystemConfig', 'openHeartbeat', 'getNewAccessToken', 'websocket' ]),
    ...mapActions([
      'LinkWS'
    ]),
    reload () {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  },
  beforeCreate () {
    // this.loading = this.$indicator.open({
    //   text: '努力加载中...',
    //   spinnerType: 'fading-circle'
    // })
    // 判断是否有devid
    // console.log('utils', this.Utils)

    this.loading = this.$loading({
      lock: true,
      text: '努力加载中...'
      // spinner: 'el-icon-loading'
      // background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  async created () {
    // device id
    const { Storage } = this.Utils
    const deviceId = Storage.get('deviceId') || null
    if (!deviceId) {
      // 随机生成32位，保存一周
      const deviceId = this.randomWord(32)
      Storage.save('deviceId', deviceId, 7 * 24 * 60 * 60)
    }
    // 链接socket 每次页面刷新
    await this.LinkWS()

    // // 每次打开页面，都会清楚公告缓存
    // this.Utils.Storage.remove('noticeRead')
    // 获取系统配置
    // this.getSystemConfig()
    // this.openHeartbeat()
    // this.$indicator.close(this.loading)
    // await this.getNewAccessToken()
    // await this.websocket()

    setTimeout(() => {
      this.loading.close()
    }, 400)
  },
  mounted () {
    // 退出房间，延时发送，先完成连接socket
    // setTimeout(() => {
    //   if (this.chatRoom.ws) {
    //     let requestData = {
    //       'event': 'leaveRoom',
    //       'data': '08bd1006-9c77-448a-a709-0108979999b'
    //     }
    //     this.chatRoom.ws.send(JSON.stringify(requestData))
    //   }
    // }, 500)
  }
}
</script>
<style lang="scss">
  // @import './assets/css/common.scss';
  @import './assets/fonts/font-awesome.min.css';
  // #app {
  //   padding: 0px;
  //   margin: 0px;
  //   position: absolute;
  //   top: 0px;
  //   left: 0px;
  //   width: 100%;
  //   height: 100%;
  //   border: hidden;
  // }
  // @import "./assets/css/style.css";
  /* @import "./assets/css/init.css";*/
  // #app {
  //   height: 100%;
  // }
</style>

<template>
  <div id="app" class="wrap" v-cloak>
    <router-view v-if="isShow"/>
    <!-- <Notice /> -->
  </div>
</template>

<script>
// import Notice from 'Components/global/notice.vue'
// import { mapActions, mapState } from 'vuex'
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
  // computed: {
  //   ...mapState({
  //     chatRoom (state) {
  //       return state.chatRoom
  //     },
  //     init (state) {
  //       return state.chatRoom.init
  //     }
  //   })
  // },
  methods: {
    // ...mapActions([ 'getSystemConfig', 'openHeartbeat', 'getNewAccessToken', 'websocket' ]),
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
  },
  async created () {
    // // 每次打开页面，都会清楚公告缓存
    // this.Utils.Storage.remove('noticeRead')
    // 获取系统配置
    // this.getSystemConfig()
    // this.openHeartbeat()
    // this.$indicator.close(this.loading)
    // await this.getNewAccessToken()
    // await this.websocket()
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
  @import './assets/css/common.scss';
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

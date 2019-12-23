
<template>
  <section style="margin-top: 1.125rem; padding-bottom: 49px;">
    <!-- <Head :back="false" fixed> -->
      <!-- <a v-if="!isLogin" class="menu-left" @click="routerLink({ path: '/login' })">登录</a> -->
      <!-- <a v-if="!isLogin" class="menu-right" @click="routerLink({ path: '/register' })">注册</a> -->
    <!-- </Head> -->
    <!-- <Carousel /> -->
    <!-- <GameTabs /> -->
    <!-- <Pop
      :showToasts="popShows"
      @toggleToast="toggleToast"
    >
      <Collapse :collList="collList" />
    </Pop> -->
    <!-- <SendRed /> -->
    <!-- <RedDetail /> -->
    <NavBottom />
  </section>
</template>

<script>
import Head from 'Components/global/head'
// import Tab from 'Components/index/tab'
// import DividerTitle from 'Components/index/dividerTitle'
// import Carousel from 'Components/index/carousel'
// import BannerNotice from 'Components/index/bannerNotice'
// import Dragon from 'Components/lottery/chatroom/module/dragon'
import Pop from 'Components/global/all-pop'
import Collapse from 'Components/global/all-collapse'
// import GameTabs from 'Components/index/gameTabs'
// import RedDetail from 'Components/game/redDetail'
import SendRed from 'Components/game/sendRedBag'
import NavBottom from 'Components/global/nav-bottom'
// import GenerEarn from 'Components/index/generEarn'
// import { noticeApi, transferMoney } from 'Plugins/api'
// import { mapGetters, mapActions } from 'vuex'
// import { Toast } from 'mint-ui'
// import { Button } from 'element-ui'

export default {
  name: 'demo',
  components: {
    Head,
    // Carousel,
    // BannerNotice,
    // GameTabs,
    Pop,
    Collapse,
    SendRed,
    // RedDetail,
    NavBottom
    // Dragon,
    // Tab,
    // GenerEarn,
    // DividerTitle
  },
  data () {
    return {
      tabs: 0,
      title: this.Utils.Storage.get('buyMallTile'),
      notices: [],
      // records: [],
      dragon: false,
      navType: '',
      onlyShowGame: false,
      userBalance: null,
      refreshSty: false,
      // 弹窗组件
      popShows: true,
      // 折叠组件
      collList: []
    }
  },
  computed: {
    // ...mapGetters(['system_config']),
    downloadUrl () {
      // guide 下载页的平台
      let exspecial = ['cp01', 'ycw', 'mcp', 'honghui']
      return exspecial.includes(this.Utils.package)
        ? '/guide/download.html'
        : '/mobile/other/download.html'
    },
    isLogin () {
      return (
        this.Utils.Storage.get('user') && this.Utils.Storage.get('sessionid')
      )
    },
    showDragon () {
      return this.system_config.status && this.system_config.status.dragonStatus === 'open'
    }
  },
  methods: {
    // ...mapActions(['refreshUserInfo']),
    toLink (item) {
      // if (item.text === '在线客服') {
      //   this.$store.commit('voice', 'service')
      // } else if (item.text === '充值存款') {
      //   this.$store.commit('voice', 'recharge')
      // }
      (item.callback && item.callback()) ||
        this.routerLink({
          path: !this.isLogin && item.needLogin ? '/login' : item.link,
          redirect: !this.isLogin && item.needLogin ? false : item.redirect
        })
    },
    async getData () {
      // const res = await noticeApi()
      // const gameTabs = this.system_config && this.system_config.gameSwitch
      // if (gameTabs == null) { this.isTestPlay = true; return }

      // if (!gameTabs.game.switchFlag) {
      //   // this.onlyShowGame = true
      //   this.onlyShowGame = false
      // } else {
      //   this.onlyShowGame = false
      // }
      // // const tabs = await indexTabsApi()
      // const { notices, records } = res.data
      // this.notices = notices
      // this.records = records
      // console.log(tabs)
    },
    toggleToast () {
      this.popShows = !this.popShows
      // this.clearPop()
    },
    setNavType (type) {
      this.navType = type === 'lottery' ? type : 'game'
    },
    async refresh () {
      // this.refreshSty = true
      // // 转出
      // const { code } = await transferMoney({ 'transferStatus': 2 }, { type: 'notips' })
      // if (code === 0) {
      //   await this.refreshUserInfo()
      //   this.userBalance = this.isLogin ? this.Utils.Storage.get('user').balance.toFixed(2) : null
      // }
      // this.refreshSty = false
      // // Toast({
      // //   message: `正在${data.platformName ? data.platformName : data.fromPlatformName}中进行游戏，请结束后再尝试刷新`,
      // //   duration: 1200
      // // })
      // // refresh userinfo
    },
    navClass () {
      let _c = 'index-panel-block'
      let _inxClean = -1
      _inxClean = this.panel.findIndex(e => e.link === '/cleanCode')
      if (_inxClean > -1) {
        _c = 'index-panel-block smaller'
      }
      return _c
    }
  },
  created () {
    // this.getData()
    // this.userBalance = this.isLogin ? this.Utils.Storage.get('user').balance.toFixed(2) : null
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.index-panel {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  height: 74px;
  border-top: 1px solid #f5f4f9;
  border-bottom: 1px solid #f5f4f9;
  background: #fff;
  margin-bottom: 10px;
  .user-panel {
    flex: 2;
    width: 40%;
    text-align: center;
    // height: 59px;
    .login {
      overflow: hidden;
      margin-top: 5px;
      a.visitor {
        padding: 2px 6px;
        line-height: 22px;
        border: 1px solid $baseRed;
        color: $baseRed;
        border-radius: 6px;
        cursor: pointer;
      }
      .balance {
        color: $baseRed;
        cursor: pointer;
        font-size: 13px;
        vertical-align: middle;
        line-height: 15px;
      }
    }
  }
  .index-panel-block {
    width: 20%;
    text-align: center;
    &.smaller {
      width: 18%;
    }
  }
  img {
    width: 32px;
    margin-bottom: 2px;
  }
  p {
    font-size: 14px;
  }
}
</style>

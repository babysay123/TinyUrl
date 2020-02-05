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
.refresh {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
  -o-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate {
  from { -webkit-transform: rotate(0deg) }
  to { -webkit-transform: rotate(360deg) }
}
@-moz-keyframes rotate {
  from { -moz-transform: rotate(0deg) }
  to { -moz-transform: rotate(359deg) }
}
@-o-keyframes rotate {
  from { -o-transform: rotate(0deg) }
    to { -o-transform: rotate(359deg) }
}
@keyframes rotate {
  from{ transform: rotate(0deg) }
  to{ transform: rotate(359deg) }
}

</style>

<template>
  <section style="margin-top: 1.125rem; padding-bottom: 49px;">
    <Head :back="false" fixed>
      <a v-if="!isLogin" class="menu-left" @click="routerLink({ path: '/login' })">登录</a>
      <a
        style="left: 16%;"
        @click="routerLink({
          path: downloadUrl,
          params: $route.query.c ? `?c=${$route.query.c}` : null,
          redirect: true
        })
      "
      >
        App
        <i class="fa fa-cloud-download fa-fw"/>
      </a>
      <h2>
        <img src="/mobile/images/index/logo-word.png">
      </h2>
      <a v-if="!isLogin" class="menu-right" @click="routerLink({ path: '/register' })">注册</a>
    </Head>
    <!-- <Carousel /> -->
    <!-- <BannerNotice :data="notices"/> -->
    <div class="index-panel">
      <div class="user-panel" v-if="navType === 'game'">
        <p>账户余额</p>
        <div class="login">
          <a class="visitor" v-if="!isLogin" @click="routerLink({ path: '/login' })">请登录</a>
          <div v-else class="balance" @click="refresh">
            ￥{{ userBalance }}
            <i class="fa fa-refresh fa-fw" :class="{'refresh': refreshSty}"/>
          </div>
        </div>
      </div>
      <div
        :class="navClass()"
        v-for="p in panel"
        :key="p.text"
        @click="toLink(p)"
      >
        <img :src="p.icon">
        <p>{{ p.text }}</p>
      </div>
    </div>
    <el-row>
      <el-button icon="el-icon-search"></el-button>
      <el-button type="danger" icon="el-icon-delete"></el-button>
    </el-row>
    <GameTabs />
    <Pop
      :showToasts="popShows"
      @toggleToast="toggleToast"
    >
      <Collapse :collList="collList" />
    </Pop>
    <!-- <Dragon v-if="showDragon && dragon" @closeDragon="dragon = false"/> -->

    <!-- 彩票-棋牌切换 -->
    <!-- <Tab @setNavType="setNavType" :onlyGame="onlyShowGame"/> -->

    <!-- <GenerEarn /> -->
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
import Pop from 'Components/global/allPop'
import Collapse from 'Components/global/allCollapse'
import GameTabs from 'Components/game/gameTabs'
import NavBottom from 'Components/global/navBottom'
// import GenerEarn from 'Components/index/generEarn'
// import { noticeApi, transferMoney } from 'Plugins/api'
// import { mapGetters, mapActions } from 'vuex'
// import { Toast } from 'mint-ui'
// import { Button } from 'element-ui'

export default {
  components: {
    Head,
    // Carousel,
    // BannerNotice,
    GameTabs,
    Pop,
    Collapse,
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
    },
    panel () {
      // const { customerServiceType, customerServiceUrl } = this.system_config.status || {}
      // let serviceUrl = customerServiceUrl
      // if (customerServiceType === 'THIRDPARTY') {
      //   if (
      //     customerServiceUrl.indexOf('qq') > -1 ||
      //     customerServiceUrl.indexOf('wqa') > -1
      //   ) {
      //     serviceUrl = `/mobile/other/openQQ.html?${
      //       customerServiceUrl.match(/uin=[0-9]*/)[0]
      //     }`
      //   }
      //   if (customerServiceUrl.search('{name}') > -1) {
      //     const account = this.isLogin
      //       ? encodeURI(this.Utils.Storage.get('user').account)
      //       : encodeURI('游客')
      //     serviceUrl = customerServiceUrl.split('{name}')[0] + account
      //   }
      // } else {
      //   serviceUrl = '/mobile/service/serviceOnline.html'
      // }
      let panelArr = [
        {
          show: 'lottery',
          icon: '/mobile/images/index/home_icon_dragon@2x.png',
          text: '长龙助手',
          callback: () => {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.dragon = true
          }
        },
        {
          show: 'game',
          icon: '/mobile/images/index/home_icon_clean@2x.png',
          text: '洗码',
          link: '/cleanCode',
          needLogin: true
        },
        {
          show: 1,
          icon: '/mobile/images/index/home_saveImg@2x.png',
          text: '充值存款',
          link: '/rechargeList',
          needLogin: true
        },
        {
          show: 'game',
          icon: '/mobile/images/new/app/home_icon_tip@3x.png',
          text: '提现',
          link: '/mobile/mine/withdrawals.html',
          redirect: true,
          needLogin: true
        },
        {
          show: 'lottery',
          icon: '/mobile/images/index/profile_bet_record@2x.png',
          text: '我的注单',
          link: '/orderList',
          needLogin: true
        },
        {
          show: 'lottery',
          icon: '/mobile/images/index/home_activiImg@2x.png',
          text: '开奖',
          link: '/mobile/studio/#/resultList',
          redirect: true
        },
        {
          show: 1,
          icon: '/mobile/images/index/icon_zaixiankefu@2x.png',
          text: '在线客服',
          // link: serviceUrl,
          link: '/mobile/studio/#/mine/onlineService',
          redirect: true
        }
      ]
      // console.log(this.showDragon)
      // 长龙开关
      // return this.showDragon ? panelArr : panelArr.slice(1)
      return panelArr.filter(e => e.show === this.navType || e.show === 1)
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

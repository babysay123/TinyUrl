<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-11 21:06:23
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.grayTaxt {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 200;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
.buy-mall {
  margin-top: 1.125rem;
  margin-bottom: 49px;
  background: #fff;
  .mint-navbar {
    overflow-x: auto;
    overflow-y:hidden;
  }
  .cp.mint-navbar {
      background: #fff;
      border-bottom: 1px solid #eee;
  }
  .game-nav .cp.mint-navbar .mint-tab-item {
    float: left;
    max-width: 20%;
  }
  .game-nav .cp.mint-navbar .mint-tab-title {
    max-width: 18.18%;
  }
  .cp {
    &::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
    /*定义滚动条高宽及背景*/
    &::-webkit-scrollbar
    {
      height:0;
        background-color: transparent
    }
    /*定义滚动条*/
    &::-webkit-scrollbar-thumb
    {
        background-color: transparent;
    }
    .mint-tab-item-label {
      position: relative;
      display: inline-block;
    }
    scroll-behavior: smooth;
    .is-selected {
      .mint-tab-item-label {
        // color: #fff;
        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          background-color: #fff;
          bottom: 5px;
          position: absolute;
        }
      }
    }
  }
  .text {
    width: 4em;
  }
}
.buy-mall .mint-navbar.is-fixed {
  top: 1.125rem;
}
.buy-mall .mint-navbar .mint-tab-item {
  padding: 0;
  // height: 35px;
  line-height: 35px;
  min-width: 18.18%;
}
.buy-mall .cp-style .mint-tab-container {
  background: #f5f4f9;
  padding-top: 73px;
  // margin-bottom: 48px;
}
.menu-right-icon {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
}
a.mint-tab-item {
  color: currentColor;
}

.buyMall-tile-container {
  padding: 12px 12px 0;
}

.buyMall-container {
  height: calc(100vh - 1.125rem - 85px - 37px);
  overflow-y: auto;
  // 全屏好像有问题，再说吧
  &.full {
    height: calc(100vh - 1.125rem);
    padding: 12px;
    position: fixed;
    width: 100vw;
    top: 1.125rem;
    left: 0;
    z-index: 11;
  }
}

.kind {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &.manyNav{
    justify-content: flex-start;
    padding-left: 1rem;
    .type{
      width: 75%;
      a{
        font-size: 15.4px;
      }
    }
  }
}
.type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.type a:only-child {
  border: none;
  background: $baseCol;
}
.type a {
  width: 25%;
  font-size: 16px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.8;
  background: $baseCol;
  color: #fff;
  border-right-width:0;
}
.type a:first-child {
  border-radius: 5px 0 0 5px;
}
.type a:last-child {
  border-radius: 0 5px 5px 0;
  border-right-width:1px;
}
.bg {
  background: #fff !important;
  color: $baseCol !important;
}
.text {
  position: absolute;
  right: 13px;
}
.qipai {
  .mint-tab-container {
    padding-top: 0;
  }
  .mint-navbar {
    text-align: initial;
  }
  .mint-tab-container {
    background: #fff;
  }
  .mint-tab-item.is-selected{
    margin-bottom: 0 !important;
  }
}

.qipai .p1 {
  background: $baseCol;
}
.qipai .p1 .mint-tab-item {
  color: #fff;
  padding-left: 20px;
  flex: unset;
}
.qipai .mint-navbar.p1 .mint-tab-item.is-selected {
  color: #fff !important;
}
.qipai .p1 a.mint-tab-item .mint-tab-item-label {
  display: inline-block;
}

.qipai .p1 a.mint-tab-item.is-selected .mint-tab-item-label {
  position: relative;
  &:after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background: currentColor;
    bottom: 5px;
  }
}
.qipai .subNav {
  border-bottom: 1px solid #cccccc;
  padding: 5px 0;
}
.qipai .subNav .mint-tab-item {
  height: 20px;
  display: inline-block;
  flex: unset;
  padding: 0 5px;
  line-height: 20px;
  margin-left: 20px;
}
.qipai .subNav .mint-tab-item .mint-tab-item-label {
  font-size: 8px !important;
  text-align: center;
}
.qipai .mint-navbar.subNav .mint-tab-item.is-selected {
  color: #fff !important;
  border-radius: 25px;
  background: $baseCol;
}
.mint-tab-item-label div{
  width: 30px;
  height: 26px;
  margin: auto;
  margin-top: 10px;
  img{
    width: 100%;
  }
}

.gameList{
  width: 100%;
  ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    margin-bottom: 10px;
    li {
      width: 24%;
      img {
        // width:100%;
        width: 80%;
        margin: 10px 10% 0 10%;
      }
    }
  }
}
.contHei img {
  max-height: 118px;
}
.contHei li {
  position: relative;
}
#container img {
  max-height: 175px;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>

<template>
  <section class="buy-mall">
    <Head :back="isGameTitle" fixed>
      <div class="kind" :class='{manyNav:mainNavNum >= 5}' v-if="!isGameTitle">
        <div class="type">
          <template v-if="isTestPlay || dataList.length === 0">
            <a href="javascript:void(0);">游戏大厅</a>
          </template>
          <template v-else-if="onlyLottery">
            <a href="javascript:void(0);">{{ lotteryTitle }}</a>
          </template>
          <template v-else-if="!getChessList.length">
            <a href="javascript:void(0);"> 彩票 </a>
          </template>
          <template v-else-if="isOnlyLottery">
            <a href="javascript:void(0);"> 棋牌游戏 </a>
          </template>
          <template v-else v-for="(item, index) in gameType">
            <a :key="index" href="javascript:void(0)" :class="{'bg':navTab === index}" @click="navTab = index" >
              {{ item.name }}
            </a>
          </template>
        </div>
      </div>
      <h3 v-else>
        {{titleName}}
      </h3>
      <img class="menu-right-icon" :src="tileModelIcon" @click="changeTile" v-if = "navTab !== 1">
      <!-- <router-link to="/AmountConver" class="text" v-if = "navTab === 1 && isPlay">额度转换</router-link> -->
    </Head>
    <div v-if="dataList.length > 0">
      <!-- 彩种部分 -->
      <div v-show="navTab === 0" class="cp-style">
        <mt-navbar class="cp" v-model="tabs" fixed  v-show="!isGameTitle">
          <mt-tab-item
            v-for="(l, index) in tabsArr"
            @click.native="showCurrentTab(index)"
            :key="index"
            :id="index"
          >
          <div>
            <img :src="l.imageUrl">
          </div>
          {{ l.name }}
          </mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="tabs" :style="isGameTitle ? 'padding-top: 0;' : ''">
          <mt-tab-container-item v-for="(a, index) in tabsArr" :key="index" :id="index">
            <GameCard :isGameTitle="isGameTitle" :tile="!tile" :type="a.type" :type-name="a.typeName"/>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <!-- 棋牌部分 -->
      <div v-show="navTab === 1" class="game-nav">
        <mt-navbar v-model="selected" class="p1 cp">
          <!-- v-if="tmp.platformType !== 'lottery'" -->
          <mt-tab-item
            v-for="(tmp, index) of getChessList.filter(e => e.platformType !== 'lottery')"
            :key="index"
            :id="index"
            @click.native="navChess(index, tmp)"
            :class="getChessList.length > 5 ? 'mint-tab-title' : ''"
          >
            <!-- <div><img :src="tmp.imageUrl"></div> -->
            <div>
              <img v-lazy="tmp.imageUrl ? tmp.imageUrl.replace('.png', '_small.png') : tmp.imageUrl">
            </div>
            {{ tmp.title }}
          </mt-tab-item>
        </mt-navbar>
        <div class="gameList" v-if="!child">
          <mt-tab-container v-model="selected">
            <mt-tab-container-item v-for="(a, index) in getChessList" :key="index" :id="index">
              <ul id="container">
                <li
                  v-for="(item,i) in total"
                  :key="i"
                  style="position: relative;"
                  :style="item.gameCode === 'TASSPTA' ? 'width:100%' : 'width:25%'"
                  @click="item.enable ? play(item) : maintenance()"
                >
                  <div v-if="!item.enable" class="grayTaxt">维护中</div>
                  <img v-lazy="item.url" alt="gameImg" :class="item.enable?'':'gray '">
                </li>
              </ul>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
        <div class="gameList" v-else>
          <mt-tab-container v-model="selected">
            <mt-tab-container-item v-for="(a, index) in getChessList" :key="index" :id="index">
              <ul class="contHei">
                <li
                  v-for="(item,i) in total"
                  :key="i"
                  :style="(total.length < 4) || (item.platformCode==='kaiyuan') ? 'width:100%' : 'width:50%'"
                  @click="item.enable ? toSlide(item.platformCode, item.name) : maintenance()"
                >
                  <div v-if="!item.enable" class="grayTaxt">维护中</div>
                  <img
                    v-lazy="item.imageUrl ? total.length < 4 ? item.imageUrl.replace('.png', '_horizontal.png') : item.imageUrl : ''"
                    :style="total.length < 4 ? 'width: 94%; margin: 5px 3% 0 3%;' : ''"
                    :class="item.enable?'':'gray '"
                  >
                </li>
              </ul>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </div>
    <emptyData v-else type="list" title="游戏暂时没有开启，敬请期待"/>
    <NavBottom v-if="!isGameTitle"/>
  </section>
</template>

<script>
import Head from 'Components/global/head'
// import { getNavigatorApi,getNavigatorApi } from 'Plugins/api/buyMall'
import { getGameSwitchApi, getHallInfosApi, getPlatformApi, getGameDetailsApi, loginGameApi, transferMoney, userInfoApi } from 'Plugins/api'
import Chess from 'Components/index/chess'
import NavBottom from 'Components/global/nav-bottom'
import RefreshLoad from 'Components/global/refreshLoad'
import emptyData from 'Components/global/emptyData'
import GameCard from 'Components/buyMall/gameCard.js'
import { mapActions, mapGetters } from 'vuex'
import { Toast, Indicator } from 'mint-ui'

export default {
  components: { Head, NavBottom, RefreshLoad, GameCard, Chess, emptyData },
  data () {
    return {
      tabs: 0,
      tile: this.Utils.Storage.get('buyMallTile'),
      selected: 0,
      chess: 'k00',
      getChessList: [],
      gameType: {},
      isPlay: true,
      isTestPlay: false,
      navTab: 0,
      lotteryTitle: '',
      mainNavNum: 1,
      onlyLottery: true,
      Onenav: 'chess', // 一级导航传值
      TwoNav: 'kaiyuan', // 二级导航传值,
      once: 20,
      total: 0,
      child: false,
      platformCode: null,
      tabsArr: '',
      isGameTitle: false, // 控制标题内容,
      dataList: [], // 标题数组 判断数据开启转状态
      isOnlyLottery: false,
      titleName: ''
    }
  },
  computed: {
    ...mapGetters(['system_config']),
    tileModelIcon () {
      return this.tile ? '/mobile/images/bet/head_button_switch1@2x.png' : '/mobile/images/bet/head_button_switch@2x.png'
    }
  },
  methods: {
    ...mapActions(['initGameInfo']),
    getTabsArr () {
      getPlatformApi({ platformType: 'lottery', type: 1 }).then(res => {
        if (res.code === 0) {
          res.data.data.map(data => {
            switch (data.platformCode) {
              case 'appAthletics':
                data.type = 'j'
                break
              case 'appAllLottery' :
                data.type = 'all'
                break
              case 'appThree':
                data.typeName = 'ArrangeThree|ThreeD|FrequentHappy'
                data.type = ''
                break
              case 'appSevenStar':
                data.typeName = 'SevenStar'
                data.type = ''
                break
              case 'appElevenPickFive':
                data.typeName = 'PickFive'
                data.type = ''
                break
              case 'appSixMark':
                data.typeName = 'SixMark'
                data.type = ''
                break
              case 'appPK10':
                data.typeName = 'PK10'
                data.type = ''
                break
              case 'appFrequentLottery':
                data.typeName = 'FrequentLottery'
                data.type = ''
                break
              case 'appPCEggs':
                data.typeName = 'PCEgg|Luck'
                data.type = ''
                break
              case 'appQuickThree':
                data.typeName = 'QuickThree'
                data.type = ''
                break
            }
          })
          this.tabsArr = res.data.data
          this.getUrlCode(res.data.data)
        }
      })
    },
    getUrlCode (data) {
      if (!this.$route.query.CodeType) return
      this.isGameTitle = true
      data.map((e, i) => {
        if (e.platformCode === this.$route.query.CodeType) {
          this.tabs = i
          this.titleName = e.name
        }
      })
    },
    maintenance () {
      Toast({
        message: '此游戏正在维护中',
        duration: 1000
      })
    },
    toSlide (gameCode, gameName) {
      this.$router.push({
        path: '/gameList',
        query: { Type: this.Onenav, CodeType: gameCode, Name: gameName }
      })
    },
    getuserinfo () {
      userInfoApi().then(v => {
        this.$store.commit('updateUserInfo', v.data)
      })
    },
    async getTransferMoney (item) {
      Indicator.open('加载中...')
      transferMoney({ 'transferStatus': 2 }, { type: 'notips' }).then(val => {
        if (val.code !== 0) {
          return
        }
        Indicator.open('加载中...')
        transferMoney(item ? { 'gameCode': item.platformCode, 'transferStatus': 1 } : { 'transferStatus': 2 }, { type: 'notips' }).then(data => {
          if (item && data.code !== 0) {
            Toast({
              message: '当前正在' + (data.data.platformName ? data.data.platformName : data.data.fromPlatformName) + '中进行游戏，账户不能同时进行其他游戏。',
              duration: 1500
            })
            return
          }
          setTimeout(() => {
            Indicator.open('加载中...')
          }, 100)
          loginGameApi({ 'platformCode': item.platformCode, 'gameKindId': item.gameKindId, 'gameCode': item.gameCode }).then(res => {
            window.location.href = res.data
            if (!this.open) {
              window.location.href = res.data
            }
          })
          userInfoApi().then(v => {
            this.$store.commit('updateUserInfo', v.data)
          })
        })
      })
    },
    async play (item, index) {
      let loginInfo = this.Utils.Storage.get('user')
      if (loginInfo) {
        this.getTransferMoney(item)
      } else {
        Toast({
          message: '请登录',
          duration: 1000
        })
        window.location.href = '/mobile/studio/#/login'
      }
    },
    changeTile () {
      this.tile = !this.tile
      this.Utils.Storage.save('buyMallTile', this.tile)
    },
    swipTab (dom, index) {
      this.$nextTick(() => {
        const currentTab = document.querySelector(dom).querySelector('.is-selected')
        document.querySelector(dom).scrollLeft = index === 0 ? 0 : currentTab.offsetLeft - window.innerWidth / 2 + currentTab.clientWidth / 2
      })
    },
    navChess (i, item) {
      console.log(item, '')
      if (!item) return
      this.swipTab('.p1', i)
      // 传入props 当前一级导航
      this.Onenav = item.platformType
      if (item.child) {
        this.child = true
        getPlatformApi({ 'platformType': item.platformType }).then(res => {
          this.total = res.data.data
        })
      } else {
        this.child = false
        getGameDetailsApi({ 'platformType': item.platformType }).then(res => {
          if (res.code === 0) {
            this.total = res.data
          }
        })
      }
    },
    showCurrentTab (index) {
      this.swipTab('.cp', index)
    },
    navItem (index, item) {
      // 传入props当前二级导航
      this.TwoNav = item.platformCode
      this.swipTab('.subNav', index)
    },
    async getChess () {
      // 总是请求该接口根据switchFlag判断是否显示调用其他接口
      let gameTabs = await getGameSwitchApi()
      if (gameTabs.code === -1) { this.isTestPlay = true; return }
      gameTabs = gameTabs.data
      if (!gameTabs.game.switchFlag) {
        this.lotteryTitle = '彩票'
        this.onlyLottery = true
      } else {
        this.onlyLottery = false
        // 总之，这里完全完全自定义顺序。。。
        this.gameType = [gameTabs.lottery, gameTabs.game]
        this.mainNavNum = this.gameType.length
        const gameNavs = await getHallInfosApi({ type: 1 })
        this.getChessList = gameNavs.data.filter(e => e.enable)
        this.dataList = JSON.parse(JSON.stringify(this.getChessList))
        gameNavs.data.map((e, index) => {
          if (e.platformType === 'lottery') {
            if (!e.enable) {
              this.navTab = 1
              this.isOnlyLottery = true
            }
            this.getChessList.splice(index, 1)
          }
        })
        this.navChess(0, this.getChessList[0])
      }
    }
  },
  created () {
    try {
      this.isPlay = this.Utils.Storage.get('user') && this.Utils.Storage.get('user').playType === 1
    } catch (error) {
      console.log('%c%s', 'color: #ffa640', '未登录导致个人信息读取错误')
    }
    // console.log(this.$route.query)
    this.getTabsArr()
    this.initGameInfo()
    this.getChess()
  }
}
</script>

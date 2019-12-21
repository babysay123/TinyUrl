<style lang="scss">
@import 'Assets/css/lottery/index.scss';
.laws-play { font-size: 12px; line-height: 15px; padding-right: .34rem; font-weight: normal; }
.fa-angle-down:before { content: "\F107"; }
.head .menu-right { width: 72px; }
</style>

<template>
  <section>
    <!--  -->
    <audio id="reg" class="dn" preload="auto">
      <source src="../../assets/images/chatroom/cash_received.mp3" type="audio/mp3">
    </audio>
    <audio id="clickMusic" class="dn" preload="auto">
      <source src="../../assets/images/chatroom/click.mp3" type="audio/mp3">
    </audio>
    <!-- 顶部后退要验证 history.back(1) -->
    <Head href="javascript:void(0);">
      <!--  style='background-image: url("http://bbb.com/mobile/images/index/home_bottom_3.png");' -->
      <div class="laws-option" v-show="lotteryLayout && lotteryLayout.lotteryId && lotteryTitle && lotteryTitle.length > 0">
        <img :src="headImge" class="laws-word">
        <span class="dInV laws-play">玩<br>法</span>
        <a parentId="0" childId="0" class="laws-select" @click.stop="toggleLaws">
          {{ lotteryTitle | limitText }}
          <i class="fa fa-angle-down" :class="{ 'fa-rotate-180': popupVisible }"></i>
        </a>
      </div>
      <!-- <mt-button @click.native="open">按钮A</mt-button> -->
      <a id="assistant" class="menu-right" @click.stop="toggleLotterySelect">切换彩种<i class="fa fa-angle-down"></i></a>
    </Head>
    <!-- 玩法选择 -->
    <!-- popup-transition="popup-fade" -->
    <!-- :modal="false" -->
    <mt-popup
      v-model="popupVisible"
      position="top"
      :class="'mint-top-change'"
      popup-transition="popup-fade"
    >
      <div id="headBlock" class="laws-absolute bg-whole">
        <div class="laws-head-list">
          <ul id="typeSelect" class="laws-head-col laws-head-play">
            <li :class="{active: inx === playInx.group}" v-for="(group, inx) in playWayArr" :key="inx">
              <a href="javascript:void(0);" @click="groupTab(inx)" class="laws-head-btn">{{ group.name }}</a>
            </li>
          </ul>
          <h4 class="laws-hr">{{playTitle}}</h4>
          <ul id="valueSelect" class="laws-head-col laws-head-play">
            <li :class="{active: inx === playInx.play}" v-for="(play, inx) in plays" :key="inx">
              <a href="javascript:void(0);" @click="playTab(play, inx, playWayArr[playInx.group])" class="laws-head-btn">{{ play.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>
    <!-- 彩种选择 -->
    <!-- :modal="false" -->
    <mt-popup
      :class="'mint-top-change'"
      v-model="popupRight"
      position="top"
      popup-transition="popup-fade"
    >
      <div class="laws-list bg-whole">
        <!-- :isShow="isShow" -->
        <!-- :oneData="oneData"
        :lotteryList="lotteryList"
        :activeIndex="activeIndex"
        @toSlide="onSwitch" -->
        <lotteryLayout
          :activeLotteryId="lotteryId"
          @toChange="locationChange"
        ></lotteryLayout>
        <!-- <div class="laws-head-list">
          <ul class="nav">
            <li
              v-for="(item,i) in oneData"
              :key="i"
              @click="onSwitch(item,i)"
              :class="activeIndex === i ? 'activenav' : ''"
            >
              <img :src="item.imageUrl" alt="">
              <div>{{ item.name }}</div>
            </li>
          </ul>
          <ul class="childList">
            <li
              v-for="(item,i) in lotteryList"
              :key="i"
              @click="locationChange(item)"
              v-show="isShow === 'all' ? true : isShow === item.label ? true : false"
              :class="{ 'activeListnav': lotteryId * 1 === item.gameKindId }"
            >
               {{ item.gameName }}
            </li>
          </ul>
        </div> -->
        <!-- <ul class="laws-head-col">
          <li :class="{'laws-border': 1, 'active': lotteryId * 1 === item.lotteryId}" v-for="(item, inx) in lotteryList" :key="inx"><a @click="locationChange(item)" class="laws-head-btn">{{item.name}}</a></li>
          <li class="laws-border"><a class="">安徽快三</a></li>
        </ul> -->
      </div>
    </mt-popup>

    <!-- head-fixed-gap -->
    <section class="lottery-tabs fw bg-whole" v-if="PageOpenStatus === 'open'">
      <ul class="fw">
        <li class="lottery-tab" :class="{active: lotteryTabActive === 0}" @click="clickTab(0)">
          <span class="dInV">投注区</span>
        </li>
        <li class="lottery-tab lottery-tab-room" :class="{active: lotteryTabActive === 1}" @click="clickTab(1)">
          <span class="dInV">直播大厅</span>
        </li>
      </ul>
    </section>
    <router-view></router-view>
    <!-- 提示 是否清空数组 -->
    <mt-popup
      :class="'mt-nobg'"
      v-model="popupTips"
      popup-transition="popup-fade"
    >
      <AllPop :popShow='popShow' :content='content' :cancel='1' @childFn1="popupTipsstatu"></AllPop>
    </mt-popup>
  </section>
</template>

<script>
import Head from 'Components/global/head.vue'
// import Utils from 'Plugins/utils'
import lotteryLayout from 'Components/global/lotteryLayout'
import AllPop from 'Components/allpop'
import { ToastMsg } from 'Components/lottery/betting/module/tools'
import { transferMoney } from 'Plugins/api'
// import { lotteryRule } from 'Components/buyMall/lottery.js'
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
export default {
  inject: ['reload'],
  name: 'lottery',
  data () {
    return {
      content: '退出当前页面，需要要清空已投注内容。',
      popShow: false,
      // 全局简单开关，以后再做
      PageOpenStatus: this.$store.state.ChatRoomOpenStatus,
      // end
      popupRight: false,
      popupVisible: false,
      popupTips: false,
      lotteryList: [], // 全部彩种列表
      lotteryTitle: '',
      lotteryId: 0,
      lotteryLayout: {}, // 当前彩种布局
      playWayArr: [], // 玩法数组 全数据
      lotteryMsg: {}, // 彩种信息
      lotteryTabActive: 0,
      playInx: {
        group: 0,
        play: 0
      }, // 大小玩法索引
      plays: [], // 小玩法数组
      playTitle: '',
      shareCode: 0,
      tipsData: { // 弹出提示的信息
        title: '',
        yes: function () {},
        no: function () {}
      },
      headImge: '',
      lotteryArr: this.Utils.Storage.get('lotteryArr'),
      oneNav: '',
      activeIndex: 0,
      isShow: 'all',
      oneData: null
    }
  },
  watch: {
    '$route': function (to, from) {
      let path = this.$route.path
      this.getAllLotterys()
      if (path === '/lottery') {
        this.lotteryTabActive = 0
        if (this.$store.state.chatRoom.roomNmae) {
          this.$store.state.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + this.$store.state.chatRoom.roomNmae + "'}")
        }
      } else {
        this.lotteryTabActive = 1
      }
      let _lotteryId = to.query.lotteryId
      if (!_lotteryId || _lotteryId === 'null' || !from.query.lotteryId) {
        this.lotteryId = 27
        return
      }
      if (this.lotteryId !== _lotteryId) {
        this.playInx = {
          group: 0,
          play: 0
        }
      }
      this.lotteryId = _lotteryId
      this.$store.dispatch('SetLotteryId', _lotteryId)
      this.lotteryGroup(this.lotteryId)
      // console.log(this.$store.state.Lottery.lotteryId)
    },
    '$store.state.Lottery.lotteryId': function (val) {
      this.lotteryId = val
    },
    '$store.state.Lottery.lotteryMsg': function (val) {
      this.lotteryMsg = val
      // console.log(this.lotteryMsg)
    },
    '$store.state.Lottery.playWayArr': function (val) {
      this.playWayArr = val
    },
    '$store.state.Lottery.lotteryLayout': function (val) {
      // this.lotteryArrs(val.lotteryId)
      // this.lotteryLayout = val
      // console.log(val)
      // console.log('这个有变化吗。我看看')
      // console.log(this.lotteryLayout)
      // 获取全部图标， 有就加，没有就算。TODO，以后再加到新架构里
      // this.lotteryArrs()
    },
    'lotteryTitle': function (val) {
      // this.$store.state.Lottery.lotteryTitle = val
      this.$store.dispatch('updateTitle', val)
    }
  },
  filters: {
    limitText (value) {
      return value.length > 7 ? value.substr(0, 6) + '...' : value
    }
  },
  methods: {
    ...mapActions([ 'refreshUserInfo' ]),
    async doRefresh () {
      const { code } = await transferMoney({ 'transferStatus': 2 }, { type: 'notips' })
      if (code === 0) {
        this.refreshUserInfo()
      }
      // Toast({
      //   message: `正在${data.platformName ? data.platformName : data.fromPlatformName}中进行游戏，请结束后再尝试刷新`,
      //   duration: 1200
      // })
    },
    // onSwitch (item, i) {
    //   if (i === this.activeIndex) {
    //     return
    //   }
    //   this.activeIndex = i
    //   // this.getLotteryList(item)
    // },
    // 获取彩票列表
    // getLotteryList (item) {
    //   // getGameDetailsApi({ platformCode: item.platformCode, platformType: 'lottery' }).then(res => {
    //   //   if (res.code === 0) {
    //   //     this.lotteryList = res.data
    //   //   } else {
    //   //     this.$toast(res.msg)
    //   //   }
    //   // })
    // },
    popupTipsstatu () {
      this.popupTips = false
    },
    async clickTab (val) {
      this.lotteryTabActive = val
      if (val === 0) {
        this.$router.push({
          path: '/lottery',
          query: {
            ...this.$route.query,
            lotteryId: this.lotteryId
          }
        })

        const res = await this.axios.postOnce('/front/lottery/lottery_group.do', { lotteryId: this.lotteryId })
        this.$store.dispatch('LotteryPage', res.data)
      } else {
        this.$store.state.chatRoom.roomTitleActive = true
        this.$router.push({
          path: '/chatroom',
          name: 'chatroom',
          query: {
            ...this.$route.query,
            lotteryId: this.lotteryId
          },
          params: {
            reload: true
          }
        })
      }
    },
    toggleLaws () {
      if (this.popupVisible) {
        this.popupVisible = false
      } else {
        this.popupVisible = true
      }
    },
    toggleLotterySelect () {
      if (this.popupRight) {
        this.popupRight = false
      } else {
        this.popupRight = true
      }
    },
    groupTab (inx, clickPlay) {
      // 切换大玩法，切换小玩法
      let _group = this.playWayArr[inx]
      if (!_group) {
        ToastMsg('没有对应玩法，请刷新重试')
        return false
      }
      // this.playTitle = _group.name
      this.playInx.group = inx // 大玩法索引更新
      this.plays = _group.playWayData
      if (this.plays && clickPlay !== false && this.plays.length === 1) {
        this.playTab(this.plays[0], 0, _group)
      }
    },
    playTab (item, inx, group) {
      let _ts = this
      // 选择小玩法
      this.playInx.play = inx // 小玩法索引更新
      this.lotteryTitle = group.name + '_' + item.name
      // 获取新玩法，更新布局数据
      this.axios.post('/front/lottery/lottery_play_way.do', {
        'playId': item.playId
      }).then(function (res) {
        if (res.code === 0) {
          _ts.$store.dispatch('LotteryLayoutUpdate', res.data)
          _ts.lotteryLayout = _ts.$store.getters.getLayout
        }
        _ts.popupVisible = false
      })
        .catch(() => {})
    },
    HeadBack () {
      // 头部返回事件
      // console.log('返回前，记得询问是否清空payments')
      let shareBettingMoney = this.Utils.Storage.get('shareBettingMoney')
      if (shareBettingMoney && shareBettingMoney.currentRoom) {
        let newRoomFlag = false
        if (!this.$route.params.reload) {
          newRoomFlag = true
        }
        this.$router.push({
          name: 'moreRoom',
          params: {
            reload: newRoomFlag
          }
        })
      } else {
        let _paymentArr = this.$store.getters.getPayments
        if (_paymentArr && _paymentArr.length > 0) {
          this.popupTips = true
          // this.tipsData = {
          //   title: '退出当前页面，需要要清空已投注内容。',
          //   yes: () => {
          //     this.$store.dispatch('removePayments', 'clear')
          //     // window.history.back(1)
          //     this.popupTips = false
          //     window.location.href = '/mobile/studio/#/index'
          //   },
          //   no: () => {
          //     this.popupTips = false
          //   }
          // }
          this.popShow = !this.popShow
        } else {
          // window.history.back(1)
          window.location.href = '/mobile/studio/#/index'
        }
      }
    },
    locationChange (item) {
      // 跳转
      let _paymentArr = this.$store.getters.getPayments
      if (_paymentArr && _paymentArr.length > 0) {
        this.popupTips = true
        this.tipsData = {
          title: '切换彩种，需要要清空已投注内容。',
          yes: () => {
            this.popupRight = false
            this.popupTips = false
            this.$store.dispatch('removePayments', 'clear')
            this.$router.push({
              path: '/lottery',
              query: {
                ...this.$route.query,
                lotteryId: item.gameKindId
              }
            })
          },
          no: () => {
            this.popupRight = false
            this.popupTips = false
          }
        }
      } else if (item.gameKindId <= 10000) {
        this.Lottery.lotteryResult = false
        // window.history.back(1)
        this.popupRight = false
        let lotteryArr = this.Utils.Storage.get('lotteryArr')
        if (lotteryArr) {
          let lotteryArrLeng = lotteryArr.length
          for (let i = 0; i < lotteryArrLeng; i++) {
            if (item.gameKindId === lotteryArr[i].lotteryId) {
              this.$store.getters.getLayoutMsg.name = lotteryArr[i].name
              this.$store.getters.getLayoutMsg.lotteryId = lotteryArr[i].lotteryId
            }
          }
        }
        this.$router.push({
          path: '/lottery',
          query: {
            ...this.$route.query,
            lotteryId: item.gameKindId
          }
        })
      } else if (item.lotteryId > 10000 || item.gameKindId > 10000) {
        window.location.href = '/mobile/lottery/lotteryFootBall.html'
      }
    },
    lotteryArrs (val) {
      let _iconArr = this.lotteryArr
      if (!_iconArr || _iconArr.length === 0) { return }
      for (let _icon of _iconArr) {
        if (_icon.lotteryId === Number(val)) {
          this.headImge = _icon.URL
          return
        }
      }
    },
    lotteryGroup (lotteryId) {
      this.axios.postOnce('/front/lottery/lottery_group.do', {
        'lotteryId': lotteryId
      })
        .then((re) => {
          if (re.code === 0) {
            if (!this.Lottery.lotteryResult) {
              this.Lottery.lotteryResult = true
              this.playInx.group = 0
              this.playInx.play = 0
              this.$store.dispatch('LotteryPage', re.data)
            }
            this.lotteryArrs(lotteryId)
            // 用vuex处理数据
            // 获取vuex数据，其实数据已变化兼绑定
            let Lottery = this.$store.state.Lottery
            if (!Lottery.playWayArr || Lottery.playWayArr.length === 0 || !Lottery.lotteryLayout || !Lottery.lotteryLayout.lotteryId) {
              Toast({
                message: '没找到该彩种，请返回重试',
                position: 'middle',
                duration: 2000
              })
              return false
            }
          }
        })
        .catch(() => {})
    },
    getAllChild (obj) {
      let _arr = []
      if (!this.$route.query.lotteryId) {
        let gameId = obj.filter(e => e.lotteryId < 10000)[0].lotteryId
        this.$route.query.lotteryId = gameId
        this.lotteryId = gameId
      } else {
        this.lotteryId = this.$route.query.lotteryId
      }
      this.$store.dispatch('SetLotteryId', this.lotteryId)
      this.lotteryGroup(this.$route.query.lotteryId)
      let oneNav = []
      // 一进入聊天室就对应url的id彩种存进缓存
      for (let i = 0; i < obj.length; i++) {
        let item = obj[i]
        if (item.lotteryId === Number(this.$route.query.lotteryId)) {
          this.Utils.Storage.save('lotteryMsg', item)
        }
        _arr.push(item)
        oneNav.push(item.lotteryClassName)
      }
      // let lotteryList1 = _arr
      // let other = {}
      // this.lotteryList = lotteryRule.showData(lotteryList1)
      // this.oneNav = this.lotteryList.reduce((cur, next) => {
      //   if (!other[next.label]) other[next.label] = true && cur.push(next)
      //   // other[next.label] ? '' : other[next.label] = true && cur.push(next)
      //   return cur
      // }, [])
      this.$store.commit('updateAllLotterys', _arr)
    },
    getAllLotterys () {
      this.axios.postFast('/front/lottery/init.do', {}).then((res) => {
        if (res.code === 0) {
          this.getAllChild(res.data)
        }
      }).catch(() => {})
      if (this.$store.state.Lottery.lotteryList.length > 0) {
        // this.lotteryList = this.$store.state.Lottery.lotteryList
        // if (this.lotteryArr) {
        //   this.getAllChild(this.lotteryArr)
        // }
        // return false
      }
    },
    // 聊天室开关 和 客服类型 !!
    pageOpenStatus () {
      // 更改config接口
      let _configUrl = '/front/get_global_config.do'
      this.axios.postFast(_configUrl, {}).then((res) => {
        // res.data.chatRoomOpenStatus = 'close'
        if (res.code === 0) {
          this.PageOpenStatus = res.data.status.chatRoomOpenStatus
          this.$store.dispatch('dictSave', {
            ChatRoomOpenStatus: res.data.status.chatRoomOpenStatus
          })
          if (res.data && res.data.status.customerServiceType === 'THIRDPARTY') {
            this.$store.state.chatRoom.service.type = 'THIRDPARTY'
            let _customUrl = res.data.status.customerServiceUrl
            if (_customUrl.indexOf('qq') > -1 || _customUrl.indexOf('wqa') > -1) {
              if (_customUrl.match(/uin=[0-9]+/g)[0]) {
                this.$store.state.chatRoom.service.url = '/mobile/other/openQQ.html?' + _customUrl.match(/uin=[0-9]+/g)[0]
                return
              }
            }
            let _user = this.Utils.Storage.get('user')
            let account = null
            if (_user) {
              account = encodeURI(_user.account)
            } else {
              account = encodeURI('游客')
            }
            if (_customUrl.search('{name}') > -1) {
              this.$store.state.chatRoom.service.url = _customUrl.split('{name}')[0] + account
            } else {
              this.$store.state.chatRoom.service.url = _customUrl
              return false
            }
          } else if (res.data && res.data.status.customerServiceType === 'SYSTEM') {
            // let serverUrl = 'mobile/service/serviceOnline.html'
            this.$store.state.chatRoom.service.type = 'SYSTEM'
            // this.$store.state.chatRoom.service.url = res.data.status.customerServiceUrl
            this.$store.state.chatRoom.service.url = '/mobile/service/serviceOnline.html'
          }
        }
      })
        .catch(() => {})
    }
  },
  computed: {
    ...mapState({
      Lottery (state) {
        return state.Lottery
      },
      chatRoom (state) {
        return state.chatRoom
      }
    })
  },
  updated () {
    this.lotteryLayout = this.$store.getters.getLayout
    let _group = this.playWayArr[this.playInx.group]
    // 判断有没有数据
    if (!this.playWayArr || this.playWayArr.length === 0 || !_group || !_group.name) {
      return false
    }
    // 判断是否超过可选小玩法
    if (!_group.playWayData[this.playInx.play] || !_group.playWayData[this.playInx.play].name) {
      this.playInx.play = 0
    }
    // 更新头部标题
    this.lotteryTitle = _group.name + '_' + _group.playWayData[this.playInx.play].name
    this.playTitle = _group.name
    // 更新玩法
    this.plays = _group.playWayData
  },
  mounted () {
    // TODO: 优化的地方，玩法记录，因为已经保存了layout的信息再vuex里，返回的时候优先调用保存好的值
    if (this.$store.state.Lottery.playWayArr.length > 0) {
      // 都用现有的vuex的值
      this.lotteryTitle = this.$store.state.Lottery.lotteryTitle
      this.lotteryMsg = this.$store.getters.getLayoutMsg
      this.lotteryLayout = this.$store.getters.getLayout
      this.playWayArr = this.$store.state.Lottery.playWayArr
      for (let col = 0; col < this.playWayArr.length; col++) {
        let _colPlay = this.playWayArr[col]
        for (let row = 0; row < _colPlay.playWayData.length; row++) {
          let _way = _colPlay.playWayData[row]
          if (_way.playId === this.lotteryLayout.playId) {
            this.playInx = {
              group: col,
              play: row
            }
          }
        }
      }
      return false
    }
    // 获取聊天室开关，是不是关闭聊天室
    this.pageOpenStatus()
    // this.$store.state.chatRoom.music.message = document.getElementById('messageMusic')
    // this.$store.state.chatRoom.music.plan = document.getElementById('planMusic')
    // this.$store.state.chatRoom.music.packet = document.getElementById('packet')
    this.$store.state.chatRoom.music.click = document.getElementById('clickMusic')
    this.$store.state.chatRoom.music.reg = document.getElementById('reg')
  },
  created () {
    let _user = this.Utils.Storage.get('user')
    _user && this.doRefresh()
    // 获取一级导航
    // getPlatformApi({ platformType: 'lottery', type: 1 }).then(res => {
    //   if (res.code === 0) {
    //     this.oneData = res.data.data
    //   }
    // })
    // this.getLotteryList({ platformCode: 'appAllLottery' })
    // 获取彩票列表
    // getGameDetailsApi({platformCode:"appAllLottery",platformType: "lottery"}).then(res=>{
    //   if(res.code === 0){
    //     this.lotteryList =  res.data
    //   }
    // })
    let path = this.$route.path
    if (path === '/lottery') {
      this.lotteryTabActive = 0
    } else {
      this.lotteryTabActive = 1
    }
    this.getAllLotterys()
    // a
    let ykUnread = JSON.parse(sessionStorage.getItem('ykUnread'))
    let ykUnreadLeng = 0
    let managerUnreadLeng = 0
    let privateChatUnreadLeng = 0
    if (ykUnread && ykUnread.length > 0) {
      ykUnreadLeng = ykUnread.length
    }
    let managerUnread = JSON.parse(sessionStorage.getItem('managerUnread'))
    if (managerUnread) {
      for (let key in managerUnread) {
        managerUnreadLeng = managerUnread[key].length
      }
    }
    let privateChatUnread = this.Utils.Storage.get('privateChatUnread')
    if (privateChatUnread) {
      privateChatUnreadLeng = privateChatUnread.length
    }
    this.chatRoom.unreadMsgRed = ykUnreadLeng + managerUnreadLeng + privateChatUnreadLeng

    // if (localStorage.getItem('unreadMsgCount')) {
    //   _this.$store.state.chatRoom.unreadMsgRed = Number(localStorage.getItem('unreadMsgCount'))
    // }
  },
  destroyed () {
    this.Lottery.lotteryResult = false
  },
  components: {
    Head,
    lotteryLayout,
    AllPop
  }
}
</script>

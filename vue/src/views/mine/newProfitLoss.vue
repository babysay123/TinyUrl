<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-10 10:57:01
 * @LastEditTime: 2019-10-22 15:02:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section>
    <Head fixed>
      <h3>{{title}}</h3>
    </Head>
    <div class="fixd-margin">
      <head-title
        ref="child"
        class="title-style"
        :headDataList="timeNav"
        :selectType="'date'"
        @getHeadSelect="getHeadSelect"
        @getHeadSelectName="getName"
      ></head-title>
      <box-title
        v-if="isChilShow"
        :headDataList="companyNav"
        @getHeadSelect="getHeadSelect"
      >
      </box-title>
    </div>
    <main>
      <section class="myGener-panel panel-bg">
        <section class="panel-top">
          <div class="profit-total">
            <h4>盈亏总额</h4>
            <h3>
              <span
                style="font-size:22px;display: inline-block;vertical-align:top;padding-right:3px;"
              >{{companyData.profitMoney | numFixed(3)}}</span>元
            </h3>
          </div>
          <div class="hint">
            <span v-show="companyData.calculation">({{companyData.calculation}})</span>
          </div>
          <div class="profit-btn not-profit-btn" :class="isLottery ? '' : ''">
              <a href="javascript:void(0);" @click="share">
                <img v-show="isLottery" :src="isShare.src" />
              </a>
              <p>账户余额 {{this.Utils.Storage.get('user').balance | numFixed(3)}}元</p>
          </div>
        </section>
      </section>
      <section class="panel-bottom" v-if="companyData.recharge">
        <div class="control-box">
          <h4>{{companyData.recharge | numFixed(3)}} 元</h4>
          <h6>{{titleTime}}已充值金额</h6>
          <div class="box-button" @click="toLink('recharge')">充值</div>
        </div>
        <div class="control-box">
          <h4>{{ companyData.amout | numFixed(3)}} 元</h4>
          <h6>{{titleTime}}已提现金额</h6>
          <div class="box-button" @click="toLink('extract')">提现</div>
        </div>
      </section>
      <section>
        <div v-for="(item,index) in companyData.list" :key="index" class="myGener-msgBox">
          <h2>￥{{item.amount | numFixed(3)}}</h2>
          <h3>{{item.title}}</h3>
          <h6 v-if="item.explain">({{item.explain}})</h6>
        </div>
      </section>
    </main>
    <section class="bg" v-if="isShareAlert">
      <section class="pop-box" style="position:relative;">
        <div class="pop-title pr">
          请选择聊天室 ( {{this.roomList.length}} )
          <img
            src="/mobile/images/chatroom/zhubo_detail_close.png"
            @click="closeShare"
            class="pop-close"
          />
        </div>
        <div class="pop-lists-box">
          <ul class="fw pop-lists">
            <li
              class="pop-list"
              v-for="(item, index) in roomList"
              :key="index"
              @click="forwardRoom(item, 1)"
            >
              {{item.name}}
              <span v-if="item.sm" class="sm">(私密)</span>
            </li>
          </ul>
        </div>
      </section>
    </section>
    <div class="dialog-content dialog-common" v-if="askAlert">
      <div class="common-title">
        <span>温馨提示</span>
      </div>
      <div class="hd"></div>
      <div class="dialong-right">
        <img @click="closeove" src="/mobile/images/newclear.png" />
      </div>
      <div class="success">
        <img src="/mobile/images/hint.png" />
      </div>
      <div class="common-content">分享成功，是否进入聊天室大厅</div>
      <div class="btn-qr">
        <div @click="close">
          <span>确认</span>
        </div>
        <div @click="closeove">
          <span>取消</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Toast } from 'mint-ui'
import Head from 'Components/global/head_new'
import headTitle from 'Components/agency/headTitleList'
import boxTitle from 'Components/agency/boxTitleList'
import { getTodayProfitNavApi, getTodayProfitApi, roomListApi, shareResults } from 'Plugins/api'
import { mapGetters, mapState } from 'vuex'
const timeNav = [
  { name: '今日', key: 'today' },
  { name: '昨日', key: 'yesterday' },
  { name: '7天', key: 'week' },
  { name: '30天', key: 'thirtyDays' }
]
export default {
  components: { Head, headTitle, boxTitle },
  data () {
    return {
      title: '今日盈利',
      isChilShow: false,
      time: {},
      company: '',
      companyData: {},
      companyNav: [],
      timeNav,
      isLottery: false,
      isShareAlert: false,
      roomList: [],
      askAlert: false,
      titleTime: '今日'
    }
  },
  computed: {
    isShare () {
      return parseInt(this.companyData.profitMoney) === 0
        ? { src: '/mobile/images/mine/profit_share_unsel@3x.png', isShare: false }
        : { src: '/mobile/images/mine/todayGread_yellow.png', isShare: true }
    },
    ...mapGetters(['access_token']),
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      }
    })
  },
  methods: {
    getName (name) {
      this.titleTime = name
    },
    toLink (type) {
      if (type === 'extract') {
        this.routerLink({ path: '/mobile/mine/withdrawals.html', redirect: true })
      } else if (type === 'recharge') {
        this.$router.push('/rechargeList')
      }
    },
    getHeadSelect (key) {
      // 所有条件均不为空时请求数据
      typeof key === 'object' ? this.time = key : this.company = key
      this.company && Object.keys(this.time).length && this.getData()
    },
    async navData () {
      const { data } = await getTodayProfitNavApi()
      this.companyNav = data
      this.isChilShow = true
    },
    async getData () {
      this.company === 'lottery'
        ? this.isLottery = true
        : this.isLottery = false
      let key = { key: this.company }
      let param = Object.assign(key, this.time)
      const { data } = await getTodayProfitApi(param)
      let specialTotal = ['充值', '提现'] // 总计的充值提现单独做处理
      let newDataList = []
      data.list.forEach(e => {
        !specialTotal.includes(e.title) && newDataList.push(e)
        e.title === specialTotal[0]
          ? data.recharge = e.amount
          : e.title === specialTotal[1] ? data.amout = e.amount : data.extract = e.amount
      })
      data.list = newDataList
      this.companyData = data
    },
    share () {
      if (!this.isShare.isShare) return
      if (!this.Utils.Storage.get('user')) {
        Toast('请登录后再尝试')
        return
      }
      this.getroomList()
    },
    async getroomList () {
      this.roomList = []
      const { data, code } = await roomListApi(this.access_token)
      if (code !== 0) {
        Toast('请刷新后重试')
        return
      }
      data.forEach(e => {
        if (e.type === 2) return
        if (e.type === 4) e.privacy = true
        this.roomList.push(e)
      })
      this.isShareAlert = true
    },
    closeShare () {
      this.isShareAlert = false
    },
    async forwardRoom (item) {
      if (!this.init) {
        Toast('聊天室信息请求有误，请刷新页面。')
        return
      }
      const { begin, end } = this.time
      let parms = `begin=${begin}&end=${end}`
      parms += `&roomId=${item.roomId}`
      parms += `&type=${this.$refs.child.selectedName}`
      parms += `&openid=${this.init.message.member.openid}`
      if (this.init.message.member.type > 0 || item.enableChat) {
        const { code } = await shareResults(parms)
        if (code === 0) this.askAlert = true
      } else {
        Toast('房间已被禁言, 暂时不能发送')
      }
    },
    closeove () {
      this.askAlert = false
      this.isShareAlert = false
    },
    close () {
      window.location.href = '/mobile/studio/#/chatroom'
    }
  },
  created () {
    this.navData()
  }
}
</script>
<style lang="scss" scoped>
@import 'Assets/css/share.scss';
@import 'Assets/css/common.scss';
.title-style{
  margin-top: 10px;
}
.myGener-msgBox{
  width: 30%;
  height: 2.6rem;
  margin: 2.5% 0 0 2.5%;
}
.box-button{
  width:2rem;
  height: .45rem;
  line-height: .5rem;
  border: 1px;
  border-radius: .4rem;
  margin: 0 auto;
  background: #fff;
  color: rgb(85,173,236);
}
.panel-bottom .control-box h6{
    font-weight: normal;
    font-size: 12px;
    padding: 0 0 0.2rem;
    color: #fff;
}
</style>

<template>
  <div>
    <Head fixed>
      <h3>{{title}}
         <span class="titRecord"  @click="myHistory">领取记录</span>
      </h3>

    </Head>
    <main>
      <section class="myGener-panel panel-bg">
        <!-- <img
          src="/mobile/images/agent/history.png"
          class="mint-toast-icon mintui"
          @click="myHistory"
        /> -->
        <section class="panel-top">
          <div class="profit-total">
            <h4>可领取佣金</h4>
            <h3>
              <span
                style="font-size:22px;display: inline-block;vertical-align:top;padding-right:3px;"
              >{{myMessage.amount | numFixed(3)}}</span>元
            </h3>
          </div>
          <div>
            <img
              :src="isNowGet.imgSrc"
              class="at-onec-btn"
              @click="getAmount(isNowGet.text)"
              alt="img"
            />
          </div>
            <div class="newmoney">
              <span>
                总佣金：
              </span>
              <span>{{(myMessage.haveAmount + myMessage.amount) | numFixed(3)}}元</span>
          </div>
        </section>
      </section>
       <section class="panel-bottom">
          <div class="control-box">
            <span>我的账号：</span>
            <span>{{this.Utils.Storage.get('user').account}}</span>
          </div>
          <div class="control-box">
            <span>推荐账号：</span>
            <span>{{basicData.recommendAccount ? basicData.recommendAccount : '--'}}</span>
          </div>

        </section>
      <section class="bigbox">
        <div class="myGener-msgBox">
          <h2>{{basicData.addTeamNum ? basicData.addTeamNum : 0}} <span style="color:red">({{basicData.addTeamNum}})</span></h2>
          <h3>团队人数(新增)</h3>
        </div>
        <div class="myGener-msgBox">
          <h2>{{basicData.userNum ? basicData.userNum : 0}} <span style="color:red">({{basicData.addUserNum}})</span></h2>
          <h3>直属玩家(新增)</h3>
        </div>
        <div class="myGener-msgBox">
          <h2>{{basicData.agentNum ? basicData.agentNum : 0}} <span style="color:red">({{basicData.addAgentNum}})</span></h2>
          <h3>直属代理(新增)</h3>
        </div>
        <div class="myGener-msgBox">
          <h2>￥{{basicData.teamPerformance ? basicData.teamPerformance : 0 | numFixed(3)}}</h2>
          <h3>今日团队业绩</h3>
        </div>
        <div class="myGener-msgBox">
          <h2>￥{{basicData.performance ? basicData.performance : 0 | numFixed(3)}}</h2>
          <h3>今日自营业绩</h3>
        </div>
        <div class="myGener-msgBox">
          <h2>￥{{basicData.preAmount ? basicData.preAmount : 0 | numFixed(3)}}</h2>
          <h3>昨日佣金</h3>
        </div>
      </section>
    </main>
    <Popup :show="show">
      <div>
        <ul class="history">
          <li>领取时间</li>
          <li>领取金额</li>
        </ul>
        <ul class="history" v-for="(item,index) in historyList" :key="index">
          <li>{{item.receiveTime}}</li>
          <li>￥{{item.amount}}</li>
        </ul>
      </div>
    </Popup>
  </div>
</template>
<script>
import Head from 'Components/global/head'
import { Toast } from 'mint-ui'
import { myGeneralizeApi, isNowCommissionApi, getNowImmediatelyApi, myGetHistoryApi } from 'Plugins/api'
import Popup from './popup'
export default {
  name: 'myGeneralize',
  components: { Head, Popup },
  data () {
    return {
      title: '我的推广',
      basicData: {},
      myMessage: {},
      show: false,
      historyList: []
    }
  },
  computed: {
    isNowGet () {
      return this.myMessage.amount > 0
        ? { imgSrc: '/mobile/images/agent/icon_myPro_receive@2x.png', text: '立即领取' }
        : { imgSrc: '/mobile/images/agent/icon_myPro_unReceive@2x.png', text: '不可领取' }
    }
  },
  methods: {
    close () {
      this.show = false
    },
    myHistory () {
      myGetHistoryApi({
        count: 15,
        offset: 0
      }).then(res => {
        if (res.code === 0) {
          this.historyList = res.data
        }
      })
      this.show = true
      // this.$router.push({
      //   name: 'gitHistory'
      // })
    },
    async getDataInit () {
      const { data } = await myGeneralizeApi()
      this.basicData = data
      this.MyGetCommission()
    },
    async MyGetCommission () {
      const { data } = await isNowCommissionApi()
      this.myMessage = data
    },
    async getAmount (isGet) {
      if (isGet === '不可领取') return
      const { msg } = await getNowImmediatelyApi()
      Toast(msg)
      this.getDataInit()
    }
  },
  mounted () {
    this.getDataInit()
  }
}
</script>
<style lang="scss" scoped>

.history{
  width: 9rem;
  display: flex;
  flex-wrap: wrap;
  li{
    width: 50%;
    text-align: center;
    line-height: .8rem;
    background: #eee;
  }
}
.titRecord{
  position: absolute;
  right: 7px;
}
.bigbox{
  display: flex;
  flex-wrap: wrap;
}
.newmoney{
     width: 100%;
    position: absolute;
    bottom: 13px;
    left: 14px;
    color: #fff;
    font-size: 14px;
}
// main {
//   padding: 1.125rem 0 0.2rem;
// }
.myGener-panel {
  overflow: hidden;
  position: relative;
}
.panel-bg {
  background: url('/mobile/images/mine/todayGrade.jpg') no-repeat center center;
  background-size: cover;
  overflow: hidden;
}
.profit-total {
  margin: 5px 0;
  color: #fff;
  text-align: center;
  h4 {
    font-size: 15px;
    line-height: 31px;
  }
  h3 {
    font-size: 15px;
    line-height: 22px;
    font-weight: 100;
  }
}
.at-onec {
  text-align: center;
  display: inline-block;
  position: relative;
  width: 3rem;
  left: calc(50% - 1.5rem);
  height: 0.75rem;
  line-height: 0.75rem;
  border-radius: 0.346667rem;
}
.at-onec-btn {
  display: block;
  width: 2.2rem;
  margin: 0 auto;
}
.panel-top {
  padding-bottom: 1.2rem;
}
.panel-bottom {
  padding: .35rem 0 .35rem 3.25%;
  background: #fff;
  overflow: hidden;
}
.control-box {
  width: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: left;
  float: left;
  h4 {
    font-weight: normal;
    font-weight: bold;
    font-size: 14px;
    padding: 0.15rem 0 0.2rem;
  }
}
.myGener-msgBox {
  // float: left;
  margin: 3.25% 0 0 3.25%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  width: 29%;
  padding: 25px 0;
  background: #fff;
  border-radius: 4px;
  -moz-appearance: none;
  -webkit-appearance: none;
  position: relative;
  color: #666;
  background: #fff;
  h2 {
    font-weight: 400;
    line-height: 30px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    font-weight: normal;
    line-height: 24px;
    font-size: 15px;
    color: #666;
  }
}
// .myGener-msgBox:last-child {
//   margin-bottom: 30px;
// }
main .mintui {
  width: 0.7rem;
}
.mint-toast-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>

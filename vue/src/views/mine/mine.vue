<template>
  <section class="mine">
    <Head :back="false">
      <a class="head-left-btn">
        <i class="el-icon-setting"></i>
        设置
      </a>
      <h3>个人中心</h3>
    </Head>
    <div class="person-head bg-col">
      <div class="info">
        <h4>不回头</h4>
        <h5><span class="id">账号ID:</span></h5>
        <h5>个性签名</h5>
      </div>
      <div class="balance">
        <p>130</p>
      </div>
    </div>

    <div class="person-detail">
      <nav class="person-detail-top">
        <a>今日充值<br>
          <span class="text-green">￥0.00</span>
        </a>
        <a>今日提现<br>
          <span class="text-red">￥0.00</span>
        </a>
        <a>今日盈利<br>
          <span class="text-orange">￥0.00</span>
        </a>
      </nav>

      <nav class="person-detail-bottom">
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          <span>提款中心</span>
        </a>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          活动奖励
        </a>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          余额宝
        </a>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          资金明细
        </a>
      </nav>
    </div>

    <div class="person-link">
      <nav>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          邀请码
        </a>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          分享赚钱
        </a>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          代理中心
        </a>
        <a>
          <img src="/mobile/img/icon_loading_Normal1.png" alt="">
          新手教程
        </a>
      </nav>
    </div>

    <!-- <Personal /> -->
    <!-- <div class="mine-operation">
      <div class="mine-opertiaon-recharge" @click="toLink">
        <h2>充值</h2>
      </div>
      <div class="mine-opertiaon-withdrawal" @click="routerLink({ path: '/mobile/mine/withdrawals.html', redirect: true })">
        <h2>提现</h2>
      </div>
    </div> -->
    <PersonalCell />

    <NavBottom />
    <!-- <Setting v-if="setting" /> -->
    <!-- <PersonalInfo v-if="personalInfo" /> -->

  </section>
</template>

<script>
// import Personal from 'Components/mine/personal'
import Head from 'Components/global/head'
import PersonalCell from 'Components/mine/personalCell'
import NavBottom from 'Components/global/navBottom'
// import Setting from 'Components/mine/setting'
// import PersonalInfo from 'Components/mine/personalInfo'
// import { mapGetters, mapActions } from 'vuex'
// import { getBankInfoApi } from 'Plugins/api'
export default {
  name: 'mine',
  data () {
    return {
      user: {

      },
      navs: {
        detailTop: [],
        detailBottom: [],
        linkList: []
      }
    }
  },
  components: {
    NavBottom,
    Head,
    PersonalCell
    // Personal,
    // Setting,
    // PersonalInfo
  },
  computed: {
    // ...mapGetters([ 'setting', 'personalInfo' ])
  },
  methods: {
    // ...mapActions([ 'refreshUserInfo' ]),
    toLink () {
      // this.$store.commit('voice', 'recharge')
      // this.$router.push('/rechargeList')
    }
    // async withdrawalRedirect () {
    //   // 获取用户银行卡信息，有无信息分别对应跳转到提现和绑定页面
    //   const res = await getBankInfoApi()
    //   const { code, data } = res
    //   if (code === 0) {
    //     this.Utils.Storage.save('bankInfo', data)
    //     this.$router.push('/mobile/mine/withdrawals.html')
    //   } else {
    //     this.$router.push('/mobile/mine/withdrawals.html')
    //   }
    // }
  },
  created () {
    // this.refreshUserInfo()
    // if (!this.Utils.Storage.get('music')) {
    //   this.Utils.Storage.save('music', {
    //     shake: true,
    //     click: true,
    //     message: true,
    //     plan: true,
    //     reg: true,
    //     packet: true,
    //     openVoice: true
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.mine {
  // background-image: linear-gradient(#d81e06, #fff);
  background-size: 100px;
  padding-bottom: 49px;
}
.head-left-btn {
  position: absolute;
  left: 0;
  font-size: 0.375rem;
}
// .mine-operation {
//   height: 2rem;
//   background: #fff;
//   margin-bottom: .3125rem;
//   .mine-opertiaon-recharge,
//   .mine-opertiaon-withdrawal {
//     float: left;
//     width: calc(50% - .5px);
//     line-height: 2rem;
//     text-align: center;
//     h2 {
//       font-size: .4375rem;
//       padding-left: 1.125rem;
//       box-sizing: border-box;
//       display: inline-block;
//     }
//   }
//   // .mine-opertiaon-recharge {
//   //   border-right: 1px solid #f5f4f9;
//   //   h2 {
//   //     background: url('/mobile/images/mine/icon_recharge.png') no-repeat;
//   //     background-size: 0.9375rem;
//   //     background-position: center left;
//   //     color: #d81e06;
//   //   }
//   // }
//   // .mine-opertiaon-withdrawal h2 {
//   //   background: url('/mobile/images/mine/icon_tixian.png') no-repeat;
//   //   background-size: 0.9375rem;
//   //   background-position: center left;
//   //   color: #1296db;
//   // }
// }

.person-head {
  position: relative;
  overflow: hidden;
  padding: 8px 10px;
  .info {
    float: left;
    overflow: hidden;
    h4 {
      font-weight: 100;
      line-height: 22px;
      height: 22px;
      font-size: 14px;
    }
    h5 {
      font-weight: 100;
      line-height: 18px;
      font-size: 12px;
      .id {
        padding: 0px 4px;
        border-radius: 4px;
        background: orange;
      }
    }
  }
  .balance {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

.person-detail {
  position: relative;
  .person-detail-top {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: #fff;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    width: 94%;
    margin-left: 3%;
    a {
      display: inline-block;
      line-height: 22px;
      padding: 10px;
      width: calc(100% / 3);
      text-align: center;
      font-size: 14px;
      text-decoration: none;
      box-sizing: border-box;
    }
  }
  .person-detail-bottom {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: #fff;
    width: 94%;
    margin-left: 3%;
    img {
      width: 52%;
      margin-left: 24%;
      margin-top: 5px;
      height: auto;
      display: block;
    }
    a {
      display: inline-block;
      line-height: 22px;
      padding: 8px;
      width: calc(100% / 4);
      box-sizing: border-box;
      text-align: center;
      font-size: 13px;
      text-decoration: none;
    }
  }
}

.person-link {
  position: relative;
  margin: 10px 0;
  nav {
    border-radius: 8px;
    background: #fff;
    width: 94%;
    margin-left: 3%;
    font-size: 0;
    img {
      width: 52%;
      margin-left: 24%;
      margin-top: 5px;
      height: auto;
      display: block;
    }
    a {
      display: inline-block;
      line-height: 22px;
      padding: 8px;
      width: calc(100% / 4);
      box-sizing: border-box;
      text-align: center;
      font-size: 13px;
      text-decoration: none;
    }
  }
}

</style>

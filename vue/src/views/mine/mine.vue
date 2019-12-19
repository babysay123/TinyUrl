<style lang="scss" scoped>
.mine {
  padding-bottom: 49px;
}
.mine-operation {
  height: 2rem;
  background: #fff;
  margin-bottom: .3125rem;
  .mine-opertiaon-recharge,
  .mine-opertiaon-withdrawal {
    float: left;
    width: calc(50% - .5px);
    line-height: 2rem;
    text-align: center;
    h2 {
      font-size: .4375rem;
      padding-left: 1.125rem;
      box-sizing: border-box;
      display: inline-block;
    }
  }
  .mine-opertiaon-recharge {
    border-right: 1px solid #f5f4f9;
    h2 {
      background: url('/mobile/images/mine/icon_recharge.png') no-repeat;
      background-size: 0.9375rem;
      background-position: center left;
      color: #d81e06;
    }
  }
  .mine-opertiaon-withdrawal h2 {
    background: url('/mobile/images/mine/icon_tixian.png') no-repeat;
    background-size: 0.9375rem;
    background-position: center left;
    color: #1296db;
  }
}
</style>

<template>
  <section class="mine">

    <Personal />

    <div class="mine-operation">
      <div class="mine-opertiaon-recharge" @click="toLink">
        <h2>充值</h2>
      </div>
      <div class="mine-opertiaon-withdrawal" @click="routerLink({ path: '/mobile/mine/withdrawals.html', redirect: true })">
        <h2>提现</h2>
      </div>
    </div>

    <PersonalCell />

    <NavBottom />

    <Setting v-if="setting" />

    <PersonalInfo v-if="personalInfo" />

  </section>
</template>

<script>
import Personal from 'Components/mine/personal'
import PersonalCell from 'Components/mine/personalCell'
import NavBottom from 'Components/global/nav-bottom'
import Setting from 'Components/mine/setting'
import PersonalInfo from 'Components/mine/personalInfo'
import { mapGetters, mapActions } from 'vuex'
// import { getBankInfoApi } from 'Plugins/api'
export default {
  components: { NavBottom, Personal, PersonalCell, Setting, PersonalInfo },
  computed: {
    ...mapGetters([ 'setting', 'personalInfo' ])
  },
  methods: {
    ...mapActions([ 'refreshUserInfo' ]),
    toLink () {
      this.$store.commit('voice', 'recharge')
      this.$router.push('/rechargeList')
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
    if (!this.Utils.Storage.get('music')) {
      this.Utils.Storage.save('music', {
        shake: true,
        click: true,
        message: true,
        plan: true,
        reg: true,
        packet: true,
        openVoice: true
      })
    }
  }
}
</script>

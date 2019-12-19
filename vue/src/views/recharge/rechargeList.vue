<style lang="scss" scoped>
.recharge-list {
  margin-top: 1.125rem;
  height: calc(100vh - 1.125rem);
}
.user-info {
  height: 35px;
  background: #fff;
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    margin-left: 17px;
    margin-right: 15px;
  }
  .user-info-text {
    color: #999;
    font-size: 15px;
    line-height: 25px;
    margin-left: 11px;
  }
}
.recharge-type {
  height: 40px;
  line-height: 40px;
  padding-left: 17px;
  font-size: 14px;
  color: #333;
  font-weight: 400;
}
.mint-loadmore {
  height: 79%;
}
</style>

<template>
  <section class="recharge-list">
    <Head :backHandler="backHandler" fixed>
      <h3>选择充值方式</h3>
      <a class="menu-right" @click="routerLink({ path: '/rechargeRecord' })">明细</a>
      <!-- <a class="menu-right" href="/mobile/mine/rechargeList.html?type=0">明细</a> -->
    </Head>
    <div class="user-info">
      <!-- <img class="avatar" :src="userInfo.avatar || '/mobile/images/mine/geren_tou.png'"> -->
      <div class="user-info-text">
        <span>账号：{{ getUserInfo.account }}</span>
        <span>
          余额：
          <span class="text-red">{{ getUserInfo.balance | numFixed }}</span>
          元
          <i class="fa fa-refresh text-orange" @click="refreshUserInfo" />
        </span>
      </div>
    </div>
    <Rechargmiddle>

    </Rechargmiddle>
    <!-- <mt-loadmore :top-method="getConfig" ref="loadmore">
      <RechargeCell :cell="cell" />
    </mt-loadmore> -->
  </section>
</template>

<script>
import Head from 'Components/global/head_new'
import RechargeCell from 'Components/recharge/rechargeCell'
import Rechargmiddle from './rechargmiddle'
export default {
  components: { Head, RechargeCell, Rechargmiddle },
  data () {
    return {
      config: [],
      userInfo: this.Utils.Storage.get('user') || { account: '', userId: 0 }
    }
  },
  computed: {
    getUserInfo: {
      get () {
        return this.userInfo
      },
      set (info) {
        this.userInfo = info
      }
    },
    cell () {
      return this.config.map(e => {
        e.available = e.payways.length > 0
        e.callback = () => this.cellCallback(e)
        return e
      })
    }
  },
  methods: {
    cellCallback (e) {
      this.Utils.Storage.save('rechargeConfig', e)
      if (e.type === 'vip') return this.$router.push('/newVipToUp')
      this.$router.push('/rechargeDetails')
    },
    backHandler () {
      window.history.back()
    },
    async getConfig () {
      const { userId } = this.getUserInfo
      const res = await this.axios.postOnce('/front/recharge/get_deposit_list.do', { platform: 'WEB', version: '1.0.0', userId })
      const { code, data } = res
      if (code === 0) {
        this.config = [...data.vipRechargeConfigList, ...data.rechargeList]
        this.$refs.loadmore && this.$refs.loadmore.onTopLoaded()
      }
    },
    async refreshUserInfo () {
      const res = await this.axios.getOnce('/passport/check_status.do')
      const { code, data } = res
      if (code === 0) {
        this.Utils.Storage.save('user', data)
        this.getUserInfo = data
        this.$toast({
          message: '刷新成功~',
          duration: 1800
        })
      }
    }
  },
  created () {
    if (!this.Utils.Storage.get('user') || !this.Utils.Storage.get('sessionid')) {
      this.routerLink({ path: '/login' })
    }
    // this.getConfig()
  }
}
</script>

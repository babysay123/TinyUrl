<style lang="scss" scoped>
.recharge-list {
  margin-top: 1.125rem;
  height: calc(100vh - 1.125rem);
}
.recharge-list-container {
  height: 100%;
}
</style>

<template>
  <section class="recharge-list">
    <Head fixed>
      <h3>充值记录</h3>
    </Head>
    <div class="recharge-list-container">
      <RefreshLoad :pullload="getData">
        <RechargeListCard
          v-for="(l, index) in list"
          :key="index"
          :data="l"
        />
      </RefreshLoad>
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import RechargeListCard from 'Components/recharge/rechargeListCard'
import RefreshLoad from 'Components/global/refreshLoad'
import { rechargeListApi } from 'Plugins/api'
export default {
  components: { Head, RechargeListCard, RefreshLoad },
  data () {
    return {
      page: 1,
      list: []
    }
  },
  methods: {
    async getData () {
      const res = await rechargeListApi({ page: this.page })
      const { code, data } = res
      if (code === 0) {
        this.list = data
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

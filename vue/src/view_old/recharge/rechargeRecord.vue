<template>
  <div>
    <Head fixed>
      <h3>充值记录</h3>
    </Head>

    <div v-if="noDate" class="noRecord">
      <img src="/mobile/images/mine/face_no_game.png">
      <span class="text-gray">暂无记录</span>
    </div>

    <div
      v-else
      class="rechargeRecord-list"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="infinite"
      :infinite-scroll-distance="10"
    >
      <RefreshLoad :pullload="getData">
        <RechargeRecordCard
          v-for="(r, i) in records"
          :key="i"
          :data="r"
        />
      </RefreshLoad>
      <div v-if="isAll" class="all-tip">---END---</div>
    </div>

  </div>
</template>

<script>
import Head from 'Components/global/head'
import RefreshLoad from 'Components/global/refreshLoad'
import RechargeRecordCard from 'Components/recharge/rechargeRecordCard'
import { rechargeRecordApi } from 'Plugins/api'
export default {
  components: { Head, RefreshLoad, RechargeRecordCard },
  data () {
    return {
      page: 1,
      records: [],
      infinite: true,
      isAll: false
    }
  },
  computed: {
    noDate () {
      return !this.records.length
    }
  },
  methods: {
    async loadMore () {
      console.log(11111)
      if (!this.isAll) {
        this.infinite = false
        const res = await rechargeRecordApi({ page: this.page })
        this.records = [ ...this.records, ...res.data ]
        this.infinite = true
        this.isAll = this.records.length >= res.total || res.data.length !== 20
        this.page++
      }
    },
    async getData () {
      console.log(22222)
      const res = await rechargeRecordApi({ page: 1 })
      this.page++
      this.records = res.data
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.rechargeRecord-list {
  height: calc(100% - 1.125rem);
  margin-top: 1.125rem;
}
.all-tip {
  text-align: center;
  line-height: 40px;
}
.noRecord {
  margin-top: 30%;
  text-align: center;
}
.noRecord img {
  width: 50%;
  display: block;
  margin: 0 auto 20px;
}
</style>

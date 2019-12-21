<!--
 * @Author: your name
 * @Date: 2019-10-31 19:31:26
 * @LastEditTime: 2019-11-05 20:58:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\agencyExplain.vue
 -->
<template>
  <div>
    <Head fixed>
      <h3>{{title}}</h3>
    </Head>
    <head-title v-if="isChilShow"  class="fixd-margin" :headDataList="headDataList" @getHeadSelect="getHeadSelect"></head-title>
    <Table :columns="columns" :dataSource="tabDataList" :detail1="false"/>
  </div>
</template>
<script>
import Head from 'Components/global/head'
import Table from 'Components/active/agentTab'
import headTitle from 'Components/agency/headTitleList'
import { getVendorListApi, getVendorListDataApi } from 'Plugins/api'
const columns = [
  { title: '团队业绩/日', key: 'amount' },
  { title: '代理级别', key: 'levelName' },
  { title: '返水金额', key: 'share' }
]
export default {
  name: 'agencyExplain',
  components: { Head, Table, headTitle },
  data () {
    return {
      title: '代理说明',
      columns,
      tabDataList: [],
      headDataList: [],
      isChilShow: false
    }
  },
  computed: {},
  methods: {
    async getManufacturerData () {
      const { data } = await getVendorListApi()
      this.headDataList = data
      // 控制子组件拿到数据后再渲染 避免报错
      this.isChilShow = true
    },
    async getHeadSelect (key) {
      const { data } = await getVendorListDataApi({ code: key })
      for (let item of data) {
        var share = 100 * item.share
        item.share = `每万返佣${share.toFixed(2)}元`
      }
      this.tabDataList = data
    }
  },
  created () {
    this.getManufacturerData()
  }
}
</script>
<style lang="scss" scoped>
.fixd-margin {
  margin-top: 1.125rem;
}
</style>

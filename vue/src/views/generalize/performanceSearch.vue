<!--
 * @Author: your name
 * @Date: 2019-10-31 19:31:26
 * @LastEditTime: 2019-11-05 20:56:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\performanceSearch.vue
 -->
<template>
  <div>
    <Head fixed>
      <h3>{{ title }}</h3>
    </Head>
    <mescroll
      :api="getApiData.method"
      ref="child1"
      :param="param"
      :dataStructure="propsConfig"
    >
      <template v-slot:search="value">
        <header-search
          slot="search1"
          class="fixd-margin"
          :inputPla="'请输入玩家账号'"
          @getInputVal="getInputVal"
        />
      </template>
      <template v-slot:table="data">
        <Table
          :columns="columns"
          :dataSource="data.dataList"
          :detail1="operation"
        />
        <emptyData v-if="data.dataList.length === 0" type="list" title="亲，暂无数据哦"/>
      </template>
    </mescroll>
  </div>
</template>
<script>
import Head from 'Components/global/head_new'
import Table from 'Components/active/agentTab'
import mescroll from 'Components/global/mescroll'
import headerSearch from 'Components/global/headerSearch'
import emptyData from 'Components/global/emptyData'
import { getPerformanceApi } from 'Plugins/api'
const columns = [
  { title: '日期', key: 'time' },
  { title: '直属新增', key: 'addUserNum' },
  { title: '自营业绩', key: 'performance' },
  { title: '团队新增', key: 'addTeamNum' },
  { title: '团队业绩', key: 'teamPerformance' },
  { title: '所得佣金', key: 'preAmount' }
]
const propsConfig = {
  offset: 'offset',
  countType: 'count',
  dataType: 'dataList',
  count: 15
}
export default {
  name: 'performanceSearch',
  components: { Head, mescroll, headerSearch, Table, emptyData },
  data () {
    return {
      title: '业绩查询',
      columns,
      propsConfig,
      dataList: [],
      param: {},
      operation: false
    }
  },
  computed: {
    getApiData () {
      return { method: getPerformanceApi }
    }
  },
  methods: {
    detail (body) {
      console.log(body, '')
    },
    getInputVal (account) {
      let account1 = { account: account }
      this.param = Object.assign(account1)
      this.$refs.child1.getParmaData()
    }
  }
}
</script>
<style lang="scss" scoped>
.fixd-margin {
  margin-top: 1.325rem;
}
.blank {
  width: 3rem;
  display: block;
  margin: 2rem auto 0;
}
</style>

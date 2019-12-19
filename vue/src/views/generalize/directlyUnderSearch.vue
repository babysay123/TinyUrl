<template>
  <div>
    <Head fixed>
      <h3>{{title}}</h3>
    </Head>
    <mescroll :api="getApiData.method" ref="child1" :param="param" :dataStructure="propsConfig">
      <template v-slot:btnList="value">
        <Head-date
          class="fixd-margin title-style"
          :selectType="'date'"
          :headDataList="btnList"
          @getHeadSelect="getHeadSelect"
        ></Head-date>
      </template>
      <template v-slot:search="value">
        <header-search
          slot="search1"
          :inputPla="'请输入玩家账号'"
          @getInputVal="getInputVal"
        />
      </template>
      <template v-slot:table="data">
        <Table
          v-if="data.dataList.length !== 0"
          :columns="columns"
          :dataSource="data.dataList"
          :operation="operation"
          @detail="detail"
        />
        <emptyData v-if="data.dataList.length === 0" type="list" title="亲，暂无数据哦"/>
      </template>
    </mescroll>
      <Popup :show="show" title="代理详情">
          <div class="detail">
            <p>玩家账号：<span>{{item.account}}</span></p>
            <p>注册时间：<span>{{item.registerTime}}</span></p>
            <p>团队人数(新增)：<span>{{item.teamNum}}({{item.addTeamNum}})</span></p>
            <ul>
              <li>今日流水：<span>{{item.todayFlow | numFixed(3)}}</span></li>
              <li>总流水：<span>{{item.totalFlow | numFixed(3)}}</span></li>
              <li>直属玩家(新增)：<span>{{item.userNum}}({{item.addUserNum}})</span></li>
              <li>直属代理(新增)：<span>{{item.agentNum}}({{item.addAgentNum}})</span></li>
              <li>今日团队业绩：<span>{{item.teamPerformance | numFixed(3)}}</span></li>
              <li>昨日佣金：<span>{{item.preAmount | numFixed(3)}}</span></li>
              <li>历史总佣金：<span>{{item.historyAmount | numFixed(3)}}</span></li>
              <li>可提取佣金：<span>{{item.receiveAmount | numFixed(3)}}</span></li>
            </ul>
          </div>
        </Popup>
  </div>
</template>
<script>
import Head from 'Components/global/head_new'
import Table from 'Components/active/agentTab'
import HeadDate from 'Components/agency/headTitleList'
import headerSearch from 'Components/global/headerSearch'
import mescroll from 'Components/global/mescroll'
import TimestampParse from 'Plugins/moment'
import Popup from './popup'
import { getDirectlyUnderApi } from 'Plugins/api'
import emptyData from 'Components/global/emptyData'
const columns = [
  { title: '玩家账号', key: 'account' },
  { title: '流水', key: 'todayFlow' },
  { title: '总流水', key: 'totalFlow' },
  { title: '团队人数', key: 'teamNum' },
  { title: '直属人数', key: 'userNum' }
]
const propsConfig = {
  offset: 'offset',
  countType: 'count',
  dataType: 'dataList',
  count: 15
}
const btnList = [
  { name: '今日', key: 'today' },
  { name: '昨日', key: 'yesterday' },
  { name: '本周', key: 'thisWeek' },
  { name: '本月', key: 'month' }
]
export default {
  name: 'directlyUnderSearch',
  components: { Head, HeadDate, Table, headerSearch, mescroll, Popup, emptyData },
  data () {
    return {
      title: '直属查询',
      columns,
      btnList,
      propsConfig,
      dataList: [],
      param: {},
      account: '',
      timestamp: null,
      show: false,
      item: '',
      operation: true
    }
  },
  computed: {
    searchDeaultTime () {
      return {
        begin: TimestampParse('month').begin,
        end: TimestampParse('month').end
      }
    },
    getApiData () {
      return { method: getDirectlyUnderApi }
    }
  },
  methods: {
    detail (body) {
      this.item = body
      console.log(this.item, '')
      this.show = true
    },
    close () {
      this.show = false
    },
    getInputVal (account) {
      this.account = account
      this.param = Object.assign({ account: account }, this.searchDeaultTime, this.timestamp)
      this.$refs.child1.getParmaData()
    },
    async getHeadSelect (timestamp) {
      this.timestamp = timestamp
      this.param = Object.assign(
        { account: this.account },
        this.searchDeaultTime,
        timestamp
      )
      this.$refs.child1.getParmaData()
    }
  }
}
</script>
<style lang="scss" scoped>
.blank {
  width: 3rem;
  display: block;
  margin: 2rem auto 0;
}
.detail{
  width: 9rem;
  p{
    width: 96%;
    line-height: .6rem;
    margin: auto;
    span{
      color: #ff6603;
    }
  }
  ul{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li{
      width: 48%;
      line-height: .6rem;
      span{
        color: #ff6603;
      }
    }
  }
}
.fixd-margin {
  padding-top: 1.125rem;
}
.title-style {
  margin: 10px 0;
}
</style>

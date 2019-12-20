<template>
  <div style="background: #fff" :style="{ marginTop: !hideHead ? '1.125rem' : '' }">
    <Header fixed v-if="!hideHead">
      <h3>晋级奖励</h3>
    </Header>

		<img :src="active.data.promotion || actImage" width="100%">

		<div class="bouns-details">
			<div>
				<span>当前等级：</span>
        <span class="text-red">VIP{{ active.vip || '未登录' }}</span>
			</div>
			<div>
				<span>晋级奖励：</span>
        <span class="text-red">{{ riseAward }}</span>
			</div>
		</div>

		<div
      class="bouns-btn"
      :class="btnStyle.class"
      @click="!!riseAward && getAward()"
    >
      {{ btnStyle.text }}
    </div>

    <div class="bouns-table">
			<Title title="晋级机制" />
			<Table :columns="columns" :dataSource="active.tableData" />
		</div>

    <div class="bouns-explain">
			<Title title="活动说明" />
      <div>
        <p>1、会员每晋升一个等级，都能获得奖励，最高可达{{ topPrice }}元。</p>
        <p> 2、充值1元可获得1成长积分。</p>
        <p>&nbsp;</p>
        <p> 例1：奥巴马从VIP1直接晋升到VIP4，他将能获得{{vip4hj}}元奖励(小数点无条件进位)。</p>
        <p> 例2：本拉登从VIP2直接晋升到VIP4，他将能获得{{subVip4hj}}元奖励(小数点无条件进位)。</p>
      </div>
		</div>
  </div>
</template>

<script>
import Header from 'Components/global/head'
import Title from 'Components/active/title'
import Table from 'Components/active/table'
import GetClientUrlParams from 'Plugins/getClientUrlParams.js'
import { mapGetters, mapActions } from 'vuex'
import { getAwardApi } from 'Plugins/api'

const columns = [
  { title: '等级', key: 'level' },
  { title: '头衔', key: 'levelName' },
  { title: '成长积分', key: 'experience' },
  { title: '晋级奖励', key: 'riseAward' },
  { title: '跳级奖励', key: 'jumpBouns' }
]

export default {
  components: { Header, Title, Table },
  data () {
    return {
      columns,
      actImage: '/mobile/images/activity2.jpg'
    }
  },
  computed: {
    ...mapGetters([ 'active' ]),
    hideHead () {
      return Object.keys(this.$route.query).length
    },
    riseArr () {
      /** 返回晋级奖励数据 */
      return this.active.awardRecord.length && this.active.awardRecord.filter(e => e.awardType === 1)
    },
    riseAward () {
      if (this.riseArr.length) {
        /** 计算可领取的计算奖励金额 */
        return this.riseArr.reduce((a, b) => {
          return { awardAmount: a.awardAmount + b.awardAmount }
        }).awardAmount
      }
      return 0
    },
    btnStyle () {
      /** 根据晋级奖励 渲染按钮 样式 */
      return !this.riseAward ? { class: '', text: '不可领取' } : { class: 'bouns-btn-active', text: '未领取' }
    },
    topPrice () {
      // 取最高级的奖励
      return this.active.tableData.length > 0 ? this.active.tableData[this.active.tableData.length - 1].jumpBouns : ''
    },
    vip4hj () {
      const { tableData, jumpLevel } = this.active
      let str = ''
      if (tableData && tableData.length > 0) {
        str = Math.ceil((tableData[0].riseAward + tableData[1].riseAward + tableData[2].riseAward + tableData[3].riseAward) * jumpLevel)
      }
      return str
    },
    subVip4hj () {
      const { tableData, jumpLevel } = this.active
      let str = ''
      if (tableData && tableData.length > 0) {
        str = Math.ceil((tableData[2].riseAward + tableData[3].riseAward) * jumpLevel)
      }
      return str
    }
  },
  methods: {
    ...mapActions([ 'getActiveData' ]),
    async getAward () {
      /**
       * @constant {Array} awardIds 可领取奖励的数据 id
       */
      const awardIds = this.riseArr.map(e => e.awardId)

      const res = await getAwardApi({ awardIds })
      const { msg } = res

      this.$toast({
        message: msg,
        duration: 1800
      })

      this.getActiveData()
    }
  },
  created () {
    GetClientUrlParams(this.$route, this.getActiveData)
  }
}
</script>

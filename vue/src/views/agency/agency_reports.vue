<template>
  <section>
    <TimePicker />

    <Search :initialValue="initialAccount" placeholder="查询下级交易" />

    <div class="report-content one-line">
      <div
        class="report-block"
        v-for="(b, index) in reportsConfig"
        :key="index"
      >
        <p class="text-red one-line">
          {{ b.prefix }}{{ reports[b.key] | numFixed(b.fixed || 3) }}
        </p>
        <p>{{ b.label }}</p>
      </div>

      <div v-if="reportsConfig.length % 3 === 2" class="report-block-placeholder" />
    </div>
  </section>
</template>

<script>
import TimePicker from 'Components/agency/timePicker'
import Search from 'Components/agency/search'
import { reportFormApi } from 'Plugins/api'
import { mapGetters, mapMutations } from 'vuex'

const reportsConfig = [
  { label: '投注金额', key: 'buyTotal', prefix: '￥' },
  { label: '中奖金额', key: 'winTotal', prefix: '￥' },
  { label: '充值赠送', key: 'rechargePresentTotal', prefix: '￥' },
  { label: '团队返点', key: 'rebateTotal', prefix: '￥' },
  { label: '团队盈利', key: 'teamProfit', prefix: '￥' },
  { label: '投注人数', key: 'temNumberOfBets', fixed: '0' },
  { label: '首充人数', key: 'firstDepositUsers', fixed: '0' },
  { label: '注册人数', key: 'regUsers', fixed: '0' },
  { label: '下级人数', key: 'userTotal', fixed: '0' },
  { label: '团队余额', key: 'teamBalance', prefix: '￥' },
  { label: '充值金额', key: 'rechargeTotal', prefix: '￥' },
  { label: '提现金额', key: 'withdrawalTotal', prefix: '￥' },
  { label: '返点(下级)', key: 'childRebateTotal', prefix: '￥' },
  { label: '返点(自身)', key: 'myRebateTotal', prefix: '￥' },
  { label: '晋级赠送', key: 'riseLevelAward', prefix: '￥' },
  { label: '注册赠送', key: 'registerPresentTotal', prefix: '￥' },
  { label: '每日嘉奖', key: 'everydayAward', prefix: '￥' }
]

export default {
  components: { TimePicker, Search },
  data () {
    return {
      reportsConfig,
      reports: {},
      initialAccount: ''
    }
  },
  computed: {
    ...mapGetters([ 'agencyParams' ]),
    defaultAccount () {
      const { userAccount } = this.$route.query
      return userAccount
    }
  },
  methods: {
    ...mapMutations([ 'setAgencyState' ]),
    async getData () {
      const { account, begin, end } = this.agencyParams
      const res = await reportFormApi({
        begin,
        end,
        account: this.defaultAccount || account
      })
      const { code, data } = res
      if (code === 0) {
        this.reports = data
      }
    }
  },
  created () {
    this.initialAccount = this.defaultAccount
    this.setAgencyState({
      agencyFunc: this.getData
    })
  }
}
</script>

<style lang="scss" scoped>
.report-content {
  padding: 0 2.5% .6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .report-block {
    width: 31%;
    height: 2.75rem;
    margin-top: .5rem;
    border-radius: .15rem;
    background: #fff;
    font-size: 16px;
    text-align: center;
    .text-red {
      margin: .625rem 0 .5625rem;
    }
  }
  .report-block-placeholder {
    width: 31%;
    height: 2.75rem;
    margin-top: .5rem;
  }
}
</style>

<style lang="scss" scoped>
.orderList-details {
  margin-top: 1.125rem;
}
.details-betting {
  margin-top: 10px;
  padding: 10px;
  background: #fff;
}
.details-betting-table {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  thead {
    background: #40a0e9;
    color: #fff;
    line-height: 26px;
  }
  tbody {
    line-height: 35px;
  }
}
</style>

<template>
  <section class="orderList-details">
    <Head fixed>
      <h3>详情</h3>
      <a class="menu-right" style="margin-right: 10px">炫耀一下</a>
    </Head>
    <OrderDetailsInfo :info="game" :num="details.luckNumber" :status="status" />
    <DetailsCard :details="detailsData" />
    <div class="details-betting">
      <p>投注号码</p>
      <table cellpadding="0" cellspacing="0" class="details-betting-table">
        <thead>
          <tr>
            <td>投注记录</td>
            <td>投注金额</td>
            <td>中奖情况</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in bettings" :key="b.id">
            <td>{{ b.log }}</td>
            <td>{{ (b.fee / 100) | numFixed }}</td>
            <td :class="{ 'text-red': b.win }">{{ b.win | isHit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head_new'
import OrderDetailsInfo from 'Components/orderList/orderDetailsInfo'
import DetailsCard from 'Components/global/detailsCard'
import { lotteryInfoApi, orderDetailsApi } from 'Plugins/api'
import filters from 'Plugins/filters/filters'
export default {
  components: { Head, OrderDetailsInfo, DetailsCard },
  data () {
    return {
      game: {},
      details: {
        luckNumber: ''
      },
      bettings: []
    }
  },
  filters: {
    isHit (win) {
      return win ? `中${win}元` : '未中奖'
    }
  },
  computed: {
    status () {
      switch (this.details.status) {
        case 1:
          return { color: 'text-gray', text: '待开奖' }
        case 2:
          return { color: 'text-gray', text: '未中奖' }
        case 3:
          return { color: 'text-red', text: `${this.details.winFee}元` }
        case 4:
          return { color: 'text-gray', text: '和局' }
        case 10:
          return { color: 'text-gray', text: '已撤单' }
        case 20:
          return { color: 'text-gray', text: '已撤单' }
        case 30:
          return { color: 'text-gray', text: '追加中' }
        case 99:
          return { color: 'text-gray', text: '订单异常' }
        default:
          return { color: 'text-gray', text: '' }
      }
    },
    detailsData () {
      const { numFixed } = filters
      const { prizeTime, orderId, totalFee, count, rebate, rebateFee, prize, betTime, groupName, playName } = this.details
      return [
        { label: '开奖时间', content: prizeTime, color: 'text-red' },
        { label: '订单号', content: orderId, copy: true },
        { label: '投注金额', content: `${numFixed(totalFee)}元` },
        { label: '投注注数', content: count },
        { label: '投注返点', content: `${numFixed(rebate)}%`, color: 'text-red' },
        { label: '返点金额', content: `${numFixed(rebateFee)}元`, color: 'text-red' },
        { label: '投注赔率', content: prize },
        { label: '投注时间', content: betTime },
        { label: '投注名称', content: `${groupName}-${playName}` }
      ]
    }
  },
  async created () {
    const { lotteryId, oid } = this.$route.query
    const game = await lotteryInfoApi({ lotteryId })
    const details = await orderDetailsApi({ orderId: oid })
    this.game = game.data
    this.details = details.data
    this.bettings = details.data.details
  }
}
</script>

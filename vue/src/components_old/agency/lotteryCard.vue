<template>
  <div class="betting-card" @click="openDetails && openDetails(data)">
    <div class="betting-card-title">{{ listComputed.title }}</div>
    <div
      class="betting-card-items"
      v-for="(l, index) in listComputed.list"
      :key="index"
    >
      <template v-if="l.template">
        <span v-html="l.text" />
        <span v-html="l.right" />
      </template>

      <template v-else>
        <span>{{ l.text }}</span>
        <span>{{ l.right }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import filters from 'Plugins/filters'
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    openDetails: {
      type: Function
    },
    type: {
      type: String,
      default: 'betting'
    }
  },
  computed: {
    ...mapGetters([ 'type_config' ]),
    status () {
      /**
       * @author Cyan
       * @param {Number} status 投注状态
       * @param {Number} winFee 中奖金额
       * @param {Function} numFixed 小数点修正
       * @description 根据传递的投注状态判断，返回相对于的文本
       */
      const { status, winFee } = this.data
      const { numFixed } = filters
      switch (status) {
        case 1:
          return { color: '', text: '未开奖' }
        case 2:
          return { color: '', text: '未中奖' }
        case 3:
          return { color: 'text-red', text: `+${numFixed(winFee, 3)}元` }
        default:
          return { color: '', text: '' }
      }
    },
    listComputed () {
      if (this.type === 'transaction') {
        const {
          account,
          orderId,
          type,
          variableAmount,
          afterAmount,
          changedTime,
          remark
        } = this.data
        // 从type_config解析类型
        const typeParse = this.type_config.find(e => e[type])[type]
        const { numFixed } = filters
        let getAmount = '-'
        let useAmount = '-'
        // 根据变化金额的正负判断是收入还是支出
        if (variableAmount < 0) {
          useAmount = -1 * variableAmount + '元'
        } else {
          getAmount = numFixed(variableAmount, 3) + '元'
        }
        return {
          title: `账号：${account}`,
          list: [
            { text: `订单号：${orderId}` },
            { text: `交易类型：<span class="text-green">${typeParse}</span>`, template: true },
            { text: `收入金额：<span class="text-red">${getAmount}</span>`, right: `支出金额：<span class="text-red">${useAmount}</span>`, template: true },
            { text: `可用余额：<span class="text-red">${numFixed(afterAmount, 3)}元</span>`, template: true },
            { text: `投注时间：${changedTime}` },
            { text: `备注：${remark || ''}` }
          ]
        }
      } else if (this.type === 'football') {
        const {
          orderId,
          account,
          totalFee,
          content,
          _count,
          playName,
          betTime
        } = this.data

        const { text } = this.status

        return {
          title: `订单号：${orderId}`,
          list: [
            { text: `投注账号：${account}`, right: `投注金额：￥${totalFee}` },
            { text: `玩法：${content}`, right: `注数：${_count}` },
            { text: `串关方式：${playName}`, right: `投注状态：${text}` },
            { text: `投注时间：${betTime}` }
          ]
        }
      } else {
        const {
          orderId,
          account,
          totalFee,
          lotteryName,
          issue,
          content,
          betTime
        } = this.data
        const { color, text } = this.status
        return {
          title: `订单号：${orderId}`,
          list: [
            { text: `投注账号：${account}`, right: `投注金额：￥${totalFee}` },
            { text: `<span><span class="text-red">${lotteryName} </span>期号：${issue}</span>`, template: true },
            { text: `投注号码：${content}` },
            { text: `<span>投注状态：<span class="${color}">${text}</span></span>`, template: true },
            { text: `投注时间：${betTime}` }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.betting-card {
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: .25rem;
  background: #fff;
  .betting-card-title {
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #d81e06;
    color: #fff;
  }
  .betting-card-items {
    padding: 3px 10px;
    line-height: .75rem;
    color: #989898;
    display: flex;
    justify-content: space-between;
    word-break: break-all;
  }
}
</style>

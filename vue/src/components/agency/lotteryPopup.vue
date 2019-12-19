<template>
  <Popup v-model="show" direction="center">
    <div class="betting-popup">
      <div class="betting-popup-base">
        <p>{{ data.issue }}期</p>
        <p>{{ data.lotteryName }}</p>
        <p class="text-orange">{{ status }}</p>
      </div>
      <div class="betting-popup-content">
        <p class="one-line">订单号：{{ data.orderId }}</p>
        <ul>
          <li>
            <span>投注号码：</span>
            <span>{{ data.content }}</span>
          </li>
          <li>
            <span>开奖号码：</span>
            <span>{{ data.luckNumber }}</span>
          </li>
          <li>
            <span>投注时间：</span>
            <span>{{ data.betTime }}</span>
          </li>
          <li>
            <span>玩法名称：</span>
            <span>{{ data.playName }}</span>
          </li>
        </ul>
        <table cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>注数</th>
              <th>单注金额</th>
              <th>投注金额</th>
              <th>中奖金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-red">{{ data._count }}</th>
              <th class="text-orange">{{ (data.unitFee / 100) | numFixed }}</th>
              <th class="text-orange">{{ data.totalFee | numFixed }}</th>
              <th class="text-orange">{{ data.winFee | numFixed(3) }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from 'Components/global/popup'
import filters from 'Plugins/filters'
export default {
  components: { Popup },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object
    },
    close: {
      type: Function
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.close && this.close()
      }
    },
    status () {
      const { status, winFee } = this.data
      const { numFixed } = filters
      switch (status) {
        case 1:
          return '未开奖'
        case 2:
          return '未中奖'
        case 3:
          return `+${numFixed(winFee, 3)}元`
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.betting-popup {
  width: 98%;
  background: #fff;
  display: flex;
  .betting-popup-base {
    width: 2.75rem;
    background: #d52833;
    color: #fff;
    padding: .5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .text-orange {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .betting-popup-content {
    flex: 1;
    p {
      color: #999;
      padding: 0 .125rem;
      height: 1.125rem;
      line-height: 1.125rem;
    }
    ul {
      padding: .25rem .125rem;
      border-top: 1px dotted #7f7f7f;
      border-bottom: 1px dotted #7f7f7f;
      box-sizing: border-box;
      li {
        height: 26px;
        line-height: 26px;
        font-size: .375rem;;
      }
    }
    table {
      width: 100%;
      margin: .25rem 0;
      padding: 0 .2rem;
      th {
        font-size: .375rem;
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>

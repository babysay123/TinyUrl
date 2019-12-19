<!--
 * @Author: your name
 * @Date: 2019-11-01 19:23:14
 * @LastEditTime: 2019-11-06 16:20:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\reportDetall.vue
 -->
<template>
<div>
     <ul class="reportForm-nav">
       <li v-for=" (list, index) in reportData" :key="index">
         <p>{{list.money}}</p>
         <p>  {{list.title}}</p>
       </li>
     </ul>
</div>

</template>
<script>
var changeThreeDecimal = function (x) {
  var fx = parseFloat(x)
  if (isNaN(fx)) {
    return 0
  }
  fx = Math.round(x * 1000) / 1000
  var sx = fx.toString()
  var posdecimal = sx.indexOf('.')
  if (posdecimal < 0) {
    posdecimal = sx.length
    sx += '.'
  }
  while (sx.length <= posdecimal + 3) {
    sx += '0'
  }
  return sx
}
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      reportData: [
        { money: '0.000', title: '投注金额', key: 'commonLotteryTotalFee' },
        { money: '0.000', title: '中奖金额', key: 'commonLotteryWinFee' },
        { money: '0.000', title: '充值赠送', key: 'rechargePresentTotal' },
        { money: '0.000', title: '团队返点', key: 'rebateTotal' },
        { money: '0.000', title: '团队盈利', key: 'teamProfit' },
        { money: '0', title: '投注人数', key: 'temNumberOfBets' },
        { money: '0', title: '首充人数', key: 'firstDepositUsers' },
        { money: '0', title: '注册人数', key: 'regUsers' },
        { money: '0', title: '下级人数', key: 'userTotal' },
        { money: '0.000', title: '团队余额', key: 'temBalance' },
        // {money: '0.00', title: '注册礼金', key: ""},
        { money: '0.000', title: '充值金额', key: 'rechargeTotal' },
        { money: '0.000', title: '提现金额', key: 'withdrawalTotal' },
        // 三方
        { money: '0.000', title: '第三方投注', key: 'valid_betting' },
        { money: '0', title: '第三方人数', key: 'player_amount' },
        { money: '0.000', title: '第三方盈利', key: 'result' },

        { money: '0.000', title: '返点(下级)', key: 'childRebateTotal' },
        { money: '0.000', title: '返点(自身)', key: 'myRebateTotal' },
        { money: '0.000', title: '晋级赠送', key: 'riseLevelAward' },
        { money: '0.000', title: '注册赠送', key: 'registerPresentTotal' },
        { money: '0.000', title: '每日嘉奖', key: 'everydayAward' }
      // {money: '0.00', title: '返点礼金'},
      // {money: '0.00', title: '充值人数'},
      ],
      intNums: [
        'temNumberOfBets', 'firstDepositUsers', 'regUsers', 'userTotal', 'player_amount'
      ]
    }
  },
  methods: {
    reportFormClass (val) {
      if (val !== undefined && val !== '' && ('' + val).length > 9) {
        return 'report-num two-line'
      } else {
        return 'report-num'
      }
    }
  },
  created () {
    let _this = this
    let _data = _this.data
    for (let _item of _this.reportData) {
      if (_data[_item.key] && (_data[_item.key] + '').length > 0) {
        if (_this.intNums.indexOf(_item.key) > -1) {
          _item.money = _data[_item.key]
        } else {
          // _item.money = _data[_item.key].toFixed(2);
          _item.money = changeThreeDecimal(Math.floor(_data[_item.key] * 1000) / 1000)
        }
      } else {
        if (_this.intNums.indexOf(_item.key) > -1) {
          _item.money = '0'
        } else {
          _item.money = '0.000'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.reportForm-nav {
  width: 9rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  li{
    width: 23%;
    text-align: center;
    border-radius: 4px;
    margin: 3px;
    background: #f5f4f9;
    :first-child{
      color: #db2008;
    }
    p{
      line-height: 1rem;
    }
  }
}

</style>

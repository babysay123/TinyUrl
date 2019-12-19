<!--
 * @Author: your name
 * @Date: 2019-10-30 15:07:07
 * @LastEditTime: 2019-11-07 15:36:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\reportForm.vue
 -->
<template>
  <section  class="wrap" >
    <div id="page-wrapper" v-cloak>  <!---->
       <Head fixed>
      <h3>代理报表</h3>
    </Head>
    <div class="zhanwei"></div>
        <section :class="pageContent()">
            <Dataselect
                :picker-start-value="pickerStartValue"
                :picker-end-value="pickerEndValue"
                @chang-time="changeTime"
                @open-start-time="openStartTimer"
                @open-end-time="openEndTimer"
                :month="true"
                :lastmonth="true"
                :sevenday="true"
            ></Dataselect>
            <section class="fw">
                <input type="text" placeholder="请输入会员账号" class="search" v-model="requestParam.account">
                <div class="searchBtn" @click="request">查询</div>
            </section>
        </section>
        <nav class="reportForm-nav">
            <!-- href="javascript:void(0);" -->
            <a
                v-for=" (list, index) in reportData"
                :key="index"
                :class="reportFormClass(list.money)"
            >
                <!--@touchstart="isActive = index"-->
                <!--:class="{active: index === isActive}"-->
                <span v-if="intNums.indexOf(list.key) == -1" class="report-num-tit">¥{{list.money}}</span>
                <span v-else class="report-num-tit">{{list.money}}</span>
                {{list.title}}
            </a>
        </nav>
    </div>
</section>
</template>
<script>
import { GlobalReport } from 'Plugins/api'
import layer from 'vue-layer'
import Head from 'Components/global/head_new'
// import { sessionUtil } from 'Plugins/utils'
import { newSessionStorage } from './utils'
import Dataselect from './dataselect.vue'
const GetQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}
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
  name: 'reportForm',
  components: { Dataselect, Head },
  data: function () {
    return {
      isActive: -1,
      requestParam: {
        begin: null,
        end: null,
        account: null,
        pageNumber: 1
      },
      headShow: false,
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
      ],
      pickerStartValue: '请选择开始日期', // 时间组件 开始日期
      pickerEndValue: '请选择结束日期' // 时间组件 结束日期
    }
  },
  created () {
    let _this = this
    // TODO: 如果url有值，直接改变初始值
    if (GetQueryString('account')) {
      _this.requestParam.account = GetQueryString('account')
    }
    if (GetQueryString('begin')) {

    }
    if (GetQueryString('end')) {

    }
  },
  filters: {

  },
  methods: {
    useStorageData () {
      // let loadInx = loads()
      setTimeout(() => {
        // layer.close(loadInx)
        const { begin } = this.requestParam
        const storageKey = `reportFormData-${begin}`
        const storageData = newSessionStorage.get(storageKey)
        if (!storageData) {
          this.request('storage')
          return
        }
        for (let _item of this.reportData) {
          if (storageData[_item.key] && (storageData[_item.key] + '').length > 0) {
            if (this.intNums.indexOf(_item.key) > -1) {
              _item.money = storageData[_item.key]
            } else {
              _item.money = changeThreeDecimal(Math.floor(storageData[_item.key] * 1000) / 1000)
            }
          } else {
            if (this.intNums.indexOf(_item.key) > -1) {
              _item.money = '0'
            } else {
              _item.money = '0.000'
            }
          }
        }
      }, 1000)
    },
    request (storage) {
      let _this = this
      console.log(_this.requestParam, '')
      GlobalReport(_this.requestParam).then(res => {
        let _data = res.data
        if (res.code >= 300 && res.code < 400) {
          this.$toast({
            message: res.msg,
            duration: 1800 })
          setTimeout(function () {
            window.history.back(1)
          }, 2000)
        }
        if (!_data) {
          this.$toast({
            message: '没有查询到该账户数据，请检查帐号是否正确',
            duration: 1800 })
          return
        }
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
        if (storage) {
          const { begin } = _this.requestParam
          const storageKey = `reportFormData-${begin}`
          newSessionStorage.save(storageKey, _data, 180)
        }
      })
      GlobalReport(_this.requestParam).then(res => {
        let _data = res.data
        if (res.code >= 300 && res.code < 400) {
          this.toast({
            message: res.msg,
            duration: 1800
          })
          setTimeout(function () {
            window.history.back(1)
          }, 2000)
        }
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
        if (storage) {
          const { begin } = _this.requestParam
          const storageKey = `reportFormData-${begin}`
          newSessionStorage.save(storageKey, _data, 180)
        }
      })
    },
    reportFormClass (val) {
      if (val !== undefined && val !== '' && ('' + val).length > 9) {
        return 'report-num two-line'
      } else {
        return 'report-num'
      }
    },
    pageContent () {
      if (this.headShow) {
        return 'main reportForm pb2'
      } else {
        return 'main reportForm pb2 notop'
      }
    },
    openStartTimer (t) {
      // 选择开始时间 点击确定的值
      this.pickerStartValue = this.formatDate(t)
      this.pickerStartValue += ':00'
    },
    openEndTimer (t) {
      // 选择结束时间 点击确定的值
      var _this = this
      var timer = t.getTime()
      if (new Date(timer).getMinutes() !== 0) {
        timer = timer + 59 * 1000
        _this.pickerEndValue = global._formatDate(timer)
        _this.pickerEndValue += ':59'
      } else {
        _this.pickerEndValue = global._formatDate(t)
        _this.pickerEndValue += ':00'
      }
      var start = new Date(_this.pickerStartValue).getTime()
      var end = new Date(_this.pickerEndValue).getTime()
      if (start >= end) {
        layer.open({
          content: '开始时间 不能大于 结束时间',
          btn: '我知道了'
        })
      } else {
        // 正确后执行回调
        _this.requestParam.begin = new Date(_this.pickerStartValue.replace(/-/g, '/')).getTime()
        _this.requestParam.end = new Date(_this.pickerEndValue.replace(/-/g, '/')).getTime()
        _this.request()
      }
    },
    changeTime (start, end, isStorage) {
      // 组件传过来的 开始时间  和  结束时间  毫秒数
      var _this = this
      console.log(start, end, isStorage)
      _this.pickerStartValue = this.formatDate(start)
      _this.pickerEndValue = this.formatDate(end)
      _this.pickerStartValue += ':00'
      _this.pickerEndValue += ':59'
      _this.requestParam.begin = new Date(_this.pickerStartValue.replace(/-/g, '/')).getTime()
      _this.requestParam.end = new Date(_this.pickerEndValue.replace(/-/g, '/')).getTime()
      if (isStorage) {
        _this.useStorageData()
      } else {
        _this.request()
      }
    },
    formatDate (t) {
      var date = new Date(t)
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var nowTime = year + '/' + (zeo(month + 1)) + '/' + zeo(day) + ' ' + zeo(hours) + ':' + zeo(minutes)
      function zeo (obj) {
        return obj < 10 ? '0' + obj : obj
      }
      return nowTime
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'Assets/css/report/index.scss';
</style>

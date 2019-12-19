<!--
 * @Author: your name
 * @Date: 2019-10-31 19:57:50
 * @LastEditTime: 2019-11-07 15:49:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\dataselect.vue
 -->
<template>
  <section style="overflow: hidden; margin: 10px 0;">
            <section className="time-box-new">
                <ul class="report-datas" :class="{'report-datas-month': month}">
                    <li class="report-data" :class="{active: isActive === 7, 'report-data-4': month || day30, 'report-data-3': !month && !day30}" @click="timeChange(7, getDayStart(), getDayEnd(), 'storage')">今天</li>
                    <li class="report-data" :class="{active: isActive === 8, 'report-data-4': month || day30, 'report-data-3': !month && !day30}" @click="timeChange(8, getYestoDayStart(), getYestoDayEnd(), 'storage')">昨天</li>
                    <li v-if="!lastmonth" v-on:click="timeChange(9, getWeekStartDate(), getWeekEndDate(), 'storage')" class="report-data report-data-4" :class="{active: isActive === 9}">7天</li>
                    <li v-if="thisweek" v-on:click="timeChange(9, getWeekStartDate(), getWeekEndDate(), 'storage')" class="report-data report-data-4" :class="{active: isActive === 9}">7天</li>
                    <li v-if="sevenday" v-on:click="timeChange(10, getSevenDayStart(), getDayEnd(), 'storage')" class="report-data report-data-4" :class="{active: isActive === 10}">7天</li>
                    <li v-if="day30" class="report-data report-data-4" :class="{active: isActive === 3}" @click="timeChange(3, getBefore30DayStart(), getYestoDayEnd(), 'storage')">30天内</li>
                    <li v-if="month" class="report-data report-data-4" :class="{active: isActive === 3}" @click="timeChange(3, getMonthStartDate(), getMonthEndDate(), 'storage')">本月</li>
                    <li v-if="lastmonth" class="report-data report-data-4" :class="{active: isActive === 6}" @click="timeChange(6, getLastMonthStartDate(), getLastMonthEndDate(), 'storage')">上月</li>
                </ul>
            </section>
                  <template>
                <mt-datetime-picker
                        ref="pickerStart"
                        type="datetime"
                        @confirm="openStartTime"
                        :endDate="endDate"
                >
                </mt-datetime-picker>
            </template>
            <template>
                <!-- <mt-datetime-picker
                        ref="pickerEnd"
                        type="datetime"
                        @confirm="openEndTime"
                       :endDate="endDate"
                >
                </mt-datetime-picker> -->
            </template>
    </section>
</template>
<script>
// import { sessionUtil } from 'Plugins/utils/sessionUtil'
export default {
  props: ['pickerStartValue', 'pickerEndValue', 'month', 'lastmonth', 'day30', 'thisweek', 'sevenday'],
  data () {
    return {
      isActive: 7,
      now: null,
      nowMonth: null,
      nowYear: null,
      nowDay: null,
      oneDay: null,
      getDayStart: null,
      getDayEnd: null,
      getYestoDayStart: null,
      getYestoDayEnd: null,
      getMonthStartDate: null,
      getMonthEndDate: null,
      getLastMonthStartDate: null,
      getLastMonthEndDate: null,
      getWeekStartDate: null,
      getWeekEndDate: null,
      getLastWeekStartDate: null,
      getLastWeekEndDate: null,
      endDate: new Date()
    }
  },
  methods: {
    timeChange (active, start, end, isStorage) {
      this.isActive = active
      this.$emit('chang-time', start, end, isStorage)
    },
    openStartTime (t) {
      this.$emit('open-start-time', t)
    },
    openEndTime (t) {
      this.endDate = new Date()
      this.$emit('open-end-time', t)
    },
    openStartPicker () {
      this.$refs.pickerStart.open()
    },
    openEndPicker () {
      this.$refs.pickerEnd.open()
    }
  },
  created () {
    var _this = this
    _this.now = new Date()
    _this.nowMonth = _this.now.getMonth()
    _this.nowYear = _this.now.getYear()
    _this.nowYear += (this.nowYear < 2000) ? 1900 : 0
    var nowDayOfWeek = _this.now.getDay() === 0 ? 7 : _this.now.getDay()
    _this.nowDay = _this.now.getDate()
    _this.oneDay = 1000 * 60 * 60 * 24
    function formatDate (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var weekday = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (weekday < 10) {
        weekday = '0' + weekday
      }
      return (year + '/' + month + '/' + weekday)
    }
    // 获得某月的天数
    function getMonthDays (myMonth) {
      var monthStartDate = new Date(_this.nowYear, myMonth, 1)
      var monthEndDate = new Date(_this.nowYear, myMonth + 1, 1)
      var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
      return days
    }
    // 精确开始时间 到分钟
    function timesStart (date) {
      var hours = 1000 * 60 * 60 * new Date(formatDate(date)).getHours()
      var afterTime = new Date(formatDate(date)).getTime() - hours
      return afterTime
    }
    // 精确结束时间 到分钟
    function timesEnd (date) {
      var hours = 1000 * 60 * 60 * (24 - new Date(formatDate(date)).getHours())
      var afterTime = new Date(formatDate(date)).getTime() + hours - 1000
      return afterTime
    }
    // 获得今天开始日期
    _this.getDayStart = function () {
      var monthStartDate = new Date()
      return timesStart(monthStartDate)
    }
    // 获得今天结束日期
    _this.getDayEnd = function () {
      var monthStartDate = new Date()
      return timesEnd(monthStartDate)
    }
    // 获得7天前的开始日期
    _this.getSevenDayStart = function () {
      var monthStartDate = new Date()
      monthStartDate.setDate(monthStartDate.getDate() - 6)
      return timesStart(monthStartDate)
    }
    // 获得昨天开始日期
    _this.getYestoDayStart = function () {
      var monthStartDate = new Date()
      monthStartDate.setDate(monthStartDate.getDate() - 1)
      return timesStart(monthStartDate)
    }
    // 获得昨天结束日期
    _this.getYestoDayEnd = function () {
      var monthStartDate = new Date()
      monthStartDate.setDate(monthStartDate.getDate() - 1)
      return timesEnd(monthStartDate)
    }
    // 获得本周的开始日期
    _this.getWeekStartDate = function getWeekStartDate () {
      var weekStartDate = new Date(_this.nowYear, _this.nowMonth, _this.nowDay - nowDayOfWeek + 1)
      return timesStart(weekStartDate)
    }
    // 获得本周的结束日期
    _this.getWeekEndDate = function getWeekEndDate () {
      var weekEndDate = new Date(_this.nowYear, _this.nowMonth, _this.nowDay + (7 - nowDayOfWeek))
      return timesEnd(weekEndDate)
    }
    // 获得上周的开始日期
    _this.getLastWeekStartDate = function getLastWeekStartDate () {
      // var weekStartDate = new Date(new Date(Intl.DateTimeFormat('zh-CN').format(_this.now)) - 1000 * 60 * 60 *24 * 6)
      // var weekStartDate = new Date(_this.now.getTime() - (nowDayOfWeek + 6) * _this.oneDay)
      var weekStartDate = new Date(_this.now.getTime() - _this.oneDay * 6)
      return timesStart(weekStartDate)
    }
    // 获得上周的结束日期
    _this.getLastWeekEndDate = function getLastWeekEndDate () {
      var weekEndDate = new Date(_this.now)
      // var weekEndDate = new Date(_this.now.getTime() - nowDayOfWeek * _this.oneDay)
      return timesEnd(weekEndDate)
    }
    // 获得本月的开始日期
    _this.getMonthStartDate = function () {
      var monthStartDate = new Date(_this.nowYear, _this.nowMonth, 1)
      return timesStart(monthStartDate)
    }
    // 获得本月的结束日期
    _this.getMonthEndDate = function () {
      var monthEndDate = new Date(_this.nowYear, _this.nowMonth, getMonthDays(_this.nowMonth))
      return timesEnd(monthEndDate)
    }
    // 获得上月开始时间
    _this.getLastMonthStartDate = function () {
      var m = null
      if (_this.nowMonth === 0) {
        m = 12 - 1
      } else if (_this.nowMonth === 1) {
        m = 12
      } else {
        m = _this.nowMonth - 1
      }
      var d = getMonthDays(m)
      var s = new Date(_this.nowYear, _this.nowMonth, 1)
      var lastMonthStartDate = new Date(s.getTime() - d * _this.oneDay)
      return timesStart(lastMonthStartDate)
      // formatDate(lastMonthStartDate)
    }
    // 获得上月结束时间
    _this.getLastMonthEndDate = function () {
      var s = new Date(_this.nowYear, _this.nowMonth, 1)
      var lastMonthEndDate = new Date(s.getTime() - _this.oneDay)
      return timesEnd(lastMonthEndDate)
    }
    // 获取30天前开始
    _this.getBefore30DayStart = function () {
      let s = new Date(_this.now.getTime() - 30 * _this.oneDay)
      return timesStart(s)
    }
  },
  mounted () {
    this.timeChange(7, this.getDayStart(), this.getDayEnd())
    // document.getElementsByClassName('report-data')[0].click()
  }
}
</script>
<style lang="scss" scoped>
 @import 'Assets/css/base.color.scss';
.report-datas {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .active{
  background: $baseCol;
  color: #fff;
}
  }
  .report-data {
    margin-left: 2.3%;
    /* // width: 31%; */
    height: .75rem;
    line-height: .75rem;
    border: 1px solid #BCBCBC;
    border-radius: .15rem;
    box-sizing: border-box;
    font-size: .4rem;
    // color: #fff;
    background: #fff;
    text-align: center;

  }
  .report-data-4 {
    width: 17%;
  }
  .report-data-3 {
    width: 31%;
  }
</style>

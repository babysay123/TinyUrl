<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 16:07:43
 * @LastEditTime: 2019-08-20 14:06:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section>
    <div class="zw"></div>
    <Head :fixed="true">
      <h3>余额宝明细</h3>
     </Head>
     <ul class="sele">
       <li :class="i==tip?'color':''" v-for="(item,i) in list" :key="item" @click="selectDate(i)">{{item}}</li>
     </ul>
     <table v-if="datamsg && datamsg.list.length" width="100%"  cellpadding="0" class="ty_table3" style="font-size: 12px;margin-top:52px">
                        <tbody class="tit">
                            <tr class="title">
                                <th>操作</th>
                                <th>时间</th>
                                <th>变动金额</th>
                            </tr>
                        </tbody>
                        <tbody v-if="datamsg.list.length>0">
                            <tr v-for="(item,i) in datamsg.list" :key="i" class="conter">
                                <td>{{item.type | getType}}</td>
                                <td>{{item.changeTime}}</td>
                                <td>{{item.amount | numFilter}}</td>
                            </tr>
                        </tbody>
      </table>
       <div v-else class="noRecord">
      <img src="/mobile/images/mine/face_no_game.png">
      <span class="text-gray">暂无记录</span>
    </div>
       <div class="page-bar" v-if="cur>1">
    <ul>
        <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
        <li v-if="cur==1"><a class="banclick">上一页</a></li>
        <li v-for="index in indexs" :key="index"  :class="{ 'active': cur == index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
        <li v-if="cur == all"><a class="banclick">下一页</a></li>
        <!-- <li><a>共<i>{{all}}</i>页</a></li> -->
    </ul>
</div>
      <div v-if="datamsg" class="count">共<i>{{datamsg.list.length}}</i>条数据</div>
  </section>
</template>
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
html,body{
background: #fff;
width: 100%;
height: 100%;
}
.noRecord {
  margin-top: 30%;
  text-align: center;
}
.noRecord img {
  width: 50%;
  display: block;
  margin: 0 auto 20px;
}
.zw{
  width: 100%;
  height: 1.1rem;
}
.sele{
  margin-top: 10px;
  li{
    width: 22%;
    height: .7rem;
    border: 1px #000 solid;
    border-radius: 4px;
    float: left;
    text-align: center;
    line-height: .7rem;
    margin-left: 10px;
  }
  .color{
  background: $baseCol;
  border: 1px $baseCol solid;
  color: aliceblue;
}
}
.title{
  font-weight: 400;
  th{
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    //  border-bottom: #666 1px dashed;
    background: #999;
  }
}
.conter{
  background: #999999a3;
  td{
    text-align: center;
    height: .8rem;
    line-height: .8rem;
  }
}
.count{
  margin-top: 10px;
  font-size: 12px;
  width: 94%;
  text-align: right;
  i{
    color: red;
    font-size: 15px;
  }
}
.page-bar{
  overflow: hidden;
    margin:auto;
    text-align: center;
    ul{
      margin-left: 1.4rem
    }
}
.page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
}
.page-bar a:hover{
    background-color: #eee;
}
.page-bar a.banclick{
    cursor:not-allowed;
}
.page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}
.page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}
</style>
<script>
import Head from 'Components/global/head'
export default {
  components: { Head },
  data () {
    return {
      list: ['全部', '今天', '昨天', '本月'],
      index: 0,
      params: {
        count: 15,
        endTimeStamp: null,
        offset: 0,
        startTimeStamp: null
      },
      datamsg: null,
      tip: 0,
      all: 8, // 总页数
      cur: 1// 当前页码
    }
  },
  filters: {
    getType (val) {
      if (val === 1) {
        return '余额宝转入'
      } else if (val === 2) {
        return '余额宝转出'
      } else if (val === 3) {
        return '利息'
      } else {
        return '—'
      }
    },
    numFilter (value) {
    // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    }

  },
  computed: {
    indexs: function () {
      var left = 1
      var right = this.all
      var ar = []
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2
          right = this.cur + 2
        } else {
          if (this.cur <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    btnClick: function (data) { // 页码点击事件
      if (data !== this.cur) {
        this.cur = data
        this.params.offset = this.cur
        this.getdata()
      }
    },
    pageClick: function () {
      console.log('现在在' + this.cur + '页')
      this.params.offset = this.cur
      this.getdata()
    },
    selectDate (i) {
      switch (i) {
        case 0:
          this.params.startTimeStamp = null
          this.params.endTimeStamp = null
          this.tip = 0
          break
        case 1:
          this.params.startTimeStamp = new Date(this.getCurrentDate(1, new Date()) + ' 00:00:00').getTime()
          this.params.endTimeStamp = new Date(this.getCurrentDate(1, new Date()) + ' 23:59:59').getTime()
          this.tip = 1
          break
        case 2:
          this.params.startTimeStamp = new Date(this.getCurrentDate(1, new Date()) + ' 00:00:00').getTime() - 86400000
          this.params.endTimeStamp = new Date(this.getCurrentDate(1, new Date()) + ' 23:59:59').getTime() - 86400000
          this.tip = 2
          break
        case 3:
          this.params.startTimeStamp = new Date(this.getCurrentDate(1, this.getCurrentMonthFirst()) + ' 00:00:00').getTime()
          this.params.endTimeStamp = new Date(this.getCurrentDate(1, this.getCurrentMonthLast()) + ' 23:59:59').getTime()
          this.tip = 3
          break
      }
      this.getdata()
    },
    getdata () {
      this.axios.post('/interest/rate/getList.do', this.params).then(res => {
        if (res.code === 0) {
          this.datamsg = res.data
          this.all = this.datamsg.count
        }
      })
    },
    getCurrentDate (format, item) {
      var now = item
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth()// 得到月份
      var date = now.getDate()// 得到日期
      // var day = now.getDay()// 得到周几
      var hour = now.getHours()// 得到小时
      var minu = now.getMinutes()// 得到分钟
      var sec = now.getSeconds()// 得到秒
      month = month + 1
      if (month < 10) month = '0' + month
      if (date < 10) date = '0' + date
      if (hour < 10) hour = '0' + hour
      if (minu < 10) minu = '0' + minu
      if (sec < 10) sec = '0' + sec
      var time = ''
      // 精确到天
      if (format === 1) {
        time = year + '-' + month + '-' + date
      } else if (format === 2) { // 精确到分
        time = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec
      }
      return time
    },
    getCurrentMonthFirst () {
      var date = new Date()
      date.setDate(1)
      return date
    },
    getCurrentMonthLast () {
      var date = new Date()
      var currentMonth = date.getMonth()
      var nextMonth = ++currentMonth
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      var oneDay = 1000 * 60 * 60 * 24
      return new Date(nextMonthFirstDay - oneDay)
    }
    // formatNumber (n) {
    //   n = n.toString()
    //   return n[1] ? n : '0' + n
    // }
  },
  created () {
    console.log(new Date().getTime())
    this.getdata()
    this.cur = Math.ceil((this.all > 15 ? this.all : 0) / 15)
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/mix.scss';
.mint-award {
  height: 48vh;
  width: 100vw;
}
.mint-award-li {
  width: 100vw;
  min-height: 36px;
}
.mint-content {
  height: 100%;
  overflow: auto;
  ul {
    li {
      font-size: 12px;
      text-align: center;
      @include display-flex;
      &:nth-child(2n) {
        background-color: #eee;
      }
      .td {
        @include flex-num(1);
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        line-height: initial;
        &.td-05x {
          @include flex-num(1);
          width: 5%;
        }
        &.td-010x {
          @include flex-num(1);
          width: 10%;
        }
        &.td-1x {
          @include flex-num(1);
          width: 12%;
        }
        &.td-2x {
          @include flex-num(2);
          width: 40%;
        }
        &.td-3x {
          @include flex-num(3);
          width: 60%;
        }
        &.td-4x {
          @include flex-num(4);
          width: 80%;
        }
      }
    }
  }
}
.mint-head {
  width: 100%;
  background-color: #fff;
  margin-top: -68px;
  z-index: 11;
  li {
    position: relative;
    text-align: center;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    &:first-child {
      background: #F4F4F4;
    }
    h3 {
      font-size: 16px;
      font-weight: normal;
      color: rga(51, 51, 51);
    }
    &:last-child {
      border-bottom: 1px solid #eee;
    }
    &.auto-flex {
      @include display-flex;
      font-size: 12px;
      color: #333;
    }
    .th {
      display: block;
      @include flex-num(1);
      width: 20%;
      &.th-05x {
        @include flex-num(1);
        width: 5%;
      }
      &.th-010x {
        @include flex-num(1);
        width: 10%;
      }
      &.th-1x {
        @include flex-num(1);
        width: 12%;
      }
      &.th-2x {
        @include flex-num(2);
        width: 40%;
      }
      &.th-3x {
        @include flex-num(3);
        width: 60%;
      }
      &.th-4x {
        @include flex-num(4);
        width: 80%;
      }
    }
  }
  .mint-close {
    position: absolute;
    width: 12%;
    top: 0px;
    right: 5px;
    width: 34px;
    font-size: 24px;
  }
}
</style>
<style lang="scss">
.mint-content {
  ul {
    li {
      height: 36px;
      line-height: 36px;
      .award-img {
        width: 25px;
        height: 25px;
        margin-right: 4px;
        margin-top: 5.5px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
.text-qxred{
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 3px;
    background: #d81e06;
    font-size: 12px;
    font-weight: 400;
    border-radius: 50%;
    color: #fff;
}
.text-qxgray{
  width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 3px;
    background: #a1a1a1;
    font-size: 12px;
    font-weight: 400;
    border-radius: 50%;
    color: #fff;
}
// .groupNum{
//   width: 100%;
//   height: 100%;
//   background: #d81e06;
//   color: antiquewhite;
//   text-align: center;
//   line-height: 100%;
// }
</style>

<template>
  <!-- 开奖列表 -->
  <mt-popup
    :class="'mint-award'"
    v-model="popAwardList"
    position="bottom"
  >
    <ul class="mint-head">
      <li>
        <h3>近期开奖</h3>
        <!-- <img :src="require('Assets/images/chatroom/closeIcon.png')" class="mint-close" @click.stop="popAwardList = false"> -->
        <span class="mint-close" @click.stop="popAwardList = false">&times;</span>
      </li>
      <li class="auto-flex">
        <div v-for="(col, i) in AwardThs" :key="i" :class="thClass(col)">{{col.name}}</div>
      </li>
    </ul>
    <div class="mint-content">
      <ul>
        <li v-for="(row, inx) in AwardList" :key="inx">
          <div v-for="(col, j) in AwardThs" :key="j" :class="tdClass(col)" v-html="awardText(row, col)"></div>
        </li>
      </ul>
    </div>
  </mt-popup>
</template>

<script>
import oriColorTool from './oriColorTool'
import { LuckParser, ZodiacParser } from 'Plugins/gameParser'
// eslint不让添加到原型链了，唉
Array.max = function (array) {
  return Math.max.apply(Math, array)
}
Array.min = function (array) {
  return Math.min.apply(Math, array)
}
export default {
  name: 'betting-awards',
  // props: [],
  data () {
    return {
      // 开奖列表3.3
      lotteryType: { // 类型对应lotteryId
        FrequentLottery: [4, 6, 11, 12, 45, 55, 61, 62, 63],
        ElevenPickFive: [5, 13, 14, 15, 39, 49, 52],
        PCEggs: [7, 17, 47, 54, 56, 57],
        QuickThree: [1, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 44, 50],
        SixMark: [9, 28, 48, 53],
        Three: [2, 10, 18, 40, 41, 42], // 排列3，时时乐，福彩
        PK10: [3, 8, 29, 43, 46, 51, 58, 59, 60],
        SevenStar: [64, 65, 66]
      },
      AwardList: [],
      AwardThs: [],
      wuxing: {
        '金': ['04', '05', '18', '19', '26', '27', '34', '35', '48', '49'],
        '木': ['01', '08', '09', '16', '17', '30', '31', '38', '39', '46', '47'],
        '水': ['06', '07', '14', '15', '22', '23', '36', '37', '44', '45'],
        '火': ['02', '03', '10', '11', '24', '25', '32', '33', '40', '41'],
        '土': ['12', '13', '20', '21', '28', '29', '42', '43']
      },
      oldLottery: {
        lotteryId: null,
        currentIssue: null
      },
      popAwardList: false
    }
  },
  watch: {
    '$store.state.Lottery.AwardList': function (arr) {
      this.AwardList = arr
    },
    'popAwardList': function (newVal) {
      this.$emit('paletteClose', newVal)
    }
    // '$store.state.Lottery.lotteryLayout': function (lottery) {
    //   console.log(lottery)
    //   // let _type = null
    //   // for (let key in this.lotteryType) {
    //   //   if (this.lotteryType.hasOwnProperty(key)) {
    //   //     if (this.lotteryType[key].indexOf(lottery.lotteryId) > -1) {
    //   //       _type = key
    //   //     }
    //   //   }
    //   // }
    //   // this.awardsCol(lottery.lotteryMethodName, _type)
    // },
  },
  created () {
    this.setAwardsCol()
  },
  methods: {
    // 更新开奖列表
    updateAwards () {
      // vuex的lotteryId
      let _lotteryId = this.$route.query.lotteryId * 1
      let _currentIssue = this.$store.getters.getLayoutMsg.currentIssue
      // console.log(this.oldLottery.lotteryId !== _lotteryId)
      // console.log(this.oldLottery.currentIssue === _currentIssue)
      // 更新开奖判断，新id就获取开奖，老id则根据期号判断是否获取
      if (this.oldLottery.lotteryId !== _lotteryId) {
        this.oldLottery.lotteryId = _lotteryId
        this.oldLottery.currentIssue = _currentIssue
      } else if (this.oldLottery.currentIssue === _currentIssue) {
        return
      }
      // let _lottery = this.$store.getters.getLayout
      this.axios.postFast('/front/lottery/luck_number.do', {
        lotteryId: _lotteryId,
        page: '1'
      }).then((res) => {
        // console.log(res)
        if (res.code === 0) {
          this.AwardList = res.data
          this.$store.dispatch('updateAwardList', res.data)
          // this.setAwardsCol(_lottery)
        }
      }).catch(() => {
      })
    },
    setAwardsCol (_lottery) {
      const lotteryLayoutBackUp = _lottery || this.Utils.Storage.get('lotteryLayout')
      if (!lotteryLayoutBackUp) return
      let _lotteryId = lotteryLayoutBackUp.lotteryId
      let _type = null
      for (let key in this.lotteryType) {
        if (this.lotteryType.hasOwnProperty(key)) {
          if (this.lotteryType[key].indexOf(_lotteryId) > -1) {
            _type = key
          }
        }
      }

      this.awardsCol(lotteryLayoutBackUp.lotteryMethodName, _type)
    },
    thClass (th) {
      let _class = {
        'th': 1
      }
      _class['th-' + th.w + 'x'] = 1
      return _class
    },
    tdClass (td) {
      let _class = {
        'td': 1
      }
      _class['td-' + td.w + 'x'] = 1
      return _class
    },
    // 狗屎。。每类彩种每个玩法的具体显示都要做齐，搞我呢
    // 先分类彩种，然后分每个玩法，然后分每个显示
    awardsCol (method, type) {
      // console.log(type, method)
      // let _th = this.AwardThs
      // 分类分栏
      // TODO:先全部列出来，把具体每列数据整合好之后，把相同col的条件合并
      if (type === 'FrequentLottery') {
        if (method === 'dragonTiger' ||
            method.indexOf('sum') > -1 ||
            method.indexOf('Sum') > -1 ||
            method.indexOf('span') > -1 ||
            method.indexOf('special') > -1
        ) {
          this.AwardThs = [
            { 'name': '期号', 'w': '2', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '形态', 'w': '1', 'key': 'status' }
          ]
        } else {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' }
          ]
        }
      }
      // if (type === 'SevenStars') {
      //   this.AwardThs = [
      //     { 'name': '期号', 'w': '2', 'key': 'issue' },
      //     { 'name': '开奖号码', 'w': '2', 'key': 'number' },
      //     { 'name': '和值', 'w': '1', 'key': 'sum' },
      //     { 'name': '形态', 'w': '1', 'key': 'group' }
      //   ]
      // }
      if (type === 'ElevenPickFive') {
        this.AwardThs = [
          { 'name': '期号', 'w': '1', 'key': 'issue' },
          { 'name': '开奖号码', 'w': '2', 'key': 'number' }
        ]
      }
      if (type === 'PCEggs') {
        this.AwardThs = [
          { 'name': '期号', 'w': '1', 'key': 'issue' },
          { 'name': '开奖号码', 'w': '2', 'key': 'number' },
          { 'name': '波色', 'w': '05', 'key': 'bs' },
          { 'name': '大小', 'w': '05', 'key': 'dx' },
          { 'name': '单双', 'w': '05', 'key': 'ds' }
        ]
      }
      if (type === 'QuickThree') {
        this.AwardThs = [
          { 'name': '期号', 'w': '2', 'key': 'issue' },
          { 'name': '开奖号码', 'w': '2', 'key': 'number' },
          { 'name': '和值', 'w': '1', 'key': 'sum' },
          { 'name': '大小', 'w': '1', 'key': 'size' },
          { 'name': '单双', 'w': '1', 'key': 'single' }
        ]
      }
      if (type === 'SixMark') {
        if (method.indexOf('color') > -1 ||
            method.indexOf('Color') > -1 ||
            method.indexOf('extraZodiac') > -1 ||
            method.indexOf('headAndTrail') > -1 ||
            method.indexOf('fiveElements') > -1
        ) {
          // 三行
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '形态', 'w': '1', 'key': 'status' }
          ]
        } else if (
          method.indexOf('extraCode') > -1 ||
          (method.indexOf('positiveCode') > -1 && method.indexOf('Extra') === -1 && method !== 'positiveCode')
        ) {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '大小', 'w': '05', 'key': 'dx' },
            { 'name': '单双', 'w': '05', 'key': 'ds' },
            { 'name': '尾数', 'w': '010', 'key': 'ws' }
          ]
        } else if (method.indexOf('positiveCode') > -1 && method.indexOf('Extra') > -1 && method !== 'positiveCode') {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '波色', 'w': '05', 'key': 'bs' },
            { 'name': '大小', 'w': '05', 'key': 'dx' },
            { 'name': '单双', 'w': '010', 'key': 'ds' }
          ]
        } else if (method.indexOf('attribute') > -1) {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '大小', 'w': '05', 'key': 'dx' },
            { 'name': '单双', 'w': '05', 'key': 'ds' },
            { 'name': '种类', 'w': '010', 'key': 'zl' }
          ]
        } else {
          // 两行
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' }
          ]
        }
      }
      if (type === 'Three') {
        if (method.indexOf('sum') > -1 || method.indexOf('Sum') > -1) {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '形态', 'w': '1', 'key': 'zt' }
          ]
        } else {
          // console.log('1111111111', '')
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' },
            { 'name': '形态', 'w': '1', 'key': 'zs' }
          ]
        }
      }
      if (type === 'PK10') {
        if (method !== 'dragonTiger' && method !== 'sum' && method !== 'attribute') {
          // 两栏
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '2', 'key': 'number' }
          ]
        } else if (method === 'sum' || method === 'attribute') {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '3', 'key': 'number' },
            { 'name': '和值', 'w': '010', 'key': 'gyh' },
            { 'name': '大小', 'w': '010', 'key': 'dx' },
            { 'name': '单双', 'w': '010', 'key': 'ds' }
          ]
        } else {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '3', 'key': 'number' },
            { 'name': '形态', 'w': '1', 'key': 'xt' }
          ]
        }
      }
      if (type === 'SevenStar') {
        if (type === 'SevenStar' && method === 'attribute') {
          // 七星大小单双
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '3', 'key': 'qxoth' },
            { 'name': '和值', 'w': '1', 'key': 'sum' },
            { 'name': '大小', 'w': '1', 'key': 'qxdx' },
            { 'name': '单双', 'w': '1', 'key': 'single' }
          ]
        } else if (type === 'SevenStar' && method === 'before3attribute') {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '3', 'key': 'qxqs' }
          ]
        } else if (type === 'SevenStar' && method === 'after3attribute') {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '3', 'key': 'qxhs' }
          ]
        } else {
          this.AwardThs = [
            { 'name': '期号', 'w': '1', 'key': 'issue' },
            { 'name': '开奖号码', 'w': '3', 'key': 'qxoth' }
          ]
        }
      }
    },
    awardText (row, col) {
      // console.log(row, col.key, 'row col')
      if (col.key === 'issue') {
        return row.issue
      }
      if (col.key === 'xt') {
        return this.groupNum(row)
      }
      // 七星前三
      if (col.key === 'qxqs') {
        return this.numThree(row, col, 'qxqs')
      }
      // 七星后三
      if (col.key === 'qxhs') {
        return this.numThree(row, col, 'qxhs')
      }
      // 七星其它
      if (col.key === 'qxoth') {
        return this.numThree(row, col, 'qxoth')
      }
      if (col.key === 'zs') {
        return this.groupNum(row, col, 'zs')
      }
      if (col.key === 'number') {
        // return row.number.split(',').join(' ')
        return this.numberRow(row, col)
      }
      if (col.key === 'status') {
        return this.statusRow(row, col)
      }
      if (col.key === 'bs') {
        return this.statusRow(row, col, 'bs')
      }
      if (col.key === 'dx') {
        return this.statusRow(row, col, 'dx')
      }
      if (col.key === 'ds') {
        return this.statusRow(row, col, 'ds')
      }
      if (col.key === 'ws') {
        return this.statusRow(row, col, 'ws')
      }
      if (col.key === 'zl') {
        return this.statusRow(row, col, 'zl')
      }
      if (col.key === 'gyh') {
        return this.statusRow(row, col, 'gyh')
      }
      let _arr = row.number.split(',')
      let _sum = 0
      // 只有快三才会有的栏
      if (col.key === 'sum') {
        for (let n of _arr) {
          _sum += n * 1
        }
        return `<span class="sum-text">${_sum}</span>`
      }
      if (col.key === 'qxdx') {
        let _middle = 17
        for (let n of _arr) {
          _sum += n * 1
        }
        if (_sum > _middle) {
          return '<div class="dxds-block dxds-block-orange">大</div>'
        } else {
          return '<div class="dxds-block dxds-block-blue">小</div>'
        }
      }
      if (col.key === 'size') {
        let _middle = 10
        for (let n of _arr) {
          _sum += n * 1
        }
        if (_sum > _middle) {
          return '<div class="dxds-block dxds-block-orange">大</div>'
        } else {
          return '<div class="dxds-block dxds-block-blue">小</div>'
        }
      }
      if (col.key === 'single') {
        for (let n of _arr) {
          _sum += n * 1
        }
        if (_sum % 2) {
          return '<div class="dxds-block dxds-block-blue">单</div>'
        } else {
          return '<div class="dxds-block dxds-block-orange">双</div>'
        }
      }
    },
    // xiaoyu:7.9 3D状态判断
    groupNum (row) {
    // 切割数组  内置函数去重
      var x = new Set(row.number.split(',')).size
      // 得到长度
      switch (x) {
        case 1:
          return '豹子'
        case 2:
          // return '<div class="groupNum">组三</div>'
          return '组三'
        case 3:
          return '组六'
      }
    },
    // 七星前三
    numThree (row, col, st) {
      // console.log('row', row, 'col', col)
      var str = row.number.split(',')
      var item = ''
      str.forEach((e, i) => {
        if (st === 'qxqs') {
          item += `
          <div class="text-${i < 3 ? 'qxred' : 'qxgray'}">${e}</div>
          `
        }
        if (st === 'qxhs') {
          item += `
          <div class="text-${i < 1 ? 'qxgray' : 'qxred'}">${e}</div>
          `
        }
        if (st === 'qxoth') {
          item += `
          <div class="text-qxred">${e}</div>
          `
        }
      })
      return item
    },
    numberRow (row, col) {
      let _lottery = this.$store.getters.getLayout
      let _className = _lottery.lotteryClassName
      let _methodName = _lottery.lotteryMethodName
      let _arr = row.number.split(',')
      let _str = ''
      if (!_className || !_methodName) {
        return _str
      }
      if (
        (_methodName === 'locationCourage' && _className.indexOf('PK10') === -1) ||
          _methodName.indexOf('notLocationSelected') > -1 ||
          (_methodName.indexOf('combination') > -1 && (_methodName.indexOf('before') === -1 && _methodName.indexOf('after') === -1 && _methodName.indexOf('middle') === -1 && !/in[0-9]combination/.test(_methodName))) ||
          (_methodName.indexOf('directly') > -1 && (_methodName.indexOf('before') === -1 && _methodName.indexOf('after') === -1 && _methodName.indexOf('middle') === -1 && _methodName.indexOf('in') === -1))
      ) { // 定位胆
        _arr.forEach(e => {
          _str += `<div class="ball-sm bg-red" style="margin-right: 5px;">${e}</div>`
        })
        return _str
      }
      let _size = 0
      let getSize = function (str, type) {
        // type before
        if (str.indexOf(type) > -1) {
          let _i = str.split(type)[1]
          // console.log(_i.substring(0, 1) * 1)
          return (_i.substring(0, 1) * 1)
        } else {
          return 0
        }
      }

      // before 前几
      if (_methodName.indexOf('before') > -1) {
        _size = getSize(_methodName, 'before')
        _arr.forEach((e, i, a) => {
          if (_className.indexOf('PK10') > -1) {
            _str += `<div class="block-sm text-${i < _size ? 'red' : 'gray'}">${e}</div>`
          } else {
            _str += `<div class="ball-sm bg-${i < _size ? 'red' : 'gray'}" style="margin-right: 5px;">${e}</div>`
          }
        })
        // for (let _i = 0; _i < _size; _i++) {
        //   _arr[_i] = `<span class="text-red">${_arr[_i]}</span>`
        // }
        // _str = _arr.join(' ')
        return _str
      }
      // after 后几
      if (_methodName.indexOf('after') > -1) {
        _size = getSize(_methodName, 'after')
        _arr.forEach((e, i, a) => {
          if (_className.indexOf('PK10') > -1) {
            _str += `<div class="block-sm text-${i >= (a.length - _size) ? 'red' : 'gray'}">${e}</div>`
          } else {
            _str += `<div class="ball-sm bg-${i >= (a.length - _size) ? 'red' : 'gray'}" style="margin-right: 5px;">${e}</div>`
          }
        })
        // for (let _i = _arr.length - 1; (_arr.length - _size) <= _i; _i--) {
        //   _arr[_i] = `<span class="text-red">${_arr[_i]}</span>`
        // }
        // _str = _arr.join(' ')
        return _str
      }
      // in 中几 只有时时彩和11选5有
      if (_className.indexOf('FrequentLottery') > -1) {
        if (_methodName.indexOf('in') > -1) {
          _size = getSize(_methodName, 'in')
          let _offset = (_arr.length - _size) / 2 // 偏移量
          // let _new = _arr.slice(_offset, -1 * _offset) // 截取数组
          for (let _i = 0; _i < _arr.length; _i++) {
            if (_i >= _offset && _i < _arr.length - _offset) {
              _arr[_i] = `<span class="ball-sm bg-red" style="margin-right: 5px;">${_arr[_i]}</span>`
            }
            _arr[_i] = `<span class="ball-sm bg-gray" style="margin-right: 5px;">${_arr[_i]}</span>`
          }
          _str = _arr.join(' ')
          return _str
        }
        if (_methodName.indexOf('locationCourage') > -1) {
          _arr.forEach(e => {
            _str += `<div class="ball-sm bg-red" style="margin-right: 5px;">${e}</div>`
          })
          return _str
        }
        // 五星和四星也放这里
        // 顶。。fiveStar，fourStar是什么鬼。为什么会有这种特殊的method，五星不处理，我只是说说
        if (
          _methodName.indexOf('fiveStar') > -1
        ) {
          _arr.forEach((e, i) => {
            _str += `<div class="ball-sm bg-red" style="margin-right: 5px;">${e}</div>`
          })
          return _str
          // for (let _i = _arr.length - 1; _i >= 1; _i--) {
          //   _arr[_i] = `<span class="text-red">${_arr[_i]}</span>`
          // }
        }
        if (_methodName === 'fourStarDirectly') {
          _arr.forEach((e, i) => {
            _str += `<div class="ball-sm bg-${i > 0 ? 'red' : 'gray'}" style="margin-right: 5px;">${e}</div>`
          })
          return _str
        }
      }
      if (_className.indexOf('ElevenPickFive') > -1) {
        if (_methodName.indexOf('middle') > -1) {
          _size = getSize(_methodName, 'middle')
          let _offset = (_arr.length - _size) / 2 // 偏移量
          // let _new = _arr.slice(_offset, -1 * _offset) // 截取数组
          // for (let _i = 0; _i < _arr.length; _i++) {
          //   if (_i >= _offset && _i < _arr.length - _offset) {
          //     _arr[_i] = `<div class="ball-sm bg-red">${_arr[_i]}</div>`
          //   }
          // }
          // _str = _arr.join(' ')
          _arr.forEach((e, i, a) => {
            _str += `<div class="ball-sm bg-${i >= _offset && i < (a.length - _offset) ? 'red' : 'gray'}" style="margin-right: 5px;">${e}</div>`
          })
          return _str
        }
        _arr.forEach((e, i, a) => {
          _str += `<div class="ball-sm bg-red" style="margin-right: 5px;">${e}</div>`
        })
        return _str
      }
      // 冠亚和 效果等于前二
      if (_className.indexOf('PK10') > -1) {
        if (_methodName.indexOf('sum') > -1 || _methodName.indexOf('attribute') > -1) {
          for (let _i = 0; _i < 2; _i++) {
            _arr[_i] = `<span class="text-red">${_arr[_i]}&nbsp;</span>`
          }
        }
        if (
          _methodName.indexOf('locationCourage') > -1
        ) {
          _arr.forEach(e => {
            _str += `<div class="block-sm block-bg-${+e - 1}" style="margin-right: 5px;">${e}</div>`
          })
          return _str
        }
      }
      // 龙虎 取第一项然后展示出来，即时时彩是前二，PK10是首尾
      if (_methodName.indexOf('dragonTiger') > -1) {
        if (_className.indexOf('PK10') > -1) {
          _arr[0] = `<span class="text-red">${_arr[0]}&nbsp;</span>`
          _arr[_arr.length - 1] = `<span class="text-red">&nbsp;${_arr[_arr.length - 1]}</span>`
        }
        if (_className.indexOf('FrequentLottery') > -1) {
          // for (let _i = 0; _i < 2; _i++) {
          //   _arr[_i] = `<span class="bg-red">${_arr[_i]}</span>`
          // }
          _arr.forEach((e, i) => {
            _str += `<div class="ball-sm bg-${i < 2 ? 'red' : 'gray'}" style="margin-right: 5px;">${e}</div>`
          })
          return _str
        }
      }
      // 六合彩，pcegg，快三 是带颜色带icon的，tmd
      if (_className.indexOf('Eggs') > -1 || _className.indexOf('Luck') > -1) { // PCEgg
        _arr.forEach((e, i) => {
          _str += `<span class="ball-sm bg-red">${e}</span>`
          _str += `<span class="ball-sm text-gray">${i < 2 ? '+' : '='}</span>`
        })
        const sum = _arr.reduce((a, b) => +a + +b)
        _str += `<span class="ball-sm bg-${LuckParser(sum).color}">${sum}</span>`
        // oriColorTool.ColorArr = this.$store.ballSetColorDic
        // let _colorStr = 'gray'
        // let sum = 0
        // for (let inx = 0; inx < _arr.length; inx++) {
        //   let n = _arr[inx]
        //   sum += parseInt(n)
        //   _str += `<span class='text-red'>${n}</span>`
        //   if (inx !== _arr.length - 1) {
        //     _str += `<span class='text-gray'>+</span>`
        //   }
        // }
        // if (sum > 0) {
        //   let _color = oriColorTool.pcSumToColor(sum)
        //   if (_color.indexOf('Red') > -1) {
        //     _colorStr = 'red'
        //   } else if (_color.indexOf('Blue') > -1) {
        //     _colorStr = 'blue'
        //   } else if (_color.indexOf('Green') > -1) {
        //     _colorStr = 'green'
        //   } else if (_color.indexOf('Gray') > -1) {
        //     _colorStr = 'gray'
        //   }
        // }
        // _str += `<span class='text-gray'>=</span><span class='text-${_colorStr}'>${sum}</span>`
        return _str
      }
      // 六合彩类
      if (_className.indexOf('SixMark') > -1) {
        if (
          (_methodName.indexOf('Zodiac') > -1 && _methodName !== 'extraZodiac') ||
          /selected[1-6]zodiac/.test(_methodName)
        ) {
          _arr.slice(0, 6).forEach(e => {
            const { color, zodiac } = ZodiacParser(e)
            _str += `<div class="block-sm text-${color}" style="margin-right: 3px;">${zodiac}</div>`
          })
          _str += '+'
          _str += `<div class="block-sm text-${ZodiacParser(_arr[6]).color}" style="margin-right: 3px;">${ZodiacParser(_arr[6]).zodiac}</div>`
          return _str
        }
        _arr.slice(0, 6).forEach(e => {
          const { color } = ZodiacParser(e)
          _str += `<div class="ball-sm bg-${color}" style="margin-right: 3px;">${e}</div>`
        })
        _str += '+'
        _str += `<div class="ball-sm bg-${ZodiacParser(_arr[6]).color}" style="margin-right: 3px;">${_arr[6]}</div>`
        _str += `<div class="ball-sm text-${ZodiacParser(_arr[6]).color}" style="margin-right: 3px;">(${ZodiacParser(_arr[6]).zodiac})</div>`
        return _str
        // let _colorStr = 'gray'
        // for (let i = 0; i < _arr.length; i++) {
        //   let n = _arr[i]
        //   let _color = oriColorTool.sixNumToColor(n)
        //   let _zodiac = oriColorTool.sixNumToZodiac(n)
        //   if (_color.indexOf('Red') > -1) {
        //     _colorStr = 'red'
        //   } else if (_color.indexOf('Blue') > -1) {
        //     _colorStr = 'blue'
        //   } else if (_color.indexOf('Green') > -1) {
        //     _colorStr = 'green'
        //   } else if (_color.indexOf('Gray') > -1) {
        //     _colorStr = 'gray'
        //   }
        //   if (i === _arr.length - 1) {
        //     // 开奖如果是生肖
        //     if (_methodName.indexOf('Zodiac') > -1 || _methodName.indexOf('zodiac') > -1) {
        //       _str += `<span class='text-gray'>+</span><span class='text-${_colorStr}'>${_zodiac}</span>`
        //     } else {
        //       _str += `<span class='text-gray'>+</span><span class='text-${_colorStr}'>${n}</span>`
        //     }
        //   } else {
        //     // 开奖如果是生肖
        //     if (_methodName.indexOf('Zodiac') > -1 || _methodName.indexOf('zodiac') > -1) {
        //       _str += `<span class='text-${_colorStr}'>${_zodiac} </span>`
        //     } else {
        //       _str += `<span class='text-${_colorStr}'>${n} </span>`
        //     }
        //   }
        // }
      }
      // 快三系列
      if (_className.indexOf('QuickThree') > -1) {
        // let sum = 0
        for (let n of _arr) {
          // sum += parseInt(n)
          _str += `<img class="award-img" src='/mobile/images/bet/SSC_dice${n}.png' />`
        }
        return _str
      }
      // 其余的都直接显示
      _str = _arr.join(' ')
      return _str
    },
    statusRow (row, col, statusType) {
      let _lottery = this.$store.getters.getLayout
      let _className = _lottery.lotteryClassName
      let _methodName = _lottery.lotteryMethodName
      let _arr = row.number.split(',')
      let _str = ''
      let _bs = ''
      let _dx = ''
      let _ds = ''
      let _ws = ''
      let _zl = ''

      let _size = 0
      let getSize = function (str, type) {
        // type before
        if (str.indexOf(type) > -1) {
          let _i = str.split(type)[1]
          return (_i.substring(0, 1) * 1)
        } else {
          return 0
        }
      }
      if (!_className || !_methodName) {
        return _str
      }
      // 时时彩
      if (_className.indexOf('FrequentLottery') > -1) {
        // 新起数组，截取有用的数组
        let _new = []
        if (_methodName.indexOf('before') > -1) {
          _size = getSize(_methodName, 'before')
          _new = _arr.slice(0, _size)
        }
        if (_methodName.indexOf('after') > -1) {
          _size = getSize(_methodName, 'after')
          _new = _arr.slice(-1 * _size)
        }
        if (_methodName.indexOf('in') > -1 && (_methodName.indexOf('before') === -1 && _methodName.indexOf('after') === -1)) {
          _size = getSize(_methodName, 'in')
          let _offset = (_arr.length - _size) / 2 // 偏移量
          _new = _arr.slice(_offset, -1 * _offset) // 截取数组
        }
        // end
        if (_methodName.indexOf('sum') > -1 || _methodName.indexOf('Sum') > -1) {
          // 要分前几中几后几。有毛病吗
          _str = _new.reduce((a, b) => +a + +b)
          // method有尾数，则取数字最后一位
          if (_methodName.indexOf('Mantissa') > -1 || _methodName.indexOf('mantissa') > -1) {
            _str = _str + ''
            _str = _str.substring(_str.length - 1)
          }
          return _str
        }
        if (_methodName.indexOf('span') > -1) {
          _str = Array.max(_new) - Array.min(_new)
          return _str
        }
        if (_methodName.indexOf('special') > -1) {
          // 选中数组是否符合条件
          // 三个号码相同则为豹子
          // 有两个号码相同为对子
          // 号码顺序排列的为顺子
          let isEqual = false
          let isTwoSame = false
          let isStraight = false
          let _newStr = _new.join('')
          let _re = /(\w)\1+/g
          if (new Set(_new).size < _new.length && new Set(_new).size > 1) {
            isTwoSame = true
          } else if (_newStr.match(_re) && _newStr.match(_re)[0].length === 3) {
            isEqual = true
          }
          // let _reStraight = /(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){2}/
          const straightArr = [ '012', '019', '089', '123', '234', '345', '456', '567', '789' ]
          const straightStr = _new.sort().reduce((a, b) => a + b)
          isStraight = straightArr.includes(straightStr)
          if (isEqual) {
            _str = '豹子'
          } else if (isTwoSame) {
            _str = '对子'
          } else if (isStraight) {
            _str = '顺子'
          } else {
            _str = '-'
          }
          return _str
        }
        // 龙虎
        if (_methodName.indexOf('dragonTiger') > -1) {
          // 值更大的显示
          if (_arr[0] > _arr[1]) {
            return '龙'
          }
          if (_arr[0] < _arr[1]) {
            return '虎'
          }
          if (_arr[0] === _arr[1]) {
            return '平局'
          }
        }
      }
      // PK10
      if (_className.indexOf('PK10') > -1) {
        if (_methodName.indexOf('dragonTiger') > -1) {
          // 取首尾，值更大的显示
          if (_arr[0] > _arr[_arr.length - 1]) {
            // return _arr[0]
            return '<span class="dxds-block dxds-block-red">龙</span>'
          } else {
            // return _arr[_arr.length - 1]
            return '<span class="dxds-block dxds-block-blue">虎</span>'
          }
        }
        if (_methodName.indexOf('attribute') > -1 || _methodName === 'sum') {
          // 大单，小双
          let _sum = _arr[0] * 1 + _arr[1] * 1
          let _dx = ''
          let _ds = ''
          if (_sum > 11) {
            _str += '<div style="margin-right: 5px" class="dxds-block dxds-block-orange">大</div>'
            _dx += '<div style="margin-right: 5px" class="dxds-block dxds-block-orange">大</div>'
          } else {
            _str += '<div style="margin-right: 5px" class="dxds-block dxds-block-blue">小</div>'
            _dx += '<div style="margin-right: 5px" class="dxds-block dxds-block-blue">小</div>'
          }
          if (_sum % 2) {
            _str += '<div class="dxds-block dxds-block-blue">单</div>'
            _ds += '<div class="dxds-block dxds-block-blue">单</div>'
          } else {
            _str += '<div class="dxds-block dxds-block-orange">双</div>'
            _ds += '<div class="dxds-block dxds-block-orange">双</div>'
          }
          switch (statusType) {
            case 'dx':
              return _dx
            case 'ds':
              return _ds
            case 'gyh':
              return `<span class="text-red">${_sum}</span>`
            default:
              return _str
          }
        }
        if (_methodName.indexOf('sum') > -1) {
          return `<span class="sum-text">${_arr[0] * 1 + _arr[1] * 1}</span>`
        }
      }
      // 三
      if (_className.indexOf('Three') > -1 || _className.indexOf('FrequentHappy') > -1) {
        if (_methodName.indexOf('sum') > -1 || _methodName.indexOf('Sum') > -1) {
          let _sum = 0
          for (let e of _arr) {
            _sum += e * 1
          }
          return _sum
        }
      }
      // PCEgg
      if (_className.indexOf('Eggs') > -1 || _className.indexOf('Luck') > -1) {
        // 颜色
        // 大小单双
        let _sum = _arr[0] * 1 + _arr[1] * 1 + _arr[2] * 1
        let _middle = 27 / 2
        let _color = oriColorTool.pcSumToColor(_sum)
        let _colorStr = 'gray'
        if (_color.indexOf('Red') > -1) {
          _colorStr = 'red'
          _str += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">红</span>`
          _bs += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">红</span>`
        } else if (_color.indexOf('Blue') > -1) {
          _colorStr = 'blue'
          _str += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">蓝</span>`
          _bs += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">蓝</span>`
        } else if (_color.indexOf('Green') > -1) {
          _colorStr = 'green'
          _str += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">绿</span>`
          _bs += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">绿</span>`
        } else {
          _str += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">无</span>`
          _bs += `<span class="text-${_colorStr} bose-ball bose-ball-${_colorStr}">无</span>`
        }
        _str += '<span style="padding: 0 3px;"></span>'
        if (_sum > _middle) {
          _str += '<span class="dxds-block dxds-block-orange">大</span>'
          _dx += '<span class="dxds-block dxds-block-orange">大</span>'
        } else {
          _str += '<span class="dxds-block dxds-block-blue">小</span>'
          _dx += '<span class="dxds-block dxds-block-blue">小</span>'
        }
        _str += '<span style="padding: 0 3px;"></span>'
        if (_sum % 2) {
          _str += '<span class="dxds-block dxds-block-blue">单</span>'
          _ds += '<span class="dxds-block dxds-block-blue">单</span>'
        } else {
          _str += '<span class="dxds-block dxds-block-orange">双</span>'
          _ds += '<span class="dxds-block dxds-block-orange">双</span>'
        }
        switch (statusType) {
          case 'bs':
            return _bs
          case 'dx':
            return _dx
          case 'ds':
            return _ds
          default:
            return _str
        }
      }
      // SixMark
      if (_className.indexOf('SixMark') > -1) {
        // 很多玩法都要分
        // 特码
        if (_methodName.indexOf('extraCode') > -1 || _methodName === 'attribute') {
          // 尾大 大小 单双
          let _extra = _arr[_arr.length - 1] // 特码
          let _zodiac = oriColorTool.sixNumToZodiac(_extra)
          let _zodiacA = [ '鼠', '虎', '龙', '蛇', '猴', '兔' ]
          // let _zodiacB = [ '牛', '羊', '鸡', '狗', '猪', '马' ]
          // let _middle = (49 + 1) / 2
          if (_extra >= 25) {
            _str += '<span style="margin-right: 5px;" class="dxds-block dxds-block-orange">大</span>'
            _dx += '<span style="margin-right: 5px;" class="dxds-block dxds-block-orange">大</span>'
          } else {
            _str += '<span style="margin-right: 5px;" class="dxds-block dxds-block-blue">小</span>'
            _dx += '<span style="margin-right: 5px;" class="dxds-block dxds-block-blue">小</span>'
          }
          if (_extra % 2) {
            _str += '<span style="margin-right: 5px;" class="dxds-block dxds-block-blue">单</span>'
            _ds += '<span style="margin-right: 5px;" class="dxds-block dxds-block-blue">单</span>'
          } else {
            _str += '<span style="margin-right: 5px;" class="dxds-block dxds-block-orange">双</span>'
            _ds += '<span style="margin-right: 5px;" class="dxds-block dxds-block-orange">双</span>'
          }
          if (!_extra) { return '' }
          if (_extra.substring(_extra.length - 1) >= 5) {
            _str += '<span class="dxds-block-two dxds-block-red">尾大</span>'
            _ws += '<span class="dxds-block-two dxds-block-red">尾大</span>'
          } else {
            _str += '<span class="dxds-block-two dxds-block-green">尾小</span>'
            _ws += '<span class="dxds-block-two dxds-block-green">尾小</span>'
          }
          if (_zodiacA.includes(_zodiac)) {
            _zl += '<span class="dxds-block-two dxds-block-red">野兽</span>'
          } else {
            _zl += '<span class="dxds-block-two dxds-block-green">家禽</span>'
          }
          switch (statusType) {
            case 'dx':
              return _dx
            case 'ds':
              return _ds
            case 'ws':
              return _ws
            case 'zl':
              return _zl
            default:
              return _str
          }
          // return _str
        }
        // 色波
        if (_methodName.indexOf('color') > -1) {
          let _extra = _arr[_arr.length - 1] // 特码
          let colorStr = 'gray'
          if (!_extra) { return '' }
          let _color = oriColorTool.sixNumToColor(_extra)
          if (_color.indexOf('Red') > -1) {
            colorStr = 'red'
            _str += `<span class="text-${colorStr}">红波</span>`
          } else if (_color.indexOf('Blue') > -1) {
            colorStr = 'blue'
            _str += `<span class="text-${colorStr}">蓝波</span>`
          } else if (_color.indexOf('Green') > -1) {
            colorStr = 'green'
            _str += `<span class="text-${colorStr}">绿波</span>`
          } else {
            colorStr = 'gray'
            _str += `<span class="text-${colorStr}">无</span>`
          }
          return _str
        }
        // 特肖
        if (_methodName.indexOf('extraZodiac') > -1) {
          let _extra = _arr[_arr.length - 1] // 特码
          // if (!_extra) { return '' }
          // let _zodiac = oriColorTool.sixNumToZodiac(_extra)
          // let _zodiacA = [ '鼠', '虎', '龙', '蛇', '猴', '兔' ]
          // if (_zodiacA.includes(_zodiac)) {
          //   _zl += '<span class="dxds-block-two dxds-block-red">野兽</span>'
          // } else {
          //   _zl += '<span class="dxds-block-two dxds-block-green">家禽</span>'
          // }
          return `<span class="block-sm text-${ZodiacParser(_extra).color}">${ZodiacParser(_extra).zodiac}</span>`
        }
        // 头尾数
        if (_methodName.indexOf('headAndTrail') > -1) {
          let _extra = _arr[_arr.length - 1] // 特码
          if (!_extra) { return '' }
          let _arrExs = _extra.split('')
          _arrExs[0] = _arrExs[0] + '头'
          _arrExs[1] = _arrExs[1] + '尾'
          return _arrExs.join('  ')
        }
        // 正码
        if (_methodName.indexOf('positiveCode') > -1) {
          let _inx = _methodName.split('positiveCode')[1] // 正码，还tmd的还要分特码正码
          let _extra = ''
          let colorStr = ''
          if (!_inx[0]) {
            // _extra = _arr[_arr.length - 1] // 特码
            return ''
          } else {
            _extra = _arr[_inx[0] - 1] // 正码
          }
          if (!_extra) { return '' }
          // console.log(_inx.indexOf('Extra') > -1)
          if (_inx.indexOf('Extra') > -1) {
            // 特码
            let _color = oriColorTool.sixNumToColor(_extra)
            if (_color.indexOf('Red') > -1) {
              colorStr = 'red'
              _str += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">红</span>`
              _bs += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">红</span>`
            } else if (_color.indexOf('Blue') > -1) {
              colorStr = 'blue'
              _str += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">蓝</span>`
              _bs += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">蓝</span>`
            } else if (_color.indexOf('Green') > -1) {
              colorStr = 'green'
              _str += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">绿</span>`
              _bs += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">绿</span>`
            } else {
              colorStr = 'gray'
              _str += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">无</span>`
              _bs += `<span class="text-${colorStr} bose-ball bose-ball-${colorStr}">无</span>`
            }
            _str += '<span style="padding: 0 3px;"></span>'
            if (_extra >= 25) {
              _str += '<span class="dxds-block dxds-block-orange">大</span>'
              _dx += '<span class="dxds-block dxds-block-orange">大</span>'
            } else {
              _str += '<span class="dxds-block dxds-block-blue">小</span>'
              _dx += '<span class="dxds-block dxds-block-blue">小</span>'
            }
            _str += '<span style="padding: 0 3px;"></span>'
            if (_extra % 2) {
              _str += '<span class="dxds-block dxds-block-blue">单</span>'
              _ds += '<span class="dxds-block dxds-block-blue">单</span>'
            } else {
              _str += '<span class="dxds-block dxds-block-orange">双</span>'
              _ds += '<span class="dxds-block dxds-block-orange">双</span>'
            }
          } else {
            // 正码
            if (_extra >= 25) {
              _str += '<span class="dxds-block dxds-block-orange">大</span>'
              _dx += '<span class="dxds-block dxds-block-orange">大</span>'
            } else {
              _str += '<span class="dxds-block dxds-block-blue">小</span>'
              _dx += '<span class="dxds-block dxds-block-blue">小</span>'
            }
            _str += '<span style="padding: 0 3px;"></span>'
            if (_extra % 2) {
              _str += '<span class="dxds-block dxds-block-blue">单</span>'
              _ds += '<span class="dxds-block dxds-block-blue">单</span>'
            } else {
              _str += '<span class="dxds-block dxds-block-orange">双</span>'
              _ds += '<span class="dxds-block dxds-block-orange">双</span>'
            }
            _str += '<span style="padding: 0 3px;"></span>'
            if (_extra.substring(_extra.length - 1) >= 5) {
              _str += '<span class="dxds-block-two dxds-block-red">尾大</span>'
              _ws += '<span class="dxds-block-two dxds-block-red">尾大</span>'
            } else {
              _str += '<span class="dxds-block-two dxds-block-green">尾小</span>'
              _ws += '<span class="dxds-block-two dxds-block-green">尾小</span>'
            }
          }
          switch (statusType) {
            case 'bs':
              return _bs
            case 'dx':
              return _dx
            case 'ds':
              return _ds
            case 'ws':
              return _ws
            default:
              return _str
          }
          // return _str
        }
        // 五行
        if (_methodName.indexOf('fiveElements') > -1) {
          let _extra = _arr[_arr.length - 1] // 特码
          if (!_extra) { return '' }
          const { element } = ZodiacParser(+_extra)
          if (!element) {
            for (const _k in this.wuxing) {
              if (this.wuxing.hasOwnProperty(_k) && this.wuxing[_k].indexOf(_extra) > -1) {
                _str = _k
              }
            }
            return _str
          }
          _str = element
          return _str
        }
        // 七色波
        if (_methodName.indexOf('sevenColors') > -1) {
          // 我去。还要每个颜色取出来然后算最多出现的吗？！excuse me？！
          if (_arr.length === 0) { return '' }
          let _max = { key: '', val: 0 }
          let _Dict = {
            red: 0,
            green: 0,
            blue: 0
          }
          for (let _item of _arr) {
            let _color = oriColorTool.sixNumToColor(_item)
            let _val = _item === _arr[_arr.length - 1] ? 1.5 : 1
            if (_color.indexOf('Red') > -1) {
              _Dict.red += _val
            } else if (_color.indexOf('Blue') > -1) {
              _Dict.blue += _val
            } else if (_color.indexOf('Green') > -1) {
              _Dict.green += _val
            } else {
            }
          }
          for (const e in _Dict) {
            if (_Dict.hasOwnProperty(e)) {
              let el = _Dict[e]
              if (el > _max.val) {
                _max.key = e
                _max.val = el
              } else if (el === _max.val) {
                _max.key = 'equal'
              }
            }
          }
          _str = `<span class="text-${_max.key === 'equal' ? 'gray' : _max.key}">${_max.key === 'equal' ? '和局' : _max.key === 'red' ? '红波' : _max.key === 'blue' ? '蓝波' : _max.key === 'green' ? '绿波' : ''}</span>`
          return _str
        }
      }
      // console.log(this.$store.getters.getLayout)
      return _str
    }
  }
}
</script>

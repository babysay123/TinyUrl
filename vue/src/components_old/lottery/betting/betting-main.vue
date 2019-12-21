<style lang="scss">
// .betting-main {
//   margin-top: 110px;
// }
.betting-main {
  position: relative;
  overflow: hidden;
  // margin-bottom: 1.1875rem;
}
.list .list-title{
  // font-size: 14px;
  text-align: center;
  color: #ccc;
  line-height: 1rem;
  height: 1rem;
}
.list .list-title > span{
  font-size: 12px;
  margin-right: 0.25rem;
  line-height: 1rem;
}
.list .list-title > span.text-red{
  vertical-align: middle;
  font-size: 14px
}
/* list pay ment */
.list-pay .list-ul li{
  overflow: hidden;
  display: block;
  padding-left: 10px;
}
.list-pay .pay-box{
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.list-pay .pay-box > .btn-close{
  float: left;
  width: .7rem;
  height: .7rem;
  background-image: url('../../../assets/images/lottery/button_close.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-top: 17px;
}
.list-pay .pay-box > .btn-close:active{
  background-color: #909090;
}
.list-pay .pay-box > .box-msg{
  float: left;
  display: block;
  width: 88%;
  width: -moz-calc(100% - 32px - 10px);
  width: -webkit-calc(100% - 32px - 10px);
  width: calc(100% - 32px - 10px);
}
.list-pay .pay-box > .box-msg li{
  font-size: 12px;
  line-height: 22px;
  word-break: break-word;
}
.list-pay .pay-box > .box-msg li.text-red{
  font-size: 13px;
}

/* list square 快三 */
.list-square .list-ul {
  position: relative;
  overflow: hidden;
  li {
    // 默认一行三元素
    // margin-bottom: 0.375rem;
    box-sizing: border-box;
    display: block;
    float: left;
    margin: 0 0 0.3125rem 0.3125rem;
    width: 28%;
    width: -webkit-calc((100% - 1.25rem) / 3);
    width: -moz-calc((100% - 1.25rem) / 3);
    width: calc((100% - 1.25rem) / 3);
    text-align: center;
    &.li-1 {
      width: -webkit-calc(100% - 0.3125rem);
      width: -moz-calc(100% - 0.3125rem);
      width: calc(100% - 0.3125rem);
    }
    &.li-2 {
      width: -webkit-calc((100% - 0.625rem) / 2);
      width: -moz-calc((100% - 0.625rem) / 2);
      width: calc((100% - 0.625rem) / 2);
    }
    &.li-3 {
      width: 28%;
      width: -webkit-calc((100% - 1.25rem) / 3);
      width: -moz-calc((100% - 1.25rem) / 3);
      width: calc((100% - 1.25rem) / 3);
    }
    &.li-4 {
      width: -webkit-calc((100% - 1.5625rem) / 4);
      width: -moz-calc((100% - 1.5625rem) / 4);
      width: calc((100% - 1.5625rem) / 4);
    }
    &.li-5 {
      width: -webkit-calc((100% - 1.875rem) / 5);
      width: -moz-calc((100% - 1.875rem) / 5);
      width: calc((100% - 1.875rem) / 5);
    }
    a {
      display: block;
      color: rgb(253, 189, 44);
      font-size: 0.4063rem;
      line-height: 0.875rem;
      height: 0.875rem;
      border: 1px solid #e8e8e8;
      &.active, &:active {
        color: #fff;
      }
    }
    span{
      font-size: 0.375rem;
      display: block;
      line-height: 0.5625rem;
      height: 0.5625rem;
      color: rgb(191, 191, 191);
    }
  }
}

/* two col */
.list-two-col {
  overflow: hidden;
  padding-top: 0.3125rem;
  .list-col-left {
    width: 18%;
    float: left;
    text-align: center;
    position: relative;
    span {
      font-size: 12px;
      // padding: 2px 10px 2px 5px;
      position: relative;
      background: url("/mobile/images/lottery/Lotter_select_headerImage.png") no-repeat center;
      line-height: 16px;
      background-size: cover;
      top: 0.125rem;
      display: block;
      padding: 2px 0;
      margin-left: 2px;
      text-align: center;
    }
  }
}
.list-two-col .list-col-right {
  width: 82%;
  float: left;
}
.list .list-quick-btns {
  overflow: hidden;
  padding-bottom: 0.3125rem;
}
.list .list-quick-btns .btn {
  display: block;
  width: 15%;
  // width: -moz-calc(100% / 6);
  // width: -webkit-calc(100% / 6);
  // width: calc(100% / 6);
  // line-height: 0.8125rem;
  // height: 0.8125rem;
  margin-left: 1.4%;
  margin-left: -moz-calc(10% / 7);
  margin-left: -webkit-calc(10% / 7);
  margin-left: calc(10% / 7);
  line-height: 26px;
  height: 26px;
  float: left;
  background: none;
  border:1px solid #bfbfbf;
  font-size: 14px;
  font-weight: 100;
  margin-bottom: 0;
  border-radius: 0;
  &:active {
    background: #f5f5f5;
  }
}
/* list dragon */
.list-dragon .list-ul{
  position: relative;
  overflow: hidden;
  margin-left: 3%;
}
.list-dragon .list-ul li{
  box-sizing: border-box;
  display: block;
  float: left;
  margin: 0 0 0.375rem 0.375rem;
  width: 33%;

  text-align: center;
}
.list-dragon .list-ul li a{
  float: left;
  width: 100%;
  color: rgb(253, 189, 44);
  font-size: 14px;
  line-height: .875rem;
  height: .875rem;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
.list-dragon .list-ul li a.active{
  color: #fff;
}
.list-dragon .list-ul li a:active{
  color: #fff;
}
.list-dragon .list-ul li span{
  font-size: 12px;
  display: block;
  line-height: 0.5625rem;
  height: 0.5625rem;
  color: rgb(191, 191, 191);
}
.list-dragon .list-ul .vs{
  box-sizing: border-box;
  float: left;
  margin: 0.1rem 0 0 0.375rem;
  line-height: 20px;
  height: 20px;
  width: 20px;
  text-align: center;
  position: relative;
  font-size: 11px;
  color: rgb(253, 189, 44);
  border: 1px solid rgb(191, 191, 191);
  border-radius: 50px;
}
/* list circle */
.list-circle .list-ul {
  position: relative;
  overflow: hidden;
  // 一行五元素
  li {
    box-sizing: border-box;
    display: block;
    float: left;
    width: 20%;
    // margin: 0 0 0.375rem 0.375rem;
    // width: -webkit-calc((100% - 1.5rem) / 3);
    // width: -moz-calc((100% - 1.5rem) / 3);
    // width: calc((100% - 1.5rem) / 3);
    text-align: center;
    position: relative;
    margin-bottom: 0.375rem;
    &.li-1 {
      width: 100%;
      a {
        line-height: 1.375rem;
        height: 1.375rem;
        width: 1.375rem;
        margin-left: -0.6875rem;
      }
    }
    &.li-2 {
      width: 50%;
      a {
        line-height: 1.375rem;
        height: 1.375rem;
        width: 1.375rem;
        margin-left: -0.6875rem;
      }
    }
    &.li-3 {
      width: 33.33%;
      a {
        line-height: 1.375rem;
        height: 1.375rem;
        width: 1.375rem;
        margin-left: -0.6875rem;
      }
    }
    &.li-4 {
      width: 25%;
      a {
        line-height: 1.25rem;
        height: 1.25rem;
        width: 1.25rem;
        margin-left: -0.625rem;
      }
    }
    &.li-5 {
      width: 20%;
    }
    a {
      display: block;
      color: rgb(253, 189, 44);
      // line-height: 0.875rem;
      // height: 0.875rem;
      // line-height: 1.1875rem;
      // height: 1.1875rem;
      // width: 1.1875rem;
      border: 1px solid rgb(191, 191, 191);
      font-size: 0.4063rem;
      line-height: 1.125rem;
      height: 1.125rem;
      width: 1.125rem;
      margin-left: -0.5625rem;
      text-align: center;
      position: relative;
      left: 50%;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 50px;
      -moz-appearance: none;
      -webkit-appearance : none;
      &.font-small {
        font-size: 0.3438rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
      }
      &.active, &:active {
        color: #fff;
      }
    }
    span {
      font-size: 0.4063rem;
      display: block;
      line-height: 0.5625rem;
      height: 0.5625rem;
      color: rgb(191, 191, 191);
    }
  }
}

// whole color
.ballRedColor{
  color: rgba(216, 30, 6,1) !important;
  background: #fff !important;
  border: 1px solid rgba(216, 30, 6,1) !important;
}
.ballGreenColor{
  color: #26ab5f !important;
  background: #fff !important;
  border: 1px solid #26ab5f !important;
}
.ballBlueColor{
  color: #40a0e9 !important;
  background: #fff !important;
  border: 1px solid #40a0e9 !important;
}
.ballGrayColor{
  color: #a1a1a1 !important;
  background: #fff !important;
  border: 1px solid #a1a1a1 !important;
}
.active.ballRedColor{
  background: rgba(216, 30, 6,1) !important;
  color: #fff !important;
  border: 1px solid rgba(216, 30, 6,1) !important;
}
.active.ballGreenColor{
  background: #26ab5f !important;
  color: #fff !important;
  border: 1px solid #26ab5f !important;
}
.active.ballBlueColor{
  background: #40a0e9 !important;
  color: #fff !important;
  border: 1px solid #40a0e9 !important;
}
.active.ballGrayColor{
  background: #a1a1a1 !important;
  color: #fff !important;
  border: 1px solid #a1a1a1 !important;
}
/* range */
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
  background: -moz-linear-gradient(#fff, #fff) no-repeat;
  background: -webkit-linear-gradient(#059CFA, #059CFA) no-repeat;
  background-size: 0% 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  margin-top: -10px; /*使滑块超出轨道部分的偏移量相等*/
  background: #ffffff;
  border-radius: 50%; /*外观设置为圆形*/
  box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
  border: solid 0.125em rgba(255, 255, 255, 0.5); /*设置边框*/
  border:none;
}
input[type=range]::-moz-range-progress {
  background: linear-gradient(to right, #059CFA, white 100%, white);
  height: 3px;
  border-radius: 10px;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  margin-top: -10px; /*使滑块超出轨道部分的偏移量相等*/
  background: #ffffff;
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
  box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
}
input[type=range]::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 10px; /*将轨道设为圆角的*/
  box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
}
input[type=range]::-ms-track {
  height: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112;
  border-color: transparent; /*去除原有边框*/
  color: transparent; /*去除轨道内的竖线*/
}
input[type=range]::-ms-thumb {
  border: solid 0.125em rgba(205, 224, 230, 0.5);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: #ffffff;
  margin-top: -10px;
  box-shadow: 0 .125em .125em #3b4547;
}
input[type=range]::-ms-fill-lower {
  /*进度条已填充的部分*/
  height: 12px;
  border-radius: 10px;
  background: linear-gradient(to right, #059CFA, white 100%, white);
}
input[type=range]::-ms-fill-upper {
  /*进度条未填充的部分*/
  height: 12px;
  border-radius: 10px;
  background: #ffffff;
}
input[type=range]:focus::-ms-fill-lower {
  background: linear-gradient(to right, #059CFA, white 100%, white);
  background: linear-gradient(#059CFA, #059CFA) no-repeat;
}
input[type=range]:focus::-ms-fill-upper {
  background: #ffffff;
  background: linear-gradient(#059CFA, #059CFA) no-repeat;
}
</style>
<style scoped>
.hidden-flow {
  overflow: hidden;
}
</style>

<template>
  <section class="betting-main footer-fixed-gap" :playId='lotteryLayout.playId'>
    <!-- bg-white -->
    <!-- 快三 -->
    <div class="list list-square bg-white" v-if="layoutSelect(lotteryLayout) === 'squareDiff'">
      <h5 class="list-title"><span class="text-red">{{lotteryLayout.name}}</span><span>赔率</span></h5>
      <ul class="list-ul" v-for="(layout, inx) in lotteryLayout.layout" :key="inx">
        <li v-for="(num, i) in layout.numbers.split('|')" :key="i" :cols="i" :class="lineClass(layout)">
          <a href="javascript:void(0);" :class="sClass(inx, i, num)" @click.stop="clickBtn($event, inx, i, lotteryLayout)">{{num}}</a><span v-if="isLogin">{{diffBtn(i, layout)}}</span>
        </li>
      </ul>
    </div>
    <div class="list list-square list-two-col bg-white" v-if="layoutSelect(lotteryLayout) === 'squareSame'">
      <div v-for="(layout, inx) in lotteryLayout.layout" :key="inx" class="hidden-flow">
        <div class="list-col-left">
          <span class="">{{layout.ints}}</span>
        </div>
        <div class="list-col-right">
          <ul class="list-ul">
            <li v-for="(num, i) in layout.numbers.split('|')" :key="i" :cols="i" :class="lineClass(layout)"><a class="" @click.stop="clickBtn($event, inx, i, lotteryLayout)" :class="sClass(inx, i, num)">{{num}}</a></li>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- 龙虎 -->
    <div class="list list-dragon list-two-col bg-white" v-if="layoutSelect(lotteryLayout) === 'dragonTiger'">
      <div class="list-col-left">
        <span class="">{{lotteryLayout.layout[0].ints}}</span>
      </div>
      <div class="list-col-right">
        <ul class="list-ul" v-for="(num, inx) in lotteryLayout.layout[0].numbers.split(',')" :key="inx" :index="inx">
          <li><a :class="dragonClass(inx, 0)" @click.stop="clickBtn($event, inx, 0, lotteryLayout)">{{num.split('|')[0]}}</a></li>
          <div class="vs">VS</div>
          <li><a :class="dragonClass(inx, 1)" @click.stop="clickBtn($event, inx, 1, lotteryLayout)">{{num.split('|')[1]}}</a></li>
        </ul>
      </div>
      <div class="clearfix"></div>
      <!-- <div class="list-quick-btns bg-white" index="0" v-if="lotteryLayout.shortcut === true">
        <button class="btn" quick="all">全</button>
        <button class="btn" quick="big">大</button>
        <button class="btn" quick="small">小</button>
        <button class="btn" quick="odd">单</button>
        <button class="btn" quick="even">双</button>
        <button class="btn" quick="clear">清</button>
      </div> -->
    </div>
    <!-- 圆圈共同赔率 -->
    <div class="list list-circle list-two-col bg-white" v-if="layoutSelect(lotteryLayout) === 'circleSame'">
      <div v-for="(layout, inx) in lotteryLayout.layout" :key="inx" class="hidden-flow">
        <div class="list-col-left">
          <span class="">{{layout.ints}}</span>
        </div>
        <div class="list-col-right">
          <ul class="list-ul" :index="inx">
            <li v-for="(num, i) in layout.numbers.split('|')" :key="i" :class="lineClass(layout)">
              <a href="javascript:void(0);" :index="i" @click.stop="clickBtn($event, inx, i, lotteryLayout)" :class="sClass(inx, i, num)">{{num}}</a>
            </li>
          </ul>
        </div>
        <div class="clearfix"></div>
        <div class="list-quick-btns bg-white" :index="inx" v-if="lotteryLayout.shortcut">
          <button class="btn" quick="all" @click="clickAll(inx, lotteryLayout)">全</button>
          <button class="btn" quick="big" @click="clickBig(inx, lotteryLayout)">大</button>
          <button class="btn" quick="small" @click="clickSmall(inx, lotteryLayout)">小</button>
          <button class="btn" quick="odd" @click="clickOdd(inx, lotteryLayout)">单</button>
          <button class="btn" quick="even" @click="clickEven(inx, lotteryLayout)">双</button>
          <button class="btn" quick="clear" @click="clickClear(inx, lotteryLayout)">清</button>
        </div>
      </div>
    </div>
    <!-- 圆圈单独赔率 -->
    <div :class="lotteryLayout.lotteryMethodName === 'totalZodiac' ? 'list list-square bg-white' : 'list list-circle bg-white'" v-if="layoutSelect(lotteryLayout) === 'circleDiff'">
      <h5 class="list-title">
        <span class="text-red">{{lotteryLayout.layout[0].ints}}</span><span>赔率</span>
      </h5>
      <ul class="list-ul" v-for="(layout, inx) in lotteryLayout.layout" :key="inx" :index="inx">
        <li v-for="(num, i) in layout.numbers.split('|')" :key="i" :cols="i" :class="lineClass(layout)">
          <a href="javascript:void(0);" @click.stop="clickBtn($event, inx, i, lotteryLayout)" :class="sClass(inx, i, num)">{{num}}</a><span v-if="isLogin">{{diffBtn(i, layout)}}</span>
        </li>
      </ul>
      <div class="clearfix"></div>
      <div class="list-quick-btns bg-white" :index="inx" v-if="lotteryLayout.shortcut">
        <button class="btn" quick="all" @click="clickAll(0, lotteryLayout)">全</button>
        <button class="btn" quick="big" @click="clickBig(0, lotteryLayout)">大</button>
        <button class="btn" quick="small" @click="clickSmall(0, lotteryLayout)">小</button>
        <button class="btn" quick="odd" @click="clickOdd(0, lotteryLayout)">单</button>
        <button class="btn" quick="even" @click="clickEven(0, lotteryLayout)">双</button>
        <button class="btn" quick="clear" @click="clickClear(0, lotteryLayout)">清</button>
      </div>
    </div>
    <!--  -->
  </section>
</template>

<script>
import { numFixed } from './module/tools'
// 引用注数计算对象
import Algorithm from './module/algorithm_module'
import ResultCompute from './module/ResultCompute'
// 引用颜色数组方法
import OriColorTool from './module/oriColorTool'
export default {
  name: 'betting-main',
  props: ['lotteryLayout', 'colorArr', 'lotteryId', 'playWayArr', 'shareCode', 'isLogin'],
  data () {
    return {
      htmlType: '',
      selectArr: []
    }
  },
  watch: {
    'lotteryId': function (val) {
    },
    'lotteryLayout': function (layout) {
      Algorithm.layout = layout
      let _arr = []
      if (layout.layout && layout.layout.length > 1) {
        for (let i of layout.layout) {
          let x = [i]
          x = []
          _arr.push(x)
        }
      }
      this.selectArr = _arr
    }
  },
  methods: {
    dragonClass: function (col, inx) {
      let _selects = this.selectArr
      let _active = false
      if (_selects.indexOf(2 * col + inx) > -1) {
        _active = true
      }
      return {
        'active': _active
      }
    },
    lineClass: function (layout) {
      let _class = {}
      if (layout.col) {
        let _line = 'li-' + layout.col
        _class[_line] = true
      }
      return _class
    },
    sClass: function (col, inx, num) {
      let _selects = this.selectArr
      let _small = false
      if (num && (num + '').length > 2) {
        _small = true
      }
      let _active = false
      if (this.lotteryLayout.lotteryId && this.lotteryLayout.layout && this.lotteryLayout.layout.length > 1) {
        if (_selects[col] && _selects[col].indexOf(inx) > -1) {
          _active = true
        }
      } else {
        for (let i = 0; i < _selects.length; i++) {
          if (_selects[i] === num) {
            _active = true
          }
        }
        // if (_selects.indexOf(inx) > -1) {
        //   _active = true
        // }
      }
      // if (_selects.length !== 0) {
      //   for (let i = 0; i < _selects.length; i++) {
      //     if (_selects[i] === inx) {
      //       _active = true
      //     }
      //   }
      // }
      let _class = {
        'font-small': _small,
        'active': _active
      }
      if (this.lotteryLayout.lotteryClassName.indexOf('SixMark') > -1) {
        // 六合彩
        if (num || num === 0) {
          let _sixColor = OriColorTool.sixNumToColor(num)
          _class[_sixColor] = true
        }
      } else if (this.lotteryLayout.lotteryClassName.indexOf('Luck') > -1 || this.lotteryLayout.lotteryClassName.indexOf('PC') > -1) {
        // 幸运
        if (num || num === 0) {
          let _luckColor = OriColorTool.pcSumToColor(num)
          _class[_luckColor] = true
        }
      }
      return _class
    },
    layoutSelect: function (layout) {
      if (!layout.lotteryId) {
        return ''
      }
      OriColorTool.ColorArr = this.colorArr
      if (layout.lotteryClassName.indexOf('SixMark') > -1) {
        // 六合彩布局
        if (layout.minPrize === 0) {
          this.htmlType = 'circleDiff'
          this.$parent.updateOdds('')
          // if (layout.lotteryMethodName === 'totalZodiac') {
          //   // 总肖为方形布局
          //   this.htmlType = 'sixSquareDiff'
          // }
          return this.htmlType
        } else {
          this.htmlType = 'circleSame'
          // TODO: 统一赔率，要向父组件传值
          this.$parent.updateOdds(this.calcRealPrize({
            minPrize: layout.minPrize,
            maxPrize: layout.maxPrize,
            shareCode: this.shareCode
          }))
          return this.htmlType
        }
      } else if (layout.lotteryClassName.indexOf('QuickThree') > -1) {
        // 快三 布局
        if (layout.minPrize === 0) {
          this.htmlType = 'squareDiff'
          this.$parent.updateOdds('')
          return this.htmlType
        } else {
          this.htmlType = 'squareSame'
          // TODO: 统一赔率，要向父组件传值
          this.$parent.updateOdds(this.calcRealPrize({
            minPrize: layout.minPrize,
            maxPrize: layout.maxPrize,
            shareCode: this.shareCode
          }))
          return this.htmlType
        }
      } else if (layout.lotteryMethodName === 'dragonTiger') {
        // 龙虎玩法
        this.htmlType = 'dragonTiger'
        // TODO: 统一赔率，要向父组件传值
        this.$parent.updateOdds(this.calcRealPrize({
          minPrize: layout.minPrize,
          maxPrize: layout.maxPrize,
          shareCode: this.shareCode
        }))
        return this.htmlType
      } else {
        // 优先进prizes布局
        if (layout.layout && layout.layout.length === 1 && layout.layout[0].prizes) {
          this.htmlType = 'circleDiff'
          this.$parent.updateOdds('')
          return this.htmlType
        }
        if (layout.minPrize === 0) {
          this.htmlType = 'circleDiff'
          this.$parent.updateOdds('')
          return this.htmlType
        } else {
          this.htmlType = 'circleSame'
          // TODO: 统一赔率，要向父组件传值
          this.$parent.updateOdds(this.calcRealPrize({
            minPrize: layout.minPrize,
            maxPrize: layout.maxPrize,
            shareCode: this.shareCode
          }))
          return this.htmlType
        }
      }
    },
    // 计算实际赔率
    calcRealPrize: function (dict) {
      // dict = dict * 1
      let number = 0
      number = (+dict.maxPrize - +dict.minPrize) / 9 * dict.shareCode + +dict.minPrize

      return numFixed(number, 3)
      // let number = 0
      // number = (dict.maxPrize * 1000 - dict.minPrize * 1000) / 9 * dict.shareCode * 1 + dict.minPrize * 1000
      // if (number < -1) {
      //   return ChangeThreeDecimal(-1 * (Math.floor(-1 * number) / 1000))
      // } else {
      //   return ChangeThreeDecimal(Math.floor(number) / 1000)
      // }
    },
    diffBtn: function (index, layout) {
      let _prizes = layout.prizes.split('|')
      let _maxs = layout.maxPrizes.split('|')
      let _prize = this.calcRealPrize({
        minPrize: _prizes[index],
        maxPrize: _maxs[index],
        shareCode: this.shareCode
      })
      return _prize
      // if (this.isLogin) {
      //   return `<a href="javascript:void(0);" class="">${num}</a><span>${_prize}</span>`
      // } else {
      //   return `<a href="javascript:void(0);" class="">${num}</a>`
      // }
    },
    clickBtn: function (e, col, i, layout) {
      let musicSto = this.Utils.Storage.get('music')
      let musics = this.$store.state.chatRoom.music
      // 选择播音乐
      if (musicSto) {
        if (musicSto.click) {
          musics.click.play()
        } else {
          musics.click.pause()
          musics.click.currentTime = 0
        }
      } else {
        musics.click.play()
      }
      // 检查是否还能选
      // let _lay = this.lotteryLayout.layout
      // let _selects = this.selectArr
      // 切换样式
      if (e.target.className.indexOf('active') > -1) {
        // e.target.className = e.target.className.replace('active', '')
        // 筛选玩法，计算注数
        this.updateArr(col, i, layout)
      } else {
        // 筛选玩法，计算注数
        // 取每行索引，实际值在点击投注之后再取
        // e.target.className = 'active'
        if (this.effective(col, i, layout)) {
          this.updateArr(col, i, layout)
        }
      }
      // 计算注数
      this.calcAlgorithm(layout)
    },
    updateArr: function (col, inx, layout) {
      // 添加或删除元素
      // let x = [col, inx]
      let _selects = this.selectArr
      // let _arr = []
      if (layout.layout && layout.layout.length > 1) {
        // 多维
        if (_selects[col].indexOf(inx) > -1) {
          _selects[col].splice(_selects[col].indexOf(inx), 1)
        } else {
          _selects[col].push(inx)
        }
      } else {
        // 一维
        if (layout.lotteryMethodName === 'dragonTiger') {
          // 龙虎 再重新配一下
          let _tigerInx = 2 * col + inx

          if (_selects.indexOf(_tigerInx) > -1) {
            _selects.splice(_selects.indexOf(_tigerInx), 1)
          } else {
            _selects.push(_tigerInx)
          }
        } else {
          let numbers = layout.layout[0].numbers.split('|')
          if (_selects.indexOf(numbers[inx]) > -1) {
            _selects.splice(_selects.indexOf(numbers[inx]), 1)
          } else {
            _selects.push(numbers[inx])
          }
        }
      }
    },
    effective: function (col, inx, layout) {
      // 添加条件是否满足以及相应处理
      let _selects = this.selectArr
      if (layout.lotteryMethodName.indexOf('duplex') > -1) {
        // 胆拖
        // 必定是二维数组
        // 胆与拖不能相同，必须有胆，胆个数取决maxSel
        if (col === 0) {
          // 如果拖码有重复，则去掉
          if (_selects[1].indexOf(inx) > -1) {
            _selects[1].splice(_selects[1].indexOf(inx), 1)
          }
          // 如果胆码已经达到最大值，去掉数组第一个
          if (_selects[0].length >= layout.layout[0].maxSel) {
            _selects[0].splice(0, 1)
          }
        } else {
          // 如果拖码有重复，去掉
          if (_selects[0].indexOf(inx) > -1) {
            _selects[0].splice(_selects[0].indexOf(inx), 1)
          }
          // 如果拖码已经达到最大值，去掉数组第一个
          if (layout.layout[1].maxSel !== 0 && _selects[1].length >= layout.layout[1].maxSel) {
            _selects[1].splice(0, 1)
          }
        }
        return true
      } else if (layout.lotteryMethodName.indexOf('same2single') > -1) {
        // 二同号，上下数组不能选一样的
        // 如果已经达到最大值，去掉数组第一个
        if (layout.layout[col].maxSel !== 0 && _selects[col].length >= layout.layout[col].maxSel) {
          _selects[col].splice(0, 1)
        }
        if (col === 0) {
          if (_selects[1].indexOf(inx) > -1) {
            _selects[1].splice(_selects[1].indexOf(inx), 1)
          }
        } else {
          if (_selects[0].indexOf(inx) > -1) {
            _selects[0].splice(_selects[0].indexOf(inx), 1)
          }
        }
        return true
      } else if (layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
        if (_selects.length >= layout.layout[0].maxSel) {
          _selects.splice(0, 1)
        }
        return true
      } else if (layout.lotteryClassName.indexOf('SixMark') > -1 || layout.layout[col].maxSel !== 0) {
        // 如果已经达到最大值，去掉数组第一个
        if (layout.layout.length > 1) {
          if (layout.layout[col].maxSel !== 0 && _selects[col].length >= layout.layout[col].maxSel) {
            _selects[col].splice(0, 1)
          }
        } else {
          if (layout.layout[0].maxSel !== 0 && _selects.length >= layout.layout[0].maxSel) {
            _selects.splice(0, 1)
          }
        }
        return true
      } else {
        return true
      }
    },
    calcAlgorithm: function (layout) {
      const { lotteryClassName, lotteryMethodName } = layout
      const { result } = new ResultCompute(lotteryClassName, lotteryMethodName, this.selectArr)
      this.$parent.paymentNumbers(result)
    },
    // 快捷按钮
    clickAll: function (col, layout) {
      let _row = layout.layout[col]
      if (layout.layout && layout.layout.length > 1) {
        this.selectArr[col].splice(0)
        // for (let i of _row.numbers.split('|')) {
        //   this.selectArr[col].push(i * 1)
        // }
        _row.numbers.split('|').forEach((val, i) => {
          this.selectArr[col].push(i * 1)
        })
      } else {
        this.selectArr.splice(0)
        for (let i of _row.numbers.split('|')) {
          this.selectArr.push(i)
        }
      }
      this.calcAlgorithm(layout)
    },
    clickBig: function (col, layout) {
      let _row = layout.layout[col]
      if (layout.layout && layout.layout.length > 1) {
        this.selectArr[col].splice(0)
        let _ls = _row.numbers.split('|')
        // _ls.splice(0, _ls.length / 2)
        for (let i = parseInt(_ls.length / 2); i < _ls.length; i++) {
          this.selectArr[col].push(i * 1)
        }
      } else {
        this.selectArr.splice(0)
        let _ls = _row.numbers.split('|')
        // _ls.splice(0, _ls.length / 2)
        for (let i = parseInt(_ls.length / 2); i < _ls.length; i++) {
          this.selectArr.push(_ls[i])
        }
      }
      this.calcAlgorithm(layout)
    },
    clickSmall: function (col, layout) {
      let _row = layout.layout[col]
      if (layout.layout && layout.layout.length > 1) {
        this.selectArr[col].splice(0)
        let _ls = _row.numbers.split('|')
        _ls.splice(_ls.length / 2)
        for (let i = 0; i < _ls.length; i++) {
          this.selectArr[col].push(i)
        }
      } else {
        this.selectArr.splice(0)
        let _ls = _row.numbers.split('|')
        _ls.splice(_ls.length / 2)
        for (let i = 0; i < _ls.length; i++) {
          this.selectArr.push(_ls[i])
        }
      }
      this.calcAlgorithm(layout)
    },
    clickOdd: function (col, layout) {
      let _row = layout.layout[col]
      if (layout.layout && layout.layout.length > 1) {
        this.selectArr[col].splice(0)
        let _ls = _row.numbers.split('|')
        for (let i = 0; i < _ls.length; i++) {
          if (_ls[i] % 2 === 1) {
            this.selectArr[col].push(i * 1)
          }
        }
      } else {
        this.selectArr.splice(0)
        let _ls = _row.numbers.split('|')
        for (let i = 0; i < _ls.length; i++) {
          if (_ls[i] % 2 === 1) {
            this.selectArr.push(_ls[i])
          }
        }
      }
      this.calcAlgorithm(layout)
    },
    clickEven: function (col, layout) {
      let _row = layout.layout[col]
      if (layout.layout && layout.layout.length > 1) {
        this.selectArr[col].splice(0)
        let _ls = _row.numbers.split('|')
        for (let i = 0; i < _ls.length; i++) {
          if (_ls[i] % 2 === 0) {
            this.selectArr[col].push(i * 1)
          }
        }
      } else {
        this.selectArr.splice(0)
        let _ls = _row.numbers.split('|')
        for (let i = 0; i < _ls.length; i++) {
          if (_ls[i] % 2 === 0) {
            this.selectArr.push(_ls[i])
          }
        }
      }
      this.calcAlgorithm(layout)
    },
    clickClear: function (col, layout) {
      // let _row = layout.layout[col]
      if (layout.layout && layout.layout.length > 1) {
        this.selectArr[col].splice(0)
      } else {
        this.selectArr.splice(0)
      }
      this.calcAlgorithm(layout)
    },
    randomChoose: function () {
      var supportsVibrate = 'vibrate' in navigator
      if (supportsVibrate) {
        navigator.vibrate(500)
      }
      // 随机 选码 直接从布局中计算出数组
      // 注意，数组是numbers下标，真实投注数要调用父方法realSelect
      let randomNumF = function (min, max) {
        return parseInt(Math.random() * (max - min) + min)
      }
      if (!this.lotteryLayout.lotteryId) {
        return false
      }
      let $layout = this.lotteryLayout
      let _lay = $layout.layout
      let _selects = this.selectArr
      if (_lay.length === 0) return false
      let numArr = []
      let colInx = 0 // 每列的元素索引
      let _iStr = []
      let getDiff = function (len) { // 获取不重复元素
        if (_iStr.length === 0) {
          _iStr = Array.apply(null, Array(len)).map((item, index) => index)
        }
        let _iI = randomNumF(0, _iStr.length - 1)
        colInx = _iStr[_iI]
        _iStr.splice(_iI, 1)
      }
      if ($layout.minSel === 1) {
        // 定位胆
        let rowInx = 0 // 列的索引
        if (_lay.length === 1) {
          _selects.splice(0) // 清空
          numArr = _lay[0].numbers.split('|') // 变字符串为数组
          colInx = randomNumF(0, numArr.length - 1) // 随机取值
          if ($layout.lotteryClassName.indexOf('SevenStar') > -1) {
            let number = $layout.layout[0].numbers.split('|')
            _selects.push(number[colInx]) // 添加新值
          } else {
            _selects.push(colInx) // 添加新值
          }
        } else {
          for (let _r of _selects) {
            _r.splice(0)
          }
          rowInx = randomNumF(0, _lay.length - 1) // 随机行
          numArr = _lay[rowInx].numbers.split('|')
          colInx = randomNumF(0, numArr.length - 1)
          _selects[rowInx].push(colInx)
        }
      } else {
        let _methodName = $layout.lotteryMethodName
        if (_lay.length > 1) {
          // 多维
          for (let _r of _selects) {
            // 清空
            _r.splice(0)
          }
          if (_methodName.indexOf('duplex') > -1) {
            // 胆拖
            let _minSel = $layout.minSel
            // let _iStr = '' // 字符串防重复
            if (_minSel === 0) {
              _minSel = 3
            }
            let danLen = _lay[0].numbers.split('|').length
            let tuoLen = _lay[1].numbers.split('|').length
            colInx = randomNumF(0, danLen - 1)
            _selects[0].push(colInx)
            _iStr += colInx
            for (let i = 0; i < _minSel - 1; i++) {
              getDiff(tuoLen)
              _selects[1].push(colInx)
            }
          } else {
            // 其余，每行数据都不一样
            // let _iStr = '' // 字符串防重复
            for (let rowInx = 0; rowInx < _lay.length; rowInx++) {
              let _row = _lay[rowInx]
              let _rowNums = _row.numbers.split('|')
              let _numLen = _rowNums.length
              getDiff(_numLen)
              _selects[rowInx].push(colInx)
            }
          }
        } else {
          // 一维
          _selects.splice(0)
          let _chooseArr = [] // 只有一个一维数组
          if ($layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
            // 龙虎
            _chooseArr = _lay[0].numbers.replace(/\|/g, ',').split(',')
          } else {
            _chooseArr = _lay[0].numbers.split('|')
          }

          let _len = _chooseArr.length
          let _minSel = _lay[0].minSel

          if (_minSel > 1) {
            // 一般来说，会是每个元素底下都有赔率
            // let _iStr = '' // 字符串防重复
            for (let i = 0; i < _minSel; i++) {
              getDiff(_len)
              // _selects.push(colInx)
              let number = _lay[0].numbers.split('|')
              _selects.push(number[colInx])
            }
          } else if (_minSel !== 0) {
            // 一般来说，是统一赔率
            colInx = randomNumF(0, _len)
            let number = _lay[0].numbers.split('|')
            if ($layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
              _selects.push(colInx)
            } else {
              _selects.push(number[colInx])
            }
          }
        }
      }
      // 计算注数
      this.calcAlgorithm(this.lotteryLayout)
    }
  }
}
</script>

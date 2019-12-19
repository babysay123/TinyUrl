<style lang='scss'>
  @import 'Assets/css/base.color.scss';
  @import 'Assets/css/mix.scss';
  #contentTop {
    // top: calc(1.125rem + 50px) !important;
    z-index: 10;
  }
  .content-top{
    overflow: hidden;
    // position: relative;
    > dl {
      float: left;
      box-sizing: border-box;
      padding: .3rem .2rem;
      text-align: center;
      dt {
        font-size: 13px;
        line-height: .5rem;
      }
      dd {
        font-size: 13px;
        margin-top: .3125rem;
        word-break: break-word;
        line-height: .55rem;
        &.content-time {
          color: #5EADE3;
          letter-spacing: 1px;
        }
        img {
          width: 20px;
          height: 20px;
          line-height: 20px;
          margin-right: 5px;
          vertical-align: top;
        }
        span {
          margin-left: 0;
          vertical-align: top;
          font-size: 12px;
        }
        .block-sm {
          display: inline-block;
          margin-right: 5px;
          margin-bottom: 5px;
        }
        .ball-sm {
          margin-right: 5px;
          float: none!important;
          display: inline-block;
        }
      }
    }
    .content-top-left {
      width: 50%;
    }
    .content-top-right {
      width: 50%;
    }
  }
  .content-expand {
    position: relative;
    .expand-shake {
      overflow: hidden;
      position: relative;
      .shake-tips {
        font-size: 12px;
        margin-left: 0.3125rem;
        height: 1.125rem;
        line-height: 1.125rem;
      }
      a {
        display: block;
        height: 0.875rem;
        line-height: 0.875rem;
        width: 2.75rem;
        margin: 0.125rem 0.3125rem;
      }
      .shake-right {
        float: right;
        // background: url('/mobile/img/lottery/Lotter_ rock.png') no-repeat center;
        background: url('/mobile/studio/img/lottery/Lotter_ rock.png') no-repeat center;
        background-size: contain;
      }
      .goback {
        @include rounded-corners(10px);
        float: right;
        // display: none;
        font-size: 12px;
        text-align: center;
        color: #999;
        background: #fff;
        // -moz-border-radius: 10px;
        // -webkit-border-radius: 10px;
        // border-radius: 10px;
        // -moz-appearance: none;
        // -webkit-appearance : none;
        line-height: 0.625rem;
        height: 0.625rem;
        width: 3.125rem;
        margin: 0.25rem 0.3125rem;
        margin-left: 0;
        position: relative;
        &:after {
          content:'';
          @include rounded-corners(50%);
          background: #FF0000;
          display: block;
          width: 15px;
          line-height: 15px;
          border: none;
          // -moz-border-radius: 50%;
          // -webkit-border-radius: 50%;
          // border-radius: 50%;
          // -moz-appearance: none;
          // -webkit-appearance : none;
          height: 15px;
          position: absolute;
          color: #fff;
          top: -6px;
          right: -8px;
        }
      }
      .expand-addTo {
        position: fixed;
        bottom: 1.125rem;
        width: 100%;
        max-width: 780px;
        margin: 0 auto;
        overflow: hidden;
        border-top: 1px solid #ddd;
        h5 {
          font-weight: 200;
          font-size: 12px;
          line-height: 1.125rem;
          height: 1.125rem;
          display: inline-block;
          padding: 0 10px;
        }
      }
      .addTo-control {
        overflow: hidden;
        float: right;
        line-height: 1.125rem;
        height: 1.125rem;
        margin-right: 10px;
        span {
          float: left;
          font-size: 12px;
        }
        .addPanel {
          overflow: hidden;
          margin: 0.125rem 6px;
          float: left;
          li {
            float: left;
            text-align: center;
            line-height: 0.8125rem;//0.875rem
            border: 1px solid #ddd;
            padding: 0 8px;
            box-sizing: border-box;
            &.add {
              border-left: none;
              cursor: pointer;
              color: #999;
              width: 0.8125rem;
              padding:0;
            }
            &.reduce {
              border-right: none;
              cursor: pointer;
              color: #999;
              width: 0.8125rem;
              padding:0;
            }
            &.panel {
              width: 0.8125rem;
              font-size: 14px;
              border: none;
              line-height: 0.8125rem;
              text-align: center;
              vertical-align: top;
            }
          }
        }
      }
    }
  }
.content-top-left .fa-angle-down:before{ color:#BFBFBF; font-size:16px; }
</style>

<template>
  <section id='contentTop' class='content-top lottery-fixed' :style="topGapChange()">
    <dl class='content-top-left' @click="showAwards">
      <dt>
        {{lotteryMs.lastIssue ? '第' + lotteryMs.lastIssue + '期' : '第 - 期'}}
        <i class="fa fa-fw fa-angle-down"></i>
      </dt>
      <dd ref="contentDD" v-html="getNumberStr(lotteryMs.lastLuckyNumbers, lotteryMs.lotteryClassName) || '-'">
        <!-- <span class='text-red'>3</span><span class='text-gray'>+</span><span class='text-red'>6</span><span class='text-gray'>+</span><span class='text-red'>1</span><span class='text-gray'>=</span><span class='text-green'>10</span> -->
      </dd>
    </dl>
    <dl class='content-top-right'>
      <dt>{{lotteryMs.currentIssue ? '下一期 ' + lotteryMs.currentIssue + ' 还有' : lotteryMs.indexDesc ? lotteryMs.indexDesc : '下一期 - 还有'}}</dt>
      <dd class='content-time' id='reTime'>加载中...</dd>
    </dl>
    <div class='clearfix'></div>
    <div class='content-expand bg-whole'>
      <div class='expand-shake'>
        <span class='shake-tips'>{{odds ? '赔率：' + odds : ''}}</span>
        <a class='goback' v-show="showGoback" href='javascript:void(0);' @click='goResult'><i class='fa fa-mail-forward'></i>返回购彩清单</a>
        <a class='shake-right' href='javascript:void(0);' @click="doShake()"></a>
      </div>
    </div>
    <BettingReissue
      :popup-reissue="popupReissue"
    ></BettingReissue>
    <!--  -->
    <!-- <BettingAward
      ref="popAward"
      @paletteClose = "paletteClose"
    ></BettingAward> -->
  </section>
</template>

<script>
// 引用颜色数组方法
import oriColorTool from './module/oriColorTool'
import BettingReissue from './module/betting-reissue'
// 开奖列表
import BettingAward from 'Components/lottery/betting/module/betting-awards'
import { ZodiacParser, LuckParser } from 'Plugins/gameParser'
export default {
  name: 'betting-top',
  props: ['lotteryMsg', 'colorArr', 'lotteryId', 'odds'],
  data () {
    return {
      dateMsg: '加载中...',
      prizeNumber: '',
      showGoback: false,
      // Interval: null,
      timer: null,
      // TimeOut: null,
      popupReissue: false,
      payments: [],
      lotteryMs: this.lotteryMsg // 引用父组件传过来的lotteryMsg
    }
  },
  watch: {
    'lotteryId': function (val) {
      clearInterval(this.timer)
      this.timer = null
      this.hasList()
      // 重置倒计时
      // this.clearTimeOut()
      // this.clearInterval()
      this.recallTime(this.lotteryId)
    },
    '$store.state.payments': function (arr) {
      // this.hasList()
      if (arr.length === 0) {
        this.payments = []
        this.showGoback = false
      }
    },
    '$store.state.ChatRoomOpenStatus': function (val) {
      // 根据状态的变化改变顶部边距，有点操作dom
      // if (val === 'open') {
      //   document.getElementById('contentTop').style.top = 'calc(1.125rem + 45px)'
      // } else {
      //   document.getElementById('contentTop').style.top = '1.125rem'
      // }
      this.topGapChange()
      // 刷新main的偏移高度
      this.resizeGap()
    },
    // '$store.state.Lottery.lotteryLayout': function (val) {
    //   // 设置新的开奖栏
    //   this.$refs.popAward.setAwardsCol(val)
    // },
    'lotteryMsg': {
      deep: true,
      handler: function (a, b) {
        let _content = document.getElementById('lotteryContent')
        let _top = document.getElementById('contentTop')
        let _offsetTop = _top.offsetTop + _top.offsetHeight
        _content.style.marginTop = _offsetTop + 'px'
      }
    },
    // '$store.state.Lottery.lotteryMsg': function (val) {
    //   // console.log('see when change lottery message')
    //   // console.log(val)
    //   if (val.lotteryId && val.lotteryId > 0) {
    //     // 如果lottery 信息修改，则重新获取一次开奖列表
    //     this.$refs.popAward.updateAwards()
    //   }
    // },
    'dateMsg': function (val) {
      // console.log(val)
      document.getElementById('reTime').innerHTML = val
    }
  },
  beforeDestroy () {
    console.log('结束计时器')
    clearInterval(this.timer)
    this.timer = null
    // this.clearTimeOut()
    // this.clearInterval()
  },
  methods: {
    // 倒计时
    paletteClose (val) {
      this.$emit('bettingPaletteClose', val)
    },
    newTimes (maxtime) {
      let checkTime = (i) => {
        if (i < 10) {
          i = '0' + i
        }
        return i
      }
      let dd = parseInt(maxtime / 60 / 60 / 24, 10)
      let hh = parseInt(maxtime / 60 / 60 % 24, 10) // 计算剩余的小时数
      let mm = parseInt(maxtime / 60 % 60, 10) // 计算剩余的分钟数
      let ss = parseInt(maxtime % 60, 10) // 计算剩余的秒数

      hh = checkTime(hh + 24 * dd)
      mm = checkTime(mm)
      ss = checkTime(ss)
      return hh + ':' + mm + ':' + ss
    },
    commonTimer (start, end, fn, callback) {
      clearInterval(this.timer)
      let maxtime = (new Date(start) - new Date(end)) / 1000 // 剩余秒
      // fn(msg, { h: hh, m: mm, s: ss })
      this.timer = setInterval(() => {
        this.dateMsg = this.newTimes(Math.ceil(--maxtime))
        if (Number(maxtime) <= 1) {
          clearInterval(this.timer)
          fn()
        }
      }, 1000)
      // let timers = () => {
      //   if (maxtime >= 0) {
      //     let dd = parseInt(maxtime / 60 / 60 / 24, 10)
      //     let hh = parseInt(maxtime / 60 / 60 % 24, 10) // 计算剩余的小时数
      //     let mm = parseInt(maxtime / 60 % 60, 10) // 计算剩余的分钟数
      //     let ss = parseInt(maxtime % 60, 10) // 计算剩余的秒数
      //
      //     hh = checkTime(hh + 24 * dd)
      //     mm = checkTime(mm)
      //     ss = checkTime(ss)
      //     let msg = hh + ':' + mm + ':' + ss
      //     fn(msg, { h: hh, m: mm, s: ss })
      //     --maxtime
      //     this.TimeOut = setTimeout(function () {
      //       timers()
      //     }, 1000)
      //   } else {
      //     fn('over')
      //   }
      // }
      // this.TimeOut = setTimeout(function () {
      //   timers()
      // }, 1000)
      if (typeof callback === 'function') {
        callback()
      }
    },
    // 倒计时结束重新请求
    recallTime (lotteryId) {
      let _ts = this
      this.doRecall(lotteryId, (res) => {
        if (res.code === 0) {
          let _data = res.data
          let _sys = res.system_time
          // let _dead = _data.deadline
          // let _lotteryId = _data.lotteryId
          _ts.lotteryMs = _data
          let lastNums = _ts.$refs.contentDD
          //
          let { currentIssue, deadline, lotteryId, lastLuckyNumbers, lotteryClassName } = _data
          lastNums.innerHTML = _ts.getNumberStr(lastLuckyNumbers, lotteryClassName)
          // console.log(_ts.lotteryMs)
          if (currentIssue === '停盘中...') {
            _ts.dateMsg = '请晚些时间刷新...'
            return false
          }
          if (lastLuckyNumbers.indexOf('正在开奖') > -1) {
            setTimeout(() => {
              _ts.recallTime(lotteryId)
            }, 3000)
          }

          // 倒计时
          _ts.commonTimer(deadline, _sys, () => {
            _ts.recallTime(lotteryId)
            let _paymentArr = _ts.$store.getters.getPayments
            if (_paymentArr && _paymentArr.length > 0) {
              _ts.popupReissue = true // 触发子组件弹出倒计时
            }
            // if (msg !== 'over') {
            //   _ts.dateMsg = msg
            // } else {
            //   // 重新请求
            //   _ts.recallTime(_lotteryId)
            //   // 如果有paymenys，则弹出提示，并倒计时，然后更新paymenys的数据
            //   let _paymentArr = _ts.$store.getters.getPayments
            //   if (_paymentArr && _paymentArr.length > 0) {
            //     _ts.popupReissue = true // 触发子组件弹出倒计时
            //   }
            // }
          })
        }
      })
    },
    resizeGap () {
      let _content = document.getElementById('lotteryContent')
      let _top = document.getElementById('contentTop')
      let _offsetTop = _top.offsetTop + _top.offsetHeight
      _content.style.marginTop = _offsetTop + 'px'
    },
    topGapChange () {
      // top: 1.125rem
      let _status = this.$store.state.ChatRoomOpenStatus
      if (_status === 'open') {
        return {
          top: 'calc(1.125rem + 41px)'
        }
      } else {
        return {
          top: '1.125rem'
        }
      }
    },
    // 开奖列表
    showAwards () {
      if (typeof this.$parent.toggleAwards === 'function') {
        this.$parent.toggleAwards()
      }
      // if (this.$refs.popAward.popAwardList) {
      //   this.$refs.popAward.popAwardList = false
      //   this.$emit('bettingPaletteClose', false)
      // } else {
      //   this.$refs.popAward.popAwardList = true
      //   this.$emit('bettingPaletteClose', true)
      // }
    },
    changeReissue (val) {
      // 如果有betting-reissue，则此方法必须 important
      this.popupReissue = val
    },
    doRecall (id, fn) {
      let _ts = this
      this.dateMsg = '加载中...'
      let _drawUrl = '/front/lottery/draw_info.do'
      this.axios.postFast(_drawUrl, {
        'lotteryId': this.lotteryId
      }).then(function (res) {
        if (res.code === 0) {
          document.title = res.data.name
          _ts.$store.dispatch('LotteryDetail', res.data) // 用vuex处理数据
          _ts.lotteryMs.lastLuckyNumbers = res.data.lastLuckyNumbers
          _ts.lotteryMs.currentIssue = res.data.currentIssue
          _ts.lotteryMs.lastIssue = res.data.lastIssue
          // console.log(_ts.lotteryMsg)
          // 改变data到vuex
          // _ts.$store.dispatch('LotteryDetail', _ts.lotteryMs)
          // _ts.$refs.popAward.updateAwards()
          _ts.$parent.updateAwards()
          if (typeof fn === 'function') {
            fn(res)
          }
        } else {
          // console.log('请求失败')
          console.log(res.msg)
        }
      }).catch(() => {
      })
    },
    getNumberStr (numbers, className) {
      // console.log(numbers, className)
      // 开奖号码布局
      oriColorTool.ColorArr = this.colorArr
      // console.log(this.colorArr)
      // TODO: 六合彩还有很多颜色bug的记得回来补充
      let str = ''
      if (!numbers || !className || numbers.length === 0 || className.length === 0) {
        return ''
      }
      // console.log(numbers + '    ' + className)
      if (numbers.match('正在开奖')) {
        str = `<span class='text-red'>${numbers}</span>`
      } else {
        if (className.indexOf('SixMark') > -1) {
          const numArr = numbers.split(',')
          numArr.slice(0, 6).forEach(e => {
            const { color } = ZodiacParser(+e)
            str += `<span class="ball-sm bg-${color}">${e}</span>`
          })
          str += '<span class="ball-sm" style="color: #000">+</span>'
          const { color, zodiac } = ZodiacParser(numArr[6])
          str += `<span>
            <span class="ball-sm bg-${color}">${numArr[6]}</span>
            <span class="text-${color}">(${zodiac})</span>
          </span>`
          // 六合彩类
          // let numStr = ''
          // let colorStr = 'gray'
          // // console.log('六合彩数组')
          // // console.log(numArr)
          // for (let i = 0; i < numArr.length; i++) {
          //   let n = numArr[i]
          //   // let _color = ''
          //   let _color = oriColorTool.sixNumToColor(n)
          //   if (_color.indexOf('Red') > -1) {
          //     colorStr = 'red'
          //   } else if (_color.indexOf('Blue') > -1) {
          //     colorStr = 'blue'
          //   } else if (_color.indexOf('Green') > -1) {
          //     colorStr = 'green'
          //   } else if (_color.indexOf('Gray') > -1) {
          //     colorStr = 'gray'
          //   }
          //   if (i === numArr.length - 1) {
          //     numStr += `<span class='text-gray'>+</span><span class='text-${colorStr}'>${n}</span>`
          //   } else {
          //     numStr += `<span class='text-${colorStr}'>${n} </span>`
          //   }
          // }
          // // str = `<p class='list-lotteryNumbers'>${numStr}</p>`
          // str = numStr
        } else if (className.indexOf('Eggs') > -1 || className.indexOf('Luck') > -1) {
          const numArr = numbers.split(',')
          numArr.forEach((e, i) => {
            str += `<span class="ball-sm bg-red">${e}</span>`
            str += `<span class="text-gray" style="margin-right: 5px;">${i < 2 ? '+' : '='}</span>`
          })
          const sum = numArr.reduce((a, b) => +a + +b)
          str += `<span class="ball-sm bg-${LuckParser(sum).color}">${sum}</span>`
          // pc蛋蛋，幸运28
          // let numArr = numbers.split(',')
          // let numStr = ''
          // let sum = 0
          // let colorStr = 'gray'
          // for (let inx = 0; inx < numArr.length; inx++) {
          //   let n = numArr[inx]
          //   sum += parseInt(n)
          //   numStr += `<span class='text-red'>${n}</span>`
          //   if (inx !== numArr.length - 1) {
          //     numStr += `<span class='text-gray'>+</span>`
          //   }
          // }
          // if (sum > 0) {
          //   let _color = oriColorTool.pcSumToColor(sum)
          //   // let _color = ''
          //   if (_color.indexOf('Red') > -1) {
          //     colorStr = 'red'
          //   } else if (_color.indexOf('Blue') > -1) {
          //     colorStr = 'blue'
          //   } else if (_color.indexOf('Green') > -1) {
          //     colorStr = 'green'
          //   } else if (_color.indexOf('Gray') > -1) {
          //     colorStr = 'gray'
          //   }
          // } else {
          //   // console.log('和值计算错误')
          //   return '' // 和值错了
          // }
          // numStr += `<span class='text-gray'>=</span><span class='text-${colorStr}'>${sum}</span>`
          // // str = `<p class='list-lotteryNumbers'>${numStr}</p>`
          // str = numStr
        } else if (className.indexOf('QuickThree') > -1) {
          // console.log(numbers)
          let numArr = numbers.split(',')
          let numStr = ''
          let sum = 0
          for (let n of numArr) {
            sum += parseInt(n)
            numStr += `<img src='/mobile/images/bet/SSC_dice${n}.png' />`
          }
          numStr += `<span class='text-gray'>和值:${sum}</span>`
          // <br>
          str = numStr
        } else if (className.indexOf('PK10') > -1) {
          numbers.split(',').forEach(e => {
            str += `<span class="block-bg-${e - 1} block-sm">${e}</span>`
          })
        } else if (
          className.indexOf('Frequent') > -1 ||
          className.indexOf('ElevenPickFive') > -1 ||
          className.indexOf('ArrangeThree') > -1 ||
          className.indexOf('ThreeD') > -1
        ) {
          numbers.split(',').forEach(e => {
            str += `<div class="ball-sm bg-red">${e}</div>`
          })
        } else if (className.indexOf('ThreeMinuteSevenStar') > -1 || className.indexOf('FiveMinuteSevenStar') > -1 || className.indexOf('OneMinuteSevenStar') > -1) {
          // 七星彩开奖号码
          numbers.split(',').forEach(e => {
            str += `<span class="ball-sm bg-red">${e}</span>`
          })
        } else {
          // str = `<span class='text-red list-lotteryNumbers'>${numbers.split(',').join(' ')}</span>`
          str = `<span class='text-red'>${numbers.split(',').join(' ')}</span>`
        }
      }
      // 更新lotteryContent的距离
      // let _content = document.getElementById('lotteryContent')
      // let _top = document.getElementById('contentTop')
      // let _offsetTop = _top.offsetTop + _top.offsetHeight
      // _content.style.marginTop = _offsetTop + 'px'
      return str
    },
    doShake () {
      // this.$emit('randomChoose', 'oo aa ls')
      this.$parent.toShake()
    },
    hasList () {
      // 判断有没有payments
      this.payments = this.$store.getters.getPayments
      if (this.payments && this.payments.length > 0) {
        this.showGoback = true
        let pl = 0
        if (this.payments.length <= 9) {
          pl = this.payments.length
        } else {
          pl = '9+'
        }
        // 更新head的style
        let nod = document.createElement('style')
        let s = '.content-expand .expand-shake .goback:after{ content:"' + pl + '"; }'
        nod.type = 'text/css'
        if (nod.styleSheet) { // ie下
          nod.styleSheet.cssText = s
        } else {
          nod.innerHTML = s // 或者写成 nod.appendChild(document.createTextNode(str))
        }
        document.getElementsByTagName('head')[0].appendChild(nod)
      } else {
        this.showGoback = false
      }
    },
    goResult () {
      this.$router.push({
        path: '/lotteryResult',
        query: {
          lotteryId: this.$store.state.Lottery.lotteryId
        }
      })
    }
  },
  components: {
    BettingAward,
    BettingReissue
  },
  updated () {
    // 更新lotteryContent的距离
    // let _content = document.getElementById('lotteryContent')
    // let _top = document.getElementById('contentTop')
    // let _offsetTop = _top.offsetTop + _top.offsetHeight
    // _content.style.marginTop = _offsetTop + 'px'
    this.resizeGap()
  },
  mounted () {
    // let _ts = this
    this.hasList()
    this.recallTime(this.lotteryId)
    // // 没15s重新获取一次开奖信息 let run = '计时器'
    // let run = setInterval(function () {
    // }, 15 * 1000)
    // // 暂定30分钟结束
    // setTimeout(function () {
    //   clearInterval(run)
    // }, 30 * 60 * 1000)
    // console.log(this.showGoback)
  }
}
</script>

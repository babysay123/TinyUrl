<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.betting-content {
  position: relative;
  overflow: hidden;
  // margin-top: calc(1.125rem + 50px);
}
.gap-footer-addPanel {
  margin-bottom: 2.25rem;
}
</style>
<style lang="scss">
// .mint-cell-wrapper {
//   font-size: 13px !important;
//   padding: 0;
//   text-align: center;
//   // .mint-cell-text {
//   //   padding-left: 10px;
//   // }
//   .mint-cell-title {
//     width: 40%;
//   }
//   .mint-cell-value {
//     width: 60%;
//   }
//   p {
//     img {
//       width: 20px;
//       height: 20px;
//       line-height: 20px;
//       margin-right: 5px;
//       vertical-align: top;
//       &:first-child {
//         margin-left: 25px;
//       }
//     }
//     span {
//       line-height: 20px;
//       vertical-align: top;
//     }
//   }
// }
.mint-palette-button {
  &.pb {
    position: fixed;
    right: 1rem;
    bottom: 2.25rem;
    display: block;
    width: 44px;
    height: 44px;
    line-height: 40px;
    // font-size: 0.375rem;
    color:#fff;
    background-color: #26a2ff;
    // p {
    //   line-height: 0.5rem;
    //   padding: 0.1875rem 0.1875rem;
    // }
  }
  .mint-main-button {
    background: none;
    // font-size: 0.375rem;
    font-size: 32px;
    font-weight: 100;
  }
}
</style>

<template>
  <section id="lotteryContent" class="lottery-tabs-gap betting-content">
    <AllPop :popShow='popShow' :content='content' :cancel='cancel' :img='img' @child3='clean' :topnum='topnum'></AllPop>
    <!-- <AllPop :claeanshow='claeanshow' :cleancon='cleancon' cancel1='cancel1'></AllPop> -->
    <BettingHead
      ref="betHead"
      :lottery-id="lotteryId"
      :lottery-msg="lotteryMsg"
      :color-arr="ballSetColorDic"
      :odds="odds"
      @bettingPaletteClose="bettingPaletteClose"
    ></BettingHead>
    <BettingMain
      ref="betMain"
      :lottery-id="lotteryId"
      :lottery-layout="lotteryLayout"
      :play-way-arr="playWayArr"
      :color-arr="ballSetColorDic"
      :share-code="shareCode"
      :is-login="isLogin"
    ></BettingMain>
    <BettingFoot
      ref="betFoot"
      :size="payment.size"
      :sum="payment.size ? ( payment.size * ( payment.unitFee || 0 ) / 100 ).toFixed(2) : '0.00'"
      :is-login="isLogin"
      @childFn="popshow"
    ></BettingFoot>
    <BettingPop
      ref="betPop"
      :lottery-layout="lotteryLayout"
      :payment="payment"
      :is-login="isLogin"
      :max-odds="maxOdds"
    ></BettingPop>
    <!--  -->
    <BettingAward
      ref="popAward"
      @paletteClose = "bettingPaletteClose"
    ></BettingAward>
    <!-- 悬浮按钮 -->
    <BettingPalette
      v-show="lotteryLayout.lotteryId && bettingPalette"
    ></BettingPalette>
  </section>
</template>

<script>
import BettingHead from 'Components/lottery/betting/betting-top' // 头部组件
import BettingMain from 'Components/lottery/betting/betting-main' // 投注组件
import BettingFoot from 'Components/lottery/betting/betting-foot' // 底部组件
import BettingPop from 'Components/lottery/betting/module/betting-pop'// 弹框组件
import AllPop from 'Components/allpop'
// 开奖列表
import BettingAward from 'Components/lottery/betting/module/betting-awards'
// 悬浮按钮
import BettingPalette from 'Components/lottery/betting/module/betting-palette'
import { ChangeThreeDecimal, ToastMsg } from './module/tools'
export default {
  name: 'betting',
  data () {
    return {
      topnum: '93px',
      cleancon: '是否清空注单？',
      claeanshow: false,
      img: '../../assets/images/hint.png',
      cancel: '',
      popShow: false,
      content: '请选择投注',
      bettingPalette: true,
      lotteryId: null,
      lotteryLayout: {}, // 当前彩种布局
      playWayArr: [], // 玩法数组 全数据
      lotteryMsg: {}, // 彩种信息
      shareCode: 0,
      isLogin: false,
      ballSetColorDic: [],
      // 初设投注参数
      betDict: {
      },
      realNumArr: [], // 真实投注数组
      odds: '', // 计算之后的赔率，统一赔率
      maxOdds: 10, // 单独赔率，最大赔率
      payment: {
        issue: '',
        numbers: '', // 真实投注数组后的字符串
        playId: '',
        unitFee: '',
        rebate: 0,
        size: 0, // 投注数，后台会算
        title: '',
        odds: ''
        // layout: '' // 每个投注记录保存投注布局，为了弹出详情时得出相应的数据
        // layout: '' // 每个投注记录保存投注布局，为了弹出详情时得出相应的数据
      },
      unitSave: null // 单注金额记录
    }
  },
  components: {
    BettingHead,
    BettingMain,
    BettingFoot,
    BettingPop,
    BettingAward,
    BettingPalette,
    AllPop
  },
  watch: {
    // 'payment': {
    //   handler () {
    //     console.log(this.payment)
    //   },
    //   deep: true
    // },
    '$store.state.Lottery.lotteryId': function (val) {
      this.lotteryId = val
      // 切换彩种，切换彩种id，清空已选择的payments
      // this.dataLottery()
      this.$store.dispatch('removePayments', 'clear')
    },
    // '$route': function (to, from) {
    //   console.log(to)
    //   console.log('betting vue')
    // },
    // '$store.state.Lottery.playWayArr': function (val) {
    //   this.playWayArr = val
    //   console.log(this.playWayArr)
    // },
    '$store.state.Lottery.lotteryMsg': {
      deep: true,
      handler: function (a, b) {
        this.lotteryMsg = a
        // console.log('betting vue let me see when change lottery message')
        // console.log(this.lotteryMsg)
      }
    },
    // 'lotteryMsg': {
    //   deep: true,
    //   handler: function (a, b) {
    //     console.log(a)
    //     console.log(b)
    //     console.log(a.currentIssue !== b.currentIssue)
    //     if ((a.lotteryId && a.lotteryId > 0) && (a.currentIssue !== b.currentIssue)) {
    //       // 如果lottery 信息修改，则重新获取一次开奖列表
    //       this.$refs.popAward.updateAwards()
    //     }
    //     // console.log('a is ' + a)
    //     // console.log(a)
    //   }
    // },
    // '$store.state.UserInfo': function (val) {
    //   // console.log('user info change ' + val)
    // },
    '$store.state.Lottery.lotteryLayout': function (val) {
      this.lotteryLayout = val
      // console.log('设置当前彩种返点')
      // 设置新的开奖栏
      this.$refs.popAward.setAwardsCol(val)
      // 设置当前彩种返点
      this.setShareCode()
    },
    '$store.state.shareCode': function (val) {
      this.shareCode = val
      // console.log('share code 有变化？ ' + this.shareCode)
    }
    // 'maxOdds': function (val) {
    //   console.log('max odds ' + val)
    // }
  },
  methods: {
    clean () {
      this.cleanshow = true
    },
    popshow (data) {
      console.log('tag', 111)
      this.popShow = !this.popShow
    },
    bettingPaletteClose (data) {
      this.bettingPalette = !data
    },
    setShareCode () {
      let u = this.Utils.Storage.get('user')
      // let _lottery = this.lotteryLayout
      let { lotteryClassName, lotteryId } = this.lotteryLayout
      if (u && lotteryId && u.shareCodes && u.shareCodes.length > 0) {
        let res = 0
        let { shareCodes } = u
        for (let i = 0; i < shareCodes.length; i++) {
          let e = shareCodes[i]
          if (lotteryClassName.indexOf('ThreeMinute') > -1) {
            lotteryClassName = lotteryClassName.replace('ThreeMinute', '')
          }
          if (lotteryClassName.indexOf(e.lotteryClassName) > -1) {
            res = e.share
            break
          }
          if ((lotteryClassName.indexOf('FrequentHappy') > -1 || lotteryClassName.indexOf('ArrangeThree') > -1 || lotteryClassName.indexOf('ThreeD') > -1) && e.lotteryClassName === 'Three') {
            res = e.share
            break
          }
          if (lotteryClassName.indexOf('Luck') > -1 && e.lotteryClassName === 'PCEggs') {
            res = e.share
            break
          }
        }
        this.shareCode = res
        // return res
      } else {
        this.shareCode = 0
        // return 0
      }
      this.$store.dispatch('ShareCodeUpdate', this.shareCode)
      return this.shareCode
    },
    checkLogin () {
      let u = this.Utils.Storage.get('user')
      let sid = this.Utils.Storage.get('sessionid')
      if (!u || !sid || u === undefined || u === null || !u.account) {
        this.isLogin = false
      } else {
        this.isLogin = true
      }
    },
    updateOdds (odds) {
      if (this.isLogin) {
        this.odds = odds
      }
    },
    // 计算实际赔率
    calcRealPrize: function (dict) {
      // dict = dict * 1
      let number = 0
      number = (dict.maxPrize * 1000 - dict.minPrize * 1000) / 9 * dict.shareCode * 1 + dict.minPrize * 1000
      if (number < -1) {
        return ChangeThreeDecimal(-1 * (Math.floor(-1 * number) / 1000))
      } else {
        return ChangeThreeDecimal(Math.floor(number) / 1000)
      }
    },
    realSelect (arr) {
      // 从索引数组中获取应有的numbers
      this.realNumArr = []
      let _selectArr = this.$refs.betMain.selectArr // 直接取值有点耦合，后面想办法改进吧
      let _realArr = this.realNumArr
      let $layout = this.lotteryLayout
      let _lay = $layout.layout
      if (!$layout || !$layout.lotteryId) {
        return false
      }
      $layout.layout.forEach((row, col) => {
        // console.log(row + '  ' + col)
        let _numArr = []
        if ($layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
          _numArr = row.numbers.replace(/\|/g, ',').split(',')
        } else {
          _numArr = row.numbers.split('|') // 字符串数组，注意num类型
        }
        if ($layout.layout.length > 1) {
          let _cache = []
          _selectArr[col].sort(function (a, b) { return a - b })
          // 遍历selectArr根据索引填值
          for (let n of _selectArr[col]) {
            _cache.push(_numArr[n])
          }
          _realArr.push(_cache)
        } else {
          _selectArr.sort(function (a, b) { return a - b })
          // 遍历selectArr根据索引填值
          _selectArr.forEach((n, inx) => {
            // 龙虎，则需要前一项或者后一项进行vs
            if ($layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
              if (n % 2 === 0) {
                _realArr.push(_numArr[n] + 'vs' + _numArr[n + 1])
              } else {
                _realArr.push(_numArr[n] + 'vs' + _numArr[n - 1])
              }
            } else {
              // _realArr.push(_numArr[n])
              _realArr.push(n)
            }
          })
        }
      })
      // 获取最大赔率
      if (_lay[0].maxPrizes) {
        let _maxOdds = 0
        for (let x = 0; x < _lay.length; x++) {
          let _item = _lay[x]
          let _minArr = _item.prizes.split('|')
          let _maxArr = _item.maxPrizes.split('|')
          let _number = _item.numbers.split('|')
          let _odds = 0
          // _selects[x]
          if (_lay.length > 1) {
            for (let n of _selectArr[x]) {
              _odds = this.calcRealPrize({
                minPrize: _minArr[n],
                maxPrize: _maxArr[n],
                shareCode: this.shareCode
              })
              if (_maxOdds * 1 < _odds * 1) {
                _maxOdds = _odds
              }
            }
          } else {
            for (let n of _selectArr) {
              _odds = this.calcRealPrize({
                minPrize: _minArr[_number.indexOf(n)],
                maxPrize: _maxArr[_number.indexOf(n)],
                shareCode: this.shareCode
              })
              if (_maxOdds * 1 < _odds * 1) {
                _maxOdds = _odds
              }
            }
          }
        }
        this.maxOdds = _maxOdds
        // this.$parent.updateOdds(_maxOdds)
      } else {
        this.maxOdds = this.odds
      }
      // console.log(_realArr)
      return _realArr
    },
    paymentNumbers (num) {
      this.payment.size = num
    },
    popSubmit (inputFee) { // 弹出层的提交
      // console.log(this.payment)
      // 检验是否为最新一期，再往下走
      if (this.payment.issue !== this.lotteryMsg.currentIssue) {
        this.payment.issue = this.lotteryMsg.currentIssue
      }
      // 先获取已有的，再更新数据
      let _paymentArr = this.$store.getters.getPayments
      _paymentArr.unshift(this.payment) // 从投注列表的头部添加一条
      // 保存投注的单注金额，下次投注时作为初始值
      this.unitSave.save(this.payment.unitFee) // TODO: 这有个bug

      // 把payment存到vuex里，转到result
      this.$store.dispatch('updatePayments', _paymentArr)
      this.$router.push({
        path: '/lotteryResult',
        query: {
          lotteryId: this.$store.state.Lottery.lotteryId
        }
      })
    },
    bettingPop () { // 底部提交
      // 已验证登录，传值到bettingpop
      // 更新payment，然后传进pop
      let _realArr = this.realSelect() // 计算选中数组的真实投注值
      let _payment = this.payment // 获取上一次投注成功后的单注金额。没有则清空
      // _payment.unitFee = this.unitSave.get() || _payment.unitFee
      let $layout = this.lotteryLayout
      let $layoutMsg = this.lotteryMsg
      if (!_realArr || _realArr.length === 0) {
        ToastMsg('亲，请选择投注哦')
        return false
      }
      if ($layout.layout.length > 1) {
        for (let col = 0; col < _realArr.length; col++) {
          if (_realArr[col].length === 0) {
            _realArr[col] = '-'
          } else {
            _realArr[col] = _realArr[col].join('|')
          }
        }
        _payment.numbers = _realArr.join(',')
      } else {
        _payment.numbers = _realArr.join(',')
      }
      // console.log(_payment.numbers)
      _payment.issue = $layoutMsg.currentIssue // 最新一期
      _payment.title = this.$store.state.Lottery.lotteryTitle // 从vuex里获取标题字符串
      // _payment.layout = $layout
      _payment.playId = $layout.playId
      if (this.lotteryLayout.minPrize !== 0 && !this.lotteryLayout.layout[0].maxPrizes) {
        _payment.odds = this.odds
      } else {
        _payment.odds = this.maxOdds
      }
      // this.$children[3].togglePop()

      this.$refs.betPop.togglePop()
    },
    // 父级中转，暂不加入vuex，不是多父组件公用
    toShake () {
      // 作为中转，要优化一下
      // this.$children[1].randomChoose()
      this.$refs.betMain.randomChoose()
    },
    clearSelect () {
      // 清空选择 作为中转
      for (let col = 0; col < this.lotteryLayout.layout.length; col++) {
        // this.$children[1].clickClear(col, this.lotteryLayout)
        this.$refs.betMain.clickClear(col, this.lotteryLayout)
      }
    },
    dataLottery () {
      let _ts = this
      // 获取当前彩种信息
      this.axios.post('/front/lottery/draw_info.do', {
        'lotteryId': this.lotteryId
      })
        .then(function (res) {
          if (res.code === 0) {
            // console.log(res.data)
            document.title = res.data.name
            _ts.$store.dispatch('LotteryDetail', res.data) // 用vuex处理数据

            // 获取数据，其实数据已变化兼绑定
            // console.log(_ts.$store.state.Lottery.lotteryMsg)
            _ts.lotteryMsg = _ts.$store.state.Lottery.lotteryMsg
          }
        })
        .catch(() => {})
      // let Lottery = _ts.$store.state.Lottery
      // _ts.playWayArr = Lottery.playWayArr
      // _ts.lotteryLayout = Lottery.lotteryLayout
      // 获取玩法列表
      this.axios.postOnce('/front/lottery/lottery_group.do', {
        'lotteryId': this.lotteryId
      })
        .then(function (res) {
          if (res.code === 0) {
            _ts.$store.dispatch('LotteryPage', res.data) // 用vuex处理数据
            // 获取vuex数据，其实数据已变化兼绑定
            let Lottery = _ts.$store.state.Lottery
            if (!Lottery.playWayArr || Lottery.playWayArr.length === 0 || !Lottery.lotteryLayout || !Lottery.lotteryLayout.lotteryId) {
              // ToastMsg('没找到该彩种，请返回重试')
              // return false
            }
            _ts.playWayArr = Lottery.playWayArr
            _ts.lotteryLayout = Lottery.lotteryLayout
            // 初始标题赋值
            // _ts.lotteryTitle = Lottery.playWayArr[0].name + '_' + Lottery.playWayArr[0].playWayData[0].name
            // // 初始玩法，设置索引
            // _ts.playInx = [0, 0]
            // _ts.groupTab(0, false)
            // if (!res.data || res.data.length === 0) {
            //   ToastMsg('没找到该彩种，请返回重试')
            //   return false
            // }
            // // 彩种信息，替换头部信息
            // _ts.playWayArr = res.data
            // _ts.lotteryMsg = res.data[0]
            // // 把玩法布局分离一下
            // if (res.data[0] && res.data[0].defaultPlayWay) {
            //   _ts.$store.dispatch('saveLottery', res.data[0].defaultPlayWay) // 保存起来，页面转到结算的时候要用
            // } else {
            //   _ts.$store.dispatch('saveLottery', res.data[0].playWayData)
            // }
            // _ts.lotteryLayout = _ts.$store.state.LotteryPlayWayData
          }
        })
        .catch(() => {})
    },
    // // 开奖列表
    toggleAwards () {
      if (this.$refs.popAward.popAwardList) {
        this.$refs.popAward.popAwardList = false
        this.bettingPaletteClose(false)
      } else {
        this.$refs.popAward.popAwardList = true
        this.bettingPaletteClose(true)
      }
      // console.log(this.$refs.popAward.popAwardList)
    },
    // 更新开奖列表数据
    updateAwards () {
      this.$refs.popAward.updateAwards()
    },
    // 悬浮按钮
    main_log (val) {
      console.log('main_log', val)
    },
    sub_log (val) {
      console.log('sub_log', val)
      this.$refs.target_1.collapse()
    }
  },
  updated () {
    this.shareCode = this.$store.getters.getShareCode
  },
  mounted () {
    if (this.$store.state.Lottery.lotteryLayout) {
      this.lotteryLayout = this.$store.state.Lottery.lotteryLayout
      this.setShareCode()
    }
    // let _ts = this
    let shareBettingMoney = this.Utils.Storage.get('shareBettingMoney')
    if (shareBettingMoney && shareBettingMoney.currentRoom) {
      setTimeout(() => {
        this.$nextTick(() => {
          document.getElementById('contentTop').style.marginTop = '-45px'
        })
      }, 10)
    }
    // TODO: 优化的地方，玩法记录，因为已经保存了layout的信息再vuex里，返回的时候优先调用保存好的值
    if (this.$store.state.Lottery.playWayArr.length > 0) {
      // 都用现有的vuex的值
      this.lotteryMsg = this.$store.getters.getLayoutMsg
      this.lotteryLayout = this.$store.getters.getLayout
      this.playWayArr = this.$store.state.Lottery.playWayArr
      return false
    }
    // this.dataLottery()
  },
  created () {
    // 获取数据,渲染页面
    // this.$nextTick(() => { // 下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，知识点
    //   console.log(this.$store.state.Lottery.playWayArr)
    // })
    let _ts = this
    if (this.$route.query.lotteryId) {
      this.lotteryId = this.$route.query.lotteryId
    } else {
      this.lotteryId = this.$store.state.Lottery.lotteryId
    }
    // 获取六合彩颜色
    this.axios.postFast('/front/lottery/sixmark_attribute.do', {}).then(function (res) {
      if (res.code === 0) {
        let _data = res.data
        // _ts.Utils.Storage.save('ballSetColorDic', _data)
        _ts.$store.dispatch('ColorSave', _data)
        _ts.ballSetColorDic = _data
      }
    }).catch(() => {})
    // 轻度验证，作为显示赔率与否
    this.checkLogin()
    // 实例化unitSave 作为unitFee的存取对象
    this.unitSave = this.Utils.Storage.package('unitFee')
    this.payment.unitFee = (this.unitSave.get() || '') // 单价初定义
  }
}
</script>

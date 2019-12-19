<!--
 * @Author: your name
 * @Date: 2019-11-01 16:17:21
 * @LastEditTime: 2019-11-07 15:53:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\subordinateReport.vue
 -->
<template>
  <div class="wrap" id="page-wrapper" v-cloak>
      <Head fixed>
      <h3>下级报表</h3>
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
            <input type="text" placeholder="下级账号查询" class="search" v-model="requestParam.account">
            <div class="searchBtn" @click="queryRequest">查询</div>
        </section>
    </section>
    <div class="subordinatr-head fw bg-col" v-pre>
        <span class="subordinatr-head-sp">账号</span>
        <span class="subordinatr-head-sp">用户类型</span>
        <span class="subordinatr-head-sp">下级人数</span>
        <span class="subordinatr-head-sp">团队盈利</span>
        <span class="subordinatr-head-sp">操作</span>
    </div>
    <img src="/mobile/images/agent/zwjl.png" class="blank" v-if="subordinates.length === 0">
    <section v-infinite-scroll="loadBottom" :infinite-scroll-disabled="allLoaded" :infinite-scroll-distance="10" ref="loadmore">
        <!-- <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
            <div class="subordinatr-body" v-for="(item, index) in subordinates" :key="index">
                <span class="subordinatr-head-sp">{{item.userAccount}}</span>
                <span class="subordinatr-head-sp">{{item.role | levelFilter(floorLevel)}}</span>
                <span class="subordinatr-head-sp" :class="{'text-red': item.number > 0}">
                    {{item.number ? item.number : 0}}
                    <i v-if="item.number > 0" class="fa fa-arrow-down"></i>
                </span>
                <span class="subordinatr-head-sp">{{item.teamProfit | realProfit}}</span>
                <span class="subordinatr-head-sp"  style="color:#4ba5ea" @click="clickDetail(item)">详情</span>
            </div>
            <div class="menber-list noTop" v-if="allShow && subordinates.length !== 0">
                已显示全部
            </div>
        <!-- </mt-loadmore> -->
    </section>
    <!-- 底部弹窗 -->
    <transition name="footer">
        <section class="footer-layer" v-if="footerLayer">
            <ul class="footer-layer-lists">
                <!-- <li class="footer-layer-list" @click="shareListDate(curItem.code)">查看返点</li> -->
                <li class="footer-layer-list" v-if='curItem.role == 1' @click="detailReport()">详细报表</li>
                <li class="footer-layer-list" v-if='curItem.number > 0' @click="underReport()">查看下级</li>
                <li class="footer-layer-list" v-if='curItem.agentId && floorLevel != 1' @click="upperReport()">返回上级</li>
            </ul>
            <a class="footer-layer-btn" @click="footerLayer = false">取消</a>
        </section>
    </transition>
    <!-- 遮罩层 -->
    <section class="footer-layer-bg" v-if="footerLayer" @click="rebateShow = false, footerLayer = false"></section>
    <!-- 返点表 -->
    <ul class="footer-returns" v-if="rebateShow">
        <li class="footer-returns-detaails">
            返点详情
            <img src="/mobile/images/agent/close.jpg" class="footer-return-close" @click="rebateShow = false">
        </li>
        <li class="footer-returns-detaail" v-for="(item, index) in shares" :key="index">
            <span class="footer-returns-class">{{item.lottery}}</span>
            <span class="footer-returns-class tc">{{item.share}}</span>
        </li>
    </ul>
    <Popup :show="show" >
      <reportDetall :data="data"></reportDetall>
    </Popup>
</div>
</template>
<script>
import Dataselect from './dataselect.vue'
import { shareListApi, SubordinateReport, GlobalReport } from 'Plugins/api'
import Head from 'Components/global/head_new'
import { sessionUtil } from './sessionUtil'
import Popup from './popup'
import reportDetall from './reportDetall'
// 保留3位小数，不够用0补充
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
  name: 'subordinateReport',
  components: {
    Dataselect,
    Popup,
    reportDetall,
    Head
  },
  data () {
    return {
      allShow: false,
      loadMoreFlag: false,
      requestParam: {
        begin: null,
        end: null,
        userId: null,
        offset: 0,
        count: 15,
        account: ''
      },
      subordinates: [],
      headShow: false,
      allLoaded: true,
      levelMenus: [],
      floorLevel: 1, // 层级一级代理或会员起
      // userAccount: null, // 当前级的userAccount
      subTotal: 0, // 同一级的总数多少
      pickerStartValue: '请选择开始日期', // 时间组件 开始日期
      pickerEndValue: '请选择结束日期', // 时间组件 结束日期
      distance: 3, // 上拉刷新 滑动距离,
      shares: [], // 点击列表 查看返点的数据
      curItem: null,
      rebateShow: false,
      footerLayer: false,
      levelArr: [],
      show: false,
      data: null
    }
  },
  created () {
    let _this = this
    setTimeout(() => {
      _this.loadMoreFlag = true
    }, 800)
    if (sessionUtil.get('X-Requested-With') === 'XMLHttpRequest') {
      this.headShow = true
    }
  },
  filters: {
    levelFilter: function (role, level) {
      if (role === 1) {
        return `${level}级代理`
      } else {
        return `${level}级会员`
      }
    },
    realProfit: function (val) {
      if (val * 1 < 0) {
        return changeThreeDecimal(-1 * (Math.floor(-1 * val * 1000) / 1000))
      } else {
        return changeThreeDecimal(Math.floor(val * 1000) / 1000)
      }
    }
  },
  methods: {
    close () {
      this.show = false
    },
    queryRequest () {
      this.requestParam.offset = 0
      this.requestParam.userId = sessionUtil.get('user').userId
      this.newRequest(this.requestParam)
    },
    headBack () {
      if (this.floorLevel > 1) {
        this.upperReport()
      } else {
        history.back(1)
      }
    },
    newRequest (params) {
      /**
             * @author Cyan
             * @param {String} account 查询的账号
             * @param {Array} agentLine 当前账号的代理数据链
             * @param {Array} dataList 下级数据
             * @param {Number} myId 当前账号id
             * @param {Number} myLevel 当前账号所属代理链等级
             * @param {Number} findLevel 查询的账号代理链等级
             * @param {Number} myIndex 当前账号在代理数据链中的索引
             */
      const { account } = params
      // 过滤查询账号格式
      if (!account || /^[a-zA-Z0-9]{4,16}$/.test(account)) {
        // /agent/subordinate/subordinate_report_new.do // 新报表接口
        SubordinateReport(params).then(res => {
          if (res.data) {
            const { agentLine, dataList } = res.data
            this.levelArr = agentLine
            // 根据翻页判断直接覆盖当前数据还是滚动加载后合并数据
            if (this.requestParam.offset === 0) {
              this.subordinates = dataList
            } else {
              this.subordinates = this.subordinates.concat(dataList)
            }
            const myId = sessionUtil.get('user').userId
            const myLevel = agentLine.find(e => e.userId === myId).agentLevel
            // 是否有查询账号，处理用户等级
            if (params.account) {
              const findAccount = params.account
              const findLevel = agentLine.find(e => e.account === findAccount).agentLevel
              // 查询的账号代理链等级 减去 当前账号的代理链等级 加一
              this.floorLevel = findLevel - myLevel + 1
            } else {
              const myIndex = agentLine.indexOf(agentLine.find(e => e.userId === myId))
              // 无查询账号，并且当前账号处于代理链第一个，则从1级开始
              if (myIndex === 0) {
                this.floorLevel = 1
              } else {
                this.floorLevel = agentLine[0].agentLevel - myLevel + 1
              }
            }
            // 判断数据是否加载完毕
            if (this.subordinates.length === res.rows) {
              this.allShow = true
            }
            if (this.subordinates.length < res.rows) {
              this.allShow = false
            }
          }
          if (!res.data && res.code === 0) {
            this.$toast('无此账号数据~')
          }
          if (res.code >= 300 && res.code < 400) {
            this.$toast(res.msg)
          }
        })
      }
    },
    request (fn) {
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
        _this.pickerEndValue = this.formatDate(timer)
        _this.pickerEndValue += ':59'
      } else {
        _this.pickerEndValue = this.formatDate(t)
        _this.pickerEndValue += ':00'
      }
      var start = new Date(_this.pickerStartValue).getTime()
      var end = new Date(_this.pickerEndValue).getTime()
      if (start >= end) {
        this.$toast('开始时间 不能大于 结束时间')
      } else {
        // 正确后执行回调
        _this.requestParam.begin = new Date(_this.pickerStartValue.replace(/-/g, '/')).getTime()
        _this.requestParam.end = new Date(_this.pickerEndValue.replace(/-/g, '/')).getTime()
        _this.newRequest(this.requestParam)
        // _this.request();
      }
    },
    changeTime (start, end) {
      // 组件传过来的 开始时间  和  结束时间  毫秒数
      var _this = this
      _this.pickerStartValue = this.formatDate(start)
      _this.pickerEndValue = this.formatDate(end)
      _this.pickerStartValue += ':00'
      _this.pickerEndValue += ':59'
      _this.requestParam.begin = new Date(_this.pickerStartValue.replace(/-/g, '/')).getTime()
      _this.requestParam.end = new Date(_this.pickerEndValue.replace(/-/g, '/')).getTime()

      // 重新置于首页
      _this.allShow = false
      _this.requestParam.offset = 0
      if (!sessionUtil.get('user')) {
        this.$toast('请求无效,请重新登录!')
        return
      }
      _this.requestParam.userId = this.levelArr.length > 0 ? this.levelArr[0].userId : sessionUtil.get('user').userId
      _this.newRequest({ ..._this.requestParam, account: '' })
      // _this.request();
    },
    loadBottom () {
      if (!this.allShow) {
        this.requestParam.offset += this.requestParam.count
        this.newRequest({ ...this.requestParam, account: '' })
      }
    },
    detailReport () { // 详细报表
      let _this = this
      // 跳转到报表详情
      if (_this.curItem) {
        let _u = _this.curItem

        window.location.href = `/mobile/agent/reportForm.html?account=${_u.userAccount}`
        // &begin=${_this.requestParam.begin}&end=${_this.requestParam.end}
        // 优化，时间要不要同步传过去
      }
    },
    underReport () {
      if (this.curItem) {
        this.requestParam.userId = this.curItem.userId
        this.newRequest({ ...this.requestParam, account: '' })
        this.footerLayer = false
      }
    },
    upperReport () {
      if (this.levelArr.length > 1) {
        this.requestParam.userId = this.levelArr[1].userId
        this.newRequest({ ...this.requestParam, account: '' })
        this.footerLayer = false
      }
    },
    clickDetail (item) {
      this.curItem = item
      this.requestParam.offset = 0
      this.requestParam.account = item.userAccount
      this.requestParam.pageNumber = 1
      GlobalReport(this.requestParam).then(res => {
        if (res.code === 0) {
          this.data = res.data
          this.show = true
        } else {
          this.$toast(res.msg)
        }
      })
      // this.footerLayer = true
    },
    pageContent () {
      if (this.headShow) {
        return 'main reportForm pb2'
      } else {
        return 'main reportForm pb2 notop'
      }
    },
    shareListDate (itemId) {
      // 查看返点  列表数据处理
      var _this = this
      var _data = { id: itemId }
      shareListApi(_data).then(res => {
        _this.rebateShow = true
        res.data.forEach(function (item) {
          for (var _share of _this.shareLotterys) {
            if (_share.lotteryClassName === item.lotteryClassName) {
              item['lottery'] = _share.title
            }
          }
        })
        _this.shares = res.data
      })
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
.menber-list {
  padding: .4rem 0;
  background: #fff;
  text-align: center;
}

</style>

<style lang="scss" scoped>
.game-select {
  overflow: hidden;
  padding: .13rem;
}
.game-selector {
  display: inline-block;
  padding: 0 .1rem;
  width: 40%;
  border: 1px solid #ccc;
  height: .8rem;
  line-height: .8rem;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-sizing: border-box;
  margin:0 .2rem 0 .1em;
}
.label-style{
  display: inline-block;
  width: 7%;
}
.lottery-nav {
    width: 27%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: fixed;
    background: #f5f4f9;
  li {
    width: 100%;
    line-height: .8rem;
    text-align: center;
    img {
      width: 22%;
      vertical-align: middle;
      float: left;
      margin-top: 6px;
      margin-left: 3px;
    }
    div {
      float: left;
      width: 69%;
    }
  }
}
.lottery-content {
    width: 73%;
    margin-left: 27%;
    height: 8rem;
    overflow: auto;
  li {
    width: 29%;
    border: #ccc solid 1px;
    text-align: center;
    line-height: .9rem;
    height: .9rem;
    margin-left: 9px;
    margin-top: 5px;
    border-radius: 4px;
    float: left;
  }
}
.lotteryNavActive {
  background: $baseCol !important;
  color: #fff !important;
}
.btn {
  width: 100%;
  p {
    width: 2.5rem;
    line-height: .7rem;
    background: red;
    color: #fff;
    margin: auto;
    margin-bottom: .2rem;
    text-align: center;
    border-radius: 4px;
  }
}
.onenav {
  width: 100%;
  overflow: -webkit-paged-x;
  height: .9rem;

  li {
    width: 18%;
    line-height: .8rem;
    text-align: center;
  }
}
.onenavactive {
  color: $baseCol;
  border-bottom: 2px solid $baseCol;
}

  .mint-navbar {
    overflow-x: auto;
    overflow-y:hidden;
  }
  .cp.mint-navbar {
    background: #fff;
    border-bottom: 1px solid #eee;
    // color: #fff;
    // margin-top: 129px;
  }
  .cp {
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    /*定义滚动条高宽及背景*/
    &::-webkit-scrollbar {
      height:0;
      background-color: transparent
    }
    /*定义滚动条*/
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    .mint-tab-item-label {
      position: relative;
      display: inline-block;
    }
    scroll-behavior: smooth;
    .is-selected {
      .mint-tab-item-label {
        // color: #fff;
        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          background-color: #fff;
          bottom: 5px;
          position: absolute;
        }
      }
    }
    .mint-tab-item {
      padding: 8px;
    }
  }
  .text {
    width: 4em;
  }
  .record-box {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
    &.record-box-game {
      margin-top: 10px;
      border-bottom: 0px solid #fff;
    }

    .record-left {
      // width: 63%;
      float: left;
      margin: 8px 0 8px 10px;
    }
    .record-right {
      // width: 30%;
      float: right;
      margin: 8px 10px 8px 0;
      text-align: right;
    }
    div {
      p:first-child {
        color: black;
        font-size: 13px;
      }
      p {
        width: 100%;
        height: 22px;
        line-height: 22px;
        // color: #999;
        // line-height: .5rem;
        // height: .5rem;
      }
    }
  }
  .game-order {
    width: 94%;
    height: 24px;
    line-height: 24px;
    border-bottom: 1px solid #ccc;
    margin: auto;
  }
  .record-Bigbox {
    width: 100%;
    overflow-x: hidden;
    padding-top: 0px;
    overflow-y: auto;
    // height: 14.5rem;
    // max-height: 60vh;
    max-height: calc(100vh - 42px - 33.5px - 1.125rem - 38.5px);
  }
  .lotteryactive {
    border: 1px solid $baseCol !important;
    color: $baseCol;
  }
  .all-tip {
  text-align: center;
  line-height: 40px;
}
</style>

<template>
  <section>
    <Datesele :dateList="dateList" @updateDate="updateDate"></Datesele>
    <div class="game-select">
      <label class="label-style">彩种</label>
      <div class="game-selector" @click="getLotteryData" v-if="recordListType === 'lottery'">
        <span>{{ lotteryName }}</span>
        <i class="fa fa-angle-down fa-fw fa-lg"></i>
      </div>
      <label class="label-style">类型</label>
      <div class="game-selector" @click="getLotteryType">
        <span>{{ lotteryStatus.name }}</span>
        <i class="fa fa-angle-down fa-fw fa-lg"></i>
      </div>
    </div>
    <!-- <ul class="onenav">
      <li v-for="(item,i) in oneNav" :key="i" :class="onenavactive===i?'onenavactive':''" @click="selectNav(item,i)">
        {{item.platformName}}
      </li>
    </ul> -->
    <mt-navbar class="cp">
      <mt-tab-item
        v-for="(l, index) in oneNav"
        @click.native="(onenavactive !== index) && selectNav(l, index)"
        :key="index"
        :id="index"
        :class="onenavactive === index ? 'onenavactive' : ''"
      >
      {{ l.platformName }}
      </mt-tab-item>
    </mt-navbar>
    <!-- 空列表 -->
    <empty
      v-if="recordList.length === 0"
      type="list"
      title="暂无记录"
    ></empty>
    <ul
    class="drop-down record-Bigbox"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="infinite"
    :infinite-scroll-distance="10"
    v-if="recordListType === 'lottery'"
    >
      <li
        class="record-box"
        v-for="(item,i) in recordList"
        :key="i+ item.orderId"
        @click="enterLotteryDetail(item)"
      >
        <div class="record-left">
          <p>{{ item.lotteryName }}</p>
          <p>{{ item.groupName || item.content }} - {{ item.playName }}</p>
          <p>{{ item.betTime || item.prizeTime }}</p>
        </div>
        <div class="record-right">
          <p>购{{ item.totalFee | numFixed }}元</p>
          <p>{{ item.issue ? '第' + item.issue + '期' : ' ' }}</p>
          <p :class="orderStatusClass(item)">
            <!-- {{ item.winFee === 0 ? '未中奖' : '中' + item.winFee + '元'}} -->
            {{ orderStatusStr(item) }}
          </p>
        </div>
      </li>
      <div v-if="isAll && recordList.length !== 0" class="all-tip">---END---</div>
    </ul>
    <ul
      class="drop-down record-Bigbox"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="infinite"
      :infinite-scroll-distance="10"
      v-if="recordListType !== 'lottery'"
    >
      <li
        class="record-box record-box-game"
        v-for="item in recordList"
        :key="item.orderId"
      >
        <p class="game-order">订单号：{{ item.orderId }}</p>
        <div class="record-left">
          <p>{{ item.gameName }}</p>
          <p>{{ item.stautsStr }}</p>
          <p>{{ item.betTime }}</p>
        </div>
        <div class="record-right">
          <p>投注金额：{{ item.betFee }}元</p>
          <p>派彩金额{{ item.betFee + Math.abs(item.winFee) }}</p>
          <p :style="{ color: item.winFee > 0 ? '#d81e06' : 'green' }">
            {{ '盈亏：' + item.winFee }}
          </p>
        </div>
      </li>
      <div v-if="isAll && recordList.length !== 0" class="all-tip">---END---</div>
    </ul>
    <Popup :show="show">
      <lotteryLayout
        style="width: 9rem;"
        v-show="typeShow === 'lottery'"
        :activeLotteryId="lotteryActive"
        hasFull=true
        @toChange="sildLottery"
      ></lotteryLayout>

      <mt-picker
        v-if="typeShow === 'lotteryType'"
        :slots="slots"
        @change="onValuesChange"
        style="width: 8.5rem; font-size: 13px;"
        :visible-item-count="5"
        ref="picker"
        value-key="name"
      ></mt-picker>
      <div
        class="btn"
        v-if="typeShow === 'lotteryType'"
        @click="statusbtn"
      >
        <p>确认</p>
      </div>
    </Popup>
  </section>
</template>

<script>
import Datesele from './datesele'
import Popup from '../generalize/popup'
import lotteryLayout from 'Components/global/lotteryLayout'
import empty from 'Components/global/emptyData'
import {
  logList,
  // getPlatformApi,
  // getGameDetailsApi,
  getGameDetailForBet,
  getNewAppBettingRecord
} from 'Plugins/api'

const GameInitStatus = [
  { name: '全部', type: -1 }, // -1 -1
  { name: '已中奖', type: 3 }, // 3 -8
  { name: '未中奖', type: 2 }, // 2 0
  { name: '等待开奖', type: 1 }, // 1 1
  { name: '已撤单', type: 10 } // 10 10
]
// const StatusWin = 3
// const StatusLose = 2
// const StatusWait = 1
// const StatusReturn = 10

export default {
  name: 'orderList',
  components: {
    Datesele,
    lotteryLayout,
    empty,
    Popup
  },
  data () {
    return {
      isAll: false,
      infinite: true,
      show: false,
      dateList: [
        { name: '全部', code: 'all' },
        { name: '今天', code: 'today' },
        { name: '昨天', code: 'yesterday' },
        { name: '7天', code: 'week' },
        { name: '30天', code: 'thirtyDays' }
      ],
      lotteryNavList: [],
      lotteryList: [],
      lotteryActive: -1, // 选中
      form: {
        page: 1, // 彩票
        offset: 0, // 游戏
        pageNum: 1
      },
      typeShow: '',
      lotteryNavActive: -1, // 0,
      slots: [
        {
          values: [],
          textAlign: 'center',
          className: 'slot1'
        }
      ],
      oneNav: null,
      onenavactive: 0,
      recordList: [],
      recordListType: 'lottery',
      transfer: {
        name: '全部',
        type: '-1'
      },
      lotteryStatus: {
        name: '全部',
        type: -1
      },
      date: null,
      gameType: null,
      lotteryName: '全部'
    }
  },
  computed: {
  },
  methods: {
    async loadMore () {
      console.log(this.isAll)
      if (!this.isAll && this.date) {
        this.infinite = false
        await this.getDate({ date: this.date })
        this.infinite = true
      }
    },
    goBackInit () {
      this.isAll = false
      this.form.page = 1
      this.form.pageNum = 1
    },
    statusbtn () {
      this.goBackInit()
      this.lotteryStatus = this.transfer
      if (this.recordListType === 'lottery') {
        this.getDate({ date: this.date })
      } else {
        this.getGameList(this.transfer, this.date, 1)
      }
      this.close()
    },
    sildLottery (item) {
      this.lotteryActive = item.gameKindId
      this.lotteryName = item.gameName
      this.goBackInit()
      this.getDate({ date: this.date })
      this.close()
    },
    // 筛选已有记录
    sileFn () {
      this.getDate({
        date: this.date
      })
    },
    updateDate (begin, end) {
      this.goBackInit()
      this.date = { begin, end }
      this.getDate({
        date: this.date
      })
    },
    async getGameList (item, { end, begin }, pageNum) {
      let _result = await getNewAppBettingRecord({
        'platformType': item.platformType || this.gameType.platformType,
        'platformCode': item.platformCode,
        'offset': (pageNum - 1) * 20,
        'count': 20,
        'end': end,
        'start': begin
      })
      if (pageNum === 1) {
        this.recordList = _result.data
      } else {
        this.recordList = [...this.recordList, ..._result.data]
      }
      this.isAll = _result.data.length < 20
      this.form.pageNum++
      this.recordListType = item.platformCode
    },
    async getDate (data) {
      let { date } = data
      this.date = date
      if (this.recordListType === 'lottery') {
        let page = this.form.page
        let { code, data } = await logList({
          status: this.lotteryStatus.type,
          'begin': date.begin,
          'end': date.end,
          'pageSize': 20,
          'lotteryId': this.lotteryActive,
          page
        })
        if (code !== 0) return
        if (this.form.page === 1) {
          this.recordList = data
        } else {
          this.recordList = [...this.recordList, ...data]
        }
        console.log(this.recordList)
        this.isAll = data.length < 20
        this.form.page++
      } else {
        this.getGameList(this.lotteryStatus, date, this.form.pageNum)
      }
    },
    async selectNav (item, index) {
      this.goBackInit()
      this.onenavactive = index
      this.gameType = item
      // let end = +new Date()

      if (item.platformType !== 'lottery') {
        this.slots[0].values = item.data
        if (this.slots[0].values.findIndex(e => e.platformCode === '0') === -1) {
          this.slots[0].values.unshift({
            name: '全部',
            platformCode: '0'
          })
        }
        this.lotteryStatus = item.data[0]
        // init
        this.getGameList(item, this.date, 1)
      } else {
        this.slots[0].values = GameInitStatus
        this.recordListType = 'lottery'
        // init
        this.lotteryStatus = {
          name: '全部',
          type: -1
        }
        this.getDate({
          date: this.date
        })
      }
    },
    async getOnvNav () {
      let _result = await getGameDetailForBet()
      if (_result.code === 0) {
        this.oneNav = _result.data
      }
    },
    // 彩票注单详情
    enterLotteryDetail (e) {
      if (e.lotteryId > 10000 || e.gameKindId > 10000) {
        // 足彩
        window.location.href = `/mobile/order/details.html?orderId=${e.orderId}`
      } else {
        // 普通彩
        window.location.href = `/mobile/mine/orderListDetail.html?oid=${e.oid}`
      }
    },
    orderStatusClass (item) {
      let _class = ''
      if (item.status === 3) {
        _class = 'text-red'
      } else {
        _class = 'text-gray'
      }
      return _class
    },
    orderStatusStr (item) {
      let statusStr = ''
      if (item.gameKindId > 10000 || item.lotteryId > 10000) {
        switch (item.status) {
          case 0:
            statusStr = '未付款'
            break
          case 1:
            statusStr = '未开奖'
            break
          case 2:
            statusStr = '未中奖'
            break
          case 3:
            statusStr = item.winFee + '元'
            break
          case 4:
            statusStr = '和局'
            break
          case 10:
            statusStr = '已撤单'
            break
          case 20:
            statusStr = '手动回滚'
            break
          case 30:
            statusStr = '追加中'
            break
          case 99:
            statusStr = '异常状态'
            break
        }
      } else {
        switch (item.status) {
          case 1:
            statusStr = '待开奖'
            break
          case 2:
            statusStr = '未中奖'
            break
          case 3:
            statusStr = item.winFee + '元'
            break
          case 4:
            statusStr = '和局'
            break
          case 10:
            statusStr = '已撤单'
            break
          case 20:
            statusStr = '已撤单'
            break
          case 30:
            statusStr = '追加中'
            break
          case 99:
            statusStr = '订单异常'
            break
          default:
            statusStr = ''
            break
        }
      }
      return statusStr
    },
    getLotteryType () {
      this.typeShow = 'lotteryType'
      this.show = true
    },
    onValuesChange (info, value) {
      this.transfer = value[0]
    },
    getLotteryData () {
      this.show = true
      this.typeShow = 'lottery'
    },
    close () {
      this.show = false
      this.typeShow = ''
    }
  },
  async created () {
    await this.getOnvNav()
    // await this.getList()
    let end = +new Date()
    this.date = { begin: 0, end }
    // init
    await this.getDate({ date: this.date })
    this.slots[0].values = GameInitStatus
  }
}
</script>

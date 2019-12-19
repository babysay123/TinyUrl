<!--
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-13 20:17:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\agency\lottery_record.vue
 -->
<template>
  <section class="page-main">
    <TimePicker :month="false" :isThirty="true"/>

    <div class="game-selector" @click="showOne">
      <span>{{ currentLotteryName }}</span>
      <i class="fa fa-angle-down fa-fw fa-lg"></i>
    </div>
    <div class="game-selector" @click="showTwo">
      <span>{{ seleShow }}</span>
      <i class="fa fa-angle-down fa-fw fa-lg"></i>
    </div>
    <div class="zanwei"></div>
    <Search placeholder="输入会员账号" />
    <ul class="nav">
      <li v-for="(item, index) in navList" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul
      class="drop-down"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="infinite"
      :infinite-scroll-distance="10"
    >
      <li class="nav1" v-for="(item, index) in list" :key="index">
        <span>{{ item.account }}</span>
        <span>{{ item.lotteryName }}</span>
        <span>{{ item._count }}</span>
        <span>{{ item.totalFee }}</span>
        <span :style="{ color: item.winFee === 0 ? '#a4a4a4' : '#d81e06' }">
          {{ item.winFee === 0 ? '未中奖' : '+' + item.winFee + '元' }}
        </span>
        <span style="color:#6fb7ee" @click="details(item)">详情</span>
      </li>
   <div v-if="isAll && list.length !== 0" class="all-tip">---END---</div>
    </ul>
    <!-- 空列表 -->
    <Empty
      v-if="list.length === 0"
      style="margin-top: 64px;"
      type="list"
      title="暂无记录"
    ></Empty>
    <Popup :show="show" direction="bottom" @close='close'>
      <lotteryLayout
        style="width: 9rem;"
        v-show="clickType === 'kind'"
        hasFull=true
        :football="isFootball"
        :activeLotteryId="lotteryId"
        @toChange="sildeLottery"
      ></lotteryLayout>
      <mt-picker
        v-if="clickType === 'type'"
        :slots="slots2"
        @change="onValuesChange2"
        style="width: 9rem; font-size: 14px;"
        :visible-item-count="5"
        ref="picker"
        value-key="label"
      ></mt-picker>
      <div
        class="btn"
        v-if="clickType === 'type'"
      >
        <p @click="changeGame">确认</p>
      </div>
      <div class="detail-box" v-if="clickType === 'detail'">
        <p>
          订单号：<span>{{ detail.orderId }}</span>
        </p>
        <p>
          投注时间：<span>{{ detail.betTime }}</span>
        </p>
        <ul class="detail-ul">
          <li>投注账号：<span>{{ detail.account }}</span></li>
          <li>彩种:<span>{{ detail.lotteryName }}</span></li>
          <li>投注金额：<span>{{ detail.totalFee }}</span></li>
          <li>注数：<span>{{ detail._count }}</span></li>
          <li>串关方式：<span>{{ detail.groupName }}</span></li>
          <li>投注状态：<span :style="{ color: detail.winFee === 0 ? '#a4a4a4' : '#ff6603' }">
              {{ detail.winFee === 0 ? '未中奖' : '+' + detail.winFee + '元' }}
            </span>
          </li>
        </ul>
      </div>
    </Popup>
  </section>
</template>

<script>
import TimePicker from 'Components/agency/timePicker'
import Search from 'Components/agency/search'
import {
  // categoriesApi,
  getGameDetailsApi,
  subordinateOrderApi,
  getPlatformApi
} from 'Plugins/api'
import LotteryDetails from 'Components/agency/lotteryDetails.js'
// import Popup from 'Components/global/popup'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Popup from '../generalize/popup'
import Empty from 'Components/global/emptyData'
import lotteryLayout from 'Components/global/lotteryLayout'

export default {
  components: {
    TimePicker,
    Search,
    Popup,
    LotteryDetails,
    lotteryLayout,
    Empty
  },
  data () {
    return {
      isAll: false,
      infinite: true,
      show: false,
      LotteryDetails,
      selector: false,
      type: 0,
      status: -1,
      lotteryId: -1,
      gameTypes: [],
      list: [],
      currentLotteryName: '全部彩种',
      seleShow: '全部',
      clickType: '',
      slots: [
        {
          values: [],
          textAlign: 'center',
          className: 'slot1'
        }
      ],
      slots2: [
        {
          values: [
          ],
          textAlign: 'center',
          className: 'slot1'
        }
      ],
      lotteryInfo: null,
      navList: ['账号', '彩种', '注数', '投注金额', '状态', '操作'],
      detail: null,
      // 新彩票面板
      oneNav: '',
      activeIndex: 0,
      lotteryList: [], // 全部彩种列表
      // lotteryId: 0,
      oneData: null,
      isFootball: false
    }
  },
  computed: {
    ...mapGetters([ 'agencyParams' ]),
    listFilters () {
      /** 过滤 未开奖 未中奖 已中奖数据 */
      const unOpen = []
      const loss = []
      const win = []

      this.list.forEach(e => {
        switch (e.status) {
          case 1:
            unOpen.push(e)
            break
          case 2:
            loss.push(e)
            break
          case 3:
            win.push(e)
            break
        }
      })
      return { unOpen, loss, win, all: this.list }
    },
    tabs () {
      const { unOpen, loss, win, all } = this.listFilters
      return [
        { label: '全部', type: 'all', list: all },
        { label: '已中奖', type: 'win', list: win },
        { label: '未中奖', type: 'loss', list: loss },
        { label: '等待开奖', type: 'await', list: unOpen }
      ]
    }
  },
  methods: {
    ...mapMutations([ 'setAgencyState' ]),
    ...mapActions([ 'agencyParamsCallback' ]),
    async loadMore () {
      if (!this.isAll) {
        this.infinite = false
        const formData = new FormData()
        this.agencyParams.status = this.status
        Object.keys(this.agencyParams).forEach(e => {
          formData.append(e, this.agencyParams[e])
        })
        const { pageNumber, pageSize } = this.agencyParams
        const { code, rows, total } = await subordinateOrderApi(formData)
        if (code === 0) {
          this.list = [ ...this.list, ...rows ]
        }
        this.infinite = true
        this.isAll = false
        if (pageNumber + 1 > (total / pageSize + 1)) {
          this.isAll = true
          return
        }
        this.agencyParams.pageNumber++
      }
    },
    showOne () {
      this.show = true
      this.clickType = 'kind'
    },
    showTwo () {
      this.show = true
      this.clickType = 'type'
    },
    onValuesChange (picker, values) {
      this.lotteryInfo = values
    },
    onValuesChange2 (picker, values) {
      this.seleShow = values[0].label
      this.status = values[0].type
    },
    details (item) {
      this.show = true
      this.detail = item
      this.clickType = 'detail'
      this.show = true
    },
    close () {
      this.clickType = ''
      this.show = false
    },
    async changeGame () {
      if (this.clickType === 'kind') {
        this.selector = false
        await this.agencyParamsCallback({
          'lotteryId': this.lotteryId
        })
        this.getData('lottery')
      } else if (this.clickType === 'type') {
        this.getData('lottery')
      }
      this.close()
    },
    async getData (type) {
      if (this.isAll && !type) return

      if (type) {
        this.list = []
        await this.agencyParamsCallback({ pageNumber: 1 })
      }

      const formData = new FormData()
      this.agencyParams.status = this.status
      Object.keys(this.agencyParams).forEach(e => {
        formData.append(e, this.agencyParams[e])
      })
      const res = await subordinateOrderApi(formData)

      const { code, rows, total } = res
      const { pageNumber, account, pageSize } = this.agencyParams

      if (code === 0) {
        this.list = type ? rows : [ ...this.list, ...rows ]
        const newPageNumber = pageNumber + 1
        this.agencyParams.status = this.status
        this.setAgencyState({
          agencyParams: {
            ...this.agencyParams,
            pageNumber: newPageNumber
          }
        })
        this.isAll = false
        if (newPageNumber > (total / pageSize + 1)) {
          this.isAll = true
          return
        }
        if (account && !rows.length) {
          this.$toast({
            message: '无此账号数据~',
            duration: 1800
          })
        }
      }
    },
    async getLotteryList (item) {
      const { code, data, msg } = await getGameDetailsApi({
        platformCode: item.platformCode,
        platformType: 'lottery'
      })
      if (code === 0) {
        this.lotteryList = data
        if (this.lotteryList.findIndex(e => e.platformCode === -1) === -1) {
          this.lotteryList.unshift({
            gameName: '全部',
            gameKindId: -1,
            platformCode: -1
          })
        }
      } else {
        this.$toast(msg)
      }
    },
    // onSwitch (item, i) {
    //   if (i === this.activeIndex) {
    //     return
    //   }
    //   this.activeIndex = i
    //   this.getLotteryList(item)
    // },
    // 弹窗筛选
    sildeLottery (item) {
      this.lotteryId = item.gameKindId
      this.currentLotteryName = item.gameName
      // this.lotteryName = item.gameName
      // this.sileFn()
      // this.close()
      this.changeGame()
    },
    async getGameType () {
      const { code, data } = await getPlatformApi({ platformType: 'lottery', type: 1 })
      if (code === 0) {
        this.oneData = data.data
      }
      this.getLotteryList({ platformCode: 'appAllLottery' })
    }
  },
  created () {
    this.slots2[0].values = [
      { label: '全部', type: '-1' },
      { label: '已中奖', type: '3' },
      { label: '未中奖', type: '2' },
      { label: '等待开奖', type: '1' },
      { label: '已撤单', type: '10' }
    ]
    this.getGameType()
    this.setAgencyState({
      agencyFunc: this.getData,
      agencyParams: {
        sortOrder: 'asc',
        pageSize: 15,
        pageNumber: 1,
        status: this.status,
        issue: '',
        orderId: '',
        lotteryId: -1
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.drop-down{
  max-height: 68.7vh;
  overflow-y: auto;
}
.all-tip {
  text-align: center;
  line-height: 40px;
}
.page-main {
  height: calc(100vh - 1.125rem);
}
.blank {
  width: 3rem;
  display: block;
  margin: 2rem auto 0;
}
.zanwei {
  width: 100%;
  height: 1rem;
}
// .downBox{
//   width: 49%;
//   float: right;
//   select{
//     width: 86%;
//     border-radius: 4px;
//     height: 30px;
//     text-align: center;
//   }
// }
.btn {
  width: 100%;
  p {
    width: 2.5rem;
    line-height: .7rem;
    background: red;
    color: #fff;
    margin: auto;
    margin-bottom: .2rem;
    margin-top: 4px;
    text-align: center;
    border-radius: 4px;
  }
}
.game-selector {
  margin: 10px;
  margin-top: 0;
  padding: 0 8px;
  // width: 44%;
  width: calc((100% - 40px) / 2);
  border: 1px solid #ccc;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: left;
  background: #fff;
  font-size: 13px;
}
.nav {
  display: flex;
  flex-wrap:nowrap;
  justify-content:center;
  background: #eee;
  li {
    width: 17%;
    text-align: center;
    line-height: 1rem;
  }
  span {
     width: 17%;
    text-align: center;
    line-height: 1rem;
  }
}
.nav1:nth-child(even) {
  background: #f5f5f5;
}
.nav1 {
  display: flex;
  flex-wrap:nowrap;
  justify-content:center;
  background: #fff;
  span {
     width: 17%;
    text-align: center;
    line-height: 1rem;
  }
}
.detail-box {
  width: 9rem;
  p {
    width: 98%;
    line-height: .8rem;
    margin: auto;
    span {
      color: #ff6603;
    }
  }
}
.detail-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    width: 48%;
    line-height: .8rem;
    span {
      color: #ff6603;
    }
  }
}
.mint-navbar {
  background: #eee;
}
.gamePopup {
  height: 58vh;
  overflow-y: auto;
  background: #fff;
  li {
    font-size: 16px;
    line-height: 1rem;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}

.mint-navbar .mint-tab-item {
  height: 40px;
  line-height: 40px;
  padding: 0;
}

.orderList-container {
  height: calc(100vh - 166px - 1.125rem);
  overflow-y: auto;
}
</style>

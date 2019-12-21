<template>
  <section>
    <TimePicker :month="false" :isThirty="true" />
    <div class="game-selector" @click="showOne">
      <span>{{ seleShow }}</span>
      <i class="fa fa-angle-down fa-fw fa-lg"></i>
    </div>
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
        <span>{{ item.playName }}</span>
        <span>{{ item._count }}</span>
        <span style="color:#d81e06">{{ item.totalFee }}</span>
        <span style="color:#26ab5f">{{ item.status | condition }}</span>
        <span style="color:#40a0e9" @click="detail(item)">详情</span>
      </li>
    <div v-if="isAll && list.length !== 0" class="all-tip">---END---</div>
    </ul>
    <img
      src="/mobile/images/agent/zwjl.png"
      class="blank"
      v-if="list.length === 0"
    />
    <Popup :show="show">
      <div class="details" v-if="showType === 'detail'">
        <p>
          订单号：<span>{{ detailItem.orderId }}</span>
        </p>
        <p>
          投注时间：<span>{{ detailItem.betTime }}</span>
        </p>
        <ul>
          <li>
            投注账号：<span>{{ detailItem.account }}</span>
          </li>
          <li>
            玩法：<span>{{ detailItem.content }}</span>
          </li>
          <li>
            投注金额：<span>{{ detailItem.totalFee }}</span>
          </li>
          <li>
            注数：<span>{{ detailItem._count }}</span>
          </li>
          <li>
            串关方式：<span>{{ detailItem.playName }}</span>
          </li>
          <li>
            投注状态：<span>{{ detailItem.status | condition }}</span>
          </li>
        </ul>
      </div>
      <mt-picker
        v-if="showType === 'selec'"
        :slots="slots"
        @change="onValuesChange"
        style="width:9rem;font-size:14px"
        :visible-item-count="5"
        ref="picker"
        value-key="title"
      >
      </mt-picker>
      <div v-if="showType === 'selec'" class="btn">
        <p @click="serachGame">确认</p>
      </div>
    </Popup>
  </section>
</template>

<script>
import TimePicker from 'Components/agency/timePicker'
import Search from 'Components/agency/search'
import { categoriesApi, subordinateOrderApi } from 'Plugins/api'
import LotteryDetails from 'Components/agency/lotteryDetails.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Popup from '../generalize/popup'
export default {
  components: { TimePicker, Search, LotteryDetails, Popup },
  data () {
    return {
      isAll: false,
      infinite: true,
      LotteryDetails,
      type: 0,
      lotteryId: 100001,
      gameTypes: [],
      list: [],
      navList: ['账号', '玩法', '注数', '投注金额', '状态', '操作'],
      detailItem: [],
      show: false,
      showType: '',
      slots: [
        {
          values: [
            { title: '全部', type: -1 },
            { title: '待开奖', type: 1 },
            { title: '已中奖', type: 3 },
            { title: '未中奖', type: 2 },
            { title: '已撤单', type: 10 }
          ],
          textAlign: 'center',
          className: 'slot1'
        }
      ],
      transmit: -1,
      seleShow: '全部',
      station: ''
    }
  },
  filters: {
    condition (type) {
      switch (type) {
        case 0:
          return '未付款'
        case 1:
          return '未开奖'
        case 2:
          return '未中奖'
        case 3:
          return '中奖'
        case 4:
          return '和局'
        case 10:
          return '已撤单'
        case 20:
          return '手动回滚'
        case 30:
          return '追加中'
        case 99:
          return '订单异常'
      }
    }
  },
  computed: {
    ...mapGetters(['agencyParams']),
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
    ...mapMutations(['setAgencyState']),
    ...mapActions(['agencyParamsCallback']),
    async loadMore () {
      if (!this.isAll) {
        this.infinite = false
        const formData = new FormData()
        Object.keys(this.agencyParams).forEach(e => {
          formData.append(e, this.agencyParams[e])
        })
        const res = await subordinateOrderApi(formData)
        const { code, rows } = res
        if (code === 0) {
          this.list = [...this.list, ...rows]
        }
        this.infinite = true
        this.isAll = rows.length < 15
        this.pageNumber++
      }
    },
    serachGame () {
      this.seleShow = this.station
      this.getData('lottery', this.transmit)
      this.agencyParams.status = this.transmit
      this.close()
    },
    showOne () {
      this.show = true
      this.showType = 'selec'
    },
    onValuesChange (info, value) {
      this.station = value[0].title
      this.transmit = value[0].type
    },
    detail (item) {
      this.showType = 'detail'
      this.show = true
      this.detailItem = item
    },
    close () {
      this.show = false
    },
    async changeGame ({ lotteryId, name }) {
      this.lotteryId = lotteryId
      this.currentLotteryName = name
      this.selector = false
      await this.agencyParamsCallback({ lotteryId })
      this.getData('lottery')
    },
    async getData (type, getType = -1) {
      if (this.isAll && !type) return

      if (type) {
        this.list = []
        await this.agencyParamsCallback({ pageNumber: 1 })
      }

      const formData = new FormData()
      Object.keys(this.agencyParams).forEach(e => {
        formData.append(e, this.agencyParams[e])
      })

      const res = await subordinateOrderApi(formData)

      const { code, rows } = res
      const { pageNumber, account } = this.agencyParams
      if (code === 0) {
        this.list = type ? rows : [...this.list, ...rows]
        this.isAll = rows.length < 15
        console.log(this.isAll, 'isAll')
        const newPageNumber = pageNumber + 1

        this.setAgencyState({
          agencyParams: {
            ...this.agencyParams,
            pageNumber: newPageNumber
          }
        })

        if (account && !rows.length) {
          this.$toast({
            message: '无此账号数据~',
            duration: 1800
          })
        }
      }

      // this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
    },
    async getGameType () {
      const res = await categoriesApi()
      this.gameTypes = res.data
    }
  },
  created () {
    this.getGameType()
    this.setAgencyState({
      agencyFunc: this.getData,
      agencyParams: {
        sortOrder: 'asc',
        pageSize: 15,
        pageNumber: 1,
        status: -1,
        issue: '',
        orderId: '',
        lotteryId: 100001
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
.blank {
  width: 3rem;
  display: block;
  margin: 2rem auto 0;
}
.all-tip {
  text-align: center;
  line-height: 40px;
}
.btn {
  width: 100%;
  p {
    width: 2.5rem;
    line-height: 0.7rem;
    background: red;
    color: #fff;
    margin: auto;
    margin-bottom: 0.2rem;
    text-align: center;
    border-radius: 4px;
  }
}
.details {
  width: 9rem;
  p {
    width: 96%;
    margin: auto;
    line-height: 1rem;
    span {
      color: #ff6603;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      width: 48%;
      line-height: 1rem;
      span {
        color: #ff6603;
      }
    }
  }
}
.nav1 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #eee;
  background: #fff;
  height: 1rem;
  span {
    line-height: 1rem;
    width: 17%;
    text-align: center;
    // line-height: 1rem;
  }
}
.nav1:nth-child(even) {
  background: #eee;
}
.nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #eee;
  width: 100%;
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
.game-selector {
  margin: 10px;
  margin-top: 0;
  padding: 0 8px;
  // width: 45%;
  width: calc((100% - 40px) / 2);
  border: 1px solid #ccc;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  font-size: 13px;
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
  height: calc(100vh - 126px - 1.125rem);
  overflow-y: auto;
}
</style>

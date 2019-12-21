<template>
  <section>
    <TimePicker :month="false" :isThirty="true" />
    <div class="game-selector" @click="showOne">
      <span>{{ seleShow }}</span>
      <i class="fa fa-angle-down fa-fw fa-lg"></i>
    </div>
    <Search placeholder="下级交易查询" />
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
        <span>{{ item.changedTime | timeFormat }}</span>
        <span>{{ item.infotype }}</span>
        <span style="color:#d81e06">{{
          (item.afterAmount - item.beforeAmount) | number
        }}</span>
        <span style="color:#26ab5f">{{
          item.variableAmount > 0 ? '-' : item.variableAmount | number
        }}</span>
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
          订单时间：<span>{{ detailItem.changedTime }}</span>
        </p>
        <ul>
          <li>
            玩家账号：<span>{{ detailItem.account }}</span>
          </li>
          <li>
            交易类型：<span>{{ detailItem.infotype }}</span>
          </li>
          <li>
            收入金额：<span>{{
              (detailItem.afterAmount - detailItem.beforeAmount) | number
            }}</span>
          </li>
          <li>
            支出金额：<span>{{
              detailItem.variableAmount > 0 ? '-' : detailItem.variableAmount
            }}</span>
          </li>
        </ul>
        <p>
          可用金额：<span>{{ Number(detailItem.afterAmount) | number }}</span>
        </p>
        <p>
          交易备注：<span>{{ detailItem.remark }}</span>
        </p>
      </div>
      <mt-picker
        v-if="showType === 'selec'"
        :slots="slots"
        @change="onValuesChange"
        style="width:9rem;font-size:14px"
        :visible-item-count="5"
        ref="picker"
        value-key="fuck"
      >
      </mt-picker>
      <div v-if="showType === 'selec'" class="btn">
        <p @click="changeGame">确认</p>
      </div>
    </Popup>
  </section>
</template>

<script>
import TimePicker from 'Components/agency/timePicker'
import Search from 'Components/agency/search'
import { transactionDetailsApi, accountListConfigApi } from 'Plugins/api'
import LotteryDetails from 'Components/agency/lotteryDetails.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Popup from '../generalize/popup'
export default {
  components: { TimePicker, Search, LotteryDetails, Popup },
  data () {
    return {
      infinite: true,
      LotteryDetails,
      type: 0,
      list: [],
      isAll: false,
      navList: ['玩家', '交易时间', '类型', '收入金额', '支出金额', '操作'],
      detailtype: null,
      show: false,
      detailItem: '',
      showType: null,
      slots: [
        {
          values: [],
          textAlign: 'center',
          className: 'slot1'
        }
      ],
      seleShow: '全部',
      station: ''
    }
  },
  computed: {
    ...mapGetters(['type_config', 'agencyParams']),
    listFilters () {
      const withdrawal = []
      const rechrage = []

      this.list.forEach(e => {
        switch (e.status) {
          case 2:
            withdrawal.push(e)
            break
          case 1:
            rechrage.push(e)
            break
        }
      })
      return { withdrawal, rechrage, all: this.list }
    },
    tabs () {
      const { withdrawal, rechrage, all } = this.listFilters
      return [
        { label: '所有类型', type: 0, list: all },
        { label: '提现记录', type: 2, list: withdrawal },
        { label: '充值记录', type: 1, list: rechrage }
      ]
    }
  },
  filters: {
    timeFormat: function (val) {
      let newVal = val.toString().slice(0, 10)
      return newVal
    },
    number: function (val) {
      if (val === '-') return '-'
      val = val.toString().replace(/\$|\/,/g, '')
      if (isNaN(val)) {
        val = '0'
      }
      let sign = val === (val = Math.abs(val))
      val = Math.floor(val * 100 + 0.50000000001)
      let cents = val % 100
      val = Math.floor(val / 100).toString()
      if (cents < 10) {
        cents = '0' + cents
      }
      for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val =
          val.substring(0, val.length - (4 * i + 3)) +
          ',' +
          val.substring(val.length - (4 * i + 3))
      }

      return (sign ? '' : '-') + val + '.' + cents
    }
  },
  methods: {
    ...mapMutations(['setAgencyState']),
    ...mapActions(['getTypeConfig', 'agencyParamsCallback']),
    dataFilter () {
      this.detailtype &&
        this.detailtype.map(item => {
          this.list.map(val => {
            if (Number(Object.keys(item)[0]) === val.type) {
              val.infotype = item[val.type]
            }
          })
        })
    },
    async loadMore () {
      if (!this.isAll) {
        this.infinite = false
        const res = await transactionDetailsApi(this.agencyParams)
        const { code, data } = res
        if (code === 0) {
          this.list = [...this.list, ...data]
          this.dataFilter()
        }
        this.infinite = true
        this.isAll = data.length < 15
        this.agencyParams.pageNumber++
      }
    },
    changeGame () {
      this.show = false
      this.getData({}, this.transmit)
      this.seleShow = this.station
      this.agencyParams.type = this.transmit === 'null' ? null : this.transmit
    },
    showOne () {
      this.showType = 'selec'
      this.show = true
    },
    onValuesChange (picker, values) {
      this.station = values[0].fuck
      this.transmit = Object.keys(values[0])[0]
    },
    detail (item) {
      this.detailItem = item
      this.showType = 'detail'
      this.show = true
    },
    close () {
      this.show = false
    },
    async getData (type, getType = null) {
      if (this.isAll && !type) return
      if (type) {
        this.list = []
        await this.agencyParamsCallback({ pageNumber: 1 })
      }
      const { account, pageNumber, pageSize } = this.agencyParams
      const res = await transactionDetailsApi(this.agencyParams)
      const { code, data, totalRows } = res

      if (code === 0) {
        this.list = type ? data : [...this.list, ...data]
        this.dataFilter()
        const newPageNumber = pageNumber + 1

        this.setAgencyState({
          agencyParams: {
            ...this.agencyParams,
            pageNumber: newPageNumber
          }
        })
        this.isAll = false
        if (newPageNumber > totalRows / pageSize + 1) {
          this.isAll = true
          return
        }
        if (!data.length && account) {
          this.$toast({
            message: '无此账号数据~',
            duration: 1800
          })
        }
      }
    }
  },
  created () {
    accountListConfigApi().then(res => {
      if (res.code === 0) {
        this.detailtype = res.data
        res.data.map(item => {
          item.fuck = item[Object.keys(item)]
        })
        res.data.unshift({ null: '全部', fuck: '全部' })
        this.slots[0].values = res.data
      }
    })
    if (this.type_config.length === 0) {
      this.getTypeConfig()
    }
    this.setAgencyState({
      agencyFunc: this.getData,
      agencyParams: {
        account: null,
        pageNumber: 1,
        pageSize: 15,
        type: null
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
.blank {
  width: 3rem;
  display: block;
  margin: 2rem auto 0;
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
.nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.nav1:nth-child(even) {
  background: #eee;
}
.game-selector {
  margin: 10px;
  margin-top: 0;
  padding: 0 2%;
  width: 46%;
  border: 1px solid #ccc;
  height: 0.8125rem;
  line-height: 0.8125rem;
  border-radius: 0.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}
.mint-navbar {
  background: #eee;
}
.gamePopup {
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
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

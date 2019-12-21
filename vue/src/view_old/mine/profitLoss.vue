<style lang="scss" scoped>
.profitLoss {
  margin-top: 1.125rem;
}
.dateList {
  position: absolute;
  right: 5px;
  top: 1.125rem;
  border: 1px solid #d54545;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 3px;
  animation: slideDown .35s ease;
  li {
    width: 84px;
    line-height: 1.125rem;
    text-align: center;
    background: #fff;
  }
  .actived {
    background: #d54545;
    color: #fff;
  }
}
@keyframes slideDown {
  0% {
    height: 0;
  }
  100% {
    height: 254px;
  }
}
.menu-right {
  background: url('../../assets/images/mine/todayGrade.png') no-repeat;
  background-size: 25%;
  width: 86px;
  right: 4px;
  background-position: center;
}
.profitLoss-total {
  background: url('../../assets/images/mine/todayGrade.jpg') no-repeat 50%;
  background-size: cover;
  .profitLoss-total-details {
    padding: 5px 0;
    font-weight: normal;
    color: #fff;
    box-sizing: border-box;
    h3,
    h4,
    h5 {
      text-align: center;
      font-weight: normal;
    }
    h3 {
      line-height: 30px;
      font-size: 22px;
    }
    h4 {
      font-size: 16px;
      line-height: 28px;
    }
    h5 {
      font-size: 13px;
      line-height: 24px;
    }
  }
  .profitLoss-total-banlance {
    background: rgba(0, 0, 0, .1);
    position: relative;
    p {
      line-height: 22px;
      text-align: right;
      color: #fff;
      padding: 0 15px;
      font-size: 14px;
    }
    .shareImg {
      position: absolute;
      height: 28px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.profitLoss-redirect {
  margin-top: 10px;
  background: url('../../assets/images/mine/todayGrade2.jpg') no-repeat 50%;
  background-size: cover;
  display: flex;
  &>div {
    width: 50%;
    color: #fff;
    text-align: center;
    padding-top: .3125rem;
    padding-bottom: .1875rem;
    p {
      line-height: .8125rem;
      font-size: 18px;
      font-weight: 100;
    }
    h5 {
      line-height: .6875rem;
      font-size: 12px;
      font-weight: 40;
    }
    button {
      margin: 5px 0;
      line-height: .6875rem;
      height: .6875rem;
      color: #3ea9f3;
      background: #fff;
      border-radius: .6875rem;
      padding: 0 22px;
      font-size: 14px;
    }
  }
}
.profitLoss-content {
  padding: 15px;
  overflow: hidden;
  .profitLoss-block {
    float: left;
    text-align: center;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;
    width: calc((100% - 15px) / 2);
    box-shadow: 0 6px 6px rgba(0,0,0,.1);
    display: flex;
    height: 104px;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    color: #666;
    &:nth-child(even) {
      margin-left: 15px;
    }
    h2,
    h3,
    h5 {
      font-weight: 100;
    }
    h2 {
      line-height: 30px;
      font-size: 18px;
    }
    h3 {
      line-height: 24px;
      font-size: 16px;
    }
    h5 {
      padding: 0 5px;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <section class="profitLoss" v-close>
    <Head fixed>
      <h3>今日盈亏</h3>
      <a class="menu-right" @click="date = !date"></a>
      <ul class="dateList" v-show="date">
        <li
          v-for="d in dateList"
          :key="d.type"
          :class="{ 'actived': dateType === d.type }"
          @click="changeDate(d.type)"
        >
          {{ d.label }}
        </li>
      </ul>
    </Head>
    <div class="profitLoss-total">
      <div class="profitLoss-total-details">
        <h4 class="one-line">总盈亏额</h4>
        <h3 class="one-line">{{ data.profitMoney }}</h3>
        <h5 class="one-line">{{ data.calculation }}</h5>
      </div>
      <div class="profitLoss-total-banlance">
        <p class="one-line">账户余额</p>
        <p class="one-line">{{ getUserInfo.balance }}元</p>
        <img :src="canShare.img" class="shareImg">
      </div>
    </div>
    <div class="profitLoss-redirect">
      <div>
        <p>{{ rechargeAmount | numFixed(3) }}</p>
        <h5>今日已充值金额</h5>
        <button @click="$router.push('/recharge')">充值</button>
      </div>
      <div>
        <p>{{ withdrawAmount | numFixed(3) }}</p>
        <h5>今日已提现金额</h5>
        <button @click="withdrawalRedirect">提现</button>
      </div>
    </div>
    <div class="profitLoss-content">
      <div
        class="profitLoss-block"
        v-for="(b, index) in blockList"
        :key="index"
      >
        <h2>{{ b.amount }}￥</h2>
        <h3>{{ b.title }}</h3>
        <h5 v-if="b.explain">({{ b.explain }})</h5>
      </div>
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import { profitLossApi, getBankInfoApi } from 'Plugins/api'
import { mapGetters } from 'vuex'
export default {
  components: { Head },
  directives: {
    close: {
      inserted (el, binding, vnode) {
        /**
         * @author Cyan
         * @param {ElementNode} openIcon 展开按钮dom
         * @param {ElementNode} listDom 日历选择表dom
         * @param {VueObject} context 自身组件实例
         * @description 给当前页面绑定点击事件，判断点击的元素是否是展开按钮或者日历选择表本身，如果不是，则关闭日历选择表
         */
        const openIcon = document.querySelector('.menu-right')
        const listDom = document.querySelector('.dateList')
        function closeList (e) {
          if (!listDom.contains(e.target) && !openIcon.contains(e.target)) {
            const { context } = vnode
            context.date = false
          }
        }
        el.__vueCloseList__ = closeList
        el.addEventListener('click', closeList)
      },
      unbind (el) {
        el.removeEventListener('click', el.__vueCloseList__)
        delete el.__vueCloseList__
      }
    }
  },
  data () {
    return {
      data: {
        profitMoney: '0',
        calculation: ''
      },
      date: false,
      dateList: [
        { label: '今日', type: 'today' },
        { label: '昨日', type: 'yesterday' },
        { label: '本周', type: 'week' },
        { label: '上周', type: 'lastWeek' },
        { label: '本月', type: 'month' },
        { label: '上月', type: 'lastMonth' }
      ],
      dateType: 'today'
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    rechargeAmount () {
      return this.data.list ? this.data.list[0].amount : 0
    },
    withdrawAmount () {
      return this.data.list ? this.data.list[1].amount : 0
    },
    blockList () {
      return this.data.list ? this.data.list.slice(2) : []
    },
    canShare () {
      return +this.data.profitMoney !== 0
        ? { allow: false, img: require('../../assets/images/mine/todayGread_yellow.png') }
        : { allow: true, img: require('../../assets/images/mine/profit_share_unsel@3x.png') }
    }
  },
  methods: {
    async getData (type) {
      const { begin, end } = this.getTimeSection(type)
      const { account } = this.getUserInfo
      const res = await profitLossApi({ account, begin, end })
      this.data = res.data
    },
    changeDate (type) {
      this.dateType = type
      this.getData(type)
      this.date = false
    },
    async withdrawalRedirect () {
      // 获取用户银行卡信息，有无信息分别对应跳转到提现和绑定页面
      const res = await getBankInfoApi()
      const { code, data } = res
      if (code === 0) {
        this.Utils.Storage.save('bankInfo', data)
        this.$router.push('/withdraw')
      } else {
        this.$router.push('/withdrawal')
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

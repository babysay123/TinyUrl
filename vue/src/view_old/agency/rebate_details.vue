<template>
  <div style="height: calc(100vh - 1.125rem)">
    <!-- 提示 -->
    <p class="tips" v-if="showTip">
      <img src="/mobile/images/agent/2018-07-10_185938.jpg">
      温馨提示：{{ routeParams.name }}是基数2元1注的奖金模式,奖金÷2换算成赔率。
    </p>

    <div class="rebate-table">
      <div class="rebate-category">
        <div class="rebate-table-title">
          <!-- 斜线 -->
          <div class="rebate-table-line-1" />
          <div class="rebate-table-line-2" />

          <p style="text-align: right">返点</p>
          <p style="text-align: left">玩法</p>
        </div>

        <!-- 竖排玩法 -->
        <div
          class="rebate-table-block"
          v-for="b in list"
          :key="b.name"
        >
          {{ b.name }}
        </div>
      </div>

      <div class="rebate-ratio">
        <!-- 横向返点率和对应金额 -->
        <div
          class="rebate-table-numerical"
          v-for="r in ratioArr"
          :key="r.ratio"
        >
          <div>{{ r.ratio }}</div>

          <div v-for="(n, i) in r.nameRatio" :key="i">
            {{ n | numFixed(3) }}
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { rebateDetailsApi } from 'Plugins/api'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      list: [],
      ratioArr: []
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    routeParams () {
      const { name, lotteryId, code } = this.$route.query
      return { name, lotteryId, code, title: `${name} 赔率表` }
    },
    showTip () {
      const { lotteryId } = this.routeParams
      return lotteryId !== 1 && lotteryId !== 9
    }
  },
  methods: {
    async getData () {
      const { lotteryId } = this.routeParams
      const res = await rebateDetailsApi({ lotteryId })
      this.list = res.data
      this.setRatioArr()
    },
    setRatioArr () {
      /**
       * @author Cyan
       * @constant {Array} ratioArr 横向返点渲染数组
       * @constant {Array} shareCodes 用户彩种分享等级数组
       * @constant {String} code 彩种 Name
       * @constant {String} ratio 0-9 逐加 .1 返点率
       * @constant {String} nameRatio 玩法 Name
       * @description 根据返回的最大最小赔率与用户分享等级计算出 各个返点率的金额
       */
      const ratioArr = []

      /** 获取 用户分享等级数组 彩种 Name */
      const { shareCodes } = this.getUserInfo
      const { code } = this.routeParams

      /** 查找分享数组中对应彩种的 分享数值 */
      const share = shareCodes.find(e => e.lotteryClassName === code).share || 9

      /** 循环 0-9 的返点率 */
      for (let r = 0; r <= share; r += 0.1) {
        const ratio = parseInt(r) === r ? r : r.toFixed(1)

        /** 计算玩法和返点率对应下的实际金额 */
        const nameRatio = this.list.length && this.list.map(e => {
          const { maxPrize, minPrize } = e
          return (maxPrize - minPrize) * (+ratio / share) + minPrize
        })

        ratioArr.push({ ratio, nameRatio })
      }

      this.ratioArr = ratioArr.reverse()
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    const { title } = this.routeParams
    document.title = title

    /** 表头斜线 div 需动态获取宽度 */
    const line1 = document.querySelector('.rebate-table-line-1')
    const line2 = document.querySelector('.rebate-table-line-2')

    line1.style.borderRightWidth = line1.clientWidth + 'px'
    line2.style.borderRightWidth = line2.clientWidth + 'px'
  }
}
</script>

<style scoped>
.tips {
  font-size: 12px;
  color: #999;
  padding: 5px;
  line-height: 18px;
  word-break: break-all;
  background: #fff;
}

.rebate-table {
  display: flex;
  width: 100%;
  line-height: 38px;
  text-align: center;
  background: #fff;
  font-size: .37rem;
}

.rebate-category>.rebate-table-block:nth-child(odd),
.rebate-table-numerical>div:nth-child(odd),
.rebate-table-title {
  background: #eee
}

.rebate-table-title {
  height: 38px;
  line-height: 19px;
  position: relative;
  padding: 0 10px;
}

.rebate-table-title p {
  position: relative;
  z-index: 2;
}

.rebate-table-line-1,
.rebate-table-line-2 {
  position: absolute;
  content: '';
  width: 100%;
  height: 0;
  left: 0;
  top: 0;
  border-color: transparent transparent #bbb transparent;
  border-style: solid;
  border-bottom-width: 38px;
  border-left-width: 0;
  border-top-width: 0;
}

.rebate-table-line-2 {
  top: 1px;
  border-color: transparent transparent #eee transparent;
}

.rebate-category {
  width: 44%;
  box-shadow: 0.15rem 0 0.35rem #d5d5d5;
  z-index: 2;
}

.rebate-ratio {
  width: 56%;
  overflow-x: auto;
  white-space: nowrap;
}

.rebate-table-block {
  white-space: nowrap;
}

.rebate-table-numerical {
  display: inline-block;
}

.rebate-table-numerical>div {
  padding: 0 15px;
}
</style>

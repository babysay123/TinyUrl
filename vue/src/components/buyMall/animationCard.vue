<template>
  <div
    class="animation-card"
    :class="[ cardClasses.card ]"
    @click="
      data.lotteryId < 10000
      ? routerLink({ path: '/lottery', params: { lotteryId: data.lotteryId } })
      : routerLink({ path: '/mobile/lottery/lotteryFootBall.html', redirect: true })
    "
  >

    <img :class="[ cardClasses.icon ]" :src="`/mobile/images/index/${data.icon}.png`">

    <div class="buyMall-card-info">

      <div class="buyMall-card-block">
        <span style="font-size: .373rem">{{ data.name }}</span>
        <span v-if="!tile && !data.indexDesc && data.lastIssue" class="text-gray" style="font-size: .29rem">第{{ data.lastIssue }}期</span>
      </div>

      <div class="buyMall-card-block">

        <template v-if="tile">
          <span v-if="data.currentIssue" class="text-gray one-line" style="font-size: .29rem">第{{ data.currentIssue }}期</span>
        </template>

        <template v-else>

          <template v-if="typeof resultParser === 'object' && data.currentIssue.indexOf('停盘') === -1">
            <ResultType
              size="sm"
              :data="resultParser"
              :type="gameType"
              :ball="false"
            />
          </template>

          <template v-else>
            <span class="text-red">{{ resultParser || data.currentIssue }}</span>
          </template>

          <img src="/mobile/images/menu/NOEERigthArrow_hui@2x.png" height="14px">
        </template>

      </div>

      <div class="buyMall-card-block">

        <template v-if="!data.indexDesc && (data.currentIssue && data.currentIssue.indexOf('停盘') === -1)">
          <span v-if="!tile" class="text-gray">距离第{{ data.currentIssue }}期还有</span>
          <CountDown
            v-if="!data.indexDesc"
            :gameId="data.lotteryId"
            :name="data.name"
            class="text-red"
          />
        </template>

        <span v-else class="text-gray">{{ data.indexDesc || data.currentIssue }}</span>
      </div>

    </div>

  </div>
</template>

<script>
import ResultType from '../result/resultType'
import CountDown from '../global/countdown_new'
export default {
  props: {
    tile: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: { ResultType, CountDown },
  computed: {
    cardClasses () {
      return {
        card: this.tile ? 'buyMall-tile-card' : 'buyMall-cell-card',
        icon: this.tile ? 'buyMall-tile-icon' : 'buyMall-cell-icon'
      }
    },
    resultParser () {
      // 判断是否是足彩
      if (this.data.lastLuckyNumbers) {
        // 开奖状态返回文字，已开奖返回开奖结果
        if (this.data.lastLuckyNumbers === '正在开奖') {
          return this.data.lastLuckyNumbers
        } else {
          return this.data.lastLuckyNumbers.split(',').map(e => e)
        }
      } else {
        return ''
      }
    },
    gameType () {
      // 根据游戏类型渲染不同的排版
      if (this.data.lotteryClassName.indexOf('QuickThree') > -1) {
        return 'touzi'
      }
      if (this.data.lotteryClassName.indexOf('Luck28') > -1 || this.data.lotteryClassName.indexOf('PCEggs') > -1) {
        return 'pcdd'
      }
      if (this.data.lotteryClassName.indexOf('SixMark') > -1) {
        return 'lhc'
      }
      return 'quanquan'
    }
  }
}
</script>

<style lang="scss" scoped>
.animation-card {
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
  &,
  * {
    transition: .55s ease;
  }
}

.buyMall-tile-card {
  width: calc((100% - 13px) / 2);
  display: flex;
  float: left;
  padding: 7.5px 10px;
  padding-right: 0;
  margin-bottom: 13px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, .1);
  border-radius: 5px;
  &:nth-child(odd) {
    margin-right: 13px;
  }
  .buyMall-tile-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}

.buyMall-cell-card {
  width: 100%;
  padding: 2.5px 10px;
  border-bottom: 1px solid #f5f4f9;
  .buyMall-cell-icon {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
}

.buyMall-card-info {
  flex: 1;
  max-width: calc(100% - 50px);
  .buyMall-card-block {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    height: 20px;
    line-height: 20px;
  }
}
</style>

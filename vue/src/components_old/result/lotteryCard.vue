<style lang="scss" scoped>
.lottery-card {
  height: 80px;
  padding: 10px;
  border-bottom: 1px solid #f5f4f9;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
}
.lottery-card:active {
  background: rgba(173, 235, 255, .7);
}
.lottery-card-icon {
  width: 60px;
  height: 60px;
  float: left;
  margin-right: 10px;
  img {
    width: 60px;
    height: 60px;
  }
}
.lottery-card-info {
  float: right;
  width: calc(100% - 70px);
  height: 60px;
  .lottery-card-block {
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<template>
  <div class="lottery-card">
    <div class="lottery-card-icon">
      <img :src="setIcon">
    </div>
    <div class="lottery-card-info">
      <div class="lottery-card-block">
        <span style="font-size: 15px">{{ data.name }}</span>
        <span v-if="!data.indexDesc" class="text-gray">第{{ data.lastIssue }}期</span>
      </div>
      <div class="lottery-card-block">
        <template v-if="typeof resultParser === 'object'">
          <ResultType
            size="sm"
            :data="resultParser"
            :type="gameType"
            :ball="false"
          />
        </template>
        <template v-else>
          <span class="text-red">{{ resultParser }}</span>
        </template>
        <img src="/mobile/images/bet/NOEERigthArrow_hui.png" width="10px" height="10px">
      </div>
      <div class="lottery-card-block">
        <span v-if="!data.indexDesc" class="text-gray">距离第{{ data.currentIssue }}期还有</span>
        <span v-else class="text-gray">{{ data.indexDesc }}</span>
        <CountDown
          v-if="!data.indexDesc"
          :systemTime="+system_time"
          :endTime="+data.deadline"
          :gameId="data.lotteryId"
          class="text-gray"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ResultType from './resultType'
import CountDown from '../global/countdown'
import LotteryIcon from 'Plugins/utils/LotteryIcon'
export default {
  components: { ResultType, CountDown },
  props: {
    data: {
      type: Object,
      required: true
    },
    system_time: {
      type: [ Number, String ],
      required: true
    }
  },
  computed: {
    resultParser () {
      // 判断是否是足彩
      if (this.data.lastLuckyNumbers) {
        // 开奖状态返回文字，已开奖返回开奖结果
        if (this.data.lastLuckyNumbers === '正在开奖') {
          return this.data.lastLuckyNumbers
        } else {
          return this.data.lastLuckyNumbers.split(',').map(e => +e)
        }
      } else {
        return ''
      }
    },
    gameType () {
      // 根据游戏类型渲染不同的排版
      if (this.data.lotteryId === 1 || this.data.lotteryId === 27 || this.data.lotteryId === 30 || this.data.lotteryId === 31) {
        return 'dice'
      }
      if (this.data.lotteryId === 7 || this.data.lotteryId === 17 || this.data.lotteryId === 47) {
        return 'luck'
      }
      if (this.data.lotteryId === 9 || this.data.lotteryId === 28 || this.lotteryId === 48) {
        return 'zodiac'
      }
      return 'common'
    },
    setIcon () {
      return LotteryIcon(this.data.icon)
    }
  }
}
</script>

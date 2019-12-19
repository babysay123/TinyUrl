<template>
  <div class="rebateList">
    <div
      class="rebate-block"
      v-for="r in list"
      :key="r.lotteryId"
      @click="routerLink({
        path: '/rebate_details',
        params: {
          lotteryId: r.lotteryId,
          name: r.name,
          code: r.code
        }
      })"
    >
      <img :src="`/mobile/images/agent/return${r.icon}.png`">

      <p>{{ r.name }}</p>
    </div>
  </div>
</template>

<script>
const list = [
  { name: '时时彩', lotteryId: 4, icon: 1, code: 'FrequentLottery' },
  { name: '快3', lotteryId: 1, icon: 4, code: 'QuickThree' },
  { name: '11选5', lotteryId: 5, icon: 5, code: 'ElevenPickFive' },
  { name: '排列3', lotteryId: 2, icon: 6, code: 'Three' },
  { name: '快乐8', lotteryId: 7, icon: 7, code: 'PCEggs' },
  { name: '北京赛车', lotteryId: 3, icon: 8, code: 'PK10' },
  { name: '六合彩', lotteryId: 9, icon: 10, code: 'SixMark' }
]
export default {
  data () {
    return {
      list
    }
  }
}
</script>

<style scoped>
.rebateList {
  padding-top: 40px;
}

.rebate-block {
  width: 33.333%;
  width: calc(100% / 3);
  text-align: center;
  margin-bottom: 40px;
  display: inline-block;
}

.rebate-block img {
  width: 65%;
  display: block;
  margin: 0 auto 10px;
}

.rebate-block p {
  font-size: .4rem;
}
</style>

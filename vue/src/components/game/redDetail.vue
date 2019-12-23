<!-- -->
<template>
  <section>
    <Head style="color: #fff;">红包详情</Head>
    <section class="hbDefaile-main">
      <div class="hbDetails-banner fw">
        <!-- <img
          :src="!data.sendHeadImg || data.sendHeadImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : data.sendHeadImg"
          class="hbDetails-avatar"> -->
        <p class="hbDetails-name">{{ data.sendNickname }}</p>
        <p class="hbDetails-money">发 ￥{{ data.totalAmount }}</p>
        <!-- <img src="/mobile/images/chatroom/chat_red_complete.png" class="hbDetails-end" v-if="data.hadTakenList.length === data.totalNumber"> -->
        <!-- <img v-if="data.hadTakenList.length !== data.totalNumber" src="/mobile/images/chatroom/chat_red_complete2.png" class="hbDetails-end"> -->
        <p class="hbDetails-nonsense">{{ data.headMsg ? data.headMsg : data.detailMsg }}</p>
      </div>
      <p class="hbDetails-prompt">
        收到的钱已存入彩友账户, 如需查询可查询交易记录
      </p>
      <!--收到的钱已存入彩友账户, 如需查询可查询交易记录-->
      <!-- <p class="hbDetails-related">
        领取人<span class="hbDetails-related-sp">已领取&ensp;{{ data.hadTakenList && data.hadTakenList.length }}/{{ data.totalNumber }}，{{ data.hadTakeAmount.toFixed(2) }}/{{ data.totalAmount.toFixed(2) }}元</span>
      </p> -->
      <ul>
        <li class="hbDetails-explain fw" v-for="(item, index) in data.hadTakenList" :key="index">
          <!-- <img
            :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg"
            class="hbDetails-explain-avatar dInV"> -->
          <div class="hbDetails-explain-info dInV fw">
            <span class="hbDetails-explain-name">{{ item.nickname }}</span>
            {{ item.takeTime }}
          </div>
          <div class="hbDetails-explain-moneys dInV">
            <span class="hbDetails-explain-money" :class="{line: item.luckyStar === false}">￥ {{ item.amount.toFixed(2) }}</span>
            <div v-if="item.luckyStar">
              <!-- <img src="../../../assets/images/chatroom/chat_red_lucky.png" class="hbDetails-explain-money-img"> -->
              运气王
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Head from 'Components/global/head'
export default {
  // props: ['data'],
  name: 'betting-hbDefaile',
  data () {
    return {
      data: {}
    }
  },
  methods: {
    HeadBack () {
      this.$emit('redDetailsisShow')
    }
  },
  watch: {
    // 'data': {
    //   handler (newVal) {
    //     this.data = newVal
    //   },
    //   deep: true
    // }
  },
  components: {
    Head
  }
}
</script>

<style lang="scss" scoped>
  .hbDetails-banner {position: relative; margin-top: 1.125rem; height: 4.5rem;/*background: url(../../../assets/images/chatroom/chat_red_bg.png) no-repeat; background-size: cover;*/}
  .hbDetails-avatar {position:absolute;left:.4rem;top:.7rem;width:2rem;height:2rem;background:#fff;border-radius:50%;}
  .hbDetails-name {margin:1.1rem 0 0 2.8rem;font-size:.4rem;color:#EFEEEE;}
  .hbDetails-money {margin:.3rem 0 0 2.8rem;font-size:.5rem;color:#FCFF00;}
  .hbDetails-end {position:absolute;right:.4rem;top:.9rem;width:1.6rem;height:1.6rem;line-height:2rem;}
  .hbDetails-nonsense {padding: 1rem 10px 0 10px;text-align:left;font-size:0.4375rem;color:#EFEEEE;}
  .hbDetails-prompt {color:#898989;text-indent:.3rem;line-height:.85rem;height:.8rem;background:#fff;}
  .hbDetails-related {padding:0 .2rem;height:1rem;line-height:1rem;font-size:.4rem;color:#333;}
  .hbDetails-related-sp {font-size:.35rem;float:right;}
  .hbDetails-explain {position:relative;padding:0 .2rem;margin-bottom:1px;height:2.2rem;line-height:2.2rem;background:#fff;color:#666666;}
  .hbDetails-explain-avatar {width:1.5rem;height:1.5rem;background:#F4B7B7;border-radius:50%;}
  .hbDetails-explain-info {padding-left:.3rem;line-height:.7rem;font-size:.35rem;}
  .hbDetails-explain-name {display:block;font-size:.45rem;}
  .hbDetails-explain-moneys {position:absolute;font-size:.35rem;right:.3rem;bottom:0;top:0;margin:auto 0;height:50%;text-align:center;line-height:.6rem;}
  .hbDetails-explain-money-img {float:left;margin-right:.2rem;width:.6rem;height:.48rem;}
  .line {line-height:1.2rem;}
</style>

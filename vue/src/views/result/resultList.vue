<style lang="scss" scoped>
.result {
   margin-top: .125rem;
    padding-bottom: 17px;
    height: calc(100vh - 1.125rem - 52vw);
    overflow-y: auto;
    position: fixed;
    top: 53vw;
    width: 100%;
    left: 0;
    right: 0;
}
.divider-title{
  margin-top: 1.125rem;
}
.winningBg {
    position: fixed;
    // overflow: scroll;
    width: 100%;
    background-color:#f5f5f5;
}
.winningBg img{
    width: 100%;
    &:first-child{
      position: absolute;
      z-index: -1;
      left: 0;
      right: 0;
    }
}
.newestWinning{
  float: left;
}

.roll-notice{
    position: fixed;
    z-index: 2;
    width: 100%;
    z-index: 3;
    background: transparent;
    //   top: 115px;
    // height: 115px;
    height:25vw;
    top:26vw;
    color:#fff;
    font-weight: normal;
    padding: 0 25px;
    // overflow: hidden;
    // width: 93.33333333vw;
    // height: 25.06666667vw;
    // position: relative;
    // overflow: hidden;
    // margin: 0 auto
}
// .rool-notice li{
// }

</style>
<style>
.winningBg .text-red {
  color: #fff;
}
.winningBg .one-line:first-child {
  text-align: left;
}
</style>

<template>
  <section>
    <Head :back="false" fixed>
      <!-- 最新中奖榜 -->
      <div class="winningBg">
        <img src="./../../assets/images/chatroom/zjbj.png">
        <img class="newestWinning" src="./../../assets/images/chatroom/zxzjbd.png">
        <RollNotice :data="records"/>
      </div>
    </Head>
    <div class="resultBox" >
      <!-- 开奖 -->
      <div class="result" ref="result">
        <RefreshLoad :pullload="getData">
          <ResultCard :data="data"/>
        </RefreshLoad>
      </div>
    </div>
    <NavBottom/>
  </section>
</template>

<script>
import DividerTitle from 'Components/index/dividerTitle'
import RollNotice from 'Components/index/rollNotice'
import { noticeApi, resultListApi } from 'Plugins/api'
import Head from 'Components/global/head_new'
import NavBottom from 'Components/global/nav-bottom'
import ResultCard from 'Components/result/resultCard.js'
import RefreshLoad from 'Components/global/refreshLoad'

export default {
  components: {
    Head,
    NavBottom,
    ResultCard,
    RefreshLoad,
    DividerTitle,
    RollNotice
  },
  data () {
    return {
      data: [],
      records: [],
      imgurl: './../../assets/images/chatroom/zxzjbd.png'
    }
  },
  methods: {
    async getData () {
      const res = await resultListApi()
      this.data = res.data
    },
    async getDataList () {
      const resList = await noticeApi()
      const { records } = resList.data
      this.records = records
    }
  },
  created () {
    this.$nextTick(() => {
      this.getData()
      this.getDataList()
    })
  }
}
</script>

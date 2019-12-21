<style lang='scss' scoped>
.result-details-container {
  height: calc(100vh - 2.25rem);
  overflow-y: auto;
}

.all-tip,
.infinite-loading {
  text-align: center;
  line-height: 40px;
}
.goBet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.125rem;
  line-height: 1.125rem;
  text-align: center;
  font-size: 14px;
  color: #fff;
  /* background: #d81e06; */
}
.goBet:active {
  opacity: .7;
}

  // position: relative;
  .set-icon{
    position: absolute;
    right: -2.5vw;
    top: 1.5vw;
    img{
      width: 38%;
    }
  }

.resultBox {
  display: flex;
  padding-top: 25vw;
  flex-wrap: nowrap;
  .resultItem {
    width: 100vw;
    transition: transform 0.5s ease-in-out;
  }
}
.sixtop{
  padding-top: 15vw;
}
  .trendCanvas {
    padding: 24vw 0 0 0;
    // transform: translate(100%);
    // background-color:#fff;
  }
  // &.showtrend {
  //   .resultItem {
  //     transform: translate(-100%);
  //   }
  //   .trendCanvas {
  //     transform: translate(0);
  //   }
  // }

.fixed-box {
    position: fixed;
    top: 11vw;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 8;
    .quantileNav{
          border-top: 2px solid #f5f5f5;
          border-bottom: 2px solid #f5f5f5;
        }
    .selectbox{
        position: relative;
        width: 90%;
        margin: 0 auto;
        background: none;
        display: -ms-flexbox;
        display: flex;
        justify-content:space-between;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-family: Microsoft YaHei,Arial,"sans-serif";
        /* vertical-align: baseline; */
        box-sizing: border-box;
        .game-sel-box{
        width: 42%;
        margin-right: 2rem;
        position: relative;
        height: 1rem;
        margin: .2rem auto;
        border-radius: .24rem;
        color: #000;
        font-size: .4rem;
        background: #f5f5f5;
        display: flex;
        margin-left: 0;
        align-items: center;
              p{
                  position: relative;
                  padding: 0.3rem;
                  z-index: 9;
                  font-size: 0.35rem;
              }
        &::after{
              position: absolute;
              content: " ";
              height: 10px;
              width: 10px;
              border-width: 2px 2px 0 0;
              top: 50%;
              right: .56rem;
              margin-top: -8px;
              border-style: solid;
              transform: rotate(135deg);
              z-index: 8;
              border-color: #cf271e;
        }
        }
        .btn{
          width: 42%;
          margin: .2rem 0;
          background-color: #cf271e;
          border-radius: 5px;
          color: #fff;
          font-size: 0.4rem;
          height: 1rem;
          display: flex;
          align-items: center;
          text-align: center;
           a{
              margin: 0 auto
           }
        }
    }
}
</style>

<template>
  <section style="margin-top: 1.125rem;">
    <Head fixed>
      <!-- <h3>{{ queryParams.name }}</h3> -->
      <h3>开奖结果</h3>
      <a class="set-icon" @click="setting()" v-if='set'><img src="../../assets/images/set-icon.png" alt=""></a>
    </Head>
    <!-- 下拉选择彩票 -->
    <div class="fixed-box">
      <div class="selectbox">
        <div class="game-sel-box" @click="choice()">
          <p>{{queryParams.name}}</p>
        </div>
        <div class="btn"><a @click="$router.push({ path: '/lottery', query: { lotteryId: queryParams.lotteryId } })">去投注</a></div>
      </div>
      <!-- 开奖走势导航 -->
      <quantileTab class="quantileNav" @tabChange="tabChange" :sumNum="sumNum" v-if="sumNum" :Tabindex='Tabindex'></quantileTab>
    </div>
     <!-- 开奖 -->
     <div class="resultBox" v-if="!isShowTrend" :class="{sixtop:!this.sumNum}">
      <div
        class="resultItem result-details-container"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="infinite"
        :infinite-scroll-distance="10"
      >
        <RefreshLoad :pullload="getData">
          <ResultCard :data="data" type="details" />
        </RefreshLoad>
      </div>
      <div v-if="isAll" class="all-tip">已加载完所有数据</div>
    </div>
    <!-- 走势 -->
      <div class="resultItem trendCanvas" ref="trendCanvas" v-if="isShowTrend&&sumNum">
        <!-- 走势canvas 组件 -->

         <canvasTrend :data='data' :nums='nums' :trendTab='trendTab' :hierarchy='hierarchy' :count='count'

     ></canvasTrend>

      </div>
    <!-- <div class="goBet bg-col" @click="$router.push({ path: '/lottery', query: { lotteryId: queryParams.lotteryId } })">去投注</div> -->

    <!-- 显示设置 -->
    <resultSetting :settingList="settingList" @determine="determine" :popupVisible='setVisible' :periods='periods' :select='select'></resultSetting>
    <!-- 选择彩种走势 -->
    <switchVariety v-model="switchVisible" :title="queryParams.name" @queryLottery="queryLottery"  @cancel="cancel"></switchVariety>
    <!-- <NavBottom/> -->
  </section>
</template>

<script>
import Head from 'Components/global/head'
import ResultCard from 'Components/result/resultCard.js'
import RefreshLoad from 'Components/global/refreshLoad'
// import NavBottom from 'Components/global/nav-bottom'
import resultSetting from 'Components/result/setting'
import switchVariety from 'Components/result/switchVariety'
import quantileTab from 'Components/result/quantileTab'
import canvasTrend from 'Components/result/canvasTrend.vue'
import { resultListApi } from 'Plugins/api'
import { mapGetters } from 'vuex'
export default {
  components: { Head,
    ResultCard,
    // NavBottom,
    RefreshLoad,
    resultSetting,
    switchVariety,
    quantileTab,
    canvasTrend },
  data () {
    return {
      data: [],
      set: true, // 默认为true
      // data2: [], // 走势图的数据
      page: 1,
      count: 20, // 请求的期数量
      select: '20', // 默认查看期数为20
      infinite: true,
      isAll: false,
      sumNum: 3, // 传给tab的  控制显示tab的个数
      nums: {
        start: 1,
        end: 6
      }, // 传canvas 控制显示的列数
      trendTab: 0, // 走势tab
      Tabindex: 0, // 当选择完彩种后 外面tab要回到开奖
      // queryParams: {
      //   lotteryId: 44
      // },
      lotteryId: 1,
      switchVisible: false, // 控制选择彩种模态框是否显示
      setVisible: false,
      hierarchy: {
        brokenLine: 'true', omission: 'true', statistics: 'true', layered: 'true'
      }, // 传递canvas的 控制显示放上
      isShowTrend: false, // 是否显示走势及走势导航
      resultDom: null, // 开奖 dom 主要用于导航切换时操作dom
      trendCanvasDom: null, // 走势 canvas dom
      // queryParams.name: '一分快三', // 当前彩种名称
      periods: { label: '期数', value: '20', key: 'periods' },
      settingList: [
        { label: '折线', value: true, key: 'brokenLine' },
        { label: '遗漏', value: true, key: 'omission' },
        { label: '统计', value: true, key: 'statistics' },
        { label: '分层', value: true, key: 'layered' }
      ]
    }
  },
  computed: {
    ...mapGetters(['lotteryVarietyConfig']),
    queryParams () {
      // 解析路由传参
      return this.$route.query
    }
  },
  methods: {
    choiceTab (id) {
      let lotteryItems = {
        FrequentLottery: [4, 6, 45, 12, 11, 55, 61, 62, 63],
        ElevenPickFive: [49, 39, 5, 13, 15, 14, 52],
        QuickThree: [44, 37, 38, 36, 35, 34, 33, 32, 27, 31, 1, 30, 50],
        PK10: [3, 8, 46, 43, 29, 51, 58, 59, 60],
        PCEggs: [7, 17, 47, 54, 56, 57],
        FrequentHappy: [42, 40, 41, 2, 18, 10],
        SixMark: [28, 9, 48, 53],
        Seven: [64, 65, 66]
      } // 虽然代码是简单冗余了点 但是很好理解啊
      // console.log(typeof id)
      // if (!id.test(/\d+/g)) {

      //   return
      // }
      id = +id
      if (lotteryItems.FrequentLottery.includes(id)) {
        this.sumNum = 5 // 时时彩
        this.nums.start = 0
        this.nums.end = 9
        this.set = true
      } else if (lotteryItems.ElevenPickFive.includes(id)) {
        this.sumNum = 5 // 11选5
        this.nums.start = 1
        this.nums.end = 11
        this.set = true
      } else if (lotteryItems.QuickThree.includes(id)) {
        this.sumNum = 3 // 快三
        this.nums.start = 1
        this.nums.end = 6
        this.set = true
      } else if (lotteryItems.PK10.includes(id)) {
        this.sumNum = 10 // PK10
        // console.log(this.sumNum)
        this.nums.start = 1
        this.nums.end = 10
        this.set = true
      } else if (lotteryItems.PCEggs.includes(id)) {
        this.sumNum = 3 // PCEggs
        this.nums.start = 0
        this.nums.end = 9
        this.set = true
      } else if (lotteryItems.FrequentHappy.includes(id)) {
        this.sumNum = 3 // 3d
        this.nums.start = 0
        this.nums.end = 9
        this.set = true
      } else if (lotteryItems.SixMark.includes(id)) {
        this.sumNum = 0 // 六合彩不显示走势图
        this.nums.start = 0
        this.nums.end = 0
        this.isShowTrend = false
        this.set = false
      } else if (lotteryItems.Seven.includes(id)) {
        this.sumNum = 4 // 七星彩
        this.nums.start = 0
        this.nums.end = 9
        this.set = true
      }
    },
    cancel () {
      this.getData()
      // console.log('舒心')
    },
    choice () {
      this.switchVisible = !this.switchVisible
    },
    setting () {
      this.setVisible = !this.setVisible
    },
    async getData () {
      // 获取数据
      // console.log('get')
      this.page = 1
      const { lotteryId } = this.queryParams
      const res = await resultListApi({ lotteryId, page: this.page })
      this.data = res.data
    },
    async loadMore () {
      // 滚动加载
      // console.log('get1')
      if (!this.isAll) {
        this.infinite = false
        const { lotteryId } = this.queryParams
        if (this.page > 5) {
          this.$toast({
            message: '小主，只能查看进100期哦',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        const res = await resultListApi({ lotteryId, page: this.page })
        // if (this.page === 1 && this.count === 20) { this.data2 = res.data }
        this.page++
        this.data = [ ...this.data, ...res.data ]
        this.infinite = true
        this.isAll = res.data.length !== 20
      }
    },
    async loadMore2 () {
      this.page = 1
      const { lotteryId } = this.queryParams
      const res = await resultListApi({ lotteryId, page: this.page, count: this.count })
      this.data = res.data
    },
    // 当有走势选项时，将通过tab切换开奖与走势canvas并通过传递相关参数对canvas重新渲染
    tabChange (index) {
      // console.log('index', index)
      this.trendTab = index
      this.Tabindex = index
      // if (!this.isShowTrend) {
      //   console.log('没有走势信息，这段代码不应该执行，骚年~')
      //   return false
      // }
      if (index === 0) {
        // 显示开奖信息
        this.isShowTrend = false
      } else {
        // 显示走势信息
        this.isShowTrend = true
      }
    },
    // FIXME: 注意，当前页面没有放置该组件的打开触发开关，请在页面上布局 设置
    determine (data, sel) {
      this.hierarchy.brokenLine = data.brokenLine
      this.hierarchy.omission = data.omission
      this.hierarchy.statistics = data.statistics
      this.hierarchy.layered = data.layered
      // console.log('sel', sel)
      this.count = sel
      this.select = sel
      // console.log(this.count)
      this.loadMore2()
      // console.log(this.hierarchy)
      // TODO: data 为走势图的设置结果对象，请获取到值后进行下一步canvas重绘
      // console.log(data)
    },
    // TODO: 选择彩种 开关
    queryLottery (lottery) {
      // this.queryParams.name = lottery.name
      this.queryParams.lotteryId = lottery.lotteryId
      this.select = '20'
      this.queryParams.name = lottery.name
      this.choiceTab(lottery.lotteryId)
      this.$nextTick(() => {
        document.querySelector('.resultItem').scrollTop = 0
      })
      // console.log('scroll', document.querySelector('.re').scrollTop)
      this.isShowTrend = false
      // this.Tabindex++
      // console.log(lottery)
      this.tabChange(0)

      // TODO: 在这里判断是否应该显示走势图，部分彩种不会显示走势图，只显示开奖结果，通过设置 isShowTrend来开关走势图及走势导航
      // 判断什么彩票对应什么的tab头 我晕了，，，
      // console.log('caip', this.queryParams.lotteryId)
    }
  },
  created () {
    // console.log(this.$route.query)
    this.choiceTab(this.queryParams.lotteryId)
    // console.log(this.data2)
    this.$nextTick(() => {
      this.settingList.map(item => {
        item.value = this.lotteryVarietyConfig[item.key]
      })
    })
    // 没有传参则返回至开奖列表
    const { name, lotteryId } = this.queryParams
    if (!name || !lotteryId) {
      this.routerLink({ path: '/resultList' })
    }
  }
}
</script>

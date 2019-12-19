<template>
  <section class="laws-layout">
    <ul class="nav">
      <li
        v-for="(item, i) in oneData"
        :key="i + '-layout-slide'"
        @click="onSwitch(item, i)"
        :class="activeIndex === i ? 'activenav' : ''"
      >
        <img :src="item.imageUrl" alt="">
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <ul class="childList">
      <!-- v-show="isShow === 'all' ? true : isShow === item.label ? true : false" -->
      <li
        v-for="(item, i) in lotteryList"
        :key="i + '-layout-lottery'"
        @click="onChange(item)"
        :class="{
          'activeListnav': activeLotteryId * 1 === item.gameKindId
        }"
      >
        {{ item.gameName }}
      </li>
    </ul>
  </section>
</template>

<script>
import {
  getPlatformApi,
  getGameDetailsApi
} from 'Plugins/api'

export default {
  name: 'lotteryLayout',
  data () {
    return {
      title: '',
      oneData: [],
      lotteryList: [],
      // lotteryId: -1,
      activeIndex: 0
    }
  },
  props: {
    hasFull: {
      type: Boolean | Number
    },
    // 联动选中
    activeLotteryId: {
      type: String | Number
    },
    football: {
      type: Boolean,
      default: true
    }
    // oneData: {
    //   type: Array
    // },
    // lotteryList: {
    //   type: Array
    // },
    // // isShow: {
    // //   type: String
    // // },
    // activeIndex: {
    //   type: Number | String
    // }
  },
  computed: {},
  methods: {
    onSwitch (item, i) {
      if (this.activeIndex === i) {
        return
      }
      this.activeIndex = i
      this.getLotteryList(item)
      this.$emit('toSlide', item, i)
    },
    onChange (item) {
      this.$emit('toChange', item)
      // // 跳转
      // let _paymentArr = this.$store.getters.getPayments
      // if (_paymentArr && _paymentArr.length > 0) {
      //   this.popupTips = true
      //   this.tipsData = {
      //     title: '切换彩种，需要要清空已投注内容。',
      //     yes: () => {
      //       this.popupRight = false
      //       this.popupTips = false
      //       this.$store.dispatch('removePayments', 'clear')
      //       this.$router.push({
      //         path: '/lottery',
      //         query: {
      //           ...this.$route.query,
      //           lotteryId: item.gameKindId
      //         }
      //       })
      //     },
      //     no: () => {
      //       this.popupRight = false
      //       this.popupTips = false
      //     }
      //   }
      // } else if (item.gameKindId <= 10000) {
      //   this.Lottery.lotteryResult = false
      //   // window.history.back(1)
      //   this.popupRight = false
      //   let lotteryArr = this.Utils.Storage.get('lotteryArr')
      //   if (lotteryArr) {
      //     let lotteryArrLeng = lotteryArr.length
      //     for (let i = 0; i < lotteryArrLeng; i++) {
      //       if (item.gameKindId === lotteryArr[i].lotteryId) {
      //         this.$store.getters.getLayoutMsg.name = lotteryArr[i].name
      //         this.$store.getters.getLayoutMsg.lotteryId = lotteryArr[i].lotteryId
      //       }
      //     }
      //   }
      //   this.$router.push({
      //     path: '/lottery',
      //     query: {
      //       ...this.$route.query,
      //       lotteryId: item.gameKindId
      //     }
      //   })
      // } else if (item.lotteryId > 10000) {
      //   window.location.href = '/mobile/lottery/lotteryFootBall.html'
      // }
    },
    async getPlatform () {
      const { code, data } = await getPlatformApi({
        platformType: 'lottery',
        type: 1
      })
      if (code === 0) {
        console.log(this.football)
        data.data.map((e, index) => {
          if (!this.football && e.platformCode === 'appAthletics') {
            data.data.splice(index, 1)
          }
        })
        this.oneData = data.data
      }
    },
    async getLotteryList (item) {
      const { code, data, msg } = await getGameDetailsApi({
        platformCode: item.platformCode,
        platformType: 'lottery'
      })
      if (code === 0) {
        this.lotteryList = data
        if (
          this.hasFull &&
          item.platformCode === 'appAllLottery'
        ) {
          this.lotteryList.unshift({
            gameName: '全部',
            gameKindId: -1,
            platformCode: 'appAllLottery'
          })
        }
      } else {
        this.$toast(msg)
      }
    }
  },
  mounted () {},
  created () {
    this.getPlatform()
    this.getLotteryList({ platformCode: 'appAllLottery' })
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.laws-layout {
  position: relative;
  overflow: hidden;
  background: #fff;
}
.laws-layout .nav {
  width: 26%;
  float: left;
  // position: fixed;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
  padding-bottom: 1rem;

  li {
    box-sizing: border-box;
    display: block;
    margin: .2rem 0 .2rem;
    width: 100%;
    line-height: .8rem;
    font-size: 0;
    cursor: pointer;
    text-align: left;
    p {
      // width: 65%;
      // float: right;
      font-size: 13px;
      vertical-align: middle;
      padding: 0 0 0 0.1875rem;
      display: inline;
    }
    img {
      width: 23%;
      vertical-align: middle;
      margin-left: 8px;
    }
  }
}
.childList {
  width: 74%;
  display: block;
  float: left;
  // display: -ms-flexbox;
  // min-height: 12rem;
  // margin-left: 27%;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 8px;
  max-height: 11.1875rem;

  li {
    width: 30%;
    border: #ccc solid 1px;
    text-align: center;
    box-sizing: border-box;
    line-height: 1rem;
    height: 1rem;
    // margin-left: 5px;
    margin-top: 8px;
    margin-left: calc((100% - 3 * 30%) / 4);
    border-radius: 4px;
    float: left;
    overflow: hidden;
    cursor: pointer;
  }
}
.activenav {
  background: $baseCol !important;
  color:#fff !important;
}
.activeListnav {
  border: 1px $baseCol solid !important;
  color: $baseCol;
}

</style>

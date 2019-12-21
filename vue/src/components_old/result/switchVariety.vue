<template>
  <!-- 选择彩种 -->
  <!-- <div class="switchVariety resultPop">
    <mt-popup class="popup" v-model="isShow" position="middle"> -->
  <Popup v-model="popup">
    <div class="switchVariety resultPop">
      <div class="title room-title">
        <span v-html="title"></span>
        <div class="closeBtn" @click="popup = false"></div>
      </div>
      <div class="panel">
        <mt-navbar class="cp2" v-model="tabs">
          <mt-tab-item
            v-for="(l, index) in tabsArr"
            @click.native="showCurrentTab(index)"
            :key="index"
            :id="index"
          >{{ l.label }}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="tabs">
          <mt-tab-container-item v-for="(a, index) in tabsArr" :key="index" :id="index">
            <!-- <GameCard :tile="!tile" :type="a.type" :type-name="a.typeName"/> -->
            <div
              class="varietyType"
              v-for="(variety, varietyIndex) in filterVariety(a.typeName,index)"
              :key="varietyIndex"
              :class="{'active':currentLotteryId === variety.lotteryId}"
            >
              <div class="imgbox" :dataId="variety.lotteryId" @click="getLotteryId(variety)">
                <img v-lazy="loadImg(variety.URL)">
              </div>
              {{variety.name}}
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </Popup>
    <!-- </mt-popup>
  </div> -->
</template>
<script>
import Popup from 'Components/global/popup'
import Logger from '@/plugins/utils/logger'
// import { getNavigatorApi } from 'Plugins/api/buyMall'
// import { mapActions, mapGetters } from 'vuex'
// import { gameListApi } from 'Plugins/api'
import GameCard from 'Components/buyMall/gameCard.js'
// TODO: 这里在使用时可以通过vuex传递相关配置
export default {
  components: {
    GameCard,
    Popup
  },
  name: 'switchVariety',
  props: [
    'title',
    // 'popupVisible',
    'currentLotteryId',
    'value'
  ],
  computed: {
    popup: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    },
    tabsArr () {
      // 新增属性typeName 传值字符串 多个种类通过|分割，分类彩种信息
      return [
        { label: '快三', type: '', typeName: 'QuickThree' },
        { label: 'PC蛋蛋', type: '', typeName: 'PCEgg|Luck' },
        { label: '时时彩', type: '', typeName: 'FrequentLottery' },
        { label: 'PK10', type: '', typeName: 'PK10' },
        { label: '六合彩', type: '', typeName: 'SixMark' },
        { label: '11选5', type: '', typeName: 'PickFive' },
        { label: '七星彩', type: '', typeName: 'OneMinuteSevenStar|ThreeMinuteSevenStar|FiveMinuteSevenStar' },
        {
          label: '3D系列',
          type: '',
          typeName: 'ArrangeThree|ThreeD|FrequentHappy'
        }
      ]
    }
  },
  data () {
    return {
      // isShow: null,
      tabs: 0, // 当前彩种分类tab
      varietyData: this.Utils.Storage.get('lotteryArr') // 所有彩种数据，若缓存中没有的时候将会发送请求数据
    }
  },
  // watch: {
  //   'popupVisible': {
  //     immediate: true,
  //     handler: function (e) {
  //       // console.log(1234566)
  //       this.isShow = true
  //     }
  //   }
  // },
  methods: {
    // 获取当前彩种
    // awardList () {
    //   this.axios.get('/front/lottery/init.do', {}).then((res) => {
    //     this.varietyData = res.data
    //   })
    // },
    // FIXME: 这里使用图片懒加载，该方法可移至util，后面再弄，图片暂定这里的
    loadImg (url) {
      return {
        src: url,
        error: require('./../../assets//images/zhanwietu.png'),
        loading: require('./../../assets/images/zhanwietu.png'),
        attempt: 5
      }
    },
    // 返回彩种id 点击彩种时
    getLotteryId (lottery) {
      this.$emit('queryLottery', lottery)
      // console.log('scroll', document.getElementsByClassName('resultList'))
      this.cancel()
    },
    cancel () {
      // this.isShow = false
      this.popup = false
      this.$emit('cancel')
    },
    // 切换tab
    // FIXME: 该方法可移至公用方法
    showCurrentTab (index) {
      try {
        const currentTab = document.querySelector('.cp2').querySelectorAll('a')[index] // 都叫cp 影响了外面的cp
        document.querySelector('.cp2').scrollLeft =
          index === 0
            ? 0
            : currentTab.offsetLeft -
              (window.innerWidth * 0.9) / 2 +
              currentTab.clientWidth / 2
      } catch (error) {
        Logger.error('应该是点击tab时获取dom出错了')
      }
    },
    // 过滤彩种 为所有彩种分类
    filterVariety (name, index) {
      if (!name) return []
      if (!Array.isArray(this.varietyData)) {
        Logger.warn('胸弟，varietyData应该是个数组の~')
        return false
      }
      return this.varietyData.filter(e => {
        const arr = name.split('|')
        return arr.some(val => {
          if (e.flag.includes(val) && e.lotteryId === this.currentLotteryId) {
            this.tabs = index
          }
          return e.flag.includes(val)
        })
      })
    },
    // 获取彩种数据
    async getVarietyData () {
      try {
        await this.Utils.requestSyn2(
          '/front/lottery/sixmark_attribute.do',
          {},
          res => {
            if (res.code === 0) {
              this.Utils.sessionUtil.save('lotteryArr', res.rows)
              this.varietyData = res.rows
            } else {
              Logger.error('获取彩种出错了')
            }
          }
        )
      } catch (err) {
        Logger.log(err)
      }
    }
  },
  mounted () {
    if (this.popupVisible) {
      Logger.log('选择彩种走势')
    }
    // 根据当前传递过来的彩种id高亮显示tab
  },
  created () {
    // this.awardList()
    // console.log('12', this.popupVisible)
    if (this.varietyData == null) {
      Logger.info('当前缓存中没有彩种信息，将请求彩种信息')
      this.getVarietyData()
    }
    // this.isShow = this.popupVisible
    this.$nextTick(() => {
      this.showCurrentTab(this.tabs)
      // TODO: 当前选中彩种信息位置
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./../../assets/css/normalize";
.switchVariety {
  background: #fafafc;
  width: 90%;
  border-radius: 5px;
  .closeBtn {
    background-image: url("/mobile/images/closeIcon.png");
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: $baseCol !important;
    border-color: $baseCol !important;
    margin-bottom: 1px !important;
  }
  .mint-tab-container-item {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    height: 55vh;
    overflow-y: auto;
    .varietyType {
      flex-basis: 33.33%;
      display: flex;
      justify-content: center;
      color: $baseGray;
      font-size: 0.4rem;
      flex-direction: column;
      align-items: center;
      padding: 0.2rem;
      &.active {
        color: $baseCol;
      }
      .imgbox {
        padding: 20px 0;
      }
      img {
        max-width: 60px;
      }
    }
  }
  .cp2 {
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    /*定义滚动条高宽及背景*/
    &::-webkit-scrollbar {
      height: 0;
      background-color: transparent;
    }
    /*定义滚动条*/
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
    .mint-tab-item {
      min-width: 65px;
      padding: 8px 0;
    }
    .mint-tab-item-label {
      position: relative;
      display: inline-block;
    }
    scroll-behavior: smooth;
    .is-selected {
      .mint-tab-item-label {
        color: #fff;
        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          // background-color: #fff;
          bottom: 5px;
          position: absolute;
        }
      }
    }
  }
}
</style>

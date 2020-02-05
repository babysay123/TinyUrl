<template>
  <el-main class="game-tabs">
    <!-- <nav class="swiper-tabs">
      <a
        v-for="(tab, i) in navTabs"
        :key="i + '-game-tab'"
        :class="i == 0 ? 'active' : ''"
        @click="switchTab(item)"
      >
        <img :src="tab.url">
        <span>{{ tab.name }}</span>
      </a>
    </nav>
    <swiper v-if="navTabs.length > 0" :options="swiperOption">
      <swiper-slide v-for="(item, inx) in navTabs" :key="inx + '-game-content'">
        {{ item.content }}
      </swiper-slide>
    </swiper> -->
    <ul class="tabs-ul">
      <li
        v-for="(item, i) in data"
        :key="i + '-game-tab'"
        :class="{ active: i === tabInx }"
        @click="clickSwitch(item, i)"
      >
        <img :src="item.imgUrl || '/mobile/img/icon_loading_Normal1.png' ">
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <!-- height="150px" -->
    <!-- <el-carousel
      trigger="click"
      :interval="0"
      :autoplay="false"
      arrow="never"
      indicator-position="none"
      ref="carousel"
      class="carousel-height"
    > -->
      <!-- {{ item }} -->
      <!-- <el-carousel-item
        v-for="(item, inx) in data"
        :key="inx + '-game-contents'"
        style="height: auto;"
      >
        <div class="tabs-content">
          <el-card
            v-for="(e, i) in item.list || []"
            :key="i + '-game-card'"
            class="tabs-card card-red"
            shadow="hover"
            @click="enterGame(e)"
          >{{ e.name }}</el-card>
        </div>
      </el-carousel-item> -->
    <!-- </el-carousel> -->
    <div class="tabs-content" v-if="data[tabInx]">
      <div
        v-for="(e, i) in data[tabInx].list || []"
        :key="i + '-game-card'"
        @click="enterGame(e)"
        class="tabs-card"
      >
        <el-card
          :class="cardBG(e)"
          shadow="hover"
        >
          <h2>{{ e.name }}</h2>
          <h5>{{ e.describe }}</h5>
        </el-card>
      </div>
      <!-- <div
        v-for="(e, i) in data[tabInx].list || []"
        :key="i + '-game-card'"
        :class="cardBG(e)"
        @click="enterGame(e)"
      >{{ e.name }}</div> -->
    </div>
  </el-main>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
const _backgrounds = {
  1: 'card-red',
  2: 'card-blue',
  3: 'card-yellow',
  4: 'card-green',
  5: 'card-gray',
  6: 'card-plum'
}

export default {
  name: 'gameTabs',
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      // navTabs: [
      //   { name: '红包', type: 'redbag', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaa component' },
      //   { name: '彩票', type: 'lottery', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaabb component' },
      //   { name: '彩票2', type: 'lottery2', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaacc component' },
      //   { name: '彩票3', type: 'lottery3', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaadd component' }
      // ],
      swiperOption: {
        loop: true
      },
      tabInx: 0,
      content: {
        redbag: []
      }
    }
  },
  created () {
    // console.log(this.setActiveItem)
  },
  computed: {
    ...mapGetters([ 'User', 'WsConfig' ])
  },
  methods: {
    ...mapActions([ 'setGameConfig' ]),
    init () {
      console.log('init')
    },
    clickSwitch (item, i) {
      // console.log(item, i)
      // console.log(this.$refs.carousel)
      // this.$refs.carousel.setActiveItem(i)
      this.tabInx = i
    },
    cardBG (item) {
      return _backgrounds[item.background]
    },
    enterGame (item) {
      // console.log('click', item)
      // 验证登录
      // 延时进入游戏
      if (this.User && this.User.socketToken && this.WsConfig.websocket) {
        const load = this.$loading({
          lock: true,
          text: '跳转中...'
        })
        // 游戏数据存入vuex
        this.setGameConfig({
          active: item,
          list: this.data[this.tabInx].list
        })
        // console.log(this.data[this.tabInx].name)

        setTimeout(() => {
          this.routerLink({
            path: '/malls/gameContent',
            params: {
              gameTitle: this.data[this.tabInx].name
            }
          })
          load.close()
        }, 1000)
      } else {
        this.warnMsgs('请重新登录~')
        setTimeout(() => {
          this.routerLink({
            path: '/login'
          })
        }, 1200)
      }
      // this.Utils.Storage.save('gameContent', item)
      // if (item.url) {}
      // this.routeLink({  })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.game-tabs {
  // padding: 5px 8px;
  padding: 0;
  position: relative;
  overflow: hidden;

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .tabs-ul {
    position: relative;
    font-size: 0;
    border-bottom: 1px solid #eee;
    li {
      display: inline-block;
      width: 25%;
      // width: calc((100% - 24px) / 4);
      // margin-right: 8px;
      text-align: center;
      background: #fff;
      overflow: hidden;
      &:active {
        background: #f9f9f9;
      }
      img {
        display: block;
        width: 40px;
        padding-left: 50%;
        margin-left: -20px;
        margin-top: 5px;
      }
      span {
        display: block;
        line-height: 24px;
        height: 24px;
        // padding: 0 8px;
        font-size: 13px;
        box-sizing: border-box;
      }
      &:last-child {
        margin-right: 0;
      }

      &.active {
        span {
          color: $baseRed;
        }
      }
    }
  }

  .tabs-content {
    padding: 6px;
    background: #fff;
    max-height: calc(100vh - 1.125rem - 108px - 38px - 70px - 49px - 12px);
    overflow-y: auto;
    overflow-x: hidden;

    .tabs-card {
      // margin: 6px 0px;
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  /deep/ .el-card {
    border-radius: 8px;
  }

  /deep/ .el-card__body {
    line-height: 16px;
    padding: 12px 16px;
    color: #fff;
    h2 {
      line-height: 26px;
    }
    h5 {
      line-height: 24px;
      font-size: 12px;
    }
  }

  .carousel-height {
    // height: calc(100% - 102px);
    // height: calc(100vh - 1.125rem - 108px - 38px - 66px - 49px);
    // /deep/ .el-carousel__container {
    //   // height: calc(100% - 102px);
    //   height: calc(100vh - 1.125rem - 108px - 38px - 66px - 49px);
    //   overflow-y: auto;
    //   overflow-x: hidden;
    // }
  }
  // 背景
  .card-red {
    background: red;
  }
  .card-green {
    background: lightgreen;
  }
  .card-blue {
    background: lightblue;
  }
  .card-yellow {
    background: yellow;
  }
  .card-gray {
    background: lightgrey;
  }
  .card-plum {
    background: plum;
  }
}
</style>

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
        v-for="(item, i) in navTabs"
        :key="i + '-game-tab'"
        @click="clickSwitch(item, i)"
      >
        <img :src="item.url">
        <span>{{ item.tab }}</span>
      </li>
    </ul>
    <!-- height="150px" -->
    <el-carousel
      trigger="click"
      :interval="0"
      arrow="never"
      indicator-position="none"
      ref="carousel"
      class="carousel-height"
    >
      <el-carousel-item
        v-for="item in 4"
        :key="item"
        style="height: auto;"
      >
        <div class="tabs-content">
          {{ item }}
          <el-card class="tabs-card card-red" shadow="hover" @click="enterGame()">卡片1</el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--
    <div class="tabs-content">
      <el-card class="tabs-card card-red" shadow="hover">卡片1</el-card>
      <el-card class="tabs-card card-blue" shadow="hover">卡片2</el-card>
      <el-card class="tabs-card card-green" shadow="hover">卡片3</el-card>
      <el-card class="tabs-card card-yellow" shadow="hover">卡片4</el-card>
    </div>
    -->
  </el-main>
</template>

<script>
export default {
  name: 'gameTabs',
  data () {
    return {
      navTabs: [
        { name: '红包', type: 'redbag', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaa component' },
        { name: '彩票', type: 'lottery', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaabb component' },
        { name: '彩票2', type: 'lottery2', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaacc component' },
        { name: '彩票3', type: 'lottery3', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaadd component' }
      ],
      swiperOption: {
        loop: true
      },
      content: {
        redbag: []
      }
    }
  },
  created () {
    // console.log(this.setActiveItem)
  },
  methods: {
    init () {
      console.log('init')
    },
    clickSwitch (item, i) {
      console.log(item, i)
      // console.log(this.$refs.carousel)
      this.$refs.carousel.setActiveItem(i)
    },
    enterGame (item) {
      console.log(item)
      if (item.url) {}
      // this.routeLink({
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    border-bottom: 1px solid #eee;
    li {
      display: inline-block;
      width: 25%;
      // width: calc((100% - 24px) / 4);
      // margin-right: 8px;
      text-align: center;
      font-size: 0;
      background: #fff;
      &:active {
        background: #f9f9f9;
      }
      img {
        display: block;
        width: 36px;
        padding-left: 50%;
        margin-left: -18px;
      }
      span {
        display: block;
        line-height: 22px;
        height: 22px;
        // padding: 0 8px;
        font-size: 13px;
        box-sizing: border-box;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .tabs-content {
    padding: 6px;
    background: #fff;
    .tabs-card {
      // margin: 6px 0px;
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .carousel-height {
    height: calc(100% - 66px);
    .el-carousel__container {
      height: calc(100% - 66px);
      overflow-y: auto;
    }
  }
  .card-red {

  }
  .card-green {

  }
  .card-blue {

  }
  .card-yellow {

  }
}
</style>

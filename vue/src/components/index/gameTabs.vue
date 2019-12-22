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
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!--
    <ul class="tabs-ul">
      <li
        v-for="(item, i) in cols"
        :key="i + '-game-tab'"
      >
        <img :src="item.url">
        <a @click="switchTab(item)">{{ item.tab }}</a>
      </li>
    </ul>
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
        { name: '红包', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaa component' },
        { name: '彩票', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaabb component' },
        { name: '彩票2', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaacc component' },
        { name: '彩票3', url: 'https://555.0234.co/mobile/images/index/home_icon_dragon@2x.png', content: 'aaadd component' }
      ],
      swiperOption: {
        loop: true
      },
      content: {}
    }
  },
  created () {
    console.log(this.setActiveItem)
  },
  method: {
    init () {
      console.log('init')
    },
    switchTab (item) {
      console.log(item)
      console.log(this.$refs.carousel.setActiveItem(2))
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

  .swiper-tabs {
    // display: -webkit-flex;  /* 新版本语法: Chrome 21+ */
    display: flex;          /* 新版本语法: Opera 12.1, Firefox 22+ */
    // display: -webkit-box;   /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    // display: -moz-box;      /* 老版本语法: Firefox (buggy) */
    // display: -ms-flexbox;   /* 混合版本语法: IE 10 */
    overflow: hidden;
    // position: fixed;
    // top: 1.125rem;
    // max-width: 780px;
    width: 100%;
    background: #fff;
    z-index: 10;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;

    a {
      flex: 1;
      justify-content: center;
      color: #333;
      text-align: center;
      width: 25%;
      img {
        display: block;
        width: 40px;
        padding-left: 50%;
        margin-left: -20px;
      }
      span {
        // line-height: 1rem;
        // height: 1rem;
        line-height: 22px;
        height: 22px;
      }
    }
  }

  .swiper-slide {
    overflow: hidden;
  }
  .swiper-slide-active {
    overflow: auto !important;
  }

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
        width: 42px;
        padding-left: 50%;
        margin-left: -21px;
      }
      a {
        display: block;
        line-height: 22px;
        height: 22px;
        // padding: 0 8px;
        font-size: 13px;
        box-sizing: border-box;
      }
      &:last-child {
        margin-right: 0;
        // a {
        // }
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
    .card-red {

    }
    .card-green {

    }
    .card-blue {

    }
    .card-yellow {

    }
  }
}
</style>

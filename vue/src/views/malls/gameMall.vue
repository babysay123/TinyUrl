<template>
  <el-main style="padding: 0;">
    <Head>
      <h3>游戏</h3>
    </Head>
    <!-- <Carousel :imgClick="false" /> -->
    <div class="mall-top">
      <el-carousel
        trigger="click"
        height="100px"
        arrow="never"
      >
        <el-carousel-item
          style="border-radius: 4px;"
          v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <BannerNotice
      :data="notices"
      style="padding-bottom: 2px; margin-bottom: 4px;" />
    <GameTabs class="game-tabs-content" />
    <NavBottom />
  </el-main>
</template>

<script>
import Head from 'Components/global/head'
import Carousel from 'Components/index/carousel'
import GameTabs from 'Components/index/gameTabs'
import BannerNotice from 'Components/index/bannerNotice'
import NavBottom from 'Components/global/nav-bottom'

export default {
  name: 'gameMall',
  components: {
    Head,
    Carousel,
    BannerNotice,
    GameTabs,
    NavBottom
  },
  data () {
    return {
      base: '',
      actived: '',
      notices: []
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
  text-align: center;
}

.mall-top {
  // margin: 15px;
  // margin-top: 20px;
  padding: 4px 10px;
  box-sizing: border-box;
  background: #fff;
}

.el-carousel__indicator--horizontal {
  padding: 6px 4px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/deep/ .el-carousel__indicator--horizontal .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.game-tabs-content {
  height: calc(100vh - 108px - 36px - 4px - 49px);
}
</style>

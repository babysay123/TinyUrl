<template>
  <el-main style="padding: 0;">
    <Head :back="false">
      <i
        class="el-icon-btn icon-left el-icon-bell"
        @click="toService"
      ></i>
      <h3>游戏</h3>
      <!-- <i
        class="el-icon-btn icon-right el-icon-circle-plus-outline"
        @click="slideMenu"
      ></i> -->
      <el-dropdown
        class="el-icon-btn icon-right"
        @command="handleDropdown"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <i class="el-icon-circle-plus-outline"></i>
        </span>
        <el-dropdown-menu
          style="padding: 6px 0; margin-top: 8px;"
          slot="dropdown"
        >
          <el-dropdown-item
            v-for="(el, inx) in dropList"
            :key="inx + '-drop-list'"
            :icon="el.icon"
            :command="el.link"
          >
            {{ el.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
          v-for="(item, i) in banners.filter(e => e.type === 'GAME_HALL')"
          :key="i + '-banne-inx'"
        >
          <h3 class="small">
            <img
              style="width: 100%; height: 100px;"
              :src="item.imgUrl"
            >
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <BannerNotice
      :data="notices"
      style="padding-bottom: 2px; margin-bottom: 4px;" />

    <GameTabs
      :data="games"
      class="game-tabs-content" />

    <NavBottom />
  </el-main>
</template>

<script>
import Head from 'Components/global/head'
// import Carousel from 'Components/index/carousel'
import GameTabs from 'Components/game/gameTabs'
import BannerNotice from 'Components/game/bannerNotice'
import NavBottom from 'Components/global/navBottom'
import { commonInitApi } from 'Plugins/api'

export default {
  name: 'gameMall',
  components: {
    Head,
    // Carousel,
    BannerNotice,
    GameTabs,
    NavBottom
  },
  data () {
    return {
      base: '',
      actived: '',
      banners: [],
      notices: [],
      games: [],
      // 下拉
      dropList: [
        { title: '代理中心', link: '/agency/agencyCenter', icon: 'el-icon-user' },
        { title: '新手教程', link: '/rules/tutorial', icon: 'el-icon-service' },
        { title: '玩法规则', link: '/rules/playRules', icon: 'el-icon-tickets' },
        { title: '创建群组', link: '/malls/createGroup', icon: 'el-icon-mobile-phone' }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      // 初始化
      const load = this.$loading({
        lock: true,
        text: '初始化...'
      })
      const res = await commonInitApi()
      const { code, data } = res
      if (code === 0) {
        const { notice, banner, gameCategories } = data
        this.notices = notice
        this.banners = banner
        this.games = gameCategories
      }
      setTimeout(() => {
        load.close()
      }, 800)
    },
    toService () {
      console.log('链接 消息')
    },
    slideMenu () {
      console.log('menu')
    },
    handleDropdown (link) {
      // console.log('link to ', link)
      this.routerLink({
        path: link
      })
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

/deep/ .el-carousel__indicator--horizontal {
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

.el-icon-btn {
  position: absolute;
  font-size: 20px;
  // top: calc(1.125rem / 2 - 10px);
  color: #fff;
  line-height: 1.125rem;
  top: 0;
  width: 12%;

  &.icon-left {
    // left: 10px;
    left: 0;
  }
  &.icon-right {
    // right: 10px;
    right: 0;
  }
}
// 下拉
// /deep/ .el-popper {
// // /deep/ .el-dropdown-menu {
//   padding: 6px 0;
// }
/deep/ .el-dropdown-menu__item {
  line-height: 32px;
  padding: 0 14px;
  font-size: 13px;
  i {
    margin-right: 2px;
  }
}
</style>

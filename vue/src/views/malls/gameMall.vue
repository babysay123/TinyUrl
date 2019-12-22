<template>
  <el-container>
    <Carousel :imgClick="false" />
    <BannerNotice :data="notices" />
    <GameTabs />
    <NavBottom />
  </el-container>
</template>

<script>
import Carousel from 'Components/index/carousel'
import GameTabs from 'Components/index/gameTabs'
import BannerNotice from 'Components/index/bannerNotice'
import NavBottom from 'Components/global/nav-bottom'

export default {
  name: 'gameMall',
  components: {
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

</style>

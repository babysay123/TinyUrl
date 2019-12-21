<template>
  <el-row>
    <Carousel :imgClick="false" />
    <BannerNotice :data="notices" />
    <NavBottom />
  </el-row>
</template>

<script>
import Carousel from 'Components/index/carousel'
import BannerNotice from 'Components/index/bannerNotice'
import NavBottom from 'Components/global/nav-bottom'

export default {
  name: 'gameMall',
  components: {
    Carousel,
    BannerNotice,
    NavBottom
  },
  data () {
    return {
      base: '',
      notices: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<!-- -->
<style lang="scss" scoped>
.swiper-inner {
  text-align: center;
  img {
    width: 94vw;
    border-radius: 5px;
    margin-top: 3px;
  }
}
</style>

<template>
  <section class="swiper-inner" :style="`height: ${containerHeight}px`">
    <swiper v-if="carousel.length > 0" :options="swiperOption">
      <swiper-slide v-for="(c, index) in carousel" :key="index">
        <img :src="c.image"
          :height="`${containerHeight - 6}px`"
          @click="routerLink({
          //  path: c.image.match(/http[\S]*.html/)
          //  ? c.image.match(/http[\S]*.html/)[0]
          //  : `/mobile/mall/innerHtml.html?url=/front/discountoff/detail.do?id=${c.discountoff_id}`,
          path:'/mobile/studio/#/preferActive',
            redirect: true
          })"
        >
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { carouselApi } from 'Plugins/api'
export default {
  data () {
    return {
      data: [],
      swiperOption: {
        loop: true,
        // effect: 'coverflow',
        // centeredSlides: true,
        // slidesPerView: 'auto',
        spaceBetween: -18,
        autoplay: {
          delay: 2000
        }
        // coverflowEffect: {
        //   rotate: 30,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1
        // }
      }
    }
  },
  methods: {
    async getData () {
      const res = await carouselApi({ userid: 0 })
      this.data = res.data.list
    },
    loadImg (url) {
      return {
        src: url,
        error: require('./../../assets/images/bannerImg.png'),
        loading: require('./../../assets/images/bannerImg.png'),
        attempt: 3
      }
    }
  },
  computed: {
    containerHeight () {
      return document.body.clientWidth * 0.38
    },
    carousel () {
      return this.data
    }
  },
  created () {
    // this.getData()
  }
}
</script>

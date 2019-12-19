<template>
  <div>
    <Head fixed>
      <h3>{{title}}</h3>
    </Head>
    <section class="personal-cell">
      <img src="/mobile/images/agent/home_banner.jpg" class="w100" />
      <nav>
        <a
          @click="linkTo(item)"
          class="personal-cell-item"
          v-for="(item,index) in  types"
          :key="index"
        >
          <img :src="item.icon" />
          <span class="one-line">{{item.title}}</span>
        </a>
      </nav>
    </section>
  </div>
</template>
<script>
import Head from 'Components/global/head_new'
export default {
  name: 'lotteryPlatform.vue',
  components: { Head },
  data () {
    return {
      title: '平台代理'
    }
  },
  computed: {
    types () {
      return [
        {
          link: 'myGeneralize',
          icon: '/mobile/images/agent/home10.png',
          title: '我的推广'
        },
        {
          link: 'directlyUnderSearch',
          icon: '/mobile/images/agent/home11.png',
          title: '直属查询'
        },
        {
          link: 'performanceSearch',
          icon: '/mobile/images/agent/home12.png',
          title: '业绩查询'
        },
        {
          link: 'agencyExplain',
          icon: '/mobile/images/agent/home13.png',
          title: '代理说明'
        }
      ]
    }
  },
  methods: {
    linkTo (item) {
      this.$router.push(`${item.link}`)
    }
  }
}
</script>
<style lang="scss" scoped>
section > img {
  margin-top: 1rem;
}
.personal-cell {
  width: 100%;
  background: #fff;
  overflow: hidden;
  border-top: 1px solid #eee;
  margin-bottom: 49px;

  .personal-cell-item {
    float: left;
    padding: 22px;
    text-align: center;
    font-size: 14px;
    width: calc(100% / 3);
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    &:nth-child(3n) {
      border-right: none;
    }
    img {
      width: 1rem;
      display: block;
      margin: 0 auto 6px;
    }
  }
}
</style>

<template>
  <section class="room-fix">
    <nav>
      <a
        v-for="(e, i) in navs"
        :key="i + '-room-fix-nav'"
        @click="linkTo(e)"
      >
        <img :src="e.img">
        <span>{{ e.name }}</span>
      </a>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'room-fix',
  data () {
    return {
      room: '',
      navs: [
        { name: '充值', img: '/mobile/img/mine/icons/record_agent_Normal@3x.png', link: '' },
        { name: '规则', img: '/mobile/img/mine/icons/xinshoujiaocheng_Normal@3x.png', link: '' },
        { name: '加盟', img: '/mobile/img/mine/icons/bank_normal@3x.png', link: '' }
      ]
    }
  },
  computed: {

  },
  methods: {
    init () {

    },
    linkTo (item) {
      console.log(item, item.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.room-fix {
  position: fixed;
  right: 0;
  top: 1.125rem;
  // display: none;
  nav {
    overflow: hidden;
    a {
      display: block;
      width: 32px;
      margin-top: 4px;
      margin-right: 4px;
      // padding-top: 36px;
      text-align: center;
      font-size: 0;
      background-size: contain;
      background-repeat: no-repeat;
      // height: 46px;

      span {
        font-size: 12px;
        display: block;
        line-height: 20px;
      }
      img {
        width: 100%;
        background: #f5f5f5;
        border-radius: 50%;
        background: #f5f4f9;
      }
    }
  }
}
</style>

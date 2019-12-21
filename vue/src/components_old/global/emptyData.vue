<template>
  <div class="noneData" :class="marginTop?'':'not-top'">
    <img :class="noClass()" :src="noImg()" />
    <p>{{ title || '' }}</p>
  </div>
</template>

<script>
export default {
  name: 'empty-block',
  props: {
    type: {
      type: String
    },
    title: {
      type: String
    },
    marginTop: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    noImg () {
      let url = '/mobile/images/agent/zwjl.png'
      if (this.type === 'list') {
        url = '/mobile/images/mine/face_no_game.png'
      }
      return url
    },
    noClass () {
      let _class = ''
      if (this.type === 'list') {
        _class = 'list'
      }
      return _class
    }
  }
}
</script>

<style lang="scss" scoped>
.noneData {
  margin: 2.825rem auto 0;
  text-align: center;
  font-size: 0;
  background: rgb(245,244,249);
  img {
    width: 3rem;
    &.list {
      width: 72%;
    }
  }
  p {
    font-size: 16px;
    line-height: 60px;
    color:#b8b8b8;
  }
}
.not-top{
  margin:0 auto;
}
</style>

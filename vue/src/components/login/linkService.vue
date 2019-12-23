<template>
  <div class="link-service">
    <!-- 登录失败跳转客服 -->
    <p style="text-align: center;">登录失败？请联系客服</p>

    <el-button
      type="success"
      icon="el-icon-check"
      circle
      @click="linkTo('llll')"
    ></el-button>
  </div>
</template>

<script>
export default {
  name: 'link-service',
  data () {
    return {
      data: [],
      title: ''
    }
  },
  created () {
  },
  method: {
    linkTo (url) {
      console.log('link', url)
    }
  }
}
</script>

<style lang="scss" scoped>
.link-service {
  position: relative;
  text-align: center;
}
</style>

<template>
  <div class="link-service">
    <!-- 登录失败跳转客服 -->
    <p class="subtitle">{{ title }}</p>

    <el-button
      class="service-btn"
      circle
      @click="linkTo('llll')"
    ></el-button>
      <!-- <img style="width: 36px; height: 36px;" src=""> -->
  </div>
</template>

<script>
// 登录失败？请联系客服
export default {
  name: 'link-service',
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      data: []
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

.subtitle {
  position: relative;
  font-size: 0.32rem;
  color: #999999;
  height: 45px;
  line-height: 45px;
  text-align: center;
}

.subtitle:before {
  content: "";
  position: absolute;
  width: 30%;
  height: 1px;
  top: 50%;
  background-color: #ccc;
  left: 2%;
}

.subtitle:after {
  content: "";
  position: absolute;
  width: 30%;
  height: 1px;
  top: 50%;
  background-color: #ccc;
  right: 2%;
}

.service-btn {
  background: url('/mobile/img/login/login_service@3x.png') no-repeat center center;
  width: 1.25rem;
  height: 1.25rem;
  background-size: contain;
}
</style>

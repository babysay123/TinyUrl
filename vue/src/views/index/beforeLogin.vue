<!--  -->
<template>
  <section>
    <Head :back="false">
      <h3>注册登录</h3>
    </Head>

    <div class="login-form login-before-login">
      <el-carousel
        trigger="click"
        height="150px"
        arrow="never"
      >
        <el-carousel-item
          style="border-radius: 4px;"
          v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="common-btn redBtn" @click="jump('login')">登录</div>
    <div class="common-btn whitBtn" @click="jump('register')">注册</div>

  </section>
</template>

<script>
import Head from 'Components/global/head'
import Carousel from 'Components/index/carousel'
export default {
  components: {
    Head,
    Carousel
    // LoginInput,
    // Verification
  },
  data () {
    return {
      input: {
        account: '',
        password: '',
        headImg: ''
      },
      isRemember: false,
      mask: false,
      base64url: ''
    }
  },
  beforeCreate () {
    console.log('before create')
    // 登录判断
  },
  methods: {
    jump (url) {
      this.routerLink({
        path: '/' + url
      })
    }
  },
  created () {
    // if (this.Utils.Storage.get('remember')) {
    //   this.isRemember = true
    //   this.input = JSON.parse(atob(this.Utils.Storage.get('remember')))
    // }
    // this.switch1()
    // this.Utils.Storage.remove('ws')
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
// .forget {
//   margin: 0 5px;
//   text-align: right;
//   margin-top: -12px;
//   line-height: 16px;
//   height: 16px;
//   a {
//     color: $baseRed;
//     font-size: 12px;
//   }
// }
.login-before-login {
  margin: 15px;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
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
</style>

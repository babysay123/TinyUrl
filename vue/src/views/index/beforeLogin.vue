<!--  -->
<template>
  <section>
    <Head :back="false">
      <h3>注册登录</h3>
    </Head>

    <div class="login-form login-before-login">
      <el-carousel
        trigger="click"
        height="140px"
        arrow="never"
        v-if="bannerData.length > 0"
      >
        <el-carousel-item
          style="border-radius: 4px;"
          v-for="(item, i) in bannerData.filter(e => e.type === 'LOGIN')"
          :key="i + '-banner'"
        >
          <!-- <h3 class="small">{{ item }}</h3> -->
          <div>
            <img style="width: 100%; height: 140px;" :src="item.imgUrl" alt="">
          </div>
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
import { commonInitApi } from 'Plugins/api'
import { mapGetters } from 'vuex'

export default {
  components: {
    Head,
    Carousel
    // LoginInput,
    // Verification
  },
  data () {
    return {
      // input: {
      //   account: '',
      //   password: '',
      //   headImg: ''
      // },
      // isRemember: false,
      // mask: false,
      bannerData: [],
      base64url: ''
    }
  },
  computed: {
    ...mapGetters([ 'User' ])
  },
  beforeCreate () {
    // console.log('before create')
    // console.log(this.Utils)
    // 登录判断
    // const userInfo = this.Utils.Storage.get('userInfo')
    // console.log(userInfo)
    // device id 判断
  },
  methods: {
    jump (url) {
      this.routerLink({
        path: '/' + url
      })
    }
  },
  created () {
    if (this.User && this.User.socketToken) {
      // console.log(this.User)
      // const { id, accessToken, socketToken } = this.UserInfo
      // console.log(id, accessToken, socketToken)
      this.$router.push({
        path: '/malls/gameMall'
      })
    }

    // 初始化
    commonInitApi()
      .then(res => {
        const { code, data } = res
        if (code === 0) {
          this.bannerData = data.banner
        }
      })
    // if (this.Utils.Storage.get('remember')) {
    //   this.isRemember = true
    //   this.input = JSON.parse(atob(this.Utils.Storage.get('remember')))
    // }
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
  line-height: 140px;
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

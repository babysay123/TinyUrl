<!--  -->
<template>
  <section>
    <Head>
      <h3>登录</h3>
    </Head>

    <!-- <div class="login-logo">
      <img src="/mobile/images/weblogo.png">
    </div> -->

    <div class="login-form">
      <LoginInput
        v-model="input.account"
        placeholder="请输入账号"
        icon="mobile"
        minLength="4"
        maxLength="16"
      />
      <LoginInput
        v-model="input.password"
        :inputType="'password'"
        placeholder="请输入密码"
        icon="password"
        minLength="6"
        maxLength="12"
      />
      <!-- <Verification
        v-model="input.headImg"
        :baseimg="base64url"
        @switch = "switch1"
      ></Verification> -->
    </div>

    <div class="redBtn" @click="onSubmit">登录</div>

    <div class="forget">
      <a>忘记密码？</a>
    </div>

    <!-- <div
      class="rememberLabel"
      :class="{ 'remember': isRemember }"
      @click="isRemember = !isRemember"
    >
      记住密码
    </div> -->

    <!-- <div
      class="whitBtn"
      @click="routerLink({
        path: '/mobile/other/download.html',
        params: $route.query.c ? `?c=${$route.query.c}` : null,
        redirect: true
      })"
    >
      下载App
    </div> -->

    <!-- <div class="login-tip">
      <span>
        没有账号？
        <router-link to='/register'>立即注册</router-link>
      </span>
    </div> -->

    <!-- 登录失败跳转客服 -->
    <p style="text-align: center;">登录失败？请联系客服</p>
    <div v-if="mask" class="submit-mask"></div>
    <!-- <img :src="this.base64url"> -->
  </section>
</template>

<script>
import Head from 'Components/global/head'
import LoginInput from 'Components/login/loginInput'
import Verification from 'Components/login/verification'
// import { usernameValid, passwordValid } from 'Plugins/validator'
// import { loginApi, verificationApi } from 'Plugins/api'
// import { mapMutations, mapActions } from 'vuex'
// import { Base64 } from 'js-base64'
export default {
  components: {
    Head,
    LoginInput,
    Verification
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
  methods: {
    // ...mapMutations([ 'updateUserInfo' ]),
    // ...mapActions([ 'getNewAccessToken', 'websocket' ]),
    base64ImgtoFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
    onValid () {
      // const { account, password, headImg } = this.input

      // if (!account) {
      //   return '请输入账号~'
      // } else {
      //   if (!usernameValid(account)) {
      //     return '账号格式错误，请重新输入~'
      //   }
      // }

      // if (!password) {
      //   return '请输入密码~'
      // } else {
      //   if (!passwordValid(password)) {
      //     return '密码格式错误，请重新输入~'
      //   }
      // }
      // if (!headImg) {
      //   return '请输入验证码~'
      // }
    },
    async onSubmit () {
      /**
       * @author Cyan
       * @var {String | Undefined} validResult 验证结果
       * @description 验证结果如果有返回值 则说明校验不通过 进行弹窗提醒 校验通过 更新个人信息并跳转个人中心页面
       */
      // const validResult = this.onValid()
      // if (validResult) {
      //   this.$toast({
      //     message: validResult,
      //     duration: 1800
      //   })
      // } else {
      //   this.mask = true
      //   try {
      //     await this.getSessionId()
      //     const res = await loginApi(this.input)
      //     const { code, msg } = res
      //     if (code === 0) {
      //       const { data } = res
      //       this.updateUserInfo(data)
      //       this.Utils.Storage.save('user', data)
      //       // 登录后，清楚公告显示，让公告重新生成
      //       this.Utils.Storage.remove('noticeRead')
      //       if (this.isRemember) {
      //         this.Utils.Storage.save('remember', btoa(JSON.stringify(this.input)))
      //       }
      //       // this.$store.dispatch('websocket')
      //       this.$toast({
      //         message: '登录成功~',
      //         duration: 1800
      //       })
      //       setTimeout(async () => {
      //         // window.location.replace('/mobile/mine/mine.html')
      //         try {
      //           await this.getNewAccessToken()
      //           this.websocket()
      //         } catch (error) {
      //           console.log(error)
      //         }
      //         this.$router.replace('/mine')
      //       }, 1800)
      //     } else {
      //       this.$toast({
      //         message: msg,
      //         duration: 1800
      //       })
      //       this.switch1()
      //       this.mask = false
      //     }
      //   } catch (error) {
      //     this.mask = false
      //     if (error.response.status === 600) {
      //       this.$toast({
      //         message: '提交信息含有敏感字符，请修改后重新提交~',
      //         duration: 1800
      //       })
      //     }
      //   }
      // }
    },
    switch1 () {
      // verificationApi().then(res => {
      //   if (res.code === 0) this.base64url = res.data
      //   // console.log(this.base64ImgtoFile(this.base64url))
      // })
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
.forget {
  margin: 0 5px;
  text-align: right;
  margin-top: -12px;
  line-height: 16px;
  height: 16px;
  a {
    color: $baseRed;
    font-size: 12px;
  }
}
</style>
